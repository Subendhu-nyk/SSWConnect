import React from "react";
//import { EduTrack } from "../../assets/EduTrack-logo.png";
import logo from "../../assets/EduTrack-logo.png";

const Header = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container">
          <div class="logo">
            <img src={logo} alt="" height={40} width={40} className="" />
          </div>
          <a className="navbar-brand fs-2 text-white" href="#">
            EduTrack
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <form className="d-flex" role="Signup"></form>
          <form className="d-flex" role="Login">
            <button
              className="btn btn-outline-success me-2 pe-5 ps-5 text-white"
              type="submit"
            >
              SignUp
            </button>
            <button className="btn btn-outline-danger text-white" type="submit">
              Login
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
