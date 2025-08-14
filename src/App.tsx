import { useCallback, useState } from 'react';
import TiptapEditor from '@/components/TiptapEditor';
import { Toaster } from '@/components/ui/sonner';
import UpdateElectron from '@/components/update';
import { useContentPersistence } from '@/hooks/useContentPersistence';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

function App() {
  const [content, setContent] = useState('');

  // コンテンツの永続化
  useContentPersistence({ content, setContent });

  // コンテンツ変更ハンドラー
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  // コンテンツクリア
  const handleContentClear = useCallback(() => {
    setContent('');
  }, []);

  // キーボードショートカット
  useKeyboardShortcuts({
    content,
    onContentClear: handleContentClear,
  });

  return (
    <div
      className="h-screen flex flex-col dark App"
      style={{
        background: 'transparent',
      }}
    >
      <h1>Electron + Vite + React</h1>
      <TiptapEditor value={content} onChange={handleContentChange} />
      <Toaster />
      {/* <UpdateElectron /> */}
    </div>
  );
}

export default App;
