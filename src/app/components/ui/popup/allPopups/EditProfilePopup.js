import React, { useState, useEffect } from 'react';
import Popup from '../Popup';
import Text from '../../textual/Text';
import Stack from '../../wrapper/Stack';
import Button from '../../button/Button';
import TextInput from '../../form/TextInput';
import { useUser } from '@/app/contexts/UserContext';
import { notifyError, notifySuccess } from "@/components/ui/Toastify";
import { updateProfile } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import Textarea from '../../form/Textarea';
import DateInput from '../../form/DateInput';

const client = generateClient();

const EditProfilePopup = ({ open, onClose }) => {
    const [disable, setDisable] = useState(false);
    const { user, refreshUser } = useUser();
    const [formData, setFormData] = useState({
        name: user?.profile.name || "",
        surname: user?.profile.surname || "",
        description: user?.profile.description || "",
        birthdate: user?.profile.birthdate || ""
    });

    useEffect(() => {
        setFormData({
            name: user?.profile.name || "",
            surname: user?.profile.surname || "",
            description: user?.profile.description || "",
            birthdate: user?.profile.birthdate || ""
        });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        setDisable(true);
        try {
            await client.graphql({
                query: updateProfile,
                variables: {
                    input: {
                        id: user.profile.id,
                        name: formData.name,
                        surname: formData.surname,
                        description: formData.description,
                        birthdate: formData.birthdate,
                        owner: user.profile.id,
                    }
                }
            })
            refreshUser();
            onClose();
            setDisable(false);
            notifySuccess("Profil mis à jour");
        } catch (error) {
            setDisable(false);
            notifyError("Erreur lors de la mise à jour");
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };

    return (
        <Popup open={open} onClose={onClose} title={"Mettez à jour vos informations personnelles"}>
            <Stack direction={"column"} spacing={"15px"}>
                <Stack direction={"column"}>
                    <TextInput
                        type="text"
                        label={"Prénom"}
                        value={formData.name}
                        name={"name"}
                        onChange={handleInputChange}
                        required
                        variant={"blue"}
                    />
                    <TextInput
                        type="text"
                        label={"Nom"}
                        value={formData.surname}
                        name={"surname"}
                        onChange={handleInputChange}
                        required
                        variant={"blue"}
                    />
                    <Textarea
                        maxLength={250}
                        label={"Description"}
                        name={"description"}
                        value={formData.description}
                        onChange={handleInputChange}
                        variant={"blue"}
                    />
                    <DateInput
                        type="text"
                        label={"Date de naissance"}
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        variant="blue"
                    />
                </Stack>
                <Button disable={disable} onClick={handleSubmit} width="full-width" variant={"primary"}>
                    Mettre à jour
                </Button>
            </Stack>
        </Popup>
    );
};

export default EditProfilePopup;