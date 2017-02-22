import {
	combineReducers
} from 'redux';

import layout from 'PAGES/layout/reducer';
import index from 'PAGES/index/reducer';
import test from 'PAGES/test/reducer';

const reducer = combineReducers({
	layout,
	index,
	test
});

export default reducer;