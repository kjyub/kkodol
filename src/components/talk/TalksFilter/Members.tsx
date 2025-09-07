import { useChatMemberQuery } from '@/api/hooks/useChatMemberQuery';
import FilterBox from './Box';
import ChipButton from '@/components/ui/ChipButton';
import { useArrayParam } from '@/hooks/useArrayParam';

export default function FilterMembers() {
  const { data, isLoading } = useChatMemberQuery();
  const { valueSet, toggle } = useArrayParam('member_excludes');

  return (
    <FilterBox title="멤버" className="flex flex-wrap gap-1">
      {data?.map((member) => (
        <ChipButton
          key={member.user_name}
          isActive={!valueSet().has(member.user_name ?? '')}
          onClick={() => toggle(member.user_name ?? '')}
          className="px-2 py-1 text-sm"
        >
          {member.user_name}
        </ChipButton>
      ))}

      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-[30px] animate-pulse rounded-full bg-stone-200/50 dark:bg-stone-800"
          />
        ))}
    </FilterBox>
  );
}
