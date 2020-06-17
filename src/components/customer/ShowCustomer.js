import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {findCustomer} from '../../selectors/customerSelector'
import { Container } from 'react-bootstrap'

class  ShowCustomer extends React.Component{

  render(){
    // console.log(this.props)
    // console.log(this.props.match.params.id === this.props.customer._id)
    return(
      <Container>
        {
          this.props.customer && (
            <div>
              <h2>{this.props.customer.name} - {this.props.customer.email}</h2>
              <Link to={`/customers/edit/${this.props.customer._id}`}>EDIT</Link>
            </div>
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    customer: state.customer.find(customer => customer._id == props.match.params.id)
  }
}

export default connect(mapStateToProps)(ShowCustomer)