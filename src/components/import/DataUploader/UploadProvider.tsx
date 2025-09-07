import { createContext, useCallback, useState, type ReactNode } from 'react';
import Papa from 'papaparse';
import {
  uploadChatData,
  clearChatData,
  refreshChatMembers,
  refreshChatCounts,
  refreshChatTags,
} from '@/api/queries';
import { formatNumber } from '@/utils/format';

type UploadStep = 'select' | 'uploading' | 'complete';

interface UploadProgress {
  uploaded: number;
  total: number;
}

interface UploadContextState {
  step: UploadStep;
  file: File | null;
  progress: UploadProgress;
  error: string | null;
  successMessage: string | null;
  setFile: (file: File | null) => void;
  startUpload: () => Promise<void>;
  reset: () => void;
}

export const UploadContext = createContext<UploadContextState>({
  step: 'select',
  file: null,
  progress: { uploaded: 0, total: 0 },
  error: null,
  successMessage: null,
  setFile: () => {},
  startUpload: () => Promise.resolve(),
  reset: () => {},
});

export function UploadProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<UploadStep>('select');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<UploadProgress>({
    uploaded: 0,
    total: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const reset = () => {
    setStep('select');
    setFile(null);
    setProgress({ uploaded: 0, total: 0 });
    setError(null);
    setSuccessMessage(null);
  };

  const startUpload = useCallback(async () => {
    if (!file) return;

    setStep('uploading');
    setError(null);
    setSuccessMessage(null);

    const onProgress = (uploadedCount: number, totalCount: number) => {
      setProgress({ uploaded: uploadedCount, total: totalCount });
    };

    const onComplete = async (results: Papa.ParseResult<string[]>) => {
      try {
        // 기존 데이터 제거
        await clearChatData();

        const chatData = results.data.slice(2).map((row) => ({
          date: row[0],
          user_name: row[1],
          message: row[2],
        }));

        const totalUploadedCount = await uploadChatData(chatData, onProgress);
        setSuccessMessage(
          `성공적으로 ${formatNumber(totalUploadedCount)}개의 메시지를 업로드했습니다.`,
        );

        // 채팅 멤버 새로고침
        await refreshChatMembers();

        // 채팅 카운트 새로고침
        await refreshChatCounts();

        // 채팅 태그 새로고침
        await refreshChatTags();

        setStep('complete');
      } catch (e: any) {
        console.error(e);
        setError(`업로드 중 오류가 발생했습니다: ${e.message}`);
        setStep('complete');
      }
    };

    const onError = (err: any) => {
      setError(`CSV 파싱 중 오류가 발생했습니다: ${err.message}`);
      setStep('complete');
    };

    Papa.parse<string[]>(file, {
      header: false,
      skipEmptyLines: true,
      worker: true,
      complete: onComplete,
      error: onError,
    });
  }, [file]);

  const value = {
    step,
    file,
    progress,
    error,
    successMessage,
    setFile,
    startUpload,
    reset,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
}
