import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const StyledUploadButton = styled.div`
line-height: 1;
gap:5px;
  position: relative;
  display: flex;
  align-items: center;
  width: fit-content;
    color: ${props =>
        props.$variant === "action"
            ? "var(--success-color)"
            : props.$variant === "secondary-action"
                ? "var(--colored-text)"
                : props.$variant === "basique"
                    ? "var(--paragraph)"
                    : props.$variant === "danger"
                        ? "var(--error-color)"
                        : "var(--color-title)"};
  background: ${props =>
        props.$variant === "action"
            ? "var(--success-bg)"
            : props.$enable === "notactive"
                ? "none"
                : "none"};
  border:  none;
  padding: ${props =>
        props.$wtext === "yes"
            ? "10px 14px"
            : props.$wtext === "no"
                ? "10px"
                : "10px 14px"};
  font-size: 20px;
  border-radius: ${props =>
        props.$wtext === "yes"
            ? "5px"
            : props.$wtext === "no"
                ? "50%"
                : "5px"};
  filter: ${props =>
        props.$enable === "active"
            ? "none"
            : props.$enable === "notactive"
                ? "grayscale(100%);"
                : "none"};
  cursor: ${props =>
        props.$enable === "active"
            ? "pointer"
            : props.$enable === "notactive"
                ? "default"
                : "pointer"};
    opacity: ${props =>
        props.$enable === "active"
            ? "1"
            : props.$enable === "notactive"
                ? "0.5"
                : "1"};
  transition: 0.3s;

  &:hover{
    background: ${props =>
        props.$variant === "action"
            ? "var(--success-bg-darker)"
            : props.$variant === "secondary-action"
                ? "var(--nav-bg-hover)"
                : props.$variant === "basique"
                    ? "var(--nav-bg-hover)"
                    : props.$enable === "notactive"
                        ? "none"
                        : props.$variant === "danger"
                            ? "var(--error-bg)"
                            : "none"};
  }

  &:active{
    background: ${props =>
        props.$variant === "action"
            ? "var(--success-bg-darker)"
            : props.$variant === "secondary-action"
                ? "var(--nav-bg-active)"
                : props.$variant === "basique"
                    ? "var(--nav-bg-active)"
                    : props.$enable === "notactive"
                        ? "none"
                        : props.$variant === "danger"
                            ? "var(--error-bg-darker)"
                            : "none"};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const FileName = styled.div`
  margin-top: 5px;
  color: var(--color-title);
`;

const DeleteButton = styled.button`
  background-color: var(--error-bg);
  color: var(--error-color);
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
`;

const Upload = ({ name, accept, onChange, onFileDelete, variant }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onChange(event);
  };

  const handleDeleteClick = () => {
    setSelectedFile(null);
    fileInputRef.current.value = null;
    onFileDelete();
  };

  return (
    <>
      <StyledUploadButton onClick={handleClick} $variant={variant}>
        Sélectionner un fichier
      </StyledUploadButton>
      <FileInput
        type="file"
        name={name}
        accept={accept}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      {selectedFile && (
        <>
          <ImagePreview src={URL.createObjectURL(selectedFile)} alt="Preview" />
          <FileName>{selectedFile.name}</FileName>
          <DeleteButton onClick={handleDeleteClick}>Supprimer</DeleteButton>
        </>
      )}
    </>
  );
};

export default Upload;