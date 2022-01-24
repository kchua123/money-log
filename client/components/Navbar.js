import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = () => (
  <div className="container topheader mt-3 mb-4">
  <div className="row justify-content-md-center">
    <div className="col justify-content-md-center">
      <h1>money.log</h1>
    </div>
  </div>
  <div className="row justify-content-md-center">
    <div className="col justify-content-md-center">
      <a href="/">HOME</a> | <a href="/monthly">MONTHLY</a>
    </div>
  </div>
</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
