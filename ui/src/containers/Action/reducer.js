export const initialState = {
    showing: false,//process.env.NODE_ENV != 'production',
    message: process.env.NODE_ENV == 'production' ? null : '{key}E{/key} open clothing store | {key}G{/key} open wardrobe',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_ACTION':
            return {
                ...state,
                message: action.payload.message,
                buttons: action.payload.buttons,
                showing: true,
            };
        case 'HIDE_ACTION':
            return {
                ...state,
                showing: false,
            };
        default:
            return state;
    }
};
