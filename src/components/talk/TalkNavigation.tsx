import { NavLink } from 'react-router-dom';
import ChipButton from '../ui/ChipButton';

export default function TalkNavigation() {
  return (
    <nav className="flex h-9 gap-1">
      <Nav to="/">채팅 수</Nav>
      <Nav to="/chats">채팅</Nav>
    </nav>
  );
}

const Nav = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <ChipButton isActive={isActive} className="h-full">
          {children}
        </ChipButton>
      )}
    </NavLink>
  );
};
