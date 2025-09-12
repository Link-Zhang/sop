const DATE_LOCALE = "lt-LT";

export const getCurrentDate = () => new Date().toLocaleDateString(DATE_LOCALE);
