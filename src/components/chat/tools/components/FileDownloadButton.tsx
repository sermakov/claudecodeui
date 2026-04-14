import React from 'react';

interface FileDownloadButtonProps {
  filePath: string;
  className?: string;
}

/**
 * Download button for a file served from the local machine.
 * Uses /api/files/download?path=...&token=... so the browser
 * triggers a native Save-As dialog (including on mobile).
 */
export const FileDownloadButton: React.FC<FileDownloadButtonProps> = ({ filePath, className = '' }) => {
  const token = localStorage.getItem('auth-token') || '';
  const href = `/api/files/download?path=${encodeURIComponent(filePath)}&token=${encodeURIComponent(token)}`;
  const filename = filePath.replace(/\\/g, '/').split('/').pop() || 'file';

  return (
    <a
      href={href}
      download={filename}
      title={`Download ${filename}`}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 ${className}`}
    >
      <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {filename}
    </a>
  );
};
