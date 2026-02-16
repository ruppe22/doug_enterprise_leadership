export const site = {
  name: "Doug Ruppert",
  title: "Doug Ruppert | Enterprise Technology",
  description:
    "Executive portfolio: thought leadership, case studies, and an 'Ask Doug' knowledge base (in progress).",
  // Set NEXT_PUBLIC_SITE_URL after you have a real domain (used for sitemap/robots/metadataBase).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "doug@creativebygray.com",
  sameAs: [
    "https://www.linkedin.com/in/dougruppert/",
    // Add GitHub when ready
    // "https://github.com/your-handle"
  ],

  // --- Home page profile + CTAs ---
  // Edit these values to update the landing page content.
  profile: {
    headline: "Enterprise Product & Technology Leader",
    subheadline:
      "AI‑Driven Digital Transformation | Data Governance Design",
    statusLine: "Open to relocation",
    // Optional: keep blank until you want it public.
    locationLine: "",

    focus: [
      "Enterprise AI Readiness",
      "Track & Measure",
      "Data Governance",
      "Privacy & Security",
      "Digital Transformation",
    ],
    industries: ["Retail", "Ecommerce", "Fintech"],
    rolesExploring: [
      "Product Manager",
      "Product Owner",
      "Marketing Technology Leader",
      "Digital Transformation",
    ],
  },

  // Primary CTA URLs (edit as needed)
  ctas: {
    linkedin: "https://www.linkedin.com/in/dougruppert/",
    resume: "/resume.pdf",
    work: "/work",
    thoughtLeadership: "/thought-leadership",
    contact: "/contact",
  },
};
