import { useState, type FormEvent, type ReactNode } from 'react';
import { useAuth } from '@/context/AuthProvider';
import ModalPortal from '../common/ModalPortal';

const PasswordPrompt = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-8 shadow-md dark:bg-stone-800"
    >
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-stone-600">Q.</span>
        <span className="flex-1 text-left text-xl font-bold text-stone-800">
          꼬톡의 뜻은?
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-stone-600">A.</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md bg-stone-100 px-3 py-2 text-lg focus:bg-stone-200 dark:bg-stone-700 dark:text-white dark:focus:bg-stone-600"
          placeholder="비밀번호"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-lime-500 py-2 text-white transition-colors hover:bg-lime-600"
      >
        입장
      </button>
      {error && <p className="text-center text-red-500">{error}</p>}
    </form>
  );
};

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { authState } = useAuth();

  return (
    <>
      {children}
      <ModalPortal isOpen={authState === 'unauthenticated'} onClose={() => {}}>
        <PasswordPrompt />
      </ModalPortal>
    </>
  );
};
