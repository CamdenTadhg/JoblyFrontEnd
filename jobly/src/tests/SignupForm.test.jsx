import {fireEvent, render, waitFor, cleanup} from '@testing-library/react';
import {test, expect, vi, afterEach, beforeEach} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import * as router from 'react-router'
import SignupForm from '../SignupForm';
import JoblyApi from '../JoblyApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';


const navigate = vi.fn();

beforeEach(() => {
  //mock the axios call and useNavigate hook
  const mock = new MockAdapter(axios);
  mock.onPost('http://localhost:3001/auth/register').reply(200, 'token');

  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
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

test('gathers and submits form data, redirects on success', async () => {
  // const mockedUseNavigate = vi.fn();
  // vi.doMock('react-router-dom', async () => {
  //     const actual = await vi.importActual('react-router-dom');
  //     return {
  //         ...actual,
  //         useNavigate: () => mockedUseNavigate
  //     }
  // });
    const spySignup = vi.spyOn(JoblyApi, 'signup');
    const signup = async (data) => {
        const response = await JoblyApi.signup(data);
        if (typeof response === 'string'){
          setToken(response);
        } else {
          console.error(response);
          throw response;
        }
      }
    const {getByText, getByLabelText} = render(
    <MemoryRouter>
      <SignupForm signup={signup}/>
    </MemoryRouter>);
    fireEvent.change(getByLabelText('Username:'), {target: {value: 'testuser2'}});
    fireEvent.change(getByLabelText('Password:'), {target: {value: 'password'}});
    fireEvent.change(getByLabelText('Retype Password:'), {target: {value: 'password'}});
    fireEvent.change(getByLabelText('First Name:'), {target: {value: 'Test'}});
    fireEvent.change(getByLabelText('Last Name:'), {target: {value: 'User'}});
    fireEvent.change(getByLabelText('Email:'), {target: {value: 'testuser@test.com'}});
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
        expect(JoblyApi.signup).toHaveBeenCalledWith({
            username: 'testuser2', 
            password: 'password', 
            firstName: 'Test', 
            lastName: 'User', 
            email: 'testuser@test.com'
        });
        expect(navigate).toHaveBeenCalledWith('/')
    });
});

test('displays error message on non-matching passwords', async () => {

    const spySignup = vi.spyOn(JoblyApi, 'signup');
    const signup = async (data) => {
        const response = await JoblyApi.signup(data);
        if (typeof response === 'string'){
          setToken(response);
        } else {
          console.error(response);
          throw response;
        }
      }
    const {getByText, getByLabelText} = render(
    <MemoryRouter>
      <SignupForm signup={signup}/>
    </MemoryRouter>);
    fireEvent.change(getByLabelText('Username:'), {target: {value: 'testuser'}});
    fireEvent.change(getByLabelText('Password:'), {target: {value: 'password'}});
    fireEvent.change(getByLabelText('Retype Password:'), {target: {value: 'password1'}});
    fireEvent.change(getByLabelText('First Name:'), {target: {value: 'Test'}});
    fireEvent.change(getByLabelText('Last Name:'), {target: {value: 'User'}});
    fireEvent.change(getByLabelText('Email:'), {target: {value: 'testuser@test.com'}});
    fireEvent.click(getByText('Submit'));

    const error = getByText('Passwords do not match.');
    expect(error).toBeInTheDocument();
});