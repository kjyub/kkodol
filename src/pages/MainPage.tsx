import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <p>채팅 내용 필터링</p>
      <Link to="/import">Import 페이지로 이동</Link>
    </div>
  );
}

export default MainPage;
