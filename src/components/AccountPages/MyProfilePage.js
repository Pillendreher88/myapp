import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import ImageUpload from './ImageUpload.js';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AutoHide from '../AutoHide.js';
import StatusMessage from '../StatusMessage.js';
import useApiStatus from '../../hooks/useApiStatus.js';
import urls from '../../urls.js';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { updateProfile, updateAvatar, resetSuccess, UPDATE_PROFILE } from '../../actions';

const MyGrid = styled(Grid)`
margin-top: 20px;
`;

const NameInput = styled(Paper)`

padding: 10px;

`;

const MyProfilePage = ({
  userName,
  updateProfile,
  updateAvatar,
  closeSuccessMessage,
  avatarUrl,
}) => {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { isLoading: isLoadingProfile, status: statusProfile } = useApiStatus("UPDATE_PROFILE");
  const { isLoading: isLoadingAvatar, setError } = useApiStatus("UPLOAD_AVATAR");

  const openForm = () => {
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  const submit = () => {
    updateProfile({ name });
  };

  return (

    <MyGrid
      container
      item
      direction="row"
      justify="center"
      spacing={2}>
      <Grid item sm={6} xs={12} >
        <ImageUpload
          imageUrl={avatarUrl ? urls.bigAvatar + avatarUrl : null}
          isLoading={isLoadingAvatar}
          maxFileSize={2000000}
          onUpload={(data) => updateAvatar(data)}
          onValidationError={(errors) => setError({ image: errors })}
        />
        <StatusMessage apiKey="UPLOAD_AVATAR" field="image" />
      </Grid>
      <Grid item sm={6} xs={12}>
        <NameInput elevation={3} >
          <Box display="flex" justifyContent="flex-start" alignItems="center" p={2}>
            <Typography variant="h4">{userName}</Typography>
            <IconButton aria-label="delete" onClick={openForm} color={"primary"} disabled={open}>
              <EditIcon />
            </IconButton>
          </Box>
          <AutoHide open={open} visibleTime={statusProfile === "SUCCESS" ? 2000 : null} onClose={closeForm} onExit={closeSuccessMessage}>
            <Formik
              initialValues={{ name: name }}
              onSubmit={submit}
            >
              <Form>
                <Box display="flex" justifyContent="space-around" alignItems="center" my={2}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={onChange}
                    disabled={isLoadingProfile}
                    required />
                  <Button onClick={closeForm} disabled={isLoadingProfile}>Cancel</Button>
                  <Button type="submit" disabled={isLoadingProfile}>Save</Button>
                </Box>
              </Form>
            </Formik>
            <StatusMessage apiKey="UPDATE_PROFILE" field="name" />
          </AutoHide>
        </NameInput>
      </Grid>
    </MyGrid>
  )
}

const mapStateToProps = (state) => ({
  avatarUrl: state.auth.user.avatar,
  userName: state.auth.user.name,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (data) => dispatch(updateProfile(data)),
  updateAvatar: (data) => dispatch(updateAvatar(data)),
  closeSuccessMessage: () => dispatch(resetSuccess(UPDATE_PROFILE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);
