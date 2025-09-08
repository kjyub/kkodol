import { NavLink, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import ChipButton from '../ui/ChipButton';
import useHasScroll from '@/hooks/useHasScroll';
import { cn } from '@/utils/cn';

export default function TalkNavigation() {
  const location = useLocation();
  const navListRef = useRef<HTMLDivElement>(null);
  const {
    edges: { left, right },
  } = useHasScroll(navListRef as React.RefObject<HTMLElement>, true);

  return (
    <nav className="flex h-9 max-w-full justify-between gap-1">
      <div className="relative flex min-w-0 overflow-hidden rounded-full">
        <div ref={navListRef} className="flex min-w-0 gap-1 overflow-x-auto">
          <Nav to="/" search={location.search}>
            채팅 수
          </Nav>
          <Nav to="/chats" search={location.search}>
            채팅
          </Nav>
          <Nav to="/tags" search={location.search}>
            태그
          </Nav>
        </div>

        <Mask isShow={left} direction="left" />
        <Mask isShow={right} direction="right" />
      </div>

      <div className="ml-2 shrink-0 md:hidden">
        <ChipButton isActive={false} className="h-full">
          필터
        </ChipButton>
      </div>
    </nav>
  );
}

const Nav = ({
  to,
  search,
  children,
}: {
  to: string;
  search: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={{
        pathname: to,
        search: search,
      }}
      end
      className="shrink-0"
    >
      {({ isActive }) => (
        <ChipButton isActive={isActive} className="h-full">
          {children}
        </ChipButton>
      )}
    </NavLink>
  );
};

const Mask = ({
  isShow,
  direction,
}: {
  isShow: boolean;
  direction: 'left' | 'right';
}) => {
  return (
    <div
      className={cn([
        'pointer-events-none absolute top-0 h-full w-8 bg-gradient-to-r from-stone-50 to-transparent dark:from-stone-900',
        'transition-opacity duration-300',
        { 'left-0 bg-gradient-to-r': direction === 'left' },
        { 'right-0 bg-gradient-to-l': direction === 'right' },
        { 'opacity-0': !isShow },
      ])}
    />
  );
};
