import { Outlet } from 'react-router-dom';
import TalkNavigation from '../talk/TalkNavigation';
import TalksFilter from '../talk/TalksFilter';

function MainSubLayout() {
  return (
    <div className="flex gap-4">
      {/* 좌측 메인 */}
      <div className="flex max-w-full flex-1 flex-col gap-4">
        <div className="sticky top-10 z-10 pt-8">
          <TalkNavigation />
        </div>
        <main className="z-0 flex-grow">
          <Outlet />
        </main>
      </div>
      {/* 우측 필터링 */}
      <div className="sticky top-10 flex w-84 flex-col gap-4 self-start pt-8 max-md:hidden">
        <TalksFilter />
      </div>
    </div>
  );
}

export default MainSubLayout;
