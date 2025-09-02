import { use, useCallback, useState } from 'react';
import { UploadContext } from '@/components/import/DataUploader/UploadProvider';
import Button from '@/components/ui/Button';

export function SelectFile() {
  const { file, setFile, startUpload } = use(UploadContext);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile.type === 'text/csv') {
          setFile(droppedFile);
        } else {
          // Optionally handle non-CSV file error in context
          alert('CSV 파일만 업로드할 수 있습니다.');
        }
      }
    },
    [setFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  return (
    <div className="w-full max-w-lg space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 dark:border-gray-600'} ${
          file
            ? 'bg-green-50 dark:bg-green-900/20'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer text-center">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">여기를 클릭하여 파일을 선택</span>
            하거나 드래그 앤 드롭하세요.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            CSV 파일만 가능
          </p>
          {file && (
            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              선택된 파일: {file.name}
            </p>
          )}
        </label>
      </div>
      <Button onClick={startUpload} disabled={!file} className="w-full">
        업로드
      </Button>
    </div>
  );
}
