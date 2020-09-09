const initialTicketState = []

const ticketReducer = (state=initialTicketState, action) => {
  switch(action.type){

    case 'SET_TICKET' : {
      return state.concat(action.payload)
    }

    case 'EDIT_TICKET' : {
      return state.map((ele) => {
        if(ele._id === action.payload._id){
          return Object.assign({}, ele, action.payload)
        } else {
          return Object.assign ({}, ele)
        }
      })
    }

    case 'DELETE_TICKET' : {
      return state.filter(ele => ele._id !== action.payload)
    }

    case 'SET_STATUS' : {
      return state.concat(action.payload)
    }

    default : {
      return [...state]
    }
  }
}

export default ticketReducer