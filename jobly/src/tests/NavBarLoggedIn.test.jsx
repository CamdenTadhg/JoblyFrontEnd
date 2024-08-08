import {fireEvent, render, waitFor, cleanup} from '@testing-library/react';
import {test, expect, vi, afterEach, beforeEach} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import Profile from '../Profile';
import JoblyApi from '../JoblyApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import UserContext from '../contexts/userContext'

const Wrapper = ({children}) => {
    return (
        <MemoryRouter>
            <UserContext.Provider value='testuser'>
                {children}
            </UserContext.Provider>
        </MemoryRouter>
    );
};

afterEach(cleanup);

test('matches the snapshot', () => {
    const navbar = render(<NavBar/>, {wrapper: Wrapper});
    expect(navbar).toMatchSnapshot();
});

test('displays the correct content', () => {
    const {getByText, queryByText} = render(<NavBar/>, {wrapper: Wrapper});
    expect(getByText('Jobs')).toBeInTheDocument();
    expect(queryByText('Login')).not.toBeInTheDocument();
});


test('logs a user out', () => {})