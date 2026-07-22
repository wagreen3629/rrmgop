import { useEffect } from "react";

const DEFAULT_TITLE = "Montgomery River Region | Alabama Minority GOP";

// Updates the browser tab title per route. This only affects real visitors
// and browsers (history, bookmarks, tabs) — social-preview crawlers read the
// static <title> in index.html without running JS, so this has no effect on
// link unfurls or search snippets.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
