/**
 * API endpoint path constants
 * These are relative paths that should be combined with the base API URL from ConfigService
 *
 * Instead of importing these constants, services should inject ConfigService
 * and use its apiUrl property to build full endpoint URLs
 */
export const AUTH_PATH = '/auth';
export const USER_PATH = '/users';
export const ACCOUNT_PATH = '/account';
export const AD_PATH = '/ads';
export const MEETING_PATH = '/meetings';
export const PAYMENT_PATH = '/payment';
