import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useTagMessageQuery } from '@/api/hooks/useTagMessageQuery';
import { cn } from '@/utils/cn';
import TalkChatLoading from '../TalkChat/Loading';
import TalkChatMessage from '../TalkChat/Message';

export default function TalkTag() {
  const [searchParams] = useSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTagMessageQuery(
    searchParams.get('date_start') ?? undefined,
    searchParams.get('date_end') ?? undefined,
    searchParams.get('member_excludes')?.split(',') ?? [],
    searchParams.get('tags')?.split(',') ?? undefined,
  );

  const observerRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(
    observerRef as React.RefObject<HTMLDivElement>,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  );

  if (isLoading) return <TalkChatLoading />;
  if (error) return <div>채팅 메시지 로딩 오류: {error.message}</div>;

  const messages = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="space-y-2">
      {isFetchingNextPage && <TalkChatLoading />}
      {messages.length > 0 ? (
        messages.map((message) => (
          <TalkChatMessage key={message.id} message={message} />
        ))
      ) : (
        <p className="text-center text-stone-500 dark:text-stone-400">
          채팅 메시지가 없습니다.
        </p>
      )}

      <div
        ref={observerRef}
        className={cn(
          'h-18 animate-pulse rounded-lg bg-stone-200/50 dark:bg-stone-800',
          !hasNextPage && 'hidden',
        )}
      />
    </div>
  );
}
