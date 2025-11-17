export const initialState = {
    show: false, //process.env.NODE_ENV != 'production'
    menuItems:  process.env.NODE_ENV == 'production' ? Array() : [
        {
            id: 1,
            label: 'Home',
            icon: 'fa-home',
            shouldShow: true,
            action: 'navigateHome',
            labelFunc: null,
        },
        {
            id: 2,
            label: 'Brainstorm',
            icon: 'fa-lightbulb',
            shouldShow: true,
            action: 'openIdeas',
            labelFunc: null,
        },
        {
            id: 3,
            label: 'User Settings',
            icon: 'fa-user-cog',
            shouldShow: true,
            action: 'openSettings',
            labelFunc: null,
        },
        {
            id: 4,
            label: 'Search',
            icon: 'fa-search',
            shouldShow: true,
            action: 'searchContent',
            labelFunc: null,
        },
        {
            id: 5,
            label: 'Notifications',
            icon: 'fa-bell',
            shouldShow: true,
            action: 'showNotifications',
            labelFunc: null,
        },
        {
            id: 6,
            label: 'Calendar',
            icon: 'fa-calendar-alt',
            shouldShow: true,
            action: 'openCalendar',
            labelFunc: null,
        },
        // {
        //     id: 7,
        //     label: 'Messages',
        //     icon: 'fa-envelope',
        //     shouldShow: true,
        //     action: 'viewMessages',
        //     labelFunc: null,
        // },
        // {
        //     id: 8,
        //     label: 'Tasks',
        //     icon: 'fa-tasks',
        //     shouldShow: true,
        //     action: 'openTasks',
        //     labelFunc: null,
        // },
        // {
        //     id: 9,
        //     label: 'Help',
        //     icon: 'fa-question-circle',
        //     shouldShow: true,
        //     action: 'openHelp',
        //     labelFunc: null,
        // },
        // {
        //     id: 10,
        //     label: 'Logout',
        //     icon: 'fa-sign-out-alt',
        //     shouldShow: true,
        //     action: 'logout',
        //     labelFunc: null,
        // },
        // {
        //     id: 11,
        //     label: 'Dashboard',
        //     icon: 'fa-chart-line',
        //     shouldShow: true,
        //     action: 'openDashboard',
        //     labelFunc: null,
        // },
    ],    
    layer: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_INTERACTION_MENU':
            return {
                ...state,
                show: action.payload.toggle,
            };
        case 'SET_INTERACTION_LAYER':
            return {
                ...state,
                layer: action.payload.layer,
            };
        case 'SET_INTERACTION_MENU_ITEMS':
            return {
                ...state,
                menuItems: action.payload.items.sort((a, b) => a.id - b.id),
            };
        default:
            return state;
    }
};
