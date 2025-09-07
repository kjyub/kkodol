import { useQuery } from '@tanstack/react-query';
import { getTagCounts } from '@/api/queries';

export function useTagCountQuery() {
  return useQuery({
    queryKey: ['tagCounts'],
    queryFn: getTagCounts,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터는 fresh 상태로 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지,
    select: (data) => data.filter((tag) => !!tag.tag),
  });
}
