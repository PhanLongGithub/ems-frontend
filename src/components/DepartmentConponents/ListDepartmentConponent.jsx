import React, { useEffect, useState } from 'react'
import PaginationComponent from '../PaginationComponent'
import { deleteDepartment, getListDepartmentWithPagination, getTotalNumberOfDepartment } from '../../services/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const ListDepartmentConponent = () => {
  //Variable
  let [totalNumberOfDepartment, setTotalNumberOfDepartment] = useState(0);
  let [departments, setDepartments] = useState([]);
  const navigator = useNavigate();
  let {page} = useParams();

  //Use Effect
  useEffect(() =>{
    getDepartments();
  });

  useEffect(() => {
    getTotalNumberOfDepartment().then((response) => {
      setTotalNumberOfDepartment(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  //functions
  function getDepartments(){
    if(page){
      getListDepartmentWithPagination(page).then((response) => {
        setDepartments(response.data);
      }).catch(error => {
        console.error(error);
      })
    }else{
      getListDepartmentWithPagination(1).then((response) => {
        setDepartments(response.data);
      }).catch(error => {
        console.error(error);
      })
    }
  }

  function addDepartment(){
    navigator('/add-department');
  }

  function updateDepartment(id){
    navigator(`/edit-department/${id}`)
  }

  function removeDepartment(id){
    let confirmValue = confirm("Are you sure!");
    if(confirmValue == true){
      deleteDepartment(id).then((response) => {
        getDepartments();
    }).catch(error => {
        console.log(error);
    })
    }
  }


  return (
    <div className='container'>
        <h2 className='text-center'>List of Department</h2>
        <button className="btn btn-primary mb-2" onClick={addDepartment}>Add New Department</button>
        <table className='table table-striped table-hover'>
            <thead className='text-center'>
                <tr>
                    <th>Department Name</th>
                    <th className="col-7">Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                    {
                        departments.map(department => 
                            <tr key={department.id}>
                                <td className="border-right">{department.departmentName}</td>
                                <td className="border-right">{department.departmentDescription}</td>
                                <td className='text-center'>
                                    <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                                    <button className='btn btn-danger' style={{marginLeft: '10px'}} onClick={() => removeDepartment(department.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
        </table>
        <PaginationComponent totalNumberOfEntity = {totalNumberOfDepartment} link = '/employees'></PaginationComponent>
    </div>
  )
}

export default ListDepartmentConponent