const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// uCrop*: xy = offset, zw = scale; reproduces object-fit: cover with object-position: top.
const FRAGMENT = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec4 uCropFrom;
uniform vec4 uCropTo;
uniform float uMix;
uniform float uTime;
uniform vec2 uVel;

vec3 pick(sampler2D tex, vec4 crop, vec2 uv, vec2 shift) {
  vec2 base = crop.xy + clamp(uv, 0.0, 1.0) * crop.zw;
  vec2 off = shift * crop.zw;
  return vec3(
    texture2D(tex, base + off).r,
    texture2D(tex, base).g,
    texture2D(tex, base - off).b
  );
}

void main() {
  float speed = clamp(length(uVel), 0.0, 1.0);
  float m = smoothstep(vUv.y * 0.45, vUv.y * 0.45 + 0.55, uMix);
  float seam = 1.0 - abs(2.0 * m - 1.0);

  vec2 uv = vUv;
  uv += vec2(sin(vUv.y * 9.0 + uTime * 3.0), sin(vUv.x * 7.0 - uTime * 2.4)) * 0.022 * speed;
  uv.y += seam * 0.06 * sin(vUv.x * 5.0 + uTime * 2.0);

  vec2 shift = uVel * 0.012;
  vec3 color = mix(pick(uFrom, uCropFrom, uv, shift), pick(uTo, uCropTo, uv, shift), m);
  gl_FragColor = vec4(color, 1.0);
}`;

type Slide = { image: HTMLImageElement; texture: WebGLTexture | null };

export type Warp = {
  show: (id: string) => void;
  hide: () => void;
  push: (dx: number, dy: number) => void;
  destroy: () => void;
};

/**
 * Raw WebGL so no 3D library ships. Returns null without WebGL; the <img> stack
 * under the canvas is the fallback, and it also shows until textures are ready.
 */
export function createWarp(canvas: HTMLCanvasElement, images: Map<string, HTMLImageElement>): Warp | null {
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    from: u("uFrom"),
    to: u("uTo"),
    cropFrom: u("uCropFrom"),
    cropTo: u("uCropTo"),
    mix: u("uMix"),
    time: u("uTime"),
    vel: u("uVel"),
  };
  gl.uniform1i(uniforms.from, 0);
  gl.uniform1i(uniforms.to, 1);

  const slides = new Map<string, Slide>();
  const upload = (slide: Slide) => {
    if (slide.texture || !slide.image.complete || !slide.image.naturalWidth) return;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, slide.image);
    slide.texture = texture;
  };
  images.forEach((image, id) => {
    const slide: Slide = { image, texture: null };
    slides.set(id, slide);
    // next/image lazy-loads; decoding may finish after the warp exists.
    if (image.complete) upload(slide);
    else image.addEventListener("load", () => upload(slide), { once: true });
  });

  const crop = (slide: Slide) => {
    const canvasAspect = canvas.width / canvas.height;
    const imageAspect = slide.image.naturalWidth / slide.image.naturalHeight;
    return imageAspect > canvasAspect
      ? [(1 - canvasAspect / imageAspect) / 2, 0, canvasAspect / imageAspect, 1]
      : [0, 0, 1, imageAspect / canvasAspect];
  };

  let from: Slide | null = null;
  let to: Slide | null = null;
  let mixStart = 0;
  let velX = 0;
  let velY = 0;
  let pushX = 0;
  let pushY = 0;
  let frame = 0;
  const started = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(canvas.clientWidth * dpr);
    const height = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  let running = false;
  let stopAt = 0;

  const render = (now: number) => {
    if (stopAt && now > stopAt) {
      running = false;
      stopAt = 0;
      return;
    }
    frame = requestAnimationFrame(render);
    velX += (pushX - velX) * 0.12;
    velY += (pushY - velY) * 0.12;
    pushX *= 0.86;
    pushY *= 0.86;

    if (!to?.texture) {
      canvas.style.opacity = "0";
      return;
    }
    canvas.style.opacity = "1";
    resize();
    const source = from?.texture ? from : to;
    const mix = Math.min(1, (now - mixStart) / 450);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, source.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, to.texture);
    gl.uniform4fv(uniforms.cropFrom, crop(source));
    gl.uniform4fv(uniforms.cropTo, crop(to));
    gl.uniform1f(uniforms.mix, source === to ? 1 : mix);
    gl.uniform1f(uniforms.time, (now - started) / 1000);
    gl.uniform2f(uniforms.vel, velX, velY);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  return {
    show(id) {
      stopAt = 0;
      if (!running) {
        running = true;
        frame = requestAnimationFrame(render);
      }
      const next = slides.get(id);
      if (!next || next === to) return;
      upload(next);
      from = to;
      to = next;
      mixStart = performance.now();
    },
    hide() {
      // Keep drawing through the fade-out, then park the loop.
      stopAt = performance.now() + 400;
    },
    push(dx, dy) {
      pushX = Math.max(-1, Math.min(1, pushX + dx / 60));
      pushY = Math.max(-1, Math.min(1, pushY + dy / 60));
    },
    destroy() {
      cancelAnimationFrame(frame);
      slides.forEach((slide) => slide.texture && gl.deleteTexture(slide.texture));
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
