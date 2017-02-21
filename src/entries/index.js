// 入口文件
import React from 'react';
import {
    render,
    unmountComponentAtNode
} from 'react-dom';

import {
    AppContainer
} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import {
    Provider
} from 'react-redux';

import store from '../store';
import {
    applyRouterMiddleware,
    browserHistory,
    Router
} from 'react-router';
import {
    useScroll
} from 'react-router-scroll';

import routes from '../routes';


const mountNode = document.getElementById('root');

const reRender = (Component) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <Router
                    history={browserHistory}
                    routes={routes}
                    render={applyRouterMiddleware(useScroll())}
                />
            </Provider>
        </AppContainer>,
        mountNode
    );
};

reRender();

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../routes', () => {
        // Preventing the hot reloading error from react-router
        unmountComponentAtNode(mountNode);

        reRender();
    });
}