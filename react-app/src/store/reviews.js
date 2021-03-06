const GET_REVIEW_LIST = "reviews/GET_REVIEW_LIST";
const ADD_TO_REVIEW = "reviews/ADD_TO_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// ACTIONS ----------------------------


const getReviewList = (reviews) => ({
    type: GET_REVIEW_LIST,
    reviews
});

const addProblem = (problem, user, checked) => ({
    type: ADD_TO_REVIEW,
    payload: {
        problem,
        user,
        checked
    }
});

const deleteProblem = (problem) => ({
    type: DELETE_REVIEW,
    problem
})

// THUNKS ------------------------------------------------------

export const getAllReviews = (userId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${userId}`);

    if (res.ok) {
        let data = await res.json()
        dispatch(getReviewList(data))
    }
};


export const addProblemToReview = (problemId, userId, checked) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${problemId}/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked, userId, problemId })
    });

    if (res.ok) {
        dispatch(addProblem(problemId, userId, checked))
    }
};


export const deleteProblemFromReview = (problemId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${problemId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        let data = await res.json();

        dispatch(deleteProblem(data));
    }
};


// REDUCER ------------------------------------------------------

let initialState = {
    reviews: {},
}

export default function reducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case GET_REVIEW_LIST:
            return {
                ...state,
                reviews: action.reviews
            }
        case ADD_TO_REVIEW:
            return {
                ...state,
                ...state.reviews,
                reviews: { ...state.reviews, [action.payload.user]: action.payload }
            }
        case DELETE_REVIEW:
            newState = { ...state, reviews: { ...state.reviews } };

            delete newState['reviews'][action.problem.problems_id];

            return newState;
        default:
            return state;
    }
}
