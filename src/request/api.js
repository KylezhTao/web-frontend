import {get, post, put, deletes } from "./http";
export const getDocTable = formData => get('/externalRegulation/gain', formData);
export const login = formData => post("/identify/login",formData);
export const register=formData=>post("/identify/register",formData);
export const getStatistics = () => get("/externalRegulation/statistics");
