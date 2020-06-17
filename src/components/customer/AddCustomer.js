import React from 'react'
import { connect } from 'react-redux'
import { startGetAddCustomer } from '../../actions/customerAction'
import { Container, Form } from 'react-bootstrap'

class AddCustomer extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      name : '',
      email : '',
      mobile : ''
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile
    }

    const redirect = () => {
      this.props.history.push("/customers")
    }
    this.props.dispatch(startGetAddCustomer(formData, redirect))
    // console.log(formData)
  }
  
  render(){
    return(
      <Container>
        <h2>Add Customers</h2>
        {
          (this.props.customer.length !== 0) && (
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
              <Form.Label htmlFor="mobile">Mobile</Form.Label>
              <Form.Control type="text"
              id="mobile"
              name="mobile"
              value={this.state.mobile}
              onChange={this.handleChange} 
              /> <br />
              <input type="submit" value="submit" className="btn btn-primary"/>
            </Form>
          )
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customer : state.customer
  }
}
export default connect(mapStateToProps)(AddCustomer)