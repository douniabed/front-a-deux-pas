/**
 * API endpoint path constants
 * These are relative paths that should be combined with the base API URL from ConfigService
 *
 * Instead of importing these constants, services should inject ConfigService
 * and use its apiUrl property to build full endpoint URLs
 */

const API_BASE_URL = 'http://localhost:8081/api';

export const AUTH_PATH = '/adeuxpas/auth';
export const USER_PATH = '/adeuxpas/users';
export const ACCOUNT_PATH = '/adeuxpas/account';
export const AD_PATH = '/adeuxpas//ads';
export const MEETING_PATH = '/adeuxpas/meetings';
export const PAYMENT_PATH = '/adeuxpas/payment';

export const AUTH_BASE_URL = `${API_BASE_URL}${AUTH_PATH}`;
export const USER_BASE_URL = `${API_BASE_URL}${USER_PATH}`;
export const ACCOUNT_BASE_URL = `${API_BASE_URL}${ACCOUNT_PATH}`;
export const AD_BASE_URL = `${API_BASE_URL}${AD_PATH}`;
export const MEETING_BASE_URL = `${API_BASE_URL}${MEETING_PATH}`;
