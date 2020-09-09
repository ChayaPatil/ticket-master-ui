import React from 'react'
import {connect} from 'react-redux'
import { findCustomer } from '../../selectors/customerSelector'
import { startEditCustomer } from '../../actions/customerAction'
import { Container, Form } from 'react-bootstrap'

class EditCustomer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      id : props.customer._id,
      name: props.customer.name,
      email: props.customer.email 
    }
  }

  // static getDerivedStateFromProps(nextProps){
  //   // console.log(state.id === props.customer._id)
  //   if(nextProps.customer.length !== 0){
  //     const {name, email} = nextProps.customer
  //     this.setState({name, email})
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   // Any time props.email changes, update state.
  //   if (nextProps.id !== this.props.customer._id) {
  //     this.setState({
  //       email: nextProps._id
  //     });
  //   }
  // }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
      const id = this.state.id
      const formData ={
        name:this.state.name,
        email: this.state.email,
    }
    // console.log(formData)
    const redirect = () => {
      this.props.history.push(`/customers/${id}`)
    }

      this.props.dispatch(startEditCustomer(id, formData, redirect))
  }

  render(){
    console.log(this.props)
    return(
      <Container>
        <h2>Edit Customer</h2>
        { 
          (this.props.customer.length != 0) && (
          <Form onSubmit={this.handleSubmit}>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              /> <br />
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange} 
              /> <br />
            <input type="submit" value="submit" className="btn btn-primary" />
          </Form>
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    customer : findCustomer(state.customer, props.match.params.id)
  }
}

export default connect(mapStateToProps)(EditCustomer)