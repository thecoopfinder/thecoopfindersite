import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdObject = Record<string, any>;

interface PageMetaProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Absolute URL to the social sharing image */
  ogImage?: string;
  ogUrl?: string;
  /** Absolute canonical URL for this page */
  canonical?: string;
  /** Schema.org JSON-LD structured data — object or array of objects */
  jsonLd?: JsonLdObject | JsonLdObject[];
}

export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  canonical,
  jsonLd,
}: PageMetaProps) {
  useEffect(() => {
    /* ── PAGE TITLE ── */
    document.title = title;

    /* ── META TAG HELPER ── */
    function setMeta(selector: string, attrName: string, value: string) {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const parts = selector.match(/\[([^\]]+)="([^\]]+)"\]/);
        if (parts) el.setAttribute(parts[1], parts[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attrName, value);
    }

    /* ── PRIMARY SEO ── */
    setMeta('meta[name="description"]',    "content", description);
    setMeta('meta[name="robots"]',         "content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    /* ── OPEN GRAPH ── */
    setMeta('meta[property="og:title"]',       "content", ogTitle || title);
    setMeta('meta[property="og:description"]', "content", ogDescription || description);
    setMeta('meta[property="og:type"]',        "content", "website");
    setMeta('meta[property="og:site_name"]',   "content", "Tessa Hood \u2013 The Coop Finder");
    if (ogUrl)   setMeta('meta[property="og:url"]',            "content", ogUrl);
    if (ogImage) {
      setMeta('meta[property="og:image"]',     "content", ogImage);
      setMeta('meta[property="og:image:alt"]', "content", ogTitle || title);
    }

    /* ── TWITTER / X CARD ── */
    setMeta('meta[name="twitter:card"]',        "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]',       "content", ogTitle || title);
    setMeta('meta[name="twitter:description"]', "content", ogDescription || description);
    if (ogImage) setMeta('meta[name="twitter:image"]', "content", ogImage);

    /* ── CANONICAL URL ── */
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    /* ── JSON-LD STRUCTURED DATA ──
       Injects (or replaces) page-specific schema alongside the site-wide
       RealEstateAgent schema already present in index.html.
       Always removes any stale page schema on navigation, even when this
       page provides no jsonLd (prevents cross-page schema leakage in SPA).
    ── */
    const prevScript = document.getElementById("page-jsonld");
    if (prevScript) prevScript.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "page-jsonld";
      script.textContent = JSON.stringify(
        Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      );
      document.head.appendChild(script);
    }
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical, jsonLd]);
}
