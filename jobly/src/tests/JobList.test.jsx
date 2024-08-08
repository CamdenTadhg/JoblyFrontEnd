import {fireEvent, render, waitFor, cleanup} from '@testing-library/react';
import {test, expect, vi, afterEach, beforeEach} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import JobList from '../JobList';
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

beforeEach(() => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://localhost:3001/jobs').reply(200, {jobs: [
        {title: 'Accommodation manager', salary: 126000, equity: '0', companyHandle:'anderson-arias-morrow', applied: true},
        {title: 'Accountant, chartered certified', salary: 175000, equity: '0.1', companyHandle: 'arnold-berger-townsend', applied: false}
      ]});
});

afterEach(cleanup);

test('renders the JobList component', () => {
    render(<JobList/>, {wrapper: Wrapper});
});

test('matches the snapshot', () => {});

test('displays the correct content', () => {});

test('displays loading if loading', () => {});

test('redirects to home if not logged in', () =>{});