import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faShip } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <aside className="h-full fixed left-0 top-0 bg-colorOne w-[150px] flex justify-center z-10">
      <nav className="pt-[15vh] flex flex-col gap-[40%]">
        <NavLink
          to="/ships"
          // className="text-center"
          className={({ isActive, isPending }) =>
            isPending ? 'pending text-center' : isActive ? 'active text-center' : ''
          }
        >
          <FontAwesomeIcon icon={faShip} className="h-[85px] hover:text-colorThree" />
        </NavLink>
        <NavLink
          to="/reservation"
          className={({ isActive, isPending }) =>
            isPending ? 'pending text-center' : isActive ? 'active text-center' : ''
          }
        >
          <FontAwesomeIcon icon={faCalendarDays} className="h-[85px] hover:text-colorThree" />
        </NavLink>
      </nav>
    </aside>
  );
};

export default NavBar;