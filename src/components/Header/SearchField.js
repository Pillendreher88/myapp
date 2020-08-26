import React, { useEffect, useState } from 'react'
import SearchIco from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const SearchContainer = styled.div`
display: flex;
align-items: center;
transition: width 2s linear;
padding: 0 8px;
padding-right: 32px;
position: relative;
`;

const Search = styled(Autocomplete)`
margin-right: 10px;
background-color: rgba(255, 255, 255, 0.15);
border-radius: 6px;

{
  flex-grow: ${props => props.inputValue !== "" ? 1 : 0};
  transition: flex-grow 0.2s linear;

}
&.Mui-focused {
  flex-grow: 1;
  border: 2px solid black;
  background-color: azure;
}
`;

const Circular = styled(CircularProgress)`
  position: absolute;
  right: 0;
`;

const SearchIcon = styled(SearchIco)`
  position: absolute;
  right: 0;
  .Mui-focused &{
    fill: black;
  }
`;

export default function SearchField({
  suggestions,
  deleteSuggestions,
  fetchSuggestions,
  isLoading,
  onChange_
}) {

  const history = useHistory();
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [popUpOpen, setPopUpOpen] = useState(false);


  /* Debouncing of ApiRequests in useEffect  
     Cleanup function provides way to cancel attempt */
  useEffect(() => {
    console.log("effect");
    const timer = setTimeout(() => {
      if (inputValue.length > 1) {
        fetchSuggestions({ term: inputValue })
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, fetchSuggestions]);


  const onChange = (event, newValue, reason) => {

    setValue(newValue);

    if (reason === "create-option") {
      history.push(`/search/?=${newValue}`);
    }
    else if (reason === "select-option") {
      history.push(`/product/${newValue.slug}`);
      deleteSuggestions();

      if (onChange_) {
        onChange_();
      }
    }
  }

  const onInputChange = (event, newValue) => {

    setInputValue(newValue);

    if (newValue === "") {
      deleteSuggestions();
    }
  }

  const onOpen = () => {
      setPopUpOpen(true);
  }

  const onClose = () => {
    setPopUpOpen(false);
  }

return <Search
  options={suggestions}
  value={value}
  onChange={onChange}
  onOpen={onOpen}
  onClose={onClose}
  open = {popUpOpen && (inputValue.length > 1)}
  clearOnBlur={false}
  onInputChange={onInputChange}
  getOptionLabel={(option) => { return typeof option === 'string' ? option : option.name }}
  inputValue={inputValue}
  noOptionsText="No Product found"
  renderInput={(params) => {
    return <SearchContainer ref={params.InputProps.ref} >
      <InputBase type="text" {...params.inputProps} placeholder="Search Product by name" />
      {isLoading ? <Circular size="1.1em" color="inherit" /> : <SearchIcon />}
    </SearchContainer>
  }}
  renderOption={(option) => <ListItemText primary={option.name} />}

/>
}

