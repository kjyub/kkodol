import { UploadContext } from '@/components/import/DataUploader/UploadProvider';
import Button from '@/components/ui/Button';
import { use } from 'react';
import { Link } from 'react-router-dom';

export function Complete() {
  const { successMessage, error } = use(UploadContext);

  return (
    <div className="w-full max-w-lg space-y-6 text-center">
      {successMessage && (
        <div>
          <h2 className="text-2xl font-bold text-green-600">업로드 완료</h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            {successMessage}
          </p>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl font-bold text-red-600">오류 발생</h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            {error}
          </p>
        </div>
      )}
      <Link to="/">
        <Button className="w-full">메인 페이지로 이동</Button>
      </Link>
    </div>
  );
}
