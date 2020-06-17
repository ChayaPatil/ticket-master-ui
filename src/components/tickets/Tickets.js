import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteTicket } from '../../actions/ticketAction'
import { Table, Container, Button } from 'react-bootstrap'

class Tickets extends React.Component{

  handleDelete = (id) => {
    const redirect = () => {
      this.props.history.push('/tickets')
    }
    // console.log(id)
    const confirmRemove = window.confirm("Are you sure?")
      if(confirmRemove){
        this.props.dispatch(startDeleteTicket(id, redirect))
      }
  }

  handleShow = (id) => {
    this.props.history.push(`tickets/${id}`)
  }

  // showEmployees = (ticketEmp) => {
  //  const empIds = ticketEmp.map(ele => ele._id)
  //  console.log(empIds)
  //  let employees = []
  //  if(this.props.employees.length > 0 ) {
  //   return employees = empIds.map((eId) => this.props.employees.find(emp => (emp._id == eId).name))
  //  } 
  // //  console.log(employees)
  // //  return  employees.join(', ')
  // // const employees = this.props.employees.find(emp => emp)
  // // console.log(employees)
  //  }

  render(){
    // console.log(this.props.ticket)
    return(
      <Container>
        <h2>Tickets</h2>
        <Table responsive bordered striped>
          <thead>
            <tr>
              <th>Code No</th>
              <th>Customer</th>
              <th>Department</th>
              <th>Employees</th>
              <th>Message</th>
              <th>Priority</th>
              <th>Action</th>
              <th>Remove</th>
              <th>Complete</th>
            </tr>
          </thead>
          <tbody>
            {
              (Object.keys(this.props.ticket).length !== 0) && (
              this.props.ticket.map((ticket, i) => {
                const emp1 = ticket.employees.find(ele => (ele._id))
                console.log(emp1)
                return (
                  <tr key={ticket._id}>
                    <td>{ticket.code}</td>
                    <td>{this.props.customer.map(ele => {
                      return (ele._id === ticket.customer) && ele.name
                    })}</td>
                    <td>{this.props.department.map(ele => {
                      return (ele._id === ticket.department) && ele.name
                    })}</td>
                    <td>{(this.props.employees !== 0) && (this.props.employees.find(ele => ele._id == emp1._id).name)}</td>
                    <td>{ticket.message}</td>
                    <td>{ticket.priority}</td>
                    <td><Button className="btn btn-success" onClick={() => {this.handleShow(ticket._id)}}>Show</Button></td>
                    <td><Button className="btn btn-danger" onClick={() => {this.handleDelete(ticket._id)}}>Remove</Button></td>
                    <td><input type="checkbox" /></td>
                  </tr>
                )
              })
              )
            }
          </tbody>
        </Table>
        <Link to={`/tickets/add`}>Add Ticket</Link>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticket : state.ticket,
    customer : state.customer,
    department : state.department,
    employees : state.employees
  }
}

export default connect(mapStateToProps)(Tickets)