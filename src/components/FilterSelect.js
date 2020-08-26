import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import queryString from 'query-string';
import React from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { DropDown } from './Header/DropDownMenu';
import MultipleSelect from './Inputs/MultipleSelectFilter.js';
import PriceSlider from './Inputs/Slider';
import Switch from './Inputs/Switch.js';
import styled from 'styled-components';

const SelectControl = styled(FormControl)`
min-width: 100px;
`;

const FilterSelect = ({ filters }) => {

  const location = useLocation();
  const history = useHistory();

  const optionsSort = [
    { query: { sort: "price", order: "desc" }, label: "Highest price" },
    { query: { sort: "price", order: "asc" }, label: "Lowest price" },
    { query: { sort: "rating", order: "desc" }, label: "Highest rating" },
    { query: { sort: "rating", order: "asc" }, label: "Lowest rating" },
  ];

  const queryParams = queryString.parse(location.search);

  const sortParams = (({ sort, order }) => ({ sort, order }))(queryParams);

  const addQuery = (query) => {
    history.push({ search: queryString.stringify({ ...queryString.parse(location.search), ...query }) });
  }

  const handleChange = (event) => {
    const query = JSON.parse(event.target.value);
    addQuery(query);
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <SelectControl>
          <InputLabel>SortBy</InputLabel>
          <Select
            value={sortParams.sort ? JSON.stringify(sortParams) : ""}
            onChange={handleChange}>
            {optionsSort.map((option) =>
              <MenuItem value={JSON.stringify(option.query)} key={option.label}>{option.label}</MenuItem>
            )}
          </Select>
        </SelectControl>
      </Grid>
      <Grid item>
        <DropDown title="price" active={queryParams.priceMin !== undefined || queryParams.priceMax !== undefined}>
          {(close) => <PriceSlider
            priceRangeInit={[queryParams.priceMin ? Number(queryParams.priceMin) : 0,
            queryParams.priceMax ? Number(queryParams.priceMax) : 1000]}
            min={0}
            max={1000}
            addQuery={addQuery}
            onClick={close}
          />}
        </DropDown>
      </Grid>
      {
        filters.map(filter =>
          <Grid item key={filter.key}>
            <MultipleSelect label={filter.label}
              addQuery={addQuery}
              width="80px"
              queryKey={filter.key}
              key={filter.key}
              selectedStart={[].concat(queryParams[filter.key])}
              values={filter.values} />
          </Grid>
        )
      }
      <Grid item>
        <Switch label="only Discount"
          addQuery={addQuery}
          queryKey="discount"
          value={queryParams.discount === "true"} />
      </Grid>
    </Grid>
  );

}

export default FilterSelect;