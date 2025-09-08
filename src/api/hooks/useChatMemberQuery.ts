import { useQuery } from '@tanstack/react-query';
import { getChatMembers } from '@/api/ky/queries';
import { useAuth } from '@/context/AuthProvider';

export function useChatMemberQuery() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['chatMembers'],
    queryFn: getChatMembers,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터는 fresh 상태로 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지,
    select: (data) =>
      data
        .filter((member) => !!member.user_name)
        .sort((a, b) => (b?.message_count ?? 0) - (a.message_count ?? 0)),
    enabled: isAuthenticated, // 인증되었을 때만 쿼리 실행
  });
}
