import axios from '../config/axios'

export const setUser = (user) => {
  return{ type : 'SET_USER', payload: user}
}

export const startLoginUser = (formData, redirect) => {
  return(dispatch) => {
    axios.post("/users/login", formData)
    .then((response) => {
      // console.log(response.data)
      if(response.data.hasOwnProperty('error')){
        alert(response.data.message)
      }else{
        alert("Successfully logged in")
        localStorage.setItem("authToken", response.data.token)
        axios.get("/users/account", {
          headers: {
            'x-auth' : localStorage.getItem('authToken')
          }
        })
        .then((response) => {
          const user = response.data
          // console.log(user)
          dispatch(setUser(user))
          redirect()
        })
        .catch((err) => {
          alert(err)
        })
        redirect()
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export const setGetUser = () => {
  return(dispatch) => (
    axios.get("/users/account", {
      headers : {
        'x-auth' : localStorage.getItem('authToken') 
      }
    })
    .then((response) => {
      const user = response.data
      // console.log(user)
      dispatch(setUser(user))
    })
    .catch((err) => {
      alert(err)
    })
  )
}

export const startUserLogout = () => {
  return(dispatch) => (
    axios.delete("/users/logout", {
      headers : {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then((response) => {
      if(response.data.notice) {
        alert(response.data.notice)
        localStorage.removeItem('authToken')
        dispatch(setUser({}))
        window.location.href = "/"
      }
    })
  )
}

export const startRegisterUser = (formData, redirect) => {
  return(dispatch) => (
    axios.post('/users/register', formData)
    .then((response) => {
      // console.log('data', response.data)
      if(response.data.hasOwnProperty('errors')){
        alert(response.data.message)
      }else{
        alert("you have been registered successfully")
        redirect()
        // props.history.push("/users/login") -- if props is passed as arument
      }
    })
    .catch((err) => {
      console.log(err)
    })
  )
}