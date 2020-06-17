import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import {setGetUser} from './actions/userAction'
import { startGetCustomer } from './actions/customerAction'
import { startGetDepartment } from './actions/departmentAction'
import { startGetEmployee } from './actions/employeeAction'
import { startGetTicket } from './actions/ticketAction'

const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
  console.log(store.getState())
})

// handle page reloads
if(localStorage.getItem('authToken')){
  store.dispatch(setGetUser())
  store.dispatch(startGetCustomer())
  store.dispatch(startGetDepartment())
  store.dispatch(startGetEmployee())
  store.dispatch(startGetTicket())
}

const jsx = (
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))