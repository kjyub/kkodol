import { Link } from 'react-router-dom';
import { useChatMembers } from '@/hooks/useChatMembers';

function MainPage() {
  const { data: chatMembers, isLoading, error } = useChatMembers();

  if (isLoading) return <div>멤버 로딩 중...</div>;
  if (error) return <div>멤버 로딩 오류: {error.message}</div>;

  return (
    <div>
      <h1>메인 페이지</h1>
      <p>채팅 내용 필터링</p>
      <Link to="/import">Import 페이지로 이동</Link>

      <h2 className="mt-8 text-xl font-bold">채팅 멤버 목록:</h2>
      {chatMembers && chatMembers.length > 0 ? (
        <ul>
          {chatMembers.map((member) => (
            <li key={member.id}>{member.nickname || member.unique_name}</li>
          ))}
        </ul>
      ) : (
        <p>채팅 멤버가 없습니다.</p>
      )}
    </div>
  );
}

export default MainPage;
