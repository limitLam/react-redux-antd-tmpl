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

import App from '../router';

const mountNode = document.getElementById('root');

const reRender = (Component) => {
    render(
        <AppContainer>
          <Component/>
        </AppContainer>,
        mountNode
    );
};

reRender(App);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../router', () => {
        // Preventing the hot reloading error from react-router
        unmountComponentAtNode(mountNode);

        reRender(App)
    });
}