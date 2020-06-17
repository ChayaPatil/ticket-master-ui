import axios from '../config/axios'

export const setDepartment = (department) => {
  return {type : 'SET_DEPARTMENT', payload: department}
}

export const startGetDepartment = () => {
  return(dispatch) =>{
    axios.get("/departments", {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      const department = response.data
      dispatch(setDepartment(department))
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const startAddDepartment = (formData) => {
  return(dispatch) => {
    axios.post("/departments", formData, {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      // console.log(response.data)
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      }else{
        const department = response.data
        dispatch(setDepartment(department))
      }
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const setEditDepartment = (department) => {
  return { type: "EDIT_DEPARTMENT", payload: department }
}

export const startEditDepartment =(id, formData, redirect) => {
  return(dispatch) => {
    axios.put(`/departments/${id}`, formData, {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      } else {
        const department = response.data
        dispatch(setEditDepartment(department))
        redirect()
      }
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const setDeleteDepartment = (id) => {
  return { type: "DELETE_DEPARTMENT", payload: id}
}

export const startDeleteDepartment = (id, redirect) => {
  return(dispatch) => {
    axios.delete(`/departments/${id}`, {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      const department = response.data
      dispatch(setDeleteDepartment(department._id))
    
    })
    .catch((err) => {
      alert(err)
    })
  }
}