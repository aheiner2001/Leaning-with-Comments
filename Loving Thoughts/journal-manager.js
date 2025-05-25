export function getJournals() {
  return JSON.parse(localStorage.getItem('journals') || '[]');
}

export function saveJournalList(journals) {
  localStorage.setItem('journals', JSON.stringify(journals));
}

export function getJournalData(journalId) {
  return JSON.parse(localStorage.getItem(`journal-${journalId}`) || '{}');
}

export function saveJournalData(journalId, data) {
  localStorage.setItem(`journal-${journalId}`, JSON.stringify(data));
}
