import APP_CONFIG from '@/config/app';

export const saveContent = (content: string): void => {
  localStorage.setItem(APP_CONFIG.STORAGE_KEYS.CONTENT, content);
};

export const getContent = (): string => {
  return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.CONTENT) || '';
};

export const clearContent = (): void => {
  localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.CONTENT);
};

// export const saveTheme = (isDark: boolean): void => {
//   localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
// };

// export const getTheme = (): boolean => {
//   return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME) === 'dark';
// };

// export const saveThemeMode = (mode: 'system' | 'light' | 'dark'): void => {
//   localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME_MODE, mode);
// };

// export const getThemeMode = (): string | null => {
//   return localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME_MODE);
// };
