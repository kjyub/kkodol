import { createContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

export const ModalPortalContext = createContext<{
  close: () => void;
}>({
  close: () => {},
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return createPortal(children, document.body);
};

const Wrapper = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  const [isRender, setIsRender] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) {
        clearTimeout(timerRef.current as NodeJS.Timeout);
        timerRef.current = null;
      }
      setIsRender(true);
    } else {
      timerRef.current = setTimeout(() => {
        if (!timerRef.current) return;
        setIsRender(false);
      }, 200);
    }
  }, [isOpen]);

  return (
    <div className="flex-center relative flex">
      <div
        className={cn([
          'z-10 transition-all duration-200 will-change-transform [&>div]:backdrop-blur-none',
          { '-translate-y-2 opacity-0': !isOpen },
          { 'translate-y-0 opacity-100': isOpen },
        ])}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {isRender && children}
      </div>
      {isOpen && (
        <div className="absolute z-0 h-[100%] w-[100%] rounded-xl backdrop-blur-xl"></div>
      )}
    </div>
  );
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEscClose?: boolean;
  zIndex?: number;
  children: React.ReactNode;
}
export default function ModalPortal({
  isOpen,
  onClose,
  isEscClose = true,
  zIndex = 60,
  children,
}: Props) {
  useEffect(() => {
    if (isEscClose) {
      const handleEscClose = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener('keydown', handleEscClose);
      } else {
        window.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isOpen, isEscClose]);

  return (
    <ModalPortalContext.Provider
      value={{
        close: onClose,
      }}
    >
      <Layout>
        <div
          className={cn([
            'flex-center fixed inset-0 flex h-dvh w-screen',
            { 'pointer-events-none': !isOpen },
          ])}
          style={{ zIndex }}
        >
          <div
            onClick={onClose}
            className={cn([
              'absolute inset-0 z-0',
              'flex-center flex h-dvh w-screen bg-black/20',
              { 'opacity-0': !isOpen },
              'transition-all duration-200',
            ])}
          />
          <Wrapper isOpen={isOpen}>{children}</Wrapper>
        </div>
      </Layout>
    </ModalPortalContext.Provider>
  );
}
