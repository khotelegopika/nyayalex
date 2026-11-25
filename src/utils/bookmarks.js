// bookmarks.js — localStorage bookmark utilities

const STORAGE_KEY = 'ilc_bookmarks';

export function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function isBookmarked(caseId) {
  return getBookmarks().includes(caseId);
}

export function toggleBookmark(caseId) {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(caseId);
  if (idx === -1) {
    bookmarks.push(caseId);
  } else {
    bookmarks.splice(idx, 1);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  return bookmarks;
}

export function clearBookmarks() {
  localStorage.removeItem(STORAGE_KEY);
}
