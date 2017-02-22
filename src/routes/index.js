/*
    react-router
    按需加载
*/
import React from 'react';
import {
    Route,
    IndexRoute
} from 'react-router';

//  layout
import Layout from 'PAGES/layout';

import Index from 'PAGES/index';


//  test
import test from 'PAGES/test';

//  404
import Error404 from 'PAGES/404';

//  输出路由
export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Index}/>
        <Route path="index" indexRoute={ { onEnter: (nextState, replace) => replace('/') } } />
        <Route path="test" component={test} />
        <Route path="*" component={Error404} />
    </Route>
);