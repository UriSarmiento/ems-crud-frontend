import './App.css';
import EmployeeComponent from './assets/components/EmployeeComponent';
import FooterComponent from './assets/components/FooterComponent';
import HeaderComponent from './assets/components/HeaderComponent';
import ListEmployeeComponent from './assets/components/ListEmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/*http://localhost:3000*/}
            <Route path='/' element = { <ListEmployeeComponent/> }></Route>
            {/*http://localhost:3000/employees*/}
            <Route path='/employees' element = { <ListEmployeeComponent/> }></Route>
            {/*http://localhost:3000/add-employee*/}
            <Route path='/add-employee' element = { <EmployeeComponent/> }></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
