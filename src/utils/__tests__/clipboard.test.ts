import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ClipboardService } from '../clipboard';

// navigator.clipboard のモック
const clipboardMock = {
  writeText: vi.fn(),
};

Object.defineProperty(navigator, 'clipboard', {
  value: clipboardMock,
  writable: true,
});

// DOM要素のモック
const mockNotificationArea = {
  appendChild: vi.fn(),
} as unknown as HTMLElement;

const mockNotification = {
  style: { opacity: '' },
  parentNode: mockNotificationArea,
} as unknown as HTMLElement;

describe('ClipboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // DOM要素のモック設定
    vi.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'notification-area') return mockNotificationArea;
      return null;
    });

    vi.spyOn(document, 'createElement').mockReturnValue(mockNotification as any);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('copyText', () => {
    it('should successfully copy text to clipboard', async () => {
      clipboardMock.writeText.mockResolvedValue(undefined);

      const result = await ClipboardService.copyText('test text');

      expect(clipboardMock.writeText).toHaveBeenCalledWith('test text');
      expect(result).toBe(true);
    });

    it('should return false when copy fails', async () => {
      clipboardMock.writeText.mockRejectedValue(new Error('Copy failed'));

      const result = await ClipboardService.copyText('test text');

      expect(result).toBe(false);
    });
  });

  describe('copyWithNotification', () => {
    it('should copy text successfully', async () => {
      clipboardMock.writeText.mockResolvedValue(undefined);

      await ClipboardService.copyWithNotification('test text');

      expect(clipboardMock.writeText).toHaveBeenCalledWith('test text');
    });

    it('should handle copy failure', async () => {
      clipboardMock.writeText.mockRejectedValue(new Error('Copy failed'));

      await ClipboardService.copyWithNotification('test text');

      expect(clipboardMock.writeText).toHaveBeenCalledWith('test text');
    });
  });
});
