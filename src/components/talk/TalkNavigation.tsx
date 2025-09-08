import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ChipButton from '../ui/ChipButton';
import useHasScroll from '@/hooks/useHasScroll';
import { cn } from '@/utils/cn';
import TalksFilter from './TalksFilter';
import useDetectClose from '@/hooks/useDetectClose';

export default function TalkNavigation() {
  const location = useLocation();
  const navListRef = useRef<HTMLDivElement>(null);
  const {
    edges: { left, right },
  } = useHasScroll(navListRef as React.RefObject<HTMLElement>, true);

  const mobileFilterRef = useRef<HTMLDivElement>(null);
  const { isOpen: isMobileFilterOpen, setIsOpen: setIsMobileFilterOpen } =
    useDetectClose(mobileFilterRef as React.RefObject<HTMLElement>);

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

      <div ref={mobileFilterRef} className="ml-2 shrink-0 md:hidden">
        <ChipButton
          isActive={isMobileFilterOpen}
          className="relative h-full"
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          필터
          <FilterCount />
        </ChipButton>
        <MobileFilterWrapper isOpen={isMobileFilterOpen}>
          <TalksFilter />
        </MobileFilterWrapper>
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

const MobileFilterWrapper = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn([
        'absolute inset-x-0 top-[calc(100%+0.5rem)] h-[calc(100dvh-8rem)] overflow-hidden',
        { 'pointer-events-none': !isOpen },
      ])}
    >
      <div
        className={cn([
          'absolute inset-0 overflow-y-auto rounded-xl border border-stone-400 bg-stone-50 p-3 drop-shadow-xl dark:border-stone-600 dark:bg-stone-900',
          'transition-transform duration-300',
          { 'translate-x-[calc(100%+1rem)]': !isOpen },
        ])}
      >
        {children}
      </div>
    </div>
  );
};

const FilterCount = () => {
  const [searchParams] = useSearchParams();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const keys = searchParams.keys();
    let count = 0;
    for (const key of keys) {
      const value = searchParams.get(key);
      const values = value?.split(',');
      if (values) {
        count += values.length;
      }
    }
    setCount(count);
  }, [searchParams]);

  if (!count) return null;

  return (
    <div className="flex-center absolute -top-4 -right-4 flex size-7 rounded-full bg-lime-600 text-xs text-white">
      <span>{count}</span>
    </div>
  );
};
