import axios from 'axios';
import store  from '../conf/store'; // Adjust the path as necessary
import { selectAuthToken } from '../conf/selectors'; // Adjust the path as necessary
import { handleApiError } from './apiUtils';

const API_URL = 'https://basim-appointment-6618a6bd1d95.herokuapp.com/api/business-owner';

const getAuthToken = () => {
    const state = store.getState();
    return selectAuthToken(state);
};

const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Cover Image
export const getCoverImage = async () => await api.get(`${API_URL}/coverImage`).catch(handleApiError);
export const updateCoverImage = async (file) => await api.post(`${API_URL}/coverImage`, file,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
).catch(handleApiError);

// Logo Image
export const getLogoImage = async () => await api.get(`${API_URL}/logoImage`);
export const updateLogoImage = async (file) => await api.post(`${API_URL}/logoImage`, file,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
).catch(handleApiError);

// Business Name
export const getBusinessName = async () => await api.get(`${API_URL}/businessName`).catch(handleApiError);
export const updateBusinessName = async (newName) => await api.put(`${API_URL}/businessName`, { name: newName }).catch(handleApiError);

// Day Off
export const getDaysOff = async () => await api.get(`${API_URL}/dayoff`).catch(handleApiError);
export const addDayOff = async (dayOfWeek) => await api.post(`${API_URL}/dayoff`, { dayOfWeek }).catch(handleApiError);
export const deleteDayOff = async (dayOfWeek) => await api.delete(`${API_URL}/dayoff/${ dayOfWeek }`).catch(handleApiError);

// Working Hours
export const getWorkingHours = async () => await api.get(`${API_URL}/hours`).catch(handleApiError);
export const updateWorkingHours = async (workingHours) => await api.put(`${API_URL}/hours`, workingHours).catch(handleApiError);

// Appointment Types
export const getAppointmentTypes = async () => await api.get(`${API_URL}/types`).catch(handleApiError);
export const addAppointmentType = async (type) => await api.post(`${API_URL}/types`, type).catch(handleApiError);
export const updateAppointmentType = async (type) => await api.put(`${API_URL}/types`, type).catch(handleApiError);
export const deleteAppointmentType = async (id) => await api.delete(`${API_URL}/types/${id}`).catch(handleApiError);

// Vacations
export const getVacations = async () => await api.get(`${API_URL}/vacation`).catch(handleApiError);
export const addVacation = async (vacation) => await api.post(`${API_URL}/vacation`, vacation).catch(handleApiError);
export const updateVacation = async (vacation) => await api.put(`${API_URL}/vacation`, vacation).catch(handleApiError);
export const deleteVacation = async (id) => await api.delete(`${API_URL}/vacation/${id}`).catch(handleApiError);

// Appointments
export const getCanceledAppointmentsByDate = async (date) => await api.get(`${API_URL}/canceled-appointments/${date}`).catch(handleApiError);
export const getAppointmentsByDate = async (date) => await api.get(`${API_URL}/appointments/${date}`).catch(handleApiError);
export const deleteAppointment = async (id) => await api.delete(`${API_URL}/appointments/${id}`).catch(handleApiError);

// login
export const login = async (user) => await api.post(`${API_URL}/login`, user).catch(handleApiError);
// Add other API functions as needed...
