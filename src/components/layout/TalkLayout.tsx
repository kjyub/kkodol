import { Outlet } from 'react-router-dom';
import TalkNavigation from '../talk/TalkNavigation';
import TalksFilter from '../talk/TalksFilter';

function MainSubLayout() {
  return (
    <div className="flex gap-4">
      {/* 좌측 메인 */}
      <div className="flex flex-1 flex-col gap-4">
        <TalkNavigation />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
      {/* 우측 필터링 */}
      <div className="flex w-84 flex-col gap-4 max-md:hidden">
        <TalksFilter />
      </div>
    </div>
  );
}

export default MainSubLayout;
