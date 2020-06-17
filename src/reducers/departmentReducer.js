const intialDepartmentState = []

const departmentReducer = (state=intialDepartmentState, action) => {
  switch(action.type){
    case 'SET_DEPARTMENT' : {
      return state.concat(action.payload)
    }

    case 'EDIT_DEPARTMENT' : {
      return state.map((ele) => {
        if(ele._id === action.payload._id){
          return Object.assign({}, ele, action.payload)
        } else {
          return Object.assign({}, ele)
        }
      })
    }

    case 'DELETE_DEPARTMENT' : {
      return state.filter(ele => ele._id !== action.payload)
    }

    default : {
      return [].concat(state)
    }
  }
}

export default departmentReducer