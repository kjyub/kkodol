import TalkCount from '@/components/talk/TalkCount';

function CountPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">채팅 수</h1>
      <p className="text-base text-stone-500 dark:text-stone-400">
        각 멤버 별 채팅 수를 표시합니다.
      </p>
      <TalkCount />
    </div>
  );
}

export default CountPage;
