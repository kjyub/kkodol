import { Link } from 'react-router-dom';
import { UploadProvider } from '@/components/import/DataUploader/UploadProvider';
import Button from '@/components/ui/Button';
import DataUploader from '@/components/import/DataUploader';

function ImportPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          채팅 데이터 가져오기
        </h1>
        <Link to="/">
          <Button variant="link">
            메인 페이지로
            <span className="ml-1">{`>`}</span>
          </Button>
        </Link>
      </div>

      <div className="mb-8 border-l-4 border-blue-500 bg-blue-100 p-6 dark:bg-blue-900/30">
        <h2 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200">
          카카오톡 대화 내보내기 안내
        </h2>
        <ol className="list-inside list-decimal space-y-1 text-blue-700 dark:text-blue-300">
          <li>내보낼 채팅방의 오른쪽 상단 메뉴 버튼을 클릭하세요.</li>
          <li>메뉴 하단의 '설정(톱니바퀴 아이콘)'을 선택하세요.</li>
          <li>
            '대화 내용 내보내기'를 선택한 후, '텍스트만 보내기' 옵션을
            선택하세요.
          </li>
          <li>생성된 CSV 파일을 이곳에 업로드하세요.</li>
        </ol>
      </div>

      <UploadProvider>
        <DataUploader />
      </UploadProvider>
    </div>
  );
}

export default ImportPage;
