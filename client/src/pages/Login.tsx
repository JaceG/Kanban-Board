import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import { log } from "tone/build/esm/core/util/Debug";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const showErrors = (name: string, value: string) => {
    let isValid = true;

    if (value.trim() === '') {
      isValid = false;
      setErrors((prev) => ({
        ...prev,
        [name]: `${name} is required`
      }));
    }
    else {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
    return isValid;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    showErrors(name, value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const isValidResults = Object.keys(loginData).filter(key => {
        return !showErrors(key, loginData[key as keyof typeof loginData]);
      })

      if (isValidResults.length > 0) {
        return;
      }

      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* {JSON.stringify(loginData)}
        {JSON.stringify(errors)}*/}
        <label >Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
        />
        {errors.username && <p className='error'>{errors.username}</p>}
      <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
        />
        {errors.password && <p className='error'>{errors.password}</p>}
        <button type='submit'>Submit Form</button>
      </form>
    </div>
    
  )
};

export default Login;
