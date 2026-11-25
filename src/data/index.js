// index.js — Master data index (single cases.js source)
import allCasesData from './cases.js';
import subjects from './subjects.js';

export const allCases = allCasesData;

export const featuredCases = allCases.filter(c => c.featured);

export const getCaseById    = (id)   => allCases.find(c => c.id === id);
export const getCaseBySlug  = (slug) => allCases.find(c => c.slug === slug);
export const getCasesBySubject = (subjectSlug) => allCases.filter(c => c.subjectSlug === subjectSlug);

// subjects with live case count
export const subjectsWithCount = subjects.map(s => ({
  ...s,
  caseCount: allCases.filter(c => c.subjectSlug === s.slug).length,
}));

export { subjects };
export default allCases;
