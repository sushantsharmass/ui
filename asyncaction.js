const redux = require('redux')
const axios = require('axios')
const middleware = redux.applyMiddleware
const thunkmiddleware = require('redux-thunk').default
const createstore = redux.legacy_createStore


//Create State
const initialState = {
  loading: false,
  users: [],
  error: '',
}

//Create Action
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEED = 'FETCH_USERS_SUCCED'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// Action 

const fetchuserrequested = () => {
  return {
    type: FETCH_USERS_REQUESTED
  }
}

const fetchusersucceed = (users) => {
  return {
    type: FETCH_USERS_SUCCEED,
    payload: users
  }
}

const fetchuserfailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    paylload: error
  }
}

//Action Creators 
const fetchusers = () => {
  return function(dispatch) {
    dispatch(fetchuserrequested())
    //response.data is user 
    axios.get('https://jsonplaceholder.typicode.com/users').then(() => {
      const users = response.data.map((users) => users.id)
      dispatch(fetchusersucceed(users))
    }).catch(error => {
      //error messgae 
      dispatch(fetchuserfailure(error.message))
    })
  }
}



//Craete Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCEED:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      }
  }
}


// Creating Store
const store = createstore(reducer, middleware(thunkmiddleware))

//subscribe 

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(fetchusers())
