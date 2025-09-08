import Button from '@/components/ui/Button';
import FilterMembers from './Members';
import { useSearchParams } from 'react-router-dom';
import FilterDates from './Date';
import FilterTags from './Tags';

export default function TalksFilter() {
  const [, setSearchParams] = useSearchParams();

  const handleFilterClear = () => {
    setSearchParams({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-9 items-center justify-between">
        <h3 className="flex items-center text-stone-700 dark:text-stone-200">
          <i className="fa-solid fa-sliders mr-2 text-base"></i>
          <span className="text-lg">필터</span>
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleFilterClear}
        >
          초기화
        </Button>
      </div>
      <FilterMembers />
      <FilterDates />
      <FilterTags />
    </div>
  );
}
