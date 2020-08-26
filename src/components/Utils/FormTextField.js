import React from 'react';
import {Field} from 'formik';
import TextField from '@material-ui/core/TextField';


export default function FormTextField(props) {

  const {name, ...muiProps} = props;

  return (
    <Field name={name}>
     {({field, meta}) => (
       <TextField 
        error = {meta.touched && meta.error != null}
        helperText= {meta.touched && meta.error && meta.error}
        {...field}
        {...muiProps}
       />
     )
    }
    </Field>
  )
}
