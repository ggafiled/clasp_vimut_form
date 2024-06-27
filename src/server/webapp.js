const { render } = require('../functions/utils');

const Route = {};
Route.path = function (routeName, callback) {
  Route[routeName] = callback;
};

function loadUi() {
  return render('index');
}

const doGet = (e) => {
  Route.path('foodhouse', loadUi);
  if (Route[e.parameters.v]) {
    return Route[e.parameters.v]();
  }
  return render('404');
};

module.exports = {
  doGet,
};
