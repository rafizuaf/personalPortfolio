import { CHAPTERS } from "@/content/experience";
import { PROFILE, SOCIAL } from "@/content/profile";
import { STACK } from "@/content/stack";
import { SITE_URL } from "@/lib/site";

/** schema.org Person + WebSite, so search engines tie this page to the same person as the linked profiles. */
export default function StructuredData() {
  const name = PROFILE.name.join(" ");
  const current = CHAPTERS[0].employers[0];
  const personId = `${SITE_URL}/#person`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name,
        givenName: PROFILE.name[0],
        familyName: PROFILE.name[1],
        alternateName: ["Rafi Fauzi", "rafizuaf"],
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/opengraph-image`,
        email: `mailto:${PROFILE.email}`,
        jobTitle: current.roles[0].title,
        worksFor: { "@type": "Organization", name: current.name, alternateName: current.alias },
        address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Universitas Mercu Buana" },
          { "@type": "EducationalOrganization", name: "Hacktiv8" },
        ],
        knowsAbout: STACK.filter((layer) => layer.layer !== "Practice").flatMap((layer) => layer.tools),
        knowsLanguage: ["en", "id"],
        sameAs: SOCIAL.map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name,
        inLanguage: "en",
        author: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: `${name} · Software Engineer, Jakarta`,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
