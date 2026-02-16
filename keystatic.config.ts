import { config, fields, collection } from "@keystatic/core";

const TOPICS = [
  { label: "Enterprise AI Readiness", value: "enterprise-ai-readiness" },
  { label: "Track & Measure", value: "track-and-measure" },
  { label: "Data Governance", value: "data-governance" },
  { label: "Privacy & Security", value: "privacy-and-security" },
  { label: "Digital Transformation", value: "digital-transformation" },
];

export default config({
  storage: { kind: "local" },

  ui: {
    brand: { name: "Doug Ruppert" },
    navigation: {
      ThoughtLeadership: ["articles"],
      Work: ["work"],
    },
  },

  collections: {
    articles: collection({
      label: "Thought Leadership",
      slugField: "title",
      path: "content/articles/*",
      format: { contentField: "body" },
      columns: ["publishedAt", "topics"],

      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "Slug", description: "Used in the URL (e.g. /thought-leadership/<slug>)" },
        }),

        publishedAt: fields.date({
          label: "Publish date",
        }),

        summary: fields.text({
          label: "Summary",
          description: "1–2 sentences used on cards and SEO meta.",
          multiline: true,
        }),

        topics: fields.multiselect({
          label: "Topics",
          options: TOPICS,
          defaultValue: [],
        }),

        canonicalUrl: fields.url({
          label: "Canonical URL",
          description: "Optional. If this article lives elsewhere, set canonical.",
        }),

        heroImage: fields.image({
          label: "Hero image",
          description: "Optional. Used on the article page and social previews.",
          directory: "public/images/articles",
          publicPath: "/images/articles/",
        }),

        body: fields.markdoc({
          label: "Body",
          extension: "md",
        }),

        seo: fields.object(
          {
            title: fields.text({
              label: "SEO title",
              description: "Optional override. Defaults to the article title.",
            }),
            description: fields.text({
              label: "SEO description",
              description: "Optional override. Defaults to the summary.",
              multiline: true,
            }),
          },
          {
            label: "SEO (optional)",
          }
        ),
      },
    }),

    work: collection({
      label: "Work",
      slugField: "title",
      path: "content/work/*",
      format: { contentField: "body" },
      columns: ["year"],

      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "Slug", description: "Used in the URL (e.g. /work/<slug>)" },
        }),

        year: fields.integer({
          label: "Year",
          validation: { min: 1990, max: 2100 },
        }),

        summary: fields.text({
          label: "Summary",
          description: "1–2 sentences used on cards and list pages.",
          multiline: true,
        }),

        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),

        cover: fields.image({
          label: "Cover image",
          description: "Optional. Used on the work detail page.",
          directory: "public/images/work",
          publicPath: "/images/work/",
        }),

        links: fields.object(
          {
            live: fields.url({
              label: "Live URL",
              description: "Optional public link (if available)",
            }),
            repo: fields.url({
              label: "Repo URL",
              description: "Optional repo link (if public)",
            }),
          },
          {
            label: "Links (optional)",
          }
        ),

        body: fields.markdoc({
          label: "Case study / write-up",
          extension: "md",
        }),

        seo: fields.object(
          {
            title: fields.text({
              label: "SEO title",
              description: "Optional override. Defaults to the work title.",
            }),
            description: fields.text({
              label: "SEO description",
              description: "Optional override. Defaults to the summary.",
              multiline: true,
            }),
          },
          {
            label: "SEO (optional)",
          }
        ),
      },
    }),
  },
});
