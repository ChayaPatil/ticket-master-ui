import React from 'react'
import { connect } from 'react-redux'
import { Nav, Form, Table, Button } from 'react-bootstrap'
import {startSearchTicket, startGetTicket} from '../../actions/ticketAction'

class TicketProgress extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      code: '',
      isResolved : false,
      searchTickets: this.props.tickets,
    }
  }

  handleChange = (e) => {
    let newSearch = this.props.tickets.filter(ticket=> ticket.code.includes(e.target.value))
        this.setState({
            code: e.target.value,
            searchTickets: newSearch
        })
    }

  render(){
    // this.state.filterData = this.props.ticket
    console.log(this.state.searchTickets)
    // console.log(this.state.code.length)

    return(
      <div>
      <Form.Control type="text" name="code" onChange={this.handleChange} placeholder="Search Code" />
      {(this.state.code.length == 0) ? (
        <div>
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
              (Object.keys(this.props.tickets).length !== 0) && (
              this.props.tickets.map((ticket) => {
                const emp1 = ticket.employees.find(ele => (ele._id))
                return (
                  <tr key={ticket._id}>
                    <td>{ticket.code}</td>
                    <td>{this.props.customer.map(ele => {return (ele._id === ticket.customer) && ele.name})}</td>
                    <td>{this.props.department.map(ele => {return (ele._id == ticket.department) && ele.name})}</td>
                    <td>{this.props.employees.map(ele => {return (ele._id == emp1._id)&& ele.name})}</td>
                    <td>{ticket.message}</td>
                    <td>{ticket.priority}</td>
                    <td><Button className="btn btn-success" onClick={() => {this.handleShow(ticket._id)}}>Show</Button></td>
                    <td><Button className="btn btn-danger" onClick={() => {this.handleDelete(ticket._id)}}>Remove</Button></td>
                    <td><input type="checkbox" name="completed" checked={this.state.isResolved.checked} 
                    onChange={this.handleCheck} /></td>
                  </tr>
                )
              })
              )
            }
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
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
              // (Object.keys(this.state.searchTickets).length !== 0) && (
              this.state.searchTickets.map((ticket) => {
                const emp1 = ticket.employees.find(ele => (ele._id))
                return (
                  <tr key={ticket._id}>
                    <td>{ticket.code}</td>
                    <td>{this.props.customer.map(ele => {return (ele._id === ticket.customer) && ele.name})}</td>
                    <td>{this.props.department.map(ele => {return (ele._id == ticket.department) && ele.name})}</td>
                    <td>{this.props.employees.map(ele => {return (ele._id == emp1._id)&& ele.name})}</td>
                    <td>{ticket.message}</td>
                    <td>{ticket.priority}</td>
                    <td><Button className="btn btn-success" onClick={() => {this.handleShow(ticket._id)}}>Show</Button></td>
                    <td><Button className="btn btn-danger" onClick={() => {this.handleDelete(ticket._id)}}>Remove</Button></td>
                    <td><input type="checkbox" name="completed" checked={this.state.isResolved.checked} 
                    onChange={this.handleCheck} /></td>
                  </tr>
                )
              })
              // )
            }
            </tbody>
          </Table>
        </div>
      )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tickets : state.ticket,
    customer : state.customer,
    department : state.department,
    employees : state.employees
  }
}
export default connect(mapStateToProps)(TicketProgress)