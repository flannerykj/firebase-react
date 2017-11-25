var A = require("../../actions"),
	initialState = require("../initialstate"),
	_ = require("lodash");


module.exports = function(currentstate,action){
	var newstate;
	switch(action.type){
		case C.CREATE_ARTIST:
			newstate = _.cloneDeep(currentstate);
			newstate.states[action.qid] = C.SUBMITTING_QUOTE;
			return newstate;
		default: return currentstate || initialState.works;
	}
};
