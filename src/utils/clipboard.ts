import { toast } from 'sonner';
import { APP_CONFIG } from '@/config/constants';

/**
 * クリップボードサービス
 */
export class ClipboardService {
  /**
   * テキストをクリップボードにコピー
   */
  static async copyText(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('クリップボードコピーエラー:', error);
      return false;
    }
  }

  /**
   * テキストをコピーして通知表示
   */
  static async copyWithNotification(text: string): Promise<void> {
    const success = await ClipboardService.copyText(text);

    if (success) {
      toast.success('Copied to clipboard', {
        description: 'Text has been copied successfully',
        duration: 2000,
      });
    } else {
      toast.error('Copy failed', {
        description: 'Failed to copy text to clipboard',
        duration: 3000,
      });
    }
  }

  /**
   * テキストをコピーして通知表示後、ウィンドウを閉じる
   */
  static async copyWithNotificationAndClose(text: string): Promise<void> {
    const success = await ClipboardService.copyText(text);

    if (success) {
      toast.success('Copied to clipboard', {
        description: 'Text copied, window will close shortly',
        duration: 1000,
      });

      // コピー成功時のみウィンドウを閉じる
      setTimeout(() => {
        if (window.mainApi) {
          window.mainApi.send('msgHideWindow');
        }
      }, 1000); // 1秒後にウィンドウを閉じる
    } else {
      toast.error('Copy failed', {
        description: 'Failed to copy text to clipboard',
        duration: 3000,
      });
    }
  }
}
