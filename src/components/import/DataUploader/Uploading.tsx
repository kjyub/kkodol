import { use } from 'react';
import { UploadContext } from '@/components/import/DataUploader/UploadProvider';

export function Uploading() {
  const { progress } = use(UploadContext);
  const progressPercentage =
    progress.total > 0
      ? Math.round((progress.uploaded / progress.total) * 100)
      : 0;

  return (
    <div className="w-full max-w-lg space-y-4">
      <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
        업로드 중...
      </h2>
      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {`${progressPercentage}% (${progress.uploaded.toLocaleString()} / ${progress.total.toLocaleString()})`}
      </p>
    </div>
  );
}
