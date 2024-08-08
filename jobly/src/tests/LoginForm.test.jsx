import {fireEvent, render, waitFor, cleanup} from '@testing-library/react';
import {test, expect, vi, afterEach, beforeEach} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import * as router from 'react-router'
import SignupForm from '../SignupForm';
import JoblyApi from '../JoblyApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';