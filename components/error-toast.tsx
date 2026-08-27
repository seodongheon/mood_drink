'use client';

import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  onClose?: () => void;
}

export function ErrorToast({ message, onClose }: ErrorToastProps) {
  return (
    <div
      role="alert"
      className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3.5 text-xs font-medium text-destructive shadow-sm animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center gap-2.5">
        <AlertCircle size={17} className="shrink-0 text-destructive" />
        <span>{message}</span>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="rounded-lg p-1 text-destructive/70 transition-colors hover:bg-destructive/20 hover:text-destructive active:scale-95"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
