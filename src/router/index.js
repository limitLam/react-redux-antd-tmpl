import React from 'react';
import {
	applyRouterMiddleware,
	browserHistory,
	Router
} from 'react-router';
import {
	useScroll
} from 'react-router-scroll';

import routes from './routes';

const RouterComponent = () => (
	<Router
	    history={browserHistory}
	    routes={routes}
	    render={applyRouterMiddleware(useScroll())}
	/>
);

export default RouterComponent;