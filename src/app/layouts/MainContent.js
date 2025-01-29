'use client';
import Transition from '../components/ui/transition/Transition';
import TransitionOverlay from '../components/ui/transition/TransitionOverlay';
import Main from '../components/ui/main/Main';
import { ReactLenis, useLenis } from 'lenis/react'

export default function MainContent({ children }) {
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    })
    return (
        <>
            <Transition />
            <TransitionOverlay />
            <ReactLenis root>
                <Main>{children}</Main>
            </ReactLenis>
        </>
    );
}
