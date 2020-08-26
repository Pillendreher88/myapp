import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PublishIcon from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Loading from '../Loading/LoadingWrapper.js';
import { Typography } from '@material-ui/core';


const InputImage = styled.input`
display: none;
`;

const AvatarStyled = styled(Avatar)`
  width: 300px;
  height: 300px;
  cursor: pointer;
  position: relative;
  border: 5px solid black;

`;

const Container = styled.div`
  position: relative;
  display: inline-flex;
  margin-bottom: 10px;
`;
const CenterIcon = styled.div`
  cursor:pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const StatusMessage = styled.div
  `
margin: 10px auto;
color: ${props => props.success ? "green" : "red"};
text-align: center;
`;

export default function ImageUpload({ 
  imageUrl,
  onUpload, 
  isLoading, 
  onValidationError,
  maxFileSize = 1242880,
  errors, 
  accept = "image/*" 
  }) {

  const [file, setFile] = useState();
  const inputEl = useRef(null);

  useEffect(() => {
    
    if(file != null) {
      const formData = new FormData();
      formData.append("image", file, file.name);
      onUpload(formData);
      setFile(null);
    }
  }, [file])

  const fileSelectHandler = (event) => {

    const fileToUpload = event.target.files[0];

    if(validateFile(fileToUpload)) {
      setFile(fileToUpload);
    }
  };

  const  validateFile = (file) => {

    let errors = [];
     if(file.size > maxFileSize) {
      errors.push("The filesize is too large. max=" + maxFileSize);
    }  
    if(file.type.indexOf("image") === -1) {
      errors.push("The file needs to be an image.");
    }

    if(errors.length > 0) {
      onValidationError(errors);
      return false;
    }
    return true;
  }

  const fileUploadHandler = () => {
    inputEl.current.click();
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <InputImage
        type="file"
        onChange={fileSelectHandler}
        ref={inputEl}
        accept={accept} />
      <Loading loading = {isLoading}>
      <Container onClick={fileUploadHandler}>
        <AvatarStyled alt="" src={imageUrl} />
        <CenterIcon>
          <AddAPhotoIcon color="secondary" fontSize="large" />
        </CenterIcon>
      </Container>
      </Loading>
      <Button
        variant="contained"
        color="primary"
        onClick={fileUploadHandler}
        startIcon={<PublishIcon />}
      >
        Upload
      </Button>
      {errors && errors.data &&
        <StatusMessage success={false}>
          <Typography variant="body2"> {errors.data}</Typography>
        </StatusMessage>
      }
    </Box>
  )
}


