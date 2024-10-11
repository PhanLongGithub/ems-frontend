import { createElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();
    const [errors, setErrors]  = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(errors => {
                console.error(errors);
            })
        }
    }, [id])

    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function saveEmployee(e){
        e.preventDefault();
        const employee = {firstName, lastName, email}
        console.log(employee)

        if(validateForm()){

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response);
                    navigator('/employees/1');
                }).catch(error => {
                    console.log(error);
                })
            } else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees/1');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}

        if( firstName.trim()){
            errorsCopy.firstName = ''
        } else{
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = ''
        } else{
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = ''
        } else{
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Updated Employee</h2>
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
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
                            <label className='form-lable'>First Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid':''}`}
                                onChange={handleFirstName}
                            >
                            </input>
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-lable'>Last Name</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid':''}`}
                                onChange={handleLastName}
                            >
                            </input>
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-lable'>Email</label>
                            <input
                                type='email'
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid':''}`}
                                onChange={handleEmail}
                            >
                            </input>
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveEmployee}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent