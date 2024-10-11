import React, { useEffect, useState } from 'react'
import { getTotalNumberOfEmployee } from '../services/EmployeeService';
import { useParams } from 'react-router-dom';

const PaginationComponent = (props) => {

  let {page} = useParams();

  function init(){
    const listItems = [];
    if(!page){
      page = 1;
    }
    let pagenumber = 0;
    for (let index = 0; index < props.totalNumberOfEmployee; index = index + 10) {
      pagenumber++;
      listItems.push(<li className={`page-item ${page == pagenumber ? 'active':''}`} key={pagenumber}><a className="page-link" href={`/employees/${pagenumber}`} >{pagenumber}</a></li>);
    }
    return listItems;
  }

  return (
    <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only"> Previous</span>
              </a>
            </li>
            {
              init()
            }
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
                <span className="sr-only">Next </span>
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </nav>
  )
}

export default PaginationComponent