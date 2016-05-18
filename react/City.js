var React  = require('react');
var Forecast = React.createFactory(require('./Forecast.js'));

module.exports = React.createClass({
  getInitialState: function() {
    return {
    	message:"",
    	forecast: null,
    	showDetails:true
    };
  },
  componentDidMount: function() {
  	var api_url = "http://api.openweathermap.org/data/2.5/forecast?";
	var api_id  = "def2c113705d20838f719c331c051afb";
    var url=api_url;
    url+='q=' + this.props.city;
    url+='&units=' + this.props.units;
    url+='&lang=' + this.propslang;
    url+='&mode=json';
    url+='&appid=' + api_id;
    this.setState({message: "Loading..."});
    this.serverRequest = $.get(url, function (result) {
      if(result.city && result.list){
      	this.setState({
        	message:"",
        	forecast: result
      	});
      }
      else
      	this.setState({message: "Error..."});
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  detailsChange: function() {
  	this.setState({showDetails: !this.state.showDetails});
  },
  render: function() {
  	if(this.state.forecast){
  		var buttonText="Show details";
  		if(this.state.showDetails){
  			buttonText="Hide details"
  		}
  		var h=React.createElement('div', {className: "panel panel-default" }, 
  			React.createElement("div", {className: "panel-heading"}, [
  				React.createElement("h3",{className: "panel-title"},[
  					this.state.forecast.city.name + " "+this.state.forecast.city.country, 
  					React.createElement("button",{className: "btn btn-default", style: {'margin-left':"1em"}, onClick:this.detailsChange},buttonText)
  				]),
  				
  			])
  		);
  		
  		var fc=React.createElement('div', { className: 'panel-body' }, 
  			React.createElement(Forecast, {forecast: this.state.forecast.list, showDetails: this.state.showDetails})
  		);
    	return React.createElement('div', { className: 'panel panel-default' }, [h, fc]);
    }
    else
    	return React.createElement('h1', { className: 'city' }, this.state.message);
  }
});
