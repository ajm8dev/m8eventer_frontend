import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';
import config from '../../config.json'

const Headerbar = () => {
  const auth = localStorage.getItem('token');
  const role = localStorage.getItem('role')

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    if (auth == null) {
      navigate('/');
    }

    if (role == "STAFF") {
      navigate(localStorage.getItem('staff_def_route'))
    }

  }, [])

  const logoutfun = () => {
    var answer = window.confirm("Confirm Logout?");
    if (answer) {
      localStorage.clear();
      navigate('/')
    }
  }

  return (
    <>
      {/* <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl mt-3" id="navbarBlur" data-scroll="false" style={{background: '#00c4ff'}}>
        <div class="container-fluid py-1 px-3">

          <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div class="ms-md-auto pe-md-3">
            </div>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a href="javascript:void(0);" onClick={logout} class="nav-link text-white font-weight-bold px-0">
                  <i class="fa fa-sign-out me-sm-1"></i>
                  <span class="d-sm-inline d-none">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      {/* <div class="row">
        <div class="col-xl-10">

        </div>
        <div class="col-xl-2" style={{ textAlign: 'right', paddingRight: '37px' }}>
          <button type="button" class="btn btn-primary  mb-0" onClick={logoutfun}>Logout</button>
        </div>
      </div> */}
    </>
  )
}

export default Headerbar;