import { useInfiniteQuery } from '@tanstack/react-query';
import { getKkotalkChatMessages } from '@/api/queries';

const PAGE_SIZE = 50; // queries.ts와 동일하게 유지

export function useKkotalkChatMessages() {
  return useInfiniteQuery({
    queryKey: ['kkotalkChatMessages'],
    queryFn: ({ pageParam }) => getKkotalkChatMessages({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: 1000 * 60 * 1, // 1분 동안 fresh
    gcTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
}
