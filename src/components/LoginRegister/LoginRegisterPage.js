import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm.js';
import Button from '@material-ui/core/Button';

export default function LoginRegisterPage() {

  const [expanded, setExpanded] = React.useState('register');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion expanded={expanded === 'login'} onChange={handleChange('login')}>
      <AccordionSummary
          style = {{display : expanded === 'register' ? 'flex' : 'none'}}
        >
          <Button 
            color="primary" 
            variant="outlined"
            fullWidth
          >Already registered? Login</Button>
        </AccordionSummary>
        <AccordionDetails>
        <LoginForm/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'register'} onChange={handleChange('register')}>
      <AccordionSummary
          style = {{display : expanded === 'login' ? 'flex' : 'none'}}
        >
         <Button 
          color="primary" 
          variant="outlined"
          fullWidth
         > New here? Register</Button>
        </AccordionSummary>
        <AccordionDetails>
          <RegisterForm/>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
