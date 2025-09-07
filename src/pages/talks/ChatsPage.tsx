import TalkChat from '@/components/talk/TalkChat';

function ChatsPage() {
  return (
    <div className="talk-page">
      <div className="header">
        <h1 className="title">모든 채팅 메시지</h1>
      </div>
      <TalkChat />
    </div>
  );
}

export default ChatsPage;
