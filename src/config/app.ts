const APP_CONFIG = {
  // エディター設定
  EDITOR: {
    PLACEHOLDER:
      'AIプロンプトを入力してください... (Shift+Enter でコピー＆クリア、Ctrl+\\ でウィンドウ切り替え)',
    DEBOUNCE_DELAY: 300,
    HISTORY_DEPTH: 50,
    FONT_FAMILY: 'ui-monospace, SFMono-Regular, Monaco, Consolas, monospace',
    FONT_SIZE: '14px',
    LINE_HEIGHT: '1.6',
    PADDING: '16px',
  },

  // ローカルストレージキー
  STORAGE_KEYS: {
    CONTENT: 'prompter-content',
    THEME: 'prompter-theme',
    THEME_MODE: 'prompter-theme-mode',
  },

  // テーマ設定
  THEMES: {
    LIGHT: {
      BACKGROUND: '#ffffff',
      COLOR: '#000000',
    },
    DARK: {
      BACKGROUND: '#1a1a1a',
      COLOR: '#ffffff',
    },
  },

  // ショートカットキー
  SHORTCUTS: {
    TOGGLE_APP: ['CommandOrControl+\\'],
    COPY_AND_CLEAR: { shift: true, key: 'Enter' },
    TOGGLE_THEME: { ctrlOrCmd: true, key: 'd' },
  },

  // 通知設定
  NOTIFICATION: {
    DISPLAY_DURATION: 2000,
    FADE_DURATION: 300,
    COPY_SUCCESS_MESSAGE: 'クリップボードにコピーしました',
    COPY_ERROR_MESSAGE: 'クリップボードへのコピーに失敗しました',
  },

  // ウィンドウ設定
  WINDOW: {
    DEV: {
      WIDTH: 1200,
      HEIGHT: 800,
    },
    PROD: {
      WIDTH: 800,
      HEIGHT: 600,
    },
  },

  // 開発環境設定
  DEV: {
    SERVER_URL: 'http://localhost:5173',
  },
} as const;

export default APP_CONFIG;
