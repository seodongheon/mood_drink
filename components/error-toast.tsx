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
      className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-[#FF5A5F]/40 bg-[#1F1B11] px-5 py-4 text-xs font-medium text-[#FF5A5F] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="flex items-center gap-2.5">
        <AlertCircle size={18} className="shrink-0 text-[#FF5A5F]" />
        <span className="text-[#FDFCF9]">{message}</span>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="알림 닫기"
          className="rounded-full p-1 text-[#9C978B] transition-colors hover:bg-[#FF5A5F]/20 hover:text-[#FF5A5F] active:scale-95"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
