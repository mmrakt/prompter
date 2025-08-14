import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '../debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn('test');

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should cancel previous calls when called multiple times', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn('first');
    vi.advanceTimersByTime(100);

    debouncedFn('second');
    vi.advanceTimersByTime(100);

    debouncedFn('third');
    vi.advanceTimersByTime(300);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('third');
  });

  it('should pass all arguments to the debounced function', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('arg1', 'arg2', 'arg3');
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
  });

  it('should work with different wait times', () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    const debouncedFn1 = debounce(mockFn1, 100);
    const debouncedFn2 = debounce(mockFn2, 500);

    debouncedFn1('test1');
    debouncedFn2('test2');

    vi.advanceTimersByTime(100);
    expect(mockFn1).toHaveBeenCalledWith('test1');
    expect(mockFn2).not.toHaveBeenCalled();

    vi.advanceTimersByTime(400);
    expect(mockFn2).toHaveBeenCalledWith('test2');
  });
});
