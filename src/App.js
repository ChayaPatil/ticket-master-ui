import React from 'react'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import {Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './components/static/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Customers from './components/customer/Customers'
import AddCustomer from './components/customer/AddCustomer'
import EditCustomer from './components/customer/EditCustomer'
import ShowCustomer from './components/customer/ShowCustomer'
import Departments from './components/departments/Departments'
import ShowDepartment from './components/departments/ShowDepartment'
import EditDepartment from './components/departments/EditDepartment'
import Employees from './components/employees/Employees'
import AddEmployee from './components/employees/AddEmployee'
import ShowEmployee from './components/employees/ShowEmployee'
import EditEmployee from './components/employees/EditEmployee'
import Tickets from './components/tickets/Tickets'
import AddTicket from './components/tickets/AddTicket'
import ShowTicket from './components/tickets/ShowTicket'
import EditTicket from './components/tickets/EditTicket'


import { startUserLogout } from './actions/userAction'
import './App.css'

function App(props){

  const handleLogout = () => {
    props.dispatch(startUserLogout())
  }

  return(
    <BrowserRouter>
      <div>
      <h1>app</h1>
        {
          Object.keys(props.user).length !== 0 ? (
            <div>
              <Navbar bg="light" variant="light">
                <Navbar.Brand href={"/"}>Ticket Master</Navbar.Brand>
                <Nav className="ml-auto">
                  <Nav.Link href={"/"}>Home</Nav.Link>
                  <Nav.Link href={"/customers"}>Customers</Nav.Link>
                  <Nav.Link href={"/departments"}>Departments</Nav.Link>
                  <Nav.Link href={"/employees"}>Employees</Nav.Link>
                  <Nav.Link href={"/tickets"}>Tickets</Nav.Link>
                  <Nav.Link href={"/logout"} onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </Navbar>
            </div>
          ) : (
            <div>
              <Navbar bg="light" variant="light">
                <Navbar.Brand href={"/"}>Ticket Master</Navbar.Brand>
                <Nav className="ml-auto">
                  <Nav.Link href={"/"}>Home</Nav.Link>
                  <Nav.Link href={"/users/register"}>Register</Nav.Link>
                  <Nav.Link href={"/users/login"}>Login</Nav.Link>
                </Nav>
              </Navbar>
            </div>
          )
        }
              
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/users/register" component={Register} />
          <Route path="/users/login" component={Login} />
          <Route path="/customers" component={Customers} exact={true} />
          <Route path="/customers/add" component={AddCustomer} exact={true} />
          <Route path="/customers/:id" component={ShowCustomer} exact={true} />
          <Route path="/customers/edit/:id" component={EditCustomer} />
          <Route path="/departments" component={Departments} exact={true} />
          <Route path="/departments/:id" component={ShowDepartment} exact={true} />
          <Route path="/departments/edit/:id" component={EditDepartment} />
          <Route path="/employees" component={Employees} exact={true} />
          <Route path="/employees/add" component={AddEmployee} exact={true} />
          <Route path="/employees/:id" component={ShowEmployee} exact={true} />
          <Route path="/employees/edit/:id" component={EditEmployee} />
          <Route path="/tickets" component={Tickets} exact={true} />
          <Route path="/tickets/add" component={AddTicket} exact={true} />
          <Route path="/tickets/:id" component={ShowTicket} exact={true} />
          <Route path="/tickets/edit/:id" component={EditTicket} exact={true} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)