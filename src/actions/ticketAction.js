import axios from '../config/axios'

export const setTicket = (ticket)  => {
  return { type: 'SET_TICKET', payload : ticket}
}

export const startGetTicket = () => {
  return(dispatch) => {
    axios.get('/tickets', {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      const ticket = response.data
      dispatch(setTicket(ticket))
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const startAddTicket = (formData, redirect) => {
  return(dispatch) => {
    axios.post('/tickets', formData, {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      // console.log(response.data)
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      } 
      else {
        const ticket = response.data
        console.log(ticket)
        dispatch(setTicket(ticket))
        redirect()
      }
    })
    .catch((err) => {
      alert(err)
    })
  }
}

export const setDeleteTicket = (id) => {
  return { type: 'DELETE_TICKET', payload : id }
}

export const startDeleteTicket = (id, redirect) => {
  return(dispatch) => {
      axios.delete(`/tickets/${id}`, {
        headers : {
          'x-auth' : localStorage.getItem('authToken')
        }
      })
      .then((response) => {
        const ticket = response.data
        dispatch(setDeleteTicket(ticket._id))
        redirect()
      })
      .catch((err) => {
        alert(err)
      })
    }
  }

  export const setEditTicket = (ticket) => {
    return {type: 'EDIT_TICKET', payload : ticket }
  }

  export const startEditTicket = (id, formData, redirect) => {
    return(dispatch) => {
      axios.put(`/tickets/${id}`, formData, {
        headers : {
          'x-auth' : localStorage.getItem('authToken')
        }
      })
      .then((response) => {
        if(response.data.hasOwnProperty('errors')){
          alert(response.data.message)
        } else {
          const ticket = response.data
          dispatch(setEditTicket(ticket))
          redirect()
        }
      })
      .catch((err) => {
        alert(err)
      })
    }
  }