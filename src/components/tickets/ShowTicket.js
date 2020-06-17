import React from 'react'
import  { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import './ticket.css'

class ShowTicket extends React.Component{

  render(){
    return(
      <Container>
{/*      <Button variant="secondary"><Link to={`/tickets/${this.props.match.params.id}`}>Back</Link></Button>*/}      {
        (this.props.ticket) && (
        <Card>
        <Card.Body>
          <Card.Title>Code Number -{this.props.ticket.code}</Card.Title>
          <h5 id="link"><Link to={`/tickets/edit/${this.props.ticket._id}`}>Edit</Link></h5>
          <Card.Text>Customer - {this.props.customer.find(ele => ele._id === this.props.ticket.customer).name}</Card.Text>
          <Card.Text>Department - {this.props.department.find(ele => ele._id === this.props.ticket.department).name}</Card.Text>
          <Card.Text>Priority - {this.props.ticket.priority}</Card.Text>
          <Card.Text>Employees - {}</Card.Text>
          <Card.Text>Message - {this.props.ticket.message}</Card.Text>
          </Card.Body>
        </Card>
        )
      }
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ticket : state.ticket.find(ticket => ticket._id === props.match.params.id),
    customer : state.customer,
    employees : state.employees,
    department : state.department,
  }
}

export default connect(mapStateToProps)(ShowTicket)