import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import customerReducer from '../reducers/customerReducer'
import departmentReducer from '../reducers/departmentReducer'
import employeeReducer from '../reducers/employeeReducer'
import ticketReducer from '../reducers/ticketReducer'

const configureStore = () => {
  const store = createStore(combineReducers({
    user: userReducer,
    customer: customerReducer,
    department : departmentReducer,
    employees : employeeReducer,
    ticket : ticketReducer
  }), applyMiddleware(thunk))
  return store
}

export default configureStore