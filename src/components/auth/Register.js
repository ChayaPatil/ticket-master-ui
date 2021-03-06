import React from 'react'
import {connect} from 'react-redux'
import { startRegisterUser } from '../../actions/userAction'
import { Container, Form, Card } from 'react-bootstrap'
import './auth.css'

class Register extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      username:'',
      email:'',
      password:''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    const redirect = () => {
      this.props.history.push("/users/login")
    }
    this.props.dispatch(startRegisterUser(formData, redirect))
    // this.props.dispatch(startRegisterUser(formData, this.props))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    return(
      <Container>
      <Card id="login">
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" 
          id="username"
          name="username" 
          value={this.state.username} 
          onChange={this.handleChange} 
          /> <br/>

          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="text"
          id="email" 
          name="email" 
          value={this.state.email} 
          onChange={this.handleChange} 
          /><br/>

          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password" 
          id="password" 
          name="password" 
          value={this.state.password} 
          onChange={this.handleChange} 
          /> <br/>

          <input type="submit"
          value="Register" className="btn btn-primary" />
        </form>
        </Card>
      </Container>
    )
  }
}
export default connect()(Register)