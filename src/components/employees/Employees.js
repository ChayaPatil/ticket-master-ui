import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteEmployee } from '../../actions/employeeAction'
import { Table, Container, Button } from 'react-bootstrap'

class Employees extends React.Component{

  handleShow = (id) => {
    this.props.history.push(`/employees/${id}`)
  }

  handleDelete = (id) => {

    const redirect = () => {
      this.props.history.push('/employees')
    }

    const confirmRemove = window.confirm('Are you sure?')
    if(confirmRemove) {
      this.props.dispatch(startDeleteEmployee(id, redirect))
    }
  }

  render(){
    // console.log(this.props.department)
    return(
      <Container>
        <h1>Employees - {this.props.employee.length}</h1>
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Actions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.employee.map(employee => {
                // console.log(this.props.department)
                return(
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobile}</td>
                    <td>{this.props.department.map(ele => {
                      return(
                        (ele._id == employee.department) && ele.name
                      )
                    })}</td>
                    <td><Button className="btn btn-success" onClick = {() => {this.handleShow(employee._id)}}>Show</Button></td>
                    <td><Button className="btn btn-danger" onClick = {() => {this.handleDelete(employee._id)}}>Remove</Button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <Link to={`/employees/add`}>Add Employee</Link>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    employee : state.employees,
    department : state.department
  }
}

export default connect(mapStateToProps)(Employees)