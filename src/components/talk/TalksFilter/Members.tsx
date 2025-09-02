import { useChatMembers } from '@/hooks/useChatMembers';
import FilterBox from './Box';
import ChipButton from '@/components/ui/ChipButton';
import { useArrayParam } from '@/hooks/useArrayParam';

export default function FilterMembers() {
  const { data } = useChatMembers();
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
    </FilterBox>
  );
}
