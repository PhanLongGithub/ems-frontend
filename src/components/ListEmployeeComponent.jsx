import React, { useEffect, useState } from 'react'
import './ListEmployeeComponent.css'
import { deleteEmployee, getTotalNumberOfEmployee, listEmployees, listEmployeesWithPagination } from '../services/EmployeeService';
import { Button } from 'bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';

const ListEmployeeComponent = () => {
    let [employees, setEmployees] = useState([]);
    const [totalNumberOfEmployee, setTotalNumberOfEmployee] = useState(0);

    const navigator = useNavigate();
    let {page} = useParams();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees(){
        if(page){
            listEmployeesWithPagination(page).then((response) =>{
                setEmployees(response.data);
            }).catch(error => {
                console.error(error);
            })
        }
        else{
            listEmployeesWithPagination(1).then((response) =>{
                setEmployees(response.data);
            }).catch(error => {
                console.error(error);
            })
        }
    }

    useEffect(() => {
        getTotalNumberOfEmployee().then((response) => {
        setTotalNumberOfEmployee(response.data);
        })
    }, []);

    function addNewEmployee(){
        navigator('/add-employee')
    }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){
        console.log(id);
        let confirmValue = confirm("Are you sure!");
        if(confirmValue == true){
            deleteEmployee(id).then((response) => {
                getAllEmployees();
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add New Employee</button>
            <table className='table table-striped table-hover'>
                <thead className='text-center'>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => 
                            <tr key={employee.id}>
                                <td className="border-right">
                                    {employee.firstName}
                                </td>
                                <td className="border-right">{employee.lastName}</td>
                                <td className="border-right">{employee.email}</td>
                                <td className='text-center'>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                       style={{marginLeft: '10px'}} >Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <PaginationComponent totalNumberOfEmployee = {totalNumberOfEmployee}></PaginationComponent>
        </div>
    )
};

export default ListEmployeeComponent