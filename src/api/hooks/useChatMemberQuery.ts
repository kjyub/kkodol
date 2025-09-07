import { useQuery } from '@tanstack/react-query';
import { getChatMembers } from '@/api/queries';

export function useChatMemberQuery() {
  return useQuery({
    queryKey: ['chatMembers'],
    queryFn: getChatMembers,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터는 fresh 상태로 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 유지,
    select: (data) =>
      data
        .filter((member) => !!member.user_name)
        .sort((a, b) => (b?.message_count ?? 0) - (a.message_count ?? 0)),
  });
}
