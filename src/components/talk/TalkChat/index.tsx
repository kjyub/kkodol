import Button from '@/components/ui/Button';
import { useChatMessages } from '@/api/hooks/useChatMessageQuery';
import TalkChatMessage from './Message';
import TalkChatLoading from './Loading';
import { useSearchParams } from 'react-router-dom';

export default function TalkChat() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useChatMessages(
    searchParams.get('date_start') ?? undefined,
    searchParams.get('date_end') ?? undefined,
    searchParams.get('member_excludes')?.split(',') ?? [],
  );

  if (isLoading) return <TalkChatLoading />;
  if (error) return <div>채팅 메시지 로딩 오류: {error.message}</div>;

  const messages = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="space-y-2">
      {messages.length > 0 ? (
        messages.map((message, index) => (
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
