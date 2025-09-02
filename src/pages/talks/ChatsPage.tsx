import TalkChat from '@/components/talk/TalkChat';

function ChatsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">모든 채팅 메시지</h1>
      <TalkChat />
    </div>
  );
}

export default ChatsPage;
