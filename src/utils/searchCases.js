// searchCases.js — Intelligent full-text case search engine

import { normalizeQuery, normalizeField, normalizeArray } from './normalizeSearch.js';

function scoreCase(caseObj, normalizedQuery) {
  if (!normalizedQuery) return 0;
  const q = normalizedQuery;
  let score = 0;

  // Use boundary check for exact article/section number queries (prevents "article 14" matching "article 142")
  const isNumberedProvision = /^(article|section)\s+\d+[a-z]?$/.test(q);
  const boundaryRegex = isNumberedProvision
    ? new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    : null;

  const check = (value, weight) => {
    if (!value) return;
    const normalized = normalizeField(String(value));
    const matched = boundaryRegex ? boundaryRegex.test(normalized) : normalized.includes(q);
    if (matched) {
      score += weight;
      if (normalized === q) score += weight * 2;
    }
  };

  const checkArray = (arr, weight) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(item => check(String(item), weight));
  };

  // High-priority fields
  check(caseObj.title, 100);
  check(caseObj.principle, 85);
  check(caseObj.citation, 60);
  checkArray(caseObj.constitutionalArticles, 90);
  checkArray(caseObj.legalKeywords, 70);
  checkArray(caseObj.mainProvisions, 65);
  checkArray(caseObj.legalPrinciples, 65);

  // Medium-priority fields
  check(caseObj.subject, 50);
  checkArray(caseObj.judges, 50);
  check(caseObj.summary, 35);
  if (caseObj.year) check(String(caseObj.year), 25);
  check(caseObj.court, 25);

  // Full case content fields
  checkArray(caseObj.facts, 25);
  checkArray(caseObj.decision, 30);
  checkArray(caseObj.relatedCasesText, 20);
  if (Array.isArray(caseObj.notes)) {
    caseObj.notes.forEach(n => {
      check(n.label, 20);
      check(n.text, 20);
    });
  }
  check(caseObj.background, 20);
  check(caseObj.judgment, 20);

  // Statutes
  if (Array.isArray(caseObj.statutes)) {
    caseObj.statutes.forEach(statute => {
      check(statute.name, 30);
      checkArray(statute.provisions, 50);
    });
  }

  check(caseObj.slug, 20);
  check(caseObj.id, 20);

  return score;
}

export function searchCases(cases, query, options = {}) {
  if (!query || !query.trim()) {
    return filterCasesOnly(cases, options);
  }

  const normalizedQuery = normalizeQuery(query);

  const scored = cases
    .map(c => ({ caseObj: c, score: scoreCase(c, normalizedQuery) }))
    .filter(({ score }) => score > 0);

  const filtered = scored.filter(({ caseObj }) => applyFilters(caseObj, options));
  filtered.sort((a, b) => b.score - a.score);

  return filtered.map(({ caseObj }) => caseObj);
}

function filterCasesOnly(cases, options = {}) {
  return cases.filter(c => applyFilters(c, options));
}

function applyFilters(caseObj, options) {
  const { subjectSlug, yearFrom, yearTo, court, article } = options;
  if (subjectSlug && caseObj.subjectSlug !== subjectSlug) return false;
  if (yearFrom && (!caseObj.year || caseObj.year < Number(yearFrom))) return false;
  if (yearTo && (!caseObj.year || caseObj.year > Number(yearTo))) return false;
  if (court && normalizeField(caseObj.court) !== normalizeField(court)) return false;
  if (article) {
    const normalizedArticle = normalizeQuery(article);
    const caseArticles = normalizeArray(caseObj.constitutionalArticles);
    if (!caseArticles.some(a => normalizeQuery(a).includes(normalizedArticle))) return false;
  }
  return true;
}

export default searchCases;
