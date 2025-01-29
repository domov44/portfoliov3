'use client';
import { useState, useEffect } from 'react';
import MegaMenu from '../components/ui/aside/MegaMenu';
import Main from '../components/ui/main/Main';
import Header from '../components/ui/aside/Header';
import Footer from '../components/ui/aside/Footer';
import Transition from '../components/ui/transition/Transition';
import TransitionOverlay from '../components/ui/transition/TransitionOverlay';

export default function DefaultLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [key, setKey] = useState(0);

    const toggleMenu = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setMenuOpen(prev => !prev);
        }
    };

    useEffect(() => {
        setPageLoaded(true);
    }, [key]);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [children]);

    const MenuContent = pageLoaded ? (
        <MegaMenu 
            toggleMenu={toggleMenu} 
            isopen={menuOpen ? 'open' : 'close'} 
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
        />
    ) : null;

    return (
        <>
            <Transition />
            <TransitionOverlay />
            <Header toggleMenu={toggleMenu} isopen={menuOpen ? 'open' : 'close'} isAnimating={isAnimating} />
            {MenuContent}
            <Main>{children}</Main>
            <Footer />
        </>
    );
}
