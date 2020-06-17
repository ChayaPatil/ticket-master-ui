import React from 'react'
import { connect } from 'react-redux'
import { findDepartment } from '../../selectors/departmentSelector'
import { startEditDepartment } from '../../actions/departmentAction'
import { Container, Form } from 'react-bootstrap'

class EditDepartment extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      name: props.department.name
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const id = this.props.department._id
    const formData = {
      name: this.state.name
    }
    const redirect = () => {
      this.props.history.push(`/departments/${id}`)
    }
    this.props.dispatch(startEditDepartment(id, formData, redirect))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    return(
      <Container>
        <h2>Edit Department</h2>
        {Object.keys(this.props.department).length !== 0 && (
          <Form onSubmit={this.handleSubmit}>
            <Form.Control type="text"
            id="deptName"
            name="name" 
            value={this.state.name}
            onChange={this.handleChange}
            /><br /> 
            <input type="submit"
            value="Submit" className="btn btn-primary" />
          </Form>
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return{
    department : findDepartment(state.department, props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditDepartment)