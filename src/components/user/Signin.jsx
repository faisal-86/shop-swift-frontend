import React, { useState } from 'react'

export default function Signin(props) {

  const [newUser, setNewUser] = useState({})

  const handleChange = (e) => {

    const user = {...newUser};
    user[e.target.name] = e.target.value;
    console.log(user)
    setNewUser(user)
  }

  const loginHandler = (e) => {
    e.preventDefault()
    props.login(newUser)
    e.target.reset();
  }


  return (
    <div className='form-signup'>
      <h1>Sign In</h1>
      <form onSubmit={loginHandler}>
  
        <div>
          <label>Email Address</label>
          <input type='email' name='emailAddress' onChange={handleChange} className='form-control'></input>
        </div>

        <div>
          <label>Password</label>
          <input type='password' name='password' onChange={handleChange} className='form-control'></input>
        </div>

        <div>
          <input type='submit' value='Log In' className='btn btn-primary'></input>
        </div>
      </form>
    </div>
    
  )
}
