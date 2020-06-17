const initialEmployeeState = []

const employeeReducer = (state=initialEmployeeState, action) => {
  switch(action.type){
    case 'SET_EMPLOYEE' : {
      return state.concat(action.payload)
    }

    case 'EDIT_EMPLOYEE' : {
      return state.map((ele) => {
        if(ele._id === action.payload._id){
          return Object.assign({}, ele, action.payload)
        } else {
          return Object.assign ({}, ele)
        }
      })
    }

    case 'DELETE_EMPLOYEE' : {
      return state.filter(ele => ele._id !== action.payload)
    }

    default : {
      return [].concat(state)
    }
  }
}

export default employeeReducer