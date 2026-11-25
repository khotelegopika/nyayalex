// normalizeSearch.js — Normalize search query strings

/**
 * Normalize a search query:
 * - Lowercase
 * - Trim whitespace
 * - Collapse multiple spaces
 * - Normalize article references: "Art. 14", "art-14", "article-14" → "article 14"
 * - Normalize "Section" references similarly
 */
export function normalizeQuery(query) {
  if (!query || typeof query !== 'string') return '';
  let q = query.toLowerCase().trim();
  q = q.replace(/\s+/g, ' ');
  // Normalize article references
  q = q.replace(/\bart\.?\s*-?\s*(\d+[a-z]?)\b/gi, 'article $1');
  q = q.replace(/\barticle\s*-\s*(\d+[a-z]?)\b/gi, 'article $1');
  // Normalize section references
  q = q.replace(/\bsec\.?\s*-?\s*(\d+[a-z]?)\b/gi, 'section $1');
  // Remove extra punctuation that may confuse matching
  q = q.replace(/['"]/g, '');
  return q;
}

/**
 * Normalize a string field for comparison
 */
export function normalizeField(value) {
  if (!value || typeof value !== 'string') return '';
  return value.toLowerCase().trim().replace(/\s+/g, ' ');
}

/**
 * Normalize an array of strings for comparison
 */
export function normalizeArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map(item => normalizeField(String(item)));
}
