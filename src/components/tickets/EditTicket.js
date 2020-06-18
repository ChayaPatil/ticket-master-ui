import React from 'react'
import { connect } from 'react-redux'
import { startEditTicket } from '../../actions/ticketAction'
import { Form, Container } from 'react-bootstrap'

class EditTicket extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      id : props.ticket._id,
      code: this.props.ticket.code,
      customer: props.ticket.customer,
      department: props.ticket.department,
      employees: props.ticket.employees,
      selectedOption: props.ticket.priority,
      message: props.ticket.message
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleOptionChange = (e) => {
    this.setState({
      selectedOption : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.state.id
    const formData = {
      code: this.state.code,
      customer: this.state.customer,
      department: this.state.department,
      employees : this.state.employees,
      priority: this.state.selectedOption,
      message: this.state.message
    }
    console.log(formData)
    const redirect = () => {
      this.props.history.push(`/tickets/${id}`)
    }

    this.props.dispatch(startEditTicket(id, formData, redirect))
    // console.log(formData)
  }

  render(){
    console.log(this.props.ticket)
    return(
      <Container>
        <h1>Edit Tickets</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="code">Code</Form.Label>
          <Form.Control type="text"
          id="code"
          name="code"
          value={this.state.code}
          onChange={this.handleChange}
          /> <br />
          <Form.Label htmlFor="customer">Customer</Form.Label>
          <Form.Control as="select" id="customer" name="customer"
          value={this.state.customer} onChange={this.handleChange} 
          >
          <option value='Select'>Select</option>
          {
            this.props.customer.map(ele => {
              return(
                <option key={ele._id} value={ele._id}>{ele.name}</option>
              )
            })
          }
          </Form.Control> <br />
          <Form.Label htmlFor="department">Department</Form.Label>
          <Form.Control as="select" id="department" name ="department" 
          value={this.state.department} onChange={this.handleChange}>
          <option value='Select'>Select</option>          
          {
            this.props.department.map(ele => {
              return(
                <option value={ele._id} key={ele._id}>{ele.name}</option>
              )
            })
          }
          </Form.Control> 
          <br/>          
          <Form.Label htmlFor="employees">Employees</Form.Label>
          <Form.Control as="select" id="employees" name="employees"
          value={this.state.employees} onChange={this.handleChange}>
          <option value='Select'>Select</option>
          {
           this.props.employees.map(ele => {
            return (ele.department == this.state.department && 
              <option value={ele._id} key={ele._id}>{ele.name}</option>)
           })
          }
          </Form.Control>
          <br/>
          <Form.Label htmlFor="message">Message</Form.Label>
          <Form.Control type="text"
          id="message"
          name="message"
          value={this.state.message}
          onChange={this.handleChange}>
          </Form.Control><br/>
          <Form.Label htmlFor="priority">Priority</Form.Label> &nbsp;&nbsp;&nbsp;&nbsp;
          <Form.Label>
          <input type="radio" value="high" checked = {this.state.selectedOption} 
          onChange={this.handleOptionChange} />High
          </Form.Label>&nbsp;&nbsp;
          <Form.Label>
          <input type="radio" value="Medium" checked = {this.state.selectedOption}
          onChange={this.handleOptionChange} />Medium
          </Form.Label>&nbsp;&nbsp;
          <Form.Label>
          <input type="radio" value="Low" checked = {this.state.selectedOption === 'Low'} 
          onChange={this.handleOptionChange} />Low
          </Form.Label>
          <br/>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return{
    ticket : state.ticket.find(ticket => ticket._id === props.match.params.id),
    customer : state.customer,
    department : state.department,
    employees : state.employees
  }
}

export default connect(mapStateToProps)(EditTicket)