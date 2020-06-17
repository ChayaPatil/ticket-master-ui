const initialTicketState = []

const ticketReducer = (state=initialTicketState, action) => {
  switch(action.type){

    case 'SET_TICKET' : {
      return state.concat(action.payload)
    }

    case 'DELETE_TICKET' : {
      return state.filter(ele => ele._id !== action.payload)
    }

    default : {
      return [].concat(state)
    }
  }
}

export default ticketReducer