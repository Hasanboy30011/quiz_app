import { Input,InputGroup,InputRightElement,Button } from '@chakra-ui/react'
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons'
import React, { useState } from "react";
import "./index.css";
import Quiz from './components/Quiz'
function App() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <Input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label> 
          <InputGroup size='md'>
      <Input
      width={300}
      height={300}
       name="pass" required
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? <ViewOffIcon/> :  <ViewIcon/>}
        </Button>
      </InputRightElement>
    </InputGroup>
          
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  return (
    <>
     <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? 
        <div>
          

          
          <Quiz/>
        </div> 
        : renderForm}
      </div>
    </div>
    </>
  )
}

export default App
