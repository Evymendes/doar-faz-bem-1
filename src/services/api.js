import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

// Get All From Anvisa
export const getAll = () => axios({
	url: `${API_URL}/classes/anvisa`,
	method: 'get',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'Content-Type': 'application/json',
	},
});

// Get By Id From Anvisa
export const getById = (isbn) => axios({
	url: `${API_URL}/classes/anvisa?where={"EAN_1": ${isbn}}`,
	method: 'get',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'Content-Type': 'application/json',
	},
});

export const createMedicament = (data) => axios({
	url: `${API_URL}/classes/medicamento`,
	method: 'post',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'Content-Type': 'application/json',
	},
	data,
});

export const editMedicament = (data, medicamentId) => axios({
	url: `${API_URL}/classes/medicamento/${medicamentId}`,
	method: 'put',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'Content-Type': 'application/json',
	},
	data,
});

export const getAllMedicaments = () => axios({
	url: `${API_URL}/classes/medicamento`,
	method: 'get',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'Content-Type': 'application/json',
	},
});

export const deleteMedicament = (medicamentId) => axios({
	url: `${API_URL}/classes/medicamento/${medicamentId}`,
	method: 'delete',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'Content-Type': 'application/json',
	},
});

// User
export const createUser = (user) => axios({
	url: `${API_URL}/classes/usuario`,
	method: 'post',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'X-Parse-Revocable-Session': 1,
		'Content-Type': 'application/json',
	},
	data: user,
});

export const login = (email, password) => axios({
	url: `${API_URL}/classes/usuario/${email}/${password}`,
	method: 'get',
	headers: {
		'X-Parse-Application-Id': process.env.REACT_APP_APPLICATION_ID,
		'X-Parse-REST-API-Key': process.env.REACT_APP_REST_API_KEY,
		'X-Parse-Revocable-Session': 1,
	},
});
