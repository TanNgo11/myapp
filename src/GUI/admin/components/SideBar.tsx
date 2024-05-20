import { NavLink } from 'react-router-dom';
import styles from '../css/Admin.SideBar.module.css';

const SideBar = () => {
    return (
        <aside id="sidebar" className={styles.sidebar}>
            <ul className={styles.sidebarNav} id="sidebar-nav">
                <li className={styles.navItem}>
                    <a style={{ fontSize: 16 }} className={styles.navLink} href="index.html">
                        <i className="bi bi-grid"></i>
                        <span className='ms-2' >Dashboard</span>
                    </a>
                </li>

                <li className={styles.navItem}>
                    <a style={{ fontSize: 16 }} className={`${styles.navLink} collapsed`} data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-menu-button-wide"></i>
                        <span className='ms-2'>Product Management</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="components-nav" className={`${styles.navContentCollapse} collapse`} data-bs-parent="#sidebar-nav">
                        <li style={{ padding: 10 }}>
                            <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} style={{ fontSize: 16 }} to="/admin/products" end >

                                <span className='ms-2'>All the products</span>
                            </NavLink>
                        </li>
                        <li style={{ padding: 10 }}>
                            <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} style={{ fontSize: 16 }} to="/admin/products/add">

                                <span className='ms-2'>Add new product</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li className={styles.navItem}>
                    <a style={{ fontSize: 16 }} className={`${styles.navLink} collapsed`} data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                        <span className='ms-2' >Forms</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="forms-nav" className={`${styles.navContentCollapse} collapse`} data-bs-parent="#sidebar-nav">
                        <li style={{ padding: 10 }}>
                            <a style={{ fontSize: 16 }} href="forms-validation.html">

                                <span className='ms-2' >Form Validation</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className={styles.navItem}>
                    <a style={{ fontSize: 16 }} className={`${styles.navLink} collapsed`} data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-layout-text-window-reverse"></i>
                        <span className='ms-2' >Tables</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="tables-nav" className={`${styles.navContentCollapse} collapse`} data-bs-parent="#sidebar-nav">
                        <li style={{ padding: 10 }}>
                            <a style={{ fontSize: 16 }} href="tables-data.html">

                                <span className='ms-2' >Data Tables</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className={styles.navItem}>
                    <a style={{ fontSize: 16 }} className={`${styles.navLink} collapsed`} data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-bar-chart"></i>
                        <span className='ms-2' >Charts</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="charts-nav" className={`${styles.navContentCollapse} collapse`} data-bs-parent="#sidebar-nav">
                        {/* Additional charts links can be added here */}
                    </ul>
                </li>


            </ul>
        </aside>
    );
}

export default SideBar