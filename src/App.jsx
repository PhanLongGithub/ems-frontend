import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponents from './components/FooterComponents'
import HeaderComponents from './components/HeaderComponents'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'

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
          </Routes>
        <FooterComponents></FooterComponents>
      </BrowserRouter>
    </>
  )
}

export default App
