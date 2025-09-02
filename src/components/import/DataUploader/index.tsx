import { use } from 'react';
import { UploadContext } from './UploadProvider';
import { SelectFile } from './SelectFile';
import { Uploading } from './Uploading';
import { Complete } from './Complete';

export default function DataUploader() {
  const { step } = use(UploadContext);

  return (
    <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
      {step === 'select' && <SelectFile />}
      {step === 'uploading' && <Uploading />}
      {step === 'complete' && <Complete />}
    </div>
  );
}
