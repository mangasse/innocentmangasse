import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Sondages
export const getAllPolls = () => API.get('/polls');
export const getPollById = (id) => API.get(`/polls/${id}`);
export const createPoll = (data) => API.post('/polls', data);

// Vote
export const voteOnPoll = (id, data) => API.post(`/polls/${id}/vote`, data);