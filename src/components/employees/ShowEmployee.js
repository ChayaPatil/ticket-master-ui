import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { findEmployee } from '../../selectors/employeeSelector'
import { Container } from 'react-bootstrap'

class ShowEmployee extends React.Component{

  render(){
    // console.log(this.props)
    return(
      <Container>
      {
        this.props.employee && (
          <div>
            <h2>{this.props.employee.name} - {this.props.employee.email}</h2>
            <Link to={`/employees/edit/${this.props.employee._id}`}>EDIT</Link>
          </div>
        )
      }
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    employee : findEmployee(state.employees, props.match.params.id)
  }
}

export default connect(mapStateToProps)(ShowEmployee)