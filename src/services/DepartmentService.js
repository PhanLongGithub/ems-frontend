import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';

//CREATE
export const createDepartment = (department) => axios.post(REST_API_BASE_URL, department);

//READ
export const getTotalNumberOfDepartment = () => axios.get(REST_API_BASE_URL + "/total-number");

export const getListDepartmentWithPagination = (pageNumber) => axios.get(REST_API_BASE_URL+"/page/"+pageNumber);

export const getDepartmentById = (id) => axios.get(REST_API_BASE_URL + '/' + id);

export const getAllDepartments = () => axios.get(REST_API_BASE_URL);

//UPDATE
export const updateDepartment = (id, department) => axios.put(REST_API_BASE_URL+ '/' + id, department);

//DELETE
export const deleteDepartment = (id) => axios.delete(REST_API_BASE_URL + '/' + id);
