// Action
const action = {
    onCollapse: (payload) => {
        return {
            type: 'ONCOLLAPSE',
            payload: payload
        }
    },
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCollapse: (collapsed) => {
            let payload = {
                collapsed,
                mode: collapsed ? 'vertical' : 'inline',
            }
            dispatch(action.onCollapse(payload));
        },
    };
};

export default mapDispatchToProps;