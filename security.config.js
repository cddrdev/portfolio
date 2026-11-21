export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self'; font-src 'self'; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com; object-src 'none'; base-uri 'self'; form-action 'none'; frame-src 'none'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000',
};
