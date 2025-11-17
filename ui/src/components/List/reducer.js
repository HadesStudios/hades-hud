export const initialState = {
    // showing: process.env.NODE_ENV != 'production',
    showing: false,
    stack: Array(),
    active: process.env.NODE_ENV == 'production' ? null : 'main',
    menus: process.env.NODE_ENV == 'production' ? Array() : {
        main: {
            label: 'List Menu',
            items: [
                {
                    label: 'Item 1',
                    icon: 'brain',
                    description: 'Item 1 Description',
                    event: 'Triggered',
                },
                {
                    label: 'Item 2',
                    description: 'Item 2 Description',
                    submenu: 'Triggered',
                },
                {
                    label: 'Item 3',
                    description: 'Item 3 Description',
                    actions: [
                        {
                            icon: 'dragon',
                            event: 'Test',
                        },
                        {
                            icon: 'brain',
                            event: 'Test',
                        },
                    ]
                },
            ],
        },
        Triggered: {
            label: 'Triggered',
            items: [
                {
                    label: 'Item 1',
                    description: 'Item 1 Description',
                    event: 'Triggered',
                },
            ],
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIST_MENU':
            return {
                ...state,
                showing: true,
                active: 'main',
                menus: action.payload.menus,
            };
        case 'CHANGE_MENU':
            if (
                !Boolean(state.menus[action.payload.menu]) ||
                action.payload.menu == state.active
            )
                return state;

            return {
                ...state,
                active: action.payload.menu,
                stack: [...state.stack, state.active],
            };
        case 'LIST_GO_BACK':
            return {
                ...state,
                active:
                    state.stack.length > 0
                        ? state.stack[state.stack.length - 1]
                        : 'main',
                stack: state.stack.slice(0, -1),
            };
        case 'CLOSE_LIST_MENU':
            return {
                ...initialState,
            };
        default:
            return state;
    }
};
