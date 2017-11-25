var Redux = require("redux"),
  //artistReducer = require("./artist"),
  workReducer = require("./work");

var rootReducer = Redux.combineReducers({
  works: workReducer
});

module.exports = rootReducer;

