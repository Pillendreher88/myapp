import React from 'react'
import { Card, CardContent, Typography, FormControlLabel, Radio, RadioGroup, Box } from '@material-ui/core'
import styled from 'styled-components';


const Title = styled(Typography)`
margin-bottom: 15px;
`;

const date = new Date();

const LabelDelivery = ({ title, date }) => {
  return <>
    <Typography variant="h6" component="span">
      {`${title}: `}
    </Typography>
    <Typography variant="body1" component="span">
      {date}
    </Typography>
    <Box ml={2} display="inline">
      <Typography variant="caption" >
        {"Estimated Arrival"}
      </Typography>
    </Box>
  </>
}

export default function Delivery({ delivery, onChange }) {

  const handleChange = (event) => {
    const type = event.target.value;
    onChange(type);
  }

  const dateStandard = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 3);
  const dateExpress = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);

  return (
    <Card>
      <CardContent>
        <Title variant="h4" component="h2">
          Delivery
      </Title>
        <RadioGroup aria-label="delivery" name="delivery" value={delivery} onChange={handleChange}>
          <FormControlLabel value="standard" control={<Radio />} label={<LabelDelivery title="Standard" date={dateStandard} />} />
          <FormControlLabel value="express" control={<Radio />} label={<LabelDelivery title="Express" date={dateExpress} />} />
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
