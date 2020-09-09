import React from 'react'
import { connect } from 'react-redux'
import{ startAddDepartment, startDeleteDepartment } from '../../actions/departmentAction'
import { Form, Container, ListGroup, ButtonGroup, Button, Row, Col, Card } from 'react-bootstrap'
import './department.css'

class Departments extends React.Component{
  
  constructor(props){
    super(props)
    this.state = {
      name: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: this.state.name
    }
    this.props.dispatch(startAddDepartment(formData))
    
    this.setState({
      name:''
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleShow = (id) => {
    this.props.history.push(`/departments/${id}`)
  }

  handleDelete = (id) => {
    const redirect = () => {
      this.props.history.push('/departments')
    }

    const confirmRemove = window.confirm("Are you Sure")
    if(confirmRemove){
      this.props.dispatch(startDeleteDepartment(id, redirect))
    }
  }

  render(){
    console.log(this.props.department)
    let number = 0
    return(
      <Container>
      <Row>
        <Col md={8}>
          <h2>Departments - {this.props.department.length} </h2>
          <ListGroup>
            {
              this.props.department.map(ele => {
                return <ListGroup.Item key={ele._id}>{ele.name} 
                <ButtonGroup>
                <Button className="btn btn-success" onClick={() => {this.handleShow(ele._id)}}>Show</Button>
                &nbsp;&nbsp;<Button className="btn btn-danger" onClick={() => {this.handleDelete(ele._id)}}>remove</Button>
                </ButtonGroup>
                </ListGroup.Item>
              })
            }
          </ListGroup>
        </Col>
        <Col md={4}>
        <br/>
        <Card>
          <h2>Add Department</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Control type="text" 
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            /><br />
            <input type="submit"
            value="Add" className="btn btn-primary" />
          </Form>
          </Card>
        </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    department: state.department
  }
}

export default connect(mapStateToProps)(Departments)