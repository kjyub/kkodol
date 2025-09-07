import { useChatCountQuery } from '@/api/hooks/useChatCountQuery';
import type { Database } from '@/types/supabase';
import { formatNumber } from '@/utils/format';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TalkCount() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const { data } = useChatCountQuery(
    searchParams.get('date_start') ?? undefined,
    searchParams.get('date_end') ?? undefined,
    searchParams.get('member_excludes')?.split(',') ?? [],
  );
  const maxCount = useMemo(
    () =>
      Math.max(...(data?.map((member) => member.message_count ?? 0) ?? [0])),
    [data],
  );

  return (
    <div className="flex flex-col divide-y divide-stone-200 dark:divide-stone-700">
      {data?.map((member) => (
        <Item key={member.user_name} member={member} maxCount={maxCount} />
      ))}
    </div>
  );
}

const Item = ({
  member,
  maxCount,
}: {
  member: Database['public']['Functions']['get_user_message_counts']['Returns'][number];
  maxCount: number;
}) => {
  const count = useMemo(
    () => member.message_count ?? 0,
    [member.message_count],
  );

  return (
    <div className="flex flex-col gap-1 p-3">
      <div className="flex items-center justify-between">
        <span className="font-medium text-stone-900 dark:text-stone-100">
          {member.user_name}
        </span>
        <span className="font-light text-stone-700 dark:text-stone-300">
          {formatNumber(count)}
        </span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-purple-500" />
        <div
          className="absolute inset-y-0 right-0 z-10 bg-stone-200 dark:bg-stone-700"
          style={{ width: `${((maxCount - count) / maxCount) * 100}%` }}
        />
      </div>
    </div>
  );
};
