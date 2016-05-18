var React  = require('react');

module.exports = React.createClass({
  render: function() {
  		var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Avg", "Sen", "Oct", "Nov", "Dec"];
  		var days= {};
  		this.props.forecast.map(function iterator(item){
  			var dt=new Date(item.dt * 1000);  //we should work better with timezones
			var day=dt.getDate() +' '+ month[dt.getMonth()];
    		item.hourTxt=("0"+dt.getHours()).slice(-2)+':'+("0"+dt.getMinutes()).slice(-2);
			if(days[day])
  				days[day].push(item);
  			else
		    	days[day]=[item];
  		});
  		var elements=[];
  		for(k in days){
  			var day=days[k];
  			var contents;
  			if(!this.props.showDetails)
  				contents=React.createElement('p', {className: 'bg-success'}, 'TODO: show aggregate');
  			else
				contents=day.map(function iter2(hour){
					var temp=temp=Math.round(10*hour.main.temp)/10;
					return (
						React.createElement('div', {className: 'thumbnail'}, 
						[
							React.createElement('img', {src: 'http://openweathermap.org/img/w/'+hour.weather[0].icon+'.png'}),
							React.createElement('div', {className: 'caption'},
								React.createElement('p', {className: ''}, hour.weather[0].description),
								React.createElement('h4', {className: ''}, temp),
								React.createElement('div', {className: 'label label-default'}, hour.hourTxt)
							)	
						])
					);
				})
  			elements.push( 
  				React.createElement('div', {className: 'col-md-2 text-center'},
  				[
  					React.createElement('h4', null, k),
					contents
  				])
  			);
  		}
    	return React.createElement('div', {className: 'row'}, elements);
  }
});