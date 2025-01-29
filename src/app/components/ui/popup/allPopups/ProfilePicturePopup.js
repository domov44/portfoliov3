import React, { useState } from 'react';
import Popup from '../Popup';
import Text from '../../textual/Text';
import UploadFile from '../../UploadFile';
import { useUser } from '@/app/contexts/UserContext';
import Stack from '../../wrapper/Stack';
import IconButton from '../../button/IconButton';
import { confirm } from '@/app/utils/ConfirmGlobal';
import { notifyError, notifyWarning } from '../../Toastify';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { IoMdAdd } from 'react-icons/io';

const ProfilePicturePopup = ({ open, onClose, onProgressChange, onUploadStart, onUploadEnd }) => {
  const [showUploadSection, setShowUploadSection] = useState(false);
  const { user, profilePictureURL } = useUser();

  const handleDeletePicture = async () => {
    try {
      if (await confirm({
        title: "Voulez-vous vraiment supprimer votre photo de profil ?",
        content: "Votre photo sera supprimée définitivement et personne ne pourra y accéder.",
        variant: "danger"
      })) {
        notifyWarning('Bientôt disponible');
      }
    } catch (error) {
      console.error("Erreur lors de la suppression des tâches :", error);
      notifyError("Erreur lors de la suppression des tâches");
    }
  };

  const handleUpload = () => {
    setShowUploadSection(true);
  };

  const handleClose = () => {
    setShowUploadSection(false);
    onClose();
  };

  const renderProfilePicture = () => (
    <Stack align={"center"} direction={"column"}>
      {profilePictureURL ? (
        <img src={profilePictureURL} className="big-user-picture" alt={user.profile.name} />
      ) : (
        <img src="/svg/utilisateur.svg" className="big-user-picture" alt="avatar" />
      )}
      <Text>
        {profilePictureURL
          ? "Cliquez sur le bouton ci-dessous pour choisir une nouvelle photo de profil."
          : "Cliquez sur le bouton ci-dessous pour ajouter une photo de profil."
        }
      </Text>
    </Stack>
  );

  const renderActionButtons = () => (
    <Stack justify={"space-between"}>
      <IconButton variant={"action"} onClick={handleUpload}>
        {profilePictureURL ? <><CiEdit /> Changer de photo</> : <><IoMdAdd /> Ajouter une photo</>}
      </IconButton>
      {profilePictureURL && (
        <IconButton variant={"danger"} onClick={handleDeletePicture}>
          <CiTrash /> Supprimer
        </IconButton>
      )}
    </Stack>
  );

  const renderUploadSection = () => (
    <Stack direction={"column"} animationType="moveFromRight">
      <Text>Cliquez sur le bouton ci-dessous pour choisir une nouvelle photo de profil.</Text>
      <UploadFile
        onProgressChange={onProgressChange}
        onUploadStart={onUploadStart}
        onUploadEnd={onUploadEnd}
        maxSize={3 * 1048576}
        closePopup={handleClose}
        acceptedTypes="image/png, image/jpeg, image/jpg, image/PNG"
      />
      <Text size="sm">Assurez-vous que votre image est au format JPG, PNG, JPEG et qu&apos;elle ne dépasse pas la taille maximale autorisée de 3mo.</Text>
    </Stack>
  );

  return (
    <Popup open={open} onClose={handleClose} title={"Votre photo de profil"}>
      {!showUploadSection ? (
        <Stack direction={"column"}>
          {renderProfilePicture()}
          {renderActionButtons()}
        </Stack>
      ) : (
        renderUploadSection()
      )}
    </Popup>
  );
};

export default ProfilePicturePopup;