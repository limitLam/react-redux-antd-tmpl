import {
	combineReducers
} from 'redux';

import index from 'PAGES/index/reducer';
import test from 'PAGES/test/reducer';

const reducer = combineReducers({
	index,
	test
});

export default reducer;