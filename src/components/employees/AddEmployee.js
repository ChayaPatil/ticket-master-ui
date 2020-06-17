import React from 'react'
import { connect } from 'react-redux'
import { startAddEmployee } from '../../actions/employeeAction'
import { Container, Form } from 'react-bootstrap'

class AddEmployee extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      mobile: '',
      department: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      department: this.state.department
    }
    // console.log(formData)
    const redirect = () => {
      this.props.history.push("/employees")
    }
    this.props.dispatch(startAddEmployee(formData, redirect))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    return(
      <Container>
        <h1>Add Employee</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="name">Name</Form.Label> 
          <Form.Control type="text"
          id="name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange} 
          /> <br/>
          <Form.Label htmlFor="email">Email</Form.Label> 
          <Form.Control type="text"
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange} 
          /> <br/>
          <Form.Label htmlFor="mobile">Mobile</Form.Label> 
          <Form.Control type="text"
          id="mobile"
          name="mobile"
          value={this.state.mobile}
          onChange={this.handleChange} 
          /> <br/>
          <Form.Label htmlFor="department">Department</Form.Label> 
          <Form.Control as="select" id="department" name="department"
          onChange={this.handleChange} value={this.state.department}>
          <option value="--Select--">Select</option>
            {
              this.props.department.map(department => {
                return(
                  <option value={department._id} key={department._id}>{department.name}</option>
                )
              })
            }
          </Form.Control>
          <br/>
          <input type="submit"
          value="Submit" className="btn btn-primary" />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    employee : state.employees,
    department : state.department
  }
}

export default connect(mapStateToProps)(AddEmployee)