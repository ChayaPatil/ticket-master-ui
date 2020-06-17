import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { findDepartment } from '../../selectors/departmentSelector'
import { Container } from 'react-bootstrap'

class ShowDepartment extends React.Component{

  render(){
    // console.log(this.props)
    return(
      <Container>
        {
          // Object.keys(this.props.department).length !== 0 && (
            this.props.department && (
              <div>
                <h1>Name - {this.props.department.name}</h1>
                <Link to={`/departments/edit/${this.props.department._id}`}>Edit</Link>
              </div>
            )
          // )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return{
    department : findDepartment(state.department, props.match.params.id)
  }
}
export default connect(mapStateToProps)(ShowDepartment)