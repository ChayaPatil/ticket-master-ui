const userInitialState = {}

const userReducer = (state = userInitialState, action) => {
  switch(action.type) {
    case 'SET_USER' : {
      return {...action.payload}
    }

    default : {
      return {...state}
      // return Object.assign({}, state)
    }
  }
}

export default userReducer