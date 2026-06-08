import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'home' },
  { to: '/writing', label: 'writing' },
  { to: '/projects', label: 'projects' },
  { to: '/resume', label: 'resume' },
  { to: '/about', label: 'about' },
];

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 font-sans text-sm tracking-wide">
      <NavLink to="/" className="text-glow-soft hover:text-glow">
        sahas
      </NavLink>
      <ul className="flex gap-6">
        {links.slice(1).map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-glow underline underline-offset-4'
                  : 'text-glow-soft/70 hover:text-glow-soft'
              }
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
