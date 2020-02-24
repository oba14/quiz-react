import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  return (
    <>
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <div style={ { display:'flex', flexFlow: 'row wrap' } }>
          <NavLink exact activeClassName="active"
            to="/"
           
            className=" col s5 black-text">
              Home
          </NavLink>

          <NavLink exact activeClassName="active"
            to="/quiz"
              
            className="col s5 black-text">
              Quiz
          </NavLink>

          <NavLink exact activeClassName="active"
            to="/aboutus"
              
            className="col s5 center black-text">
              About
          </NavLink>

          <NavLink exact activeClassName="active"
            to="/contact"
              
            className="col s5 center black-text">
              Contact
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
