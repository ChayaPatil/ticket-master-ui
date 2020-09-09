import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteTicket, startEditStatus } from '../../actions/ticketAction'
import { Table, Container, Button, Nav, Form, Row, Col, ProgressBar } from 'react-bootstrap'
import { Chart } from "react-google-charts";

class Tickets extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      code: '',
      isResolved : false,
      searchTickets: this.props.tickets,
      id: "pending"
    }
  }

  handleDelete = (id) => {
    const redirect = () => {
      this.props.history.push('/tickets')
    }
    const confirmRemove = window.confirm("Are you sure?")
      if(confirmRemove){
        this.props.dispatch(startDeleteTicket(id, redirect))
      }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleShow = (id) => {
    this.props.history.push(`tickets/${id}`)
  }

  handleSearch = (e) => {
    let newSearch = this.props.tickets.filter(ticket=> ticket.code.includes(e.target.value))
        this.setState({
            code: e.target.value,
            searchTickets: newSearch
        })
    }

    handleCheck = (id) => {
      const ticket = this.props.tickets.find(ele => ele._id == id)
      const isResolved = !ticket.isResolved
      this.props.dispatch(startEditStatus(id, isResolved))
    }

    handleStatus = (status) => {
      if(this.props.tickets.isResolved === this.state.isResolved){
        this.setState({ isResolved : 'pending'})
      }
    }

  render(){  
    
    const high = this.props.tickets.filter(ticket => ticket.priority === "high").length
    const medium = this.props.tickets.filter(ticket => ticket.priority === "Medium").length
    const low = this.props.tickets.filter(ticket => ticket.priority === "Low").length
    const data = [
      ['Priority', 'Tickets based on priority'],
      ['High', high],
      ['Medium', medium],
      ['Low', low],
    ]

    // const data1 = this.props.department.map(department => {
    //   return `${department.name}', '${this.props.tickets.filter(ele => ele.department == department._id).length}`
    // })
    // console.log(data1)

    return(
      <Container>
        <Nav variant="tabs" defaultActiveKey="pending">
          <Nav.Item>
            <Nav.Link onClick = {() => {this.handleStatus('pending')}}  active>Pending</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick = {() => {this.handleStatus('complete')}} >Completed</Nav.Link>
          </Nav.Item>
          <Nav.Item id="code">
        </Nav.Item>
        </Nav>
        <Form onSubmit={this.handleSubmit} id="searchForm" className="mb-3 ml-md-3">
          <Form.Control type="text" name="code" onChange={this.handleSearch} placeholder="Search Code" />
        </Form>

          {(this.state.code.length == 0) ? (
          <div id="pending">
          <h2>Tickets - {this.props.tickets.filter(ticket => ticket.isResolved == this.state.isResolved).length}</h2>
          <Table id="pending" responsive bordered striped>
              <thead>
                <tr>
                  <th>Code No</th>
                  <th>Customer</th>
                  <th>Department</th>
                  <th>Employees</th>
                  <th>Message</th>
                  <th>Priority</th>
                  <th>Action</th>
                  <th>Remove</th>
                  <th>Complete</th>
                </tr>
              </thead>
              <tbody>
              {
                (Object.keys(this.props.tickets).length !== 0) && (
                this.props.tickets.map((ticket) => {
                  const emp1 = ticket.employees.find(ele => (ele._id))
                  console.log(emp1)
                  return (
                    <tr key={ticket._id}>
                      <td>{ticket.code}</td>
                      <td>{this.props.customer.map(ele => {return (ele._id === ticket.customer) && ele.name})}</td>
                      <td>{this.props.department.map(ele => {return (ele._id == ticket.department) && ele.name})}</td>
                      <td>{this.props.employees.map(ele => {return (ele._id == emp1._id) && ele.name})}</td>
                      <td>{ticket.message}</td>
                      <td>{ticket.priority}</td>
                      <td><Button className="btn btn-success" onClick={() => {this.handleShow(ticket._id)}}>Show</Button></td>
                      <td><Button className="btn btn-danger" onClick={() => {this.handleDelete(ticket._id)}}>Remove</Button></td>
                      <td><input type="checkbox" name="completed" checked={this.state.isResolved.checked} 
                      onChange={() => {this.handleCheck(ticket._id)}} /></td>
                    </tr>
                  )
                })
                )
              }
              </tbody>
            </Table>
          </div>
        ) : (
          <div id="complete">
          <h2>Tickets - {this.props.tickets.filter(ticket => !ticket.isResolved).length}</h2>
          <Table responsive bordered striped>
              <thead>
                <tr>
                  <th>Code No</th>
                  <th>Customer</th>
                  <th>Department</th>
                  <th>Employees</th>
                  <th>Message</th>
                  <th>Priority</th>
                  <th>Action</th>
                  <th>Remove</th>
                  <th>Complete</th>
                </tr>
              </thead>
              <tbody>
              {
                (Object.keys(this.state.searchTickets).length !== 0) && (
                this.state.searchTickets.map((ticket) => {
                  const emp1 = ticket.employees.find(ele => (ele._id))
                  return (
                    <tr key={ticket._id}>
                      <td>{ticket.code}</td>
                      <td>{this.props.customer.map(ele => {return (ele._id === ticket.customer) && ele.name})}</td>
                      <td>{this.props.department.map(ele => {return (ele._id == ticket.department) && ele.name})}</td>
                      <td>{this.props.employees.map(ele => {return (ele._id == emp1._id)&& ele.name})}</td>
                      <td>{ticket.message}</td>
                      <td>{ticket.priority}</td>
                      <td><Button className="btn btn-success" onClick={() => {this.handleShow(ticket._id)}}>Show</Button></td>
                      <td><Button className="btn btn-danger" onClick={() => {this.handleDelete(ticket._id)}}>Remove</Button></td>
                      <td><input type="checkbox" name="completed" checked={this.state.isResolved.checked} 
                      onChange={() => {this.handleCheck(ticket._id)}} /></td>
                    </tr>
                  )
                })
                )
              }
              </tbody>
            </Table>
          </div>
        )}
        <Link to={`/tickets/add`}>Add Ticket</Link>
        <ProgressBar animated value={!this.state.isResolved} now={100} />

        <Row>
          <Col>
            <Chart width={'700px'} height={'400px'} chartType="PieChart" loader={<div>Loading Chart</div>}
            data={data} options={{ title: 'Tickets Priority', pieHole: 0.4, is3D: true}} />
          </Col>
          <Col>
            <Chart width={'800px'} height={'400px'} chartType="PieChart" loader={<div>Loading Chart</div>}
            data={data} options={{ title: 'Tickets Priority', pieHole: 0.4, is3D: true}} />
            {/*<Chart width={'500px'} height={'300px'} chartType="Bar" loader={<div>Loading Chart</div>}
            data={data1} options={{ chart: { title: 'Tickets By Department', },}} />*/}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tickets : state.ticket,
    customer : state.customer,
    department : state.department,
    employees : state.employees
  }
}

export default connect(mapStateToProps)(Tickets)