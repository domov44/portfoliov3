import React from 'react';
import Popup from '../Popup';
import Text from '../../textual/Text';
import Stack from '../../wrapper/Stack';



const ViewProfilePicturePopup = ({ open, onClose, pseudo, picture }) => {

    return (
        <Popup open={open} onClose={onClose} title={`Photo de profil de ${pseudo}`}>
            <Stack align={"center"} direction={"column"}>
                {picture ? (
                    <img src={picture} className="big-user-picture" alt={pseudo} />
                ) : (
                    <img src="/svg/utilisateur.svg" className="big-user-picture" alt="avatar" />
                )}
            </Stack>
        </Popup>
    );
};

export default ViewProfilePicturePopup;