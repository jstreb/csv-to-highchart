var fs = require('fs');

var chartJSONObject = {
  chart: {
    renderTo: 'container',
    type: 'line',
    marginRight: 130,
    marginBottom: 25
  },
  title: {
    text: '',
    x: -20 //center
  },
  yAxis: {
    plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
    }]
  },
  tooltip: {
    formatter: function() {
      return '<b>'+ this.series.name +'</b>';
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -10,
    y: 100,
    borderWidth: 0
  }
};

module.exports.index = function( req, res ) {
  res.render('index', { title: 'Home' });
};

module.exports.csvToJSON = function(req, res) {
  var data = req.body;
  console.log( data );
  var file = fs.readFileSync( req.files['csv'].path, 'utf8' );
  var lines = file.split("\r\n");
  var xAxisVals = [];
  var series = [];
  var pieces;
  
  for( var i=0; i<lines.length; i++) {
    pieces = lines[i].split(",");
    
    //setup the series
    if( i === 0) {
      for( var j=1; j<pieces.length; j++) {
        series.push( { name: pieces[j], data: [] } );
      }
    }
    
    //Push the series and xaxis info into place.
    if( i !== 0 && pieces.length > 0 ) {
      xAxisVals.push(pieces[0]);
      for( var j=1; j<pieces.length; j++) {
        series[j-1].data.push(parseFloat(pieces[j]));
      }
    }
  }
  
  chartJSONObject.xAxis =  { categories: xAxisVals, title: { text: data.x, offset: -15 } };
  chartJSONObject.yAxis.title = { text: data.y };
  chartJSONObject.series = series;
  chartJSONObject.title.text = data.title;
  
  res.send( chartJSONObject );
}