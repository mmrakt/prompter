import APP_CONFIG from '@/config/app';

const ENV = {
  IS_DEV: process.env.NODE_ENV === 'development',
  VITE_DEV_SERVER_URL: process.env.VITE_DEV_SERVER_URL || APP_CONFIG.DEV.SERVER_URL,
} as const;

export default ENV;
