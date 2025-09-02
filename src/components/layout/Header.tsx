import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ThemeSwitch from '../theme/ThemeSwitch';

function Header() {
  return (
    <header className="bg-stone-50 p-4 dark:bg-stone-900">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-stone-900 dark:text-white"
        >
          KKODOL
        </Link>
        <div className="flex gap-2 max-md:h-10 md:h-11">
          <ThemeSwitch />
          {/* 모바일 환경에선 데이터 불러올일이 없을 것 같아서 숨긴다. */}
          <Link to="/import" className="max-md:hidden">
            <Button className="h-full">데이터 불러오기</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
