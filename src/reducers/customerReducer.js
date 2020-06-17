const initialCustomerState = []

const customerReducer = (state=initialCustomerState, action) => {
  switch(action.type){

    case 'SET_CUSTOMER' : {
      return state.concat(action.payload)
    }

    case 'DELETE_CUSTOMER' : {
      return state.filter(ele => ele._id !== action.payload)
    }
    
    case 'EDIT_CUSTOMER' : {
      return state.map((ele) => {
        if(ele._id === action.payload._id){
          return Object.assign({}, ele, action.payload)
        }
        else{
          return Object.assign({}, ele)
        }
      })
    }

    default: {
      return [].concat(state)
    }
  }
}

export default customerReducer