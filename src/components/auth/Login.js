import React from 'react'
import { connect } from 'react-redux'
import { startLoginUser } from '../../actions/userAction'
import { Container, Form, Card } from 'react-bootstrap'
import './auth.css'

class Login extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
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
      email: this.state.email,
      password: this.state.password
    }
    // console.log(formData)
    const redirect = () => {
      this.props.history.push("/")
    }
    this.props.dispatch(startLoginUser(formData, redirect))
  }

  render(){
    return(
      <Container>
      <Card id="login">
        <Form onSubmit={this.handleSubmit} id="login">
          <h2 id="head">Login</h2>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control type="text"
          id="email"
          name="email" 
          value={this.state.email} 
          onChange={this.handleChange}
          /> <br/>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="password"
          id="password" 
          name="password" 
          value={this.state.password} 
          onChange={this.handleChange} 
          /> <br/>
          <input type="submit"
          value="Login" className="btn btn-primary" />
        </Form>
        </Card>
      </Container>
    )
  }
}
export default connect()(Login)