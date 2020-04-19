export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }
  /*
 * action creators
 */

export function addItem(text) {
    return { type: ADD_ITEM, text }
  }
  
  export function removeItem(text) {
    return { type: REMOVE_ITEM, text }
  }
  
  export function setVisibilityFilter(filter) {
    return { type: SET_VISIBILITY_FILTER, filter }
  }