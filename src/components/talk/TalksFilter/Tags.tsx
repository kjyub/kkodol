import FilterBox from './Box';
import { useArrayParam } from '@/hooks/useArrayParam';
import { useTagCountQuery } from '@/api/hooks/useTagCountQuery';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { formatNumber } from '@/utils/format';

export default function FilterTags() {
  const { pathname } = useLocation();
  const [isTagsRoute, setIsTagsRoute] = useState(false);

  const { data, isLoading } = useTagCountQuery();
  const { valueSet, toggle, clear } = useArrayParam('tags');

  useEffect(() => {
    setIsTagsRoute(!!matchPath({ path: '/tags' }, pathname));
  }, [pathname]);

  useEffect(() => {
    if (!isTagsRoute) clear();
  }, [isTagsRoute]);

  if (!isTagsRoute) return null;

  return (
    <FilterBox title="태그" className="grid grid-cols-2 gap-1">
      {data?.map((member) => (
        <Tag
          key={member.tag}
          tag={member.tag}
          count={member.tag_count}
          isActive={valueSet().has(member.tag ?? '')}
          onClick={() => toggle(member.tag ?? '')}
        />
      ))}
      {isLoading &&
        Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="h-[26px] animate-pulse rounded-lg bg-stone-200/50 dark:bg-stone-800"
          />
        ))}
    </FilterBox>
  );
}

const Tag = ({
  tag,
  count,
  isActive,
  onClick,
}: {
  tag: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn([
        'flex items-center justify-between gap-1 rounded-lg border px-2 py-0.5 transition-colors',
        'text-sm',
        {
          'border-stone-700 bg-stone-700 text-white hover:bg-stone-800 dark:border-stone-400 dark:bg-stone-400 dark:text-black dark:hover:bg-stone-300':
            isActive,
        },
        {
          'border-stone-300 bg-white text-stone-600 hover:bg-stone-200 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-600':
            !isActive,
        },
      ])}
      onClick={onClick}
      title={tag}
    >
      <span className="truncate font-medium">{tag}</span>
      <span>{formatNumber(count)}</span>
    </button>
  );
};
