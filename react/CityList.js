var React  = require('react');
var City = React.createFactory(require('./City.js'));

module.exports = React.createClass({
  render: function() { 	
  		var units=this.props.units;
  		var lang=this.props.lang;
  		var cities=this.props.cities.map(function iterator(item){
  			return React.createElement(City, {city: item, units:units, lang:lang });
  		});
  		return React.createElement('div', {className:"container"}, cities); 
  }
});
