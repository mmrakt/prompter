import { useCallback, useEffect } from 'react';
import APP_CONFIG from '@/config/app';
import { debounce } from '@/utils/debounce';
import { getContent, saveContent } from '@/utils/storage';

interface UseContentPersistenceProps {
  content: string;
  setContent: (content: string) => void;
}

export function useContentPersistence({ content, setContent }: UseContentPersistenceProps) {
  // 初期化時にlocalStorageから復元
  useEffect(() => {
    const savedContent = getContent();
    if (savedContent) {
      setContent(savedContent);
    }
  }, [setContent]);

  // デバウンス付きの保存関数
  const debouncedSave = useCallback(
    debounce((value: string) => {
      saveContent(value);
    }, APP_CONFIG.EDITOR.DEBOUNCE_DELAY),
    [],
  );

  // コンテンツ変更時の自動保存
  useEffect(() => {
    if (content) {
      debouncedSave(content);
    }
  }, [content, debouncedSave]);
}
