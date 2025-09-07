import TalkCount from '@/components/talk/TalkCount';

function CountPage() {
  return (
    <div className="talk-page">
      <div className="header">
        <h1 className="title">채팅 수</h1>
        <p className="description">각 멤버 별 채팅 수를 표시합니다.</p>
      </div>
      <TalkCount />
    </div>
  );
}

export default CountPage;
