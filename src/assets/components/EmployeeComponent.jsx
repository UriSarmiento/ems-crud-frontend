import { useEffect, useMemo, useState } from "react"
import { createEmployee, deleteEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";



const EmployeeComponent = () => {
  const currentUrl = window.location.href;

  // ------------- Hooks ------------- //
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const {id} = useParams();

  const navigator = useNavigate();

  useEffect(()=>{
    if(id){
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error=>{
        console.error(error);
      });
    }
  }, [id]);

  // ------------- CRUD Functionalities -------------- //

  function saveOrUpdateEmployee(e){
    e.preventDefault();
    const employee = {firstName, lastName, email}

    if(validateForm()){

      // If the URL has an employee ID update else create the employee
      if(id){
          updateEmployee(id, employee).then(response => {
            console.log(response.data);
            navigator('/employees');
          }).catch( error => {
            console.error(error);
          });
      } else {
        createEmployee(employee).then(response => {
          console.log(response.data);
          navigator('/employees');
        }).catch( error => {
          console.error(error);
        });
      }
    }
  }

  function delEmployee(){
    if(id){
         deleteEmployee(id).then().catch(error => {
           console.error(error);
         });
        }
  }

  // ---------------------------------FORM VALIDATIONS ------------------------------------------ //

  function validateForm(){
    let valid = true;
    
    let errorsCopy = {... errors}

    if(firstName.trim()){
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First Name is Required';
      valid = false;
    }

    if(lastName.trim()){
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last Name is Required';
      valid = false;
    }

    if(email.trim()){
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is Required';
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;

  }

  // ------------------- UTILITY --------------------- //
  function pageTitle(){
    if(id){
      if(isDelete()){
        return (<>
          <h2 className="text-center">Delete Employee</h2>
          <p className="alert alert-danger">Are you sure you want to delete this employee? This action cannot be undone.</p>
        </>)
      } else {
          return <h2 className="text-center">Edit Employee</h2>
        ;
      }
      
    }
    else {
      return <h2 className="text-center">Add Employee</h2>
    }
  }

  function manageButton(){
    if(isDelete()){
      return <button className="btn btn-danger" onClick={() => { 
        delEmployee(id); 
        navigator('/employees');
        navigator(0);
      }}>Confirm Deletion</button>
    } else {
      return <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
    }
  }

  function isDelete(){
    if(currentUrl.includes('delete-employee')){
      return true;
    }
    return false;
  }

  return (
  // ------------ FORM --------------- //
    <div className="container">
      <br/> <br/> <br/>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {
            pageTitle()
          }
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input 
                  type = "text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className= {`form-control ${errors.firstName ? 'is-invalid': ''}`}
                  onChange={(e) => setFirstName(e.target.value)}
                  readOnly = {isDelete()}
                />
                { errors.firstName && <div className="invalid-feedback"> {errors.firstName} </div> }
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input 
                  type = "text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                  onChange={(e) => setLastName(e.target.value)}
                  readOnly = {isDelete()}
                />
                { errors.lastName && <div className="invalid-feedback"> {errors.lastName} </div> }  
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input 
                  type = "text"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid': ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly = {isDelete()}
                />
                { errors.email && <div className="invalid-feedback"> {errors.email} </div> }
              </div>
              {/*<button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>*/}
              {
                manageButton()
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent