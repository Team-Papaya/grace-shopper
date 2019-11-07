import axios from 'axios'

const GET_PURCHASEPROFILES = 'GET_PURCHASEPROFILES'

const getPurchaseProfiles = purchaseProfiles => ({
  type: GET_PURCHASEPROFILES,
  purchaseProfiles
})

export const getPurchaseProfilesThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/purchaseProfiles`)
    dispatch(getPurchaseProfiles(data))
  } catch (error) {
    console.error(error)
  }
}

const purchaseProfilesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PURCHASEPROFILES:
      return action.purchaseProfiles
    default:
      return state
  }
}
export default purchaseProfilesReducer
