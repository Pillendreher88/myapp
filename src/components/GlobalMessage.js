import React, { useState, useEffect } from 'react';
import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { deleteGlobalMessage } from '../actions/globalMessages';


const Snack = styled(Snackbar)`
top: 180px;
`;

function GlobalMessage({ deleteGlobalMessage, message }) {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message !== undefined)
      setOpen(true);
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleExited = () => {
    deleteGlobalMessage();
  };

  return (
    <Snack
    open={open}
    autoHideDuration={3000}
      onExited={handleExited}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: "top" }}>
      <Alert onClose={handleClose} severity={message && message.severity} variant="filled" >
        {message && message.text}
      </Alert>
    </Snack>
  )
}


const mapStateToProps = (state) => ({
  message: state.globalMessages.visibleMessage
});

const mapDispatchToProps = dispatch => ({
  deleteGlobalMessage: () => dispatch(deleteGlobalMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessage);