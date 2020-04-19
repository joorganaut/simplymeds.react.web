import { combineReducers } from 'redux'
import {
  ADD_ITEM,
  REMOVE_ITEM
} from '../action-types/cartActions'


function Items(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case REMOVE_ITEM:
        return [
            ...state,
            {
              text: action.text,
              completed: false
            }
          ]
    default:
      return state
  }
}

const Cart = combineReducers({
  Items
})

export default Cart