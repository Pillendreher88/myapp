import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import RatingInput from '../Rating';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Formik, Form } from 'formik';
import TextField from '../Utils/FormTextField.js';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { editReview, createReview } from '../../actions';
import useApiStatus from '../../hooks/useApiStatus';
import { DialogContent } from '@material-ui/core';

const Image = styled.img
  `
max-width: 100%;
height: auto;
margin-right: 10px;
`;

const LoadingButton = styled(Button)`

&.Mui-disabled {
  background-color:  ${props => props.isSuccess ? green[500] : null}
  color: ${props => props.isSuccess ? "#fff" : null}
}
`;

const TitleInput = styled(TextField)
  `
font-size: 0.875rem;
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
font-weight: 500;
line-height: 1.57;
letter-spacing: 0.00714em;
}
`;

function ReviewForm(props) {

  const { onClose, open, product, initialValues, editReview, createReview } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, status, resetError, message} = useApiStatus("SUBMIT_REVIEW");


  const validate = (values) => {
    const errors = {};
    if (!values.rating) {
      errors.rating = 'Give the product a star rating';
    }
    return errors;
  };

  const handleClose = () => {
    resetError();
    onClose();
  };

  const handleSubmit = (values) => {
    if (initialValues) {
      editReview(initialValues.id, values);
    }
    else {
      createReview(product.id, values);
    }
  }

  return (

    <Dialog onClose={onClose} open={open} fullWidth fullScreen={fullScreen}>
      <Formik
        initialValues={initialValues ? initialValues : { title: '', comment: '', rating: 0 }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ isSubmitting, setFieldValue, values, errors, touched }) =>
          <Form>

            <DialogTitle>
              <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                How do you rate this product?
                <IconButton onClick={() => handleClose()}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box mb={2} display="flex">
                <Box px={1} mb={2} width="50%" flexGrow="1" maxWidth="200px">
                  <Image src={product.imageUrls} />
                </Box>
                <Box display="inline-flex" flexDirection="column" alignItems="center" justifyContent="space-around" >
                  <Typography variant="subtitle2" component="span" >
                    {product.name}
                  </Typography>
                  <Tooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    open={errors.rating && touched.rating ? true : false}
                    disableFocusListener
                    disableHoverListener
                    arrow
                    placement="right"
                    disableTouchListener
                    title={errors.rating ? errors.rating : ""}
                  >
                    <div>
                      <RatingInput onChange={(i) => { setFieldValue("rating", i); }} rating={values.rating} input />
                    </div>
                  </Tooltip>
                </Box>
              </Box>
              <Box mb={1}>
                <TitleInput

                  placeholder="Your review title"
                  rows={1}
                  variant="outlined"
                  fullWidth
                  name="title"
                />
                <TextField
                  name="comment"
                  placeholder="Your review text"
                  multiline
                  rows={6}
                  variant="outlined"
                  fullWidth
                  required />
              </Box>
              <LoadingButton
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                disabled={isLoading || (status === "SUCCESS")}
                isSuccess={(status === "SUCCESS")}
              >
                {isLoading && <CircularProgress size={24} color="secondary" />}
                {status === "SUCCESS" && <CheckIcon />}
                {status === "SUCCESS" ? message : "Submit your review"}
              
              </LoadingButton>
            </DialogContent>
          </Form>
        }
      </Formik>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
        editReview: (id, data) => dispatch(editReview(id, data)),
  createReview: (productId, data) => dispatch(createReview(productId, data)),
});


export default connect(null, mapDispatchToProps)(ReviewForm); 