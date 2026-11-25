// highlight.js — Utility to highlight search terms in text

/**
 * Returns JSX-safe string with <mark> around matched terms.
 * Usage: use dangerouslySetInnerHTML or React element approach.
 */
export function highlightText(text, query) {
  if (!text || !query || !query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

export default highlightText;
