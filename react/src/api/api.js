import axios from 'axios';
const API = axios.create();

export const TodoList = () => API.get("/api/Todo/");
