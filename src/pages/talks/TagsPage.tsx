import TalkTag from '@/components/talk/TalkTag';

function TagsPage() {
  return (
    <div className="talk-page">
      <div className="header">
        <h1 className="title">태그 메시지</h1>
      </div>
      <TalkTag />
    </div>
  );
}

export default TagsPage;
