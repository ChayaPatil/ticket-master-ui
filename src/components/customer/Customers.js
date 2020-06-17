import React from 'react'
import {connect} from 'react-redux'
import { startDeleteCustomer } from '../../actions/customerAction'
import { Container, Table, Button } from 'react-bootstrap' 
import '../component.css'
import { v4 as uuidv4 } from 'uuid'

class Customers extends React.Component{

  handleDelete = (id) =>{
    // console.log(this.props)
    const redirect = () => {
      this.props.history.push('/customers')
    }
    // console.log(id)
    const confirmRemove = window.confirm("Are you sure?")
      if(confirmRemove){
        this.props.dispatch(startDeleteCustomer(id, redirect))
      }
  }

  handleShow = (id) => {
    this.props.history.push(`/customers/${id}`)
  }

  render(){
    // console.log(this.props.customer)
    return(
      <Container id="customer">
        <h2>Customers - {this.props.customer.length}</h2>
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {
              // conditional rendering
              Object.keys(this.props.customer).length !== 0 &&
                (this.props.customer.map((ele, i) =>{
                return (
                  <tr key={ele._id}>
                    <td>{uuidv4()}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.mobile}</td>
                    <td><Button variant="success" size="md" onClick={() => {this.handleShow(ele._id)}}>Show</Button></td>
                    <td><Button variant="danger" size="md" onClick={() => {this.handleDelete(ele._id)}}>Remove</Button></td>
                  </tr>
                )
              }) )
            }
          </tbody>
        </Table>
        <a href="customers/add">Add customer</a>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    customer: state.customer
  }
}


export default connect(mapStateToProps)(Customers)