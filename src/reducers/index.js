import {
	combineReducers
} from 'redux';

import layout from 'PAGES/layout/reducer';
import test from 'PAGES/test/reducer';

const reducer = combineReducers({
	layout,
	test
});

export default reducer;