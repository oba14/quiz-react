import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

const Navbar = () => {
  const auth = useSelector(state => state.auth)

    return (
      <>
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
          <div >
            <NavLink exact activeClassName="active"
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className=" col s5 black-text">
              Home
            </NavLink>

            <NavLink exact activeClassName="active"
              to="/quiz"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 black-text">
              Quiz
            </NavLink>

            <NavLink exact activeClassName="active"
              to="/aboutus"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 center black-text">
              About Us
            </NavLink>

            <NavLink exact activeClassName="active"
              to="/contact"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 center black-text">
              Contact
            </NavLink>
          </div>
        </nav>
      </>
    );
}

export default Navbar;
