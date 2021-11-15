import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


// this function adds an image and caption to the existing state list
function addImage(state, { image = null, caption = '' }) {
  return state.concat({ image, caption })
}

function images (state = [], action) {
  switch (action.type) {
    case 'ADD_IMAGE':
      return addImage(state, action)
    case 'CLEAR_IMAGES':
      return []
    default:
      return state
  }
}

const rootReducer = combineReducers({
  images,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)

export default { store, persistor }
