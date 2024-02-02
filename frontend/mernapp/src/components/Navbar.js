import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(props) {
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('success');
    localStorage.removeItem('name');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/"><i className="fa-solid fa-house-user"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact"><i className="fa-solid fa-address-card"></i> Contact</Link>
            </li>
          </ul>

          {!localStorage.getItem('token') ? (
            <div className="d-flex">
              <Link className="btn btn-danger me-2" to="/login"><i className="fa-solid fa-user-check mx-2"></i>Login</Link>
              <Link className="btn btn-danger" to="/signup"><i className="fa-solid fa-user mx-1"></i>Signup</Link>
            </div>
          ) : (
            <div className="d-flex">
              <button className="btn btn-success" onClick={logout}><i className="fa-solid fa-user mx-1"></i>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
