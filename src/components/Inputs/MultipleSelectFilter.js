import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

const MySelect = styled(Select)`

& .MuiSelect-select {
  max-width: 132px;
}
`;

const FormCtrl = styled(FormControl)`
min-width: ${props => props.width};
`;

export default function MultipleSelectFilter({label, width, addQuery, queryKey, selectedStart, values = []}) {


  const [selected,setSelected] = useState(selectedStart.length > 0 ? selectedStart: ["0"]);


  const handleClick = () => {

    if(selected[0] !=="0"){
    addQuery({[queryKey]: selected});
    }
    else {
    addQuery({[queryKey]: null});
    }
  }

  const handleChange = (event, child) => {

    if(child.props.value === "0")
    {
      setSelected(["0"]); 
    }
    else if (event.target.value[0] === "0"){
      event.target.value.shift();
      setSelected(event.target.value); 
    }
    else {
      setSelected(event.target.value); 
    }

  };

  const renderValue = (selected) => {

    if (selected[0] === "0") 
      return "Show All";

    return  values.filter(value => selected.indexOf(value.key) > -1
    ).map(item => item.label).join(", ");

  }
  
  return (
     <FormCtrl width = {width}>
      <InputLabel id="rating" >{label}</InputLabel>
      <MySelect
    value={selected}
    labelId = "rating"
    multiple
    renderValue = {renderValue}
    onClose = {handleClick}
    onChange = {handleChange}> 
      <MenuItem value="0">
        <Checkbox checked={selected.indexOf("0") > -1  } />
        <ListItemText primary="Show All" />
      </MenuItem>
      {values.map((value) => 
          <MenuItem value={value.key} key={value.label}>
            <Checkbox checked={selected.indexOf(value.key) > -1 } />
            <ListItemText primary={value.label} />
          </MenuItem>
      )}
      </MySelect>
    </FormCtrl>
  );
}
