import React from 'react';
import { Link } from 'react-router-dom'
import routes from '../../routes'

function Nav() {
  const links = routes.filter(route => route.excludeFromNav !== true).map((route,i) => <Link key={i} className="p-2 text-dark" to={route.url}>{route.title}</Link>)

  return (
    <nav className="Nav">
        {links}
    </nav>
  );
}

export default Nav;
