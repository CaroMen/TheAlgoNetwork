const GET_REVIEW_LIST = "reviews/GET_REVIEW_LIST";
const ADD_TO_REVIEW = "reviews/ADD_TO_REVIEW";

// ACTIONS ----------------------------


const getReviewList = (reviews) => ({
    type: GET_REVIEW_LIST,
    reviews
});

const addProblem = (review) => ({
    type: ADD_TO_REVIEW,
    review
})


// THUNKS ------------------------------------------------------

export const getAllReviews = (id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`);

    if (res.ok) {
        let data = await res.json()
        dispatch(getReviewList(data))
    }
};


export const addProblemToReview = (id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${id}`);

    if (res.ok) {
        let data = await res.json()
        dispatch(addProblem(data))
    }
}


// REDUCER ------------------------------------------------------

let initialState = {
    reviews: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW_LIST:
            return {
                ...state,
                reviews: action.reviews
            }
        default:
            return state;
    }
}
