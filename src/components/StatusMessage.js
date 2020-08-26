import React from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import useApiStatus from '../hooks/useApiStatus';

const Container = styled.div`
margin: 10px auto;
color: ${props => props.success ? "green" : "red"};
text-align: center;
`;

export default function StatusMessage({apiKey, field}) {

  const { status, message } = useApiStatus(apiKey, false);

  return message && (status === "SUCCESS" || status === "ERROR") ?
    <Container success={status === "SUCCESS"}>
      <Typography variant="body2">
        {(status === "ERROR" && field) ? message[field] : message}
      </Typography>
    </Container> : null;
}

