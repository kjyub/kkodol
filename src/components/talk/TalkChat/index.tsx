import Button from '@/components/ui/Button';
import { useKkotalkChatMessages } from '@/hooks/useKkotalkChatMessages';
import TalkChatMessage from './Message';
import TalkChatLoading from './Loading';

export default function TalkChat() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useKkotalkChatMessages();

  if (isLoading) return <TalkChatLoading />;
  if (error) return <div>채팅 메시지 로딩 오류: {error.message}</div>;

  const allMessages = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="space-y-2">
      {allMessages.length > 0 ? (
        allMessages.map((message, index) => (
          <TalkChatMessage key={message.id || index} message={message} />
        ))
      ) : (
        <p className="text-center text-stone-500 dark:text-stone-400">
          채팅 메시지가 없습니다.
        </p>
      )}

      {hasNextPage && (
        <div className="mt-6 text-center">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? '로딩 중...' : '더 불러오기'}
          </Button>
        </div>
      )}
    </div>
  );
}
