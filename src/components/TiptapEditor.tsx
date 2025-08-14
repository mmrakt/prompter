import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { all, createLowlight } from 'lowlight';
import { useEffect, useRef } from 'react';
import APP_CONFIG from '@/config/app';
import { cn } from '@/lib/utils';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (event: KeyboardEvent) => boolean;
}

export default function TiptapEditor({
  value,
  onChange,
  placeholder = APP_CONFIG.EDITOR.PLACEHOLDER,
  onKeyDown,
}: TiptapEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lowlight (highlight.js ベース) の設定
  const lowlight = createLowlight(all);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        // 標準のCodeBlockを無効化（CodeBlockLowlightを使用）
        codeBlock: false,
      }),
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'language-',
        defaultLanguage: 'plaintext',
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      onChange(text);
    },
    editorProps: {
      attributes: {
        'data-placeholder': placeholder,
      },
      handleKeyDown: (view, event) => {
        // カスタムキーハンドリング
        if (onKeyDown) {
          const handled = onKeyDown(event);
          if (handled) return true;
        }

        // Shift + Enter は親で処理（エディター内では無視）
        if (event.shiftKey && event.key === 'Enter') {
          return true;
        }

        return false;
      },
    },
    immediatelyRender: false,
  });

  // 外部からのvalue変更を反映
  useEffect(() => {
    if (editor && value !== editor.getText()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // フォーカス設定
  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editor.commands.focus();
      }, 100);
    }
  }, [editor]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'h-full w-full bg-background text-foreground overflow-auto',
        'prose prose-neutral dark:prose-invert max-w-none',
      )}
    >
      <EditorContent editor={editor} />
    </div>
  );
}
