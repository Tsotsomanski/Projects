const initState = {
    posts: [
        {id: '1', title: 'Squirtle laid an egg', body: 'Lorem ipsum, dolor, sit amet const...'},
        {id: '2', title: 'Squirtle laid an egg', body: 'Lorem ipsum, dolor, sit amet const...'},
        {id: '3', title: 'Squirtle laid an egg', body: 'Lorem ipsum, dolor, sit amet const...'}
    ]
};

const rootReducer = (state = initState, action) => {
    if (action.type === 'DELETE_POST') {
        let newPosts = state.posts.filter(post => {
            return action.id !== post.id
        });
        return {
            ...state,
            posts: newPosts
        }
    }
    return state;
};

export default rootReducer;