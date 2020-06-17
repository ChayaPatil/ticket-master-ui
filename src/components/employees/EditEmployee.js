import React from 'react'
import  { connect } from 'react-redux'
import { findEmployee } from '../../selectors/employeeSelector'
import { startEditEmployee } from '../../actions/employeeAction'
import { Form, Container } from 'react-bootstrap'

class EditEmployee extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      id : props.employee._id,
      name : props.employee.name,
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.state.id
    const formData = {
      name : this.state.name,
    }
    // console.log(formData)
    const redirect = () => {
      this.props.history.push(`/employees/${id}`)
    }

    this.props.dispatch(startEditEmployee(id, formData, redirect))
  }

  render(){
    // console.log(this.props)
    return(
      <Container>
        <h2>Edit Employees</h2>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="name1">Name</label> 
          <Form.Control type="text"
          id="name1"
          name="name"
          value={this.state.name}
          onChange={this.handleChange} 
          /> <br/>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return{
    employee : findEmployee(state.employees, props.match.params.id),
    department : state.department
  }
}

export default connect(mapStateToProps)(EditEmployee)