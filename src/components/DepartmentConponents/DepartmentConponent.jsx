import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentConponent = () => {
    //variable
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: ''
    });
    const navigator = useNavigate();
    const {id} = useParams();

    //useEffect
    useEffect(() => {
        if(id){
            getDepartmentById(id).then((response) => {
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription);
            });
        }
    }, [id]);

    //functions
    function handleDepartmentName(e){
        setDepartmentName(e.target.value);
    }

    function handleDepartmentDescription(e){
        setDepartmentDescription(e.target.value);
    }

    function saveDepartment(e){
        e.preventDefault();
        const department = {departmentName, departmentDescription};
        if(validateForm()){
            if(id){
                updateDepartment(id, department).then((response) => {
                    console.log(response);
                    navigator('/departments/1');
                }).catch(error => {
                    console.log(error);
                })
            }
            else{
                createDepartment(department).then((response) => {
                    console.log(response);
                    navigator('/departments/1');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    };

    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors};
        if(departmentName.trim()){
            errorsCopy.departmentName = ''
        }else{
            errorsCopy.departmentName = 'Department name is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    };

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Updated Department</h2>
        }
        else{
            return <h2 className='text-center'>Add Department</h2>
        }
    }

  return (
    <div className='container mt-3'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-lable'>Department Name</label>
                            <input
                                type='text'
                                placeholder='Enter Department Name'
                                name='departmentName'
                                value={departmentName}
                                className={`form-control ${errors.departmentName ? 'is-invalid':''}`}
                                onChange={handleDepartmentName}
                            >
                            </input>
                            {errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-lable'>Department Description</label>
                            <textarea
                                type='text'
                                placeholder='Enter Department Description'
                                name='departmentDescription'
                                value={departmentDescription}
                                className={`form-control ${errors.departmentDescription ? 'is-invalid':''}`}
                                onChange={handleDepartmentDescription}
                            >
                            </textarea>
                            {errors.departmentDescription && <div className="invalid-feedback">{errors.departmentDescription}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveDepartment}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DepartmentConponent