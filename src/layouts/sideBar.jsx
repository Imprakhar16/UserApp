import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { toast } from 'react-toastify';

import CommonButton from '../components/button';
import { Toast } from '../components/toastComponent';

const SideBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("authToken");
      Toast("success","Signed out successfully")
      navigate("/")
      window.location.reload();
     
  };
  } 
  return (
    <>
      <button
        className="btn btn-primary m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
        style={{position:"absolute"}}
      >
        ☰
      </button>

      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        style={{backgroundColor:"#141414", width:"300px"}}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel" style={{color:"white"}}>
            User App
          </h5>
          <button
  type="button"
  className="btn"
  data-bs-dismiss="offcanvas"
  aria-label="Close"
  style={{ color: 'white', marginLeft:"150px" }} 
>🗙</button>

        </div>
        <div className="offcanvas-body">
          <nav className="d-flex flex-column gap-3">
            <Link
              to="/"
              className="btn btn-outline-primary w-100"
              data-bs-dismiss="offcanvas"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => navigate('/'), 300);
              }}
            >
              🏠 Home
            </Link>
            <Link
              to="/userlist"
              className="btn btn-outline-success w-100"
              data-bs-dismiss="offcanvas"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => navigate('/userlist'), 300);
              }}
            >
              📋 User List
            </Link>
            <CommonButton
              title="🚪 Sign Out"
              className="btn btn-outline-danger w-100"
              onClick={handleSignOut}
              data-bs-dismiss="offcanvas"
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
