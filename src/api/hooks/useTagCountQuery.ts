import { useQuery } from '@tanstack/react-query';
import { getTagCounts } from '@/api/ky/queries';
import { useAuth } from '@/context/AuthProvider';

export function useTagCountQuery() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['tagCounts'],
    queryFn: getTagCounts,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터는 fresh 상태로 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지,
    select: (data) => data.filter((tag) => !!tag.tag),
    enabled: isAuthenticated, // 인증되었을 때만 쿼리 실행
  });
}
