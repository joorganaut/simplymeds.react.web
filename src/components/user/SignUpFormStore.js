const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
const RECEIVE_RESPONSE = 'RECEIVE_RESPONSE';
const initialState = { apiReceivedResponse: [], isLoading: false };
const UrlEnpoint = "api";

export const actionCreators = {

    submitForm: (userAccount) => {

        return async function (dispatch) {

            const userAccountDetails = JSON.stringify({
                fullName: userAccount.FullName,
                emailAddress: userAccount.EmailAddress,
                mobilePhoneNumber: userAccount.MobilePhoneNumber,
                password: userAccount.Password,
            });

            let response = await fetch(UrlEnpoint, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: userAccountDetails
            })

            let responseJSON = await response.json()

            function dispatchSubmit(resp) {
                dispatch({
                    type: RECEIVE_RESPONSE,
                    apiReceivedResponse: resp
                })
            }

            return dispatchSubmit(await responseJSON)
        }
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === SUBMIT_REQUEST) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === RECEIVE_RESPONSE) {
        return {
            ...state,
            apiReceivedResponse: action.apiReceivedResponse,
            isLoading: false
        };
    }

    return state;
};