import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponents = () => {
  return (
    <header>
        <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor: 'rgb(84 90 98)'}}>
            <a className="navbar-brand" href="#" style={{color: '#fff'}}>Employee Management System</a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className='nav-link' to='/employees/1'>Employees</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className='nav-link' to='/departments/1'>Departments</NavLink>
                </li>
              </ul>
            </div>
        
        </nav>
    </header>
  )
}

export default HeaderComponents