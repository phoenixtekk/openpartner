/**
 * Phoenixtekk fork: the operator's platform name, server side.
 *
 * Mirrors apps/portal/src/lib/platform.ts. Upstream hardcodes "OpenPartner"
 * into the email From line ("<Brand> via OpenPartner"), which is the platform
 * attribution every partner and admin sees on every transactional email.
 * For a self-hosted operator that has to be their own name.
 */
export const PLATFORM_NAME = 'Phoenixtekk Affiliates';
