import { useEffect } from "react";

export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  ogUrl,
}: {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
}) {
  useEffect(() => {
    document.title = title;

    function setMeta(selector: string, attr: string, value: string) {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const parts = selector.match(/\[([^\]]+)="([^\]]+)"\]/);
        if (parts) el.setAttribute(parts[1], parts[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    }

    setMeta('meta[name="description"]', "content", description);

    /* OPEN GRAPH: Per-page OG tags for social sharing */
    setMeta('meta[property="og:title"]', "content", ogTitle || title);
    setMeta('meta[property="og:description"]', "content", ogDescription || description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", "Tessa Hood – The Coop Finder");
    if (ogUrl) setMeta('meta[property="og:url"]', "content", ogUrl);

    /* TWITTER CARD: Twitter/X sharing */
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", ogTitle || title);
    setMeta('meta[name="twitter:description"]', "content", ogDescription || description);
  }, [title, description, ogTitle, ogDescription, ogUrl]);
}
