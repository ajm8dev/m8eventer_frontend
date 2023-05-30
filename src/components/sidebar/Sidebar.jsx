import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useState } from "react";

const Sidebar = () => {

    const [activeLink, setActiveLink] = useState("");

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };


    return (
        <aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">

            <div class="sidenav-header">
                <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>

                <Link class="navbar-brand m-0" to="/">
                    {/* <img src="../assets/img/jewelar.png" class="navbar-brand-img h-100" alt="main_logo" /> &nbsp;&nbsp;&nbsp; */}
                    <span class="ms-1 font-weight-bold">M8 Event Management</span>
                </Link>
            </div>
            <hr class="horizontal dark mt-0"></hr>
            <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/dashboard">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-th-large text-warning text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">Dashboard</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/event">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-solid fa-users text-warning text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">User Management</span>
                        </Link>
                    </li>


                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/event">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-calendar-day text-warning text-sm opacity-10"></i>

                            </div>
                            <span class="nav-link-text ms-1">Event Management</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/master">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-solid fa-mug-hot text-warning text-sm opacity-10"></i>

                                {/* <i class="fas fa-regular fa-egg text-warning text-sm opacity-10"></i> */}
                            </div>
                            <span class="nav-link-text ms-1">Complimentary Master</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/event/event-type">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-dice-three text-warning text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">Event Type Master</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/event/event-type">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-tools text-warning text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">Settings</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/event/event-type">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-walking text-warning text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">Visitor Management</span>
                        </Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link m-0" to="/event/event-type">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-sign-out-alt text-warning text-sm opacity-10" style={{transform: 'rotate(180deg)'}}></i>
                            </div>
                            <span class="nav-link-text ms-1">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;