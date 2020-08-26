import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function ControlledFilterSwitch({label, addQuery, queryKey, value}) {

  const handleChange = (event) => {
    addQuery({[queryKey]: event.target.checked})
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={handleChange}
            name="switch"
            color="primary"
          />
        }
        label={label}
      />
    </FormGroup>
  );
}