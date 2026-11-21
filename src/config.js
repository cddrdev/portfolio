export const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
