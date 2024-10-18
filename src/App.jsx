import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponents from './components/FooterComponents'
import HeaderComponents from './components/HeaderComponents'
import ListEmployeeComponent from './components/EmployeeConponents/ListEmployeeComponent'
import ListDepartmentComponent from './components/DepartmentConponents/ListDepartmentConponent'
import EmployeeComponent from './components/EmployeeConponents/EmployeeComponent'
import DepartmentConponent from './components/DepartmentConponents/DepartmentConponent'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponents></HeaderComponents>
        <Routes>
            <Route path='/' element = { <ListEmployeeComponent /> }></Route>
            <Route path='/employees/:page' element = { <ListEmployeeComponent /> }></Route>
            <Route path='/add-employee' element = { <EmployeeComponent /> }></Route>
            <Route path='/edit-employee/:id' element = { <EmployeeComponent /> }></Route>

            <Route path='/departments/:page' element={ <ListDepartmentComponent/> }></Route>
            <Route path='/add-department' element = {<DepartmentConponent />}></Route>
            <Route path='/edit-department/:id' element = {<DepartmentConponent />}></Route>
          </Routes>
        <FooterComponents></FooterComponents>
      </BrowserRouter>
    </>
  )
}

export default App
