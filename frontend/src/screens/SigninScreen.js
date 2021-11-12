import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // console.log(props)
  // console.log(props.location)
  // console.log(props.location.search)
  // console.log(props.location.search.split('=')[1])

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // console.log(userInfo)

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const guestLoginHandler = (e) => {
    e.preventDefault();
    dispatch(signin('guest@example.com', '123'));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div></div>
        <div>
          <label />
          <button className="primary" type="submit" style={{marginBottom: '1rem'}}>
            Sign In
          </button>
          <button className="primary" onClick={guestLoginHandler}>Guest Sign In</button>
        </div>
        <div>
          <label />
          <div>
            New customer?{' '}
            <Link
              style={{ color: 'black' }}
              to={`/register?redirect=${redirect}`}
            >
              Create your account here!
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
