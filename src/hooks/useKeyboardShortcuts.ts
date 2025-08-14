import { useEffect } from 'react';
import { ClipboardService } from '@/utils/clipboard';

interface UseKeyboardShortcutsProps {
  content: string;
  onContentClear: () => void;
}

export function useKeyboardShortcuts({ content, onContentClear }: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shift + Enter でクリップボードにコピー＆クリア
      if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();

        if (content.trim()) {
          ClipboardService.copyWithNotificationAndClose(content).then(() => {
            onContentClear();
          });
        }
        return;
      }

      // Cmd/Ctrl + D でテーマ切り替え
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [content, onContentClear]);
}
