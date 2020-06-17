import axios from "../config/axios"

export const setEmployee = (employee) => {
  return { type: 'SET_EMPLOYEE', payload: employee}
}

export const startGetEmployee = () => {
  return(dispatch) => {
    axios.get('/employees', {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      const employee = response.data
      dispatch(setEmployee(employee))
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const startAddEmployee = (formData, redirect) => {
  return(dispatch) => {
    axios.post('/employees', formData, {
      headers:{
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      }
      else{
        const employee = response.data
        dispatch(setEmployee(employee))
        redirect()
      }
    })
  }
}

export const setEditEmployee = (employee) => {
  return { type: 'EDIT_EMPLOYEE', payload: employee}
}

export const startEditEmployee = (id, formData, redirect) => {
  return(dispatch) => {
    axios.put(`/employees/${id}`, formData, {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      } else{
        const employee = response.data
        console.log(employee)
        dispatch(setEditEmployee(employee))
        redirect()
      }
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const setDeleteEmployee = (id) => {
  return { type: 'DELETE_EMPLOYEE', payload: id }
}

export const startDeleteEmployee = (id, redirect) => {
  return(dispatch) => {
    axios.delete(`/employees/${id}`, {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response)  => {
      const employee = response.data
      dispatch(setDeleteEmployee(employee._id))
      redirect()
    })
    .catch((err) => {
      alert(err)
    })
  }
}