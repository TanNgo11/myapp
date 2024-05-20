import React from 'react'
import { Link } from 'react-router-dom';
import style from '../css/Admin.Header.module.css'
import logo from '../logo.png'
import profileLogo from '../profile-img.jpg'

const Header = () => {

    const toggleSidebar = () => {
        document.body.classList.toggle('toggle-sidebar');
        console.log("Sidebar toggled!");
    };
    return (
        <header id="header" className={`${style.header} fixed-top d-flex align-items-center`}>
            <div className={`d-flex align-items-center justify-content-between`}>
                <Link to="/" className={`d-flex align-items-center ${style.logo}`}>
                    <img src={logo} alt="" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                </Link>
                <i className={`bi bi-list toggle-sidebar-btn ${style.toggleSidebarBtn}`} onClick={toggleSidebar}></i>
            </div>

            <div className={`${style.searchBar}`}>
                <form className={`search-form d-flex align-items-center ${style.searchForm}`} method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                    <button type="submit" title="Search" ><i className="bi bi-search"></i></button>
                </form>
            </div>

            <nav className={` ms-auto ${style.headerNav}`}>
                <ul className={`d-flex align-items-center `}>
                    <li className={` d-block d-lg-none ${style.navItem}`}>
                        <Link className={`nav-link ${style.navIcon} ${style.searchBarToggle}`} to="#">
                            <i className="bi bi-search"></i>
                        </Link>
                    </li>

                    <li className={` dropdown ${style.navItem}`}>
                        <a className={`nav-link ${style.navIcon} ${style.navLink}`} href="#" data-bs-toggle="dropdown">
                            <i style={{ fontSize: "1.5em" }} className="bi bi-bell"></i>
                            <span className="badge bg-primary badge-number">4</span>
                        </a>

                        <ul className={`dropdown-menu ${style.navLink} dropdown-menu-end dropdown-menu-arrow notifications ${style.notificationItem}`}>
                            <li className="dropdown-header">
                                You have 4 new notifications
                                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            {/* Repeated notification items would ideally be generated from an array of data */}
                        </ul>
                    </li>

                    <li className={` dropdown ${style.navItem}`}>
                        <a className={`nav-link nav-icon ${style.navLink}`} href="#" data-bs-toggle="dropdown">
                            <i style={{ fontSize: "1.5em" }} className="bi bi-chat-left-text"></i>
                            <span className="badge bg-success badge-number">3</span>
                        </a>

                        <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow  ${style.messageItem}`}>
                            <li className="dropdown-header">
                                You have 3 new messages
                                <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            {/* Repeated message items would ideally be generated from an array of data */}
                        </ul>
                    </li>

                    <li className={`nav-item dropdown pe-3 ${style.navItem}`}>
                        <a className={`nav-link nav-profile d-flex align-items-center pe-0 ${style.navProfile}`} href="#" data-bs-toggle="dropdown">
                            <img src={profileLogo} alt="Profile" className={`rounded-circle ${style.profileImage}`} />
                            <span className="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
                        </a>

                        <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${style.profileMenu}`}>
                            <li className="dropdown-header">
                                <h6>Kevin Anderson</h6>
                                <span>Web Designer</span>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <Link className={`d-flex align-items-center ${style.dropdownItem}`} to="/users-profile">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </Link>
                            </li>

                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header