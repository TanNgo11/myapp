import React from 'react'
import NavBar from '../components/NavBar'
import SearchModal from '../components/SearchModal'
import HeaderCategory from '../components/HeaderCategory'
import NotFoundPage from '../page/NotFoundPage'
import Footer from '../components/Footer'
import GoToTopBtn from '../components/GoToTopBtn'
import { Outlet } from 'react-router-dom'
import { ScrollToTop } from '../../../hooks/ScrollToTop'

const MainLayout = () => {
    return (
        <>

            <ScrollToTop />
            <NavBar />
            <SearchModal />
            <HeaderCategory />
            <Outlet />
            <Footer />
            <GoToTopBtn />


        </>
    )
}

export default MainLayout