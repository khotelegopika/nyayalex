// filterCases.js — Sorting and filtering helpers

export function sortCases(cases, sortBy = 'newest') {
  const sorted = [...cases];
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    case 'oldest':
      return sorted.sort((a, b) => (a.year || 9999) - (b.year || 9999));
    case 'alpha':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'relevance':
    default:
      return sorted;
  }
}

export function getYears(cases) {
  return [...new Set(cases.map(c => c.year).filter(Boolean))].sort((a, b) => b - a);
}

export function getCourts(cases) {
  return [...new Set(cases.map(c => c.court).filter(Boolean))].sort();
}

export function getArticles(cases) {
  const articles = new Set();
  cases.forEach(c => {
    if (Array.isArray(c.constitutionalArticles)) {
      c.constitutionalArticles.forEach(a => articles.add(a));
    }
  });
  return [...articles].sort();
}

export default sortCases;
