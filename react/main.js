// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var CityList = React.createFactory(require('./CityList.js'));

ReactDOM.render(
	React.createElement(CityList,{
    	cities: ["London", "Madrid", "Paris"],
    	units: "imperial",
    	language: "en"
    }),
  	document.getElementById('cityist')
);