import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Dialog from './Dialog';
import Overlay from './Overlay';
import Stack from '../wrapper/Stack';
import Title from '../textual/Title';
import IconButton from '../button/IconButton';
import { LiaTimesSolid } from 'react-icons/lia';

function Popup({ open, onClose, children, title }) {
    const [appContainer, setAppContainer] = useState(null);

    useEffect(() => {
        setAppContainer(document.getElementById('__next'));

        if (open) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [open]);

    if (!appContainer) {
        return null;
    }

    return createPortal(
        <>
            {open && <Overlay onClick={onClose} />}
            <Dialog open={open} onCancel={onClose}>
                <Stack direction="column">
                    <Stack justify="space-between" position="relative" separator="separator" align={"center"} padding="0px 0px 13px 0px">
                        <Title level={3}>{title}</Title>
                        <Stack>
                            <IconButton
                                variant="basique"
                                onClick={onClose}
                                wtext="no"
                            >
                                <LiaTimesSolid />
                            </IconButton>
                        </Stack>
                    </Stack>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child, { onClose });
                    })}
                </Stack>
            </Dialog>
        </>,
        appContainer
    );
}

export default Popup;