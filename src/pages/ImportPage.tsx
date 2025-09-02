import { Link } from 'react-router-dom';

function ImportPage() {
  return (
    <div>
      <h1>Import 페이지</h1>
      <p>채팅 데이터 가져오기</p>
      <Link to="/">메인 페이지로 이동</Link>
    </div>
  );
}

export default ImportPage;
