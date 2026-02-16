import * as React from "react";

export type IconName =
  | "spark"
  | "chart"
  | "database"
  | "shield"
  | "wand"
  | "arrow"
  | "plus";

export function Icon(props: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  const { name, className, title } = props;

  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
  } as const;

  // Simple inline SVGs to avoid adding an icon dependency.
  switch (name) {
    case "spark":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <path d="M12 2l1.5 6L20 10l-6.5 2L12 18l-1.5-6L4 10l6.5-2L12 2z" />
        </svg>
      );

    case "chart":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M7 15l4-4 3 3 5-6" />
          <path d="M19 8v0" />
        </svg>
      );

    case "database":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );

    case "wand":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <path d="M4 20l11-11" />
          <path d="M7 17l-3 3" />
          <path d="M15 9l-3-3" />
          <path d="M16 3l1 3" />
          <path d="M21 8l-3 1" />
          <path d="M18 11l3 1" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <path d="M9 18l6-6-6-6" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {title ? <title>{title}</title> : null}
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );

    default:
      return null;
  }
}
