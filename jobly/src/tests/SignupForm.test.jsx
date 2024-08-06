import {fireEvent, render, waitFor, cleanup} from '@testing-library/react';
import {test, expect, vi, afterEach, beforeEach} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import SignupForm from '../SignupForm';
import JoblyApi from '../JoblyApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

beforeEach(() => {
  //mock the axios call and useNavigate hook
  const mock = new MockAdapter(axios);
  mock.onPost('http://localhost:3001/auth/register').reply(200, 'token');

});

afterEach(cleanup);

test('renders the SignupForm component', () => {
  render(
  <MemoryRouter>
    <SignupForm/>
  </MemoryRouter>);
});

test('matches snapshot', () => {
    const signupForm = render(
    <MemoryRouter>
      <SignupForm/>
    </MemoryRouter>);
    expect(signupForm).toMatchSnapshot();
});

test('displays correct content', () => {
    const {getByText} = render(
    <MemoryRouter>
      <SignupForm/>
    </MemoryRouter>);
    expect(getByText('Signup Form')).toBeInTheDocument();
});

// test('gathers and submits form data, redirects on success', async () => {
//   const mockedUseNavigate = vi.fn();
//   vi.mock('react-router-dom', async (importOriginal) => {
//       const actual = await importOriginal();
//       return {
//           ...actual,
//           useNavigate: () => mockedUseNavigate
//       }
//   });
//     const spySignup = vi.spyOn(JoblyApi, 'signup');
//     const signup = async (data) => {
//         const response = await JoblyApi.signup(data);
//         if (typeof response === 'string'){
//           setToken(response);
//         } else {
//           console.error(response);
//           throw response;
//         }
//       }
//     const {getByText, getByLabelText} = render(<SignupForm signup={signup}/>);
//     fireEvent.change(getByLabelText('Username:'), {target: {value: 'testuser'}});
//     fireEvent.change(getByLabelText('Password:'), {target: {value: 'password'}});
//     fireEvent.change(getByLabelText('Retype Password:'), {target: {value: 'password'}});
//     fireEvent.change(getByLabelText('First Name:'), {target: {value: 'Test'}});
//     fireEvent.change(getByLabelText('Last Name:'), {target: {value: 'User'}});
//     fireEvent.change(getByLabelText('Email:'), {target: {value: 'testuser@test.com'}});
//     fireEvent.click(getByText('Submit'));

//     await waitFor(() => {
//         expect(JoblyApi.signup).toHaveBeenCalledWith({
//             username: 'testuser', 
//             password: 'password', 
//             firstName: 'Test', 
//             lastName: 'User', 
//             email: 'testuser@test.com'
//         });
//         expect(mockedUseNavigate).toHaveBeenCalledWith('/')
//     });


// });

// test('displays error message on non-matching passwords', async () => {

//     const spySignup = vi.spyOn(JoblyApi, 'signup');
//     const signup = async (data) => {
//         const response = await JoblyApi.signup(data);
//         if (typeof response === 'string'){
//           setToken(response);
//         } else {
//           console.error(response);
//           throw response;
//         }
//       }
//     const {getByText, getByLabelText} = render(<SignupForm signup={signup}/>);
//     fireEvent.change(getByLabelText('Username:'), {target: {value: 'testuser'}});
//     fireEvent.change(getByLabelText('Password:'), {target: {value: 'password'}});
//     fireEvent.change(getByLabelText('Retype Password:'), {target: {value: 'password1'}});
//     fireEvent.change(getByLabelText('First Name:'), {target: {value: 'Test'}});
//     fireEvent.change(getByLabelText('Last Name:'), {target: {value: 'User'}});
//     fireEvent.change(getByLabelText('Email:'), {target: {value: 'testuser@test.com'}});
//     fireEvent.click(getByText('Submit'));

//     const error = getByText('Passwords do not match.');
//     expect(error).toBeInTheDocument();
// });