'use client'
import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import MegaMenu from '../components/ui/aside/MegaMenu';
import Header from '../components/ui/aside/Header';
import Footer from '../components/ui/aside/Footer';

const noFooterPaths = ['/gallery', '/work'];

export default function LayoutStructure({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setMenuOpen(prev => !prev);
    };

    const noFooterPage = useMemo(() => noFooterPaths.includes(pathname), [pathname]);

    return (
        <>
            <Header toggleMenu={toggleMenu} isopen={menuOpen ? 'open' : 'close'} isAnimating={isAnimating} />
            <MegaMenu toggleMenu={toggleMenu} isopen={menuOpen ? 'open' : 'close'} isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
            {children}
            {!noFooterPage && (
                <Footer />
            )}
        </>
    );
}
