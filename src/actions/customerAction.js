import axios from '../config/axios'

export const setCustomer = (customer) => {
  return {type: 'SET_CUSTOMER', payload : customer}
}

export const startGetCustomer = () => {
  return(dispatch) => {
    axios.get("/customers", {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      const customer = response.data
      dispatch(setCustomer(customer))
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const startGetAddCustomer = (formData, redirect) => {
  return(dispatch) => {
    axios.post('/customers', formData, {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      // console.log('data', response.data)
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      }else{
        const customer = response.data
        dispatch(setCustomer(customer))
        redirect()
      }
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const setDeleteCustomer = (id) => {
  return { type: 'DELETE_CUSTOMER', payload : id }
}

export const startDeleteCustomer = (id, redirect) => {
  return(dispatch) => {
      axios.delete(`/customers/${id}`, {
        headers : {
          'x-auth' : localStorage.getItem('authToken')
        }
      })
      .then((response) => {
        const customer = response.data
        dispatch(setDeleteCustomer(customer._id))
        redirect()
      })
      .catch((err) => {
        alert(err)
      })
    }
  }

  export const setEditCustomer = (customer) => {
    return {type: 'EDIT_CUSTOMER', payload : customer }
  }

  export const startEditCustomer = (id, formData, redirect) => {
    return(dispatch) => {
      axios.put(`/customers/${id}`, formData, {
        headers : {
          'x-auth' : localStorage.getItem('authToken')
        }
      })
      .then((response) => {
        if(response.data.hasOwnProperty('errors')){
          alert(response.data.message)
        } else {
          const customer = response.data
          dispatch(setEditCustomer(customer))
          redirect()
        }
      })
      .catch((err) => {
        alert(err)
      })
    }
  }
