import { NavLink } from 'react-router-dom';

import { PATH, PATH_TITLE } from '@/constants/path';

const Navbar = () => {
  const menus = [
    { path: PATH.HOME, title: PATH_TITLE.HOME },
    { path: PATH.SEARCH, title: PATH_TITLE.SEARCH },
    { path: PATH.SUBSCRIPTIONS, title: PATH_TITLE.SUBSCRIPTIONS },
    { path: PATH.MYPAGE, title: PATH_TITLE.MYPAGE },
  ];
  return (
    <nav>
      <ul>
        {menus.map(({ path, title }) => (
          <li key={path}>
            <NavLink to={path}>
              <span>{title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
