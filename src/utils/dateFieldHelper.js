let dateAttributes = null;

export const lockDateInput = (date, val = 0) => {
  const nextDate = new Date(date);

  nextDate.setDate(nextDate.getDate() + val);

  dateAttributes = { min: nextDate.toISOString().split('T')[0] };
  return dateAttributes;
};

export const handleStartDateField = (e, setStartDate, setHasStartDate) => {
  setStartDate(e.target.value);
  // disable von edn Datum entfernen
  setHasStartDate(true);
  // nun locken wir das endDatumsfeld
  return lockDateInput(new Date(e.target.value), 1);
};
