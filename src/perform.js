// Copyright 2013 Namukaba Hichilo[hichilon@berea.edu]. All Rights Reserved


(function(window,undefined){
	
	if(!window.performance){
		if(window.console) window.console.log("Navigation Timing API is supported in this browser");
		return;
	}
	
	/**
	* This is the constructor. 
	*
	* @constructor 
	*/
	function Perform(){
		this.p = window.performance.timing;  //Store a short cut to the Navigation Timing API
		this.lookUp = ["loadTime","latency","connectTime","dnsLatency","documentLoad"];  //Stores the stats we are interested in. More will be added in the future
		this.data = this.data || {};  //Create an object to store our stats only if we haven't created it already
	};
	
	/**
	* Gets the duration the page took to load
	* 
	* @method loadTime 
	* @return {int} Returns the duration(milliseconds) it took the page to load
	*/
	Perform.prototype.loadTime = function(){	
		var now = new Date().getTime();
		var end = this.p.loadEventEnd ? this.p.loadEventEnd : now;
		this.data.loadTime = {
			"startTime" : 0,
			"duration" : end-this.p.navigationStart
		};
		return this.data.loadTime.duration;
	};
	
	/**
	* Gets the time(milliseconds) the user agent started making the request(startTime) 
	* and the time it received the first response byte from the server.The difference 
	* between these two values is the network latency
	*
	* @method latency
	* @return {int} Returns the value of the network's latency
	*/
	Perform.prototype.latency = function(){
		this.data.latency = {
			"startTime" : this.p.requestStart-this.p.navigationStart,
			"duration" : this.p.responseStart-this.p.requestStart
		};
		return this.data.latency.duration;
	};
	
	/**
	* Gets the time it took the user agent to establish a connection with the server.
	*
	* @method connectTime
	* @return {int} Returns the time it took the user agent to make a connection to the server.
	*/
	Perform.prototype.connectTime = function(){
		this.data.connectTime = {
			"startTime" : this.p.connectStart-this.p.navigationStart,
			"duration" : this.p.connectEnd-this.p.connectStart
		};
		return this.data.connectTime.duration;
	};
	
	/**
	* Gets the time it took the user agent to make a DNS look up.
	*
	* @method dnsLatency
	* @return {int} Returns the time it took the user agent to make a DNS look up.
	*/
	Perform.prototype.dnsLatency = function(){
		this.data.dnsLatency = {
			"startTime" : this.p.domainLookupStart-this.p.navigationStart,
			"duration" : this.p.domainLookupEnd-this.p.domainLookupStart
		};
		return this.data.dnsLatency.duration;
	};
	
	/**
	* Gets the time it took the user agent to load the requested document.
	*
	* @method documentLoad
	* @return {int} Returns the time it took the user agent to load the document.
	*/
	Perform.prototype.documentLoad = function(){
		this.data.documentLoad = {
			"startTime" : this.p.domLoading-this.p.navigationStart,
			"duration" : this.p.domComplete-this.p.domLoading  
		};
		return this.data.documentLoad.duration;
	};
	
	
	/**
	* Gets all the performance stats that we are interestd in and stores them in the data object.
	*
	* @method getData
	* @return {object} Returns all the performance stats as an object.
	*/
	Perform.prototype.getData = function(){
		for(var key = 0;key < this.lookUp.length;key++){
			if(!this.data[this.lookUp[key]])
				this[this.lookUp[key]]();
		}
		return this.data;
	}
	
	var _viewChart = function(data){
			
		google.setOnLoadCallback(drawChart);
		function drawChart() {
			var LoadTime = "Stats";
			var container = window.document.getElementsByTagName('body')[0];
			var chart = new google.visualization.Timeline(container);

			var dataTable = new google.visualization.DataTable();
			dataTable.addColumn({ type: 'string', id: 'Name' });
			dataTable.addColumn({ type: 'date', id: 'Start' });
			dataTable.addColumn({ type: 'date', id: 'End' });
			
			
			dataTable.addRows([
				[ 'Connection Time: '+data.connectTime.duration+"ms",     new Date(0,0,0,0,0,0,data.connectTime.startTime),   new Date(0,0,0,0,0,0,data.connectTime.duration+data.connectTime.startTime)],
				[ 'DNS Look Up Time: '+data.dnsLatency.duration+"ms",    new Date(0,0,0,0,0,0,data.dnsLatency.startTime),    new Date(0,0,0,0,0,0,data.dnsLatency.duration+data.dnsLatency.startTime)],
				[ 'Latency Time: '+data.latency.duration+"ms",        new Date(0,0,0,0,0,0,data.latency.startTime),       new Date(0,0,0,0,0,0,data.latency.duration+data.latency.startTime)],
				[ 'Document Load Time: '+data.documentLoad.duration+"ms",  new Date(0,0,0,0,0,0,data.documentLoad.startTime),  new Date(0,0,0,0,0,0,data.documentLoad.duration+data.documentLoad.startTime)],
				[ 'Page Load Time: '+data.loadTime.duration+"ms",      new Date(0,0,0,0,0,0,data.loadTime.startTime),      new Date(0,0,0,0,0,0,data.loadTime.duration+data.loadTime.startTime)]]);

			chart.draw(dataTable);
		}
	}
	
	
	/**
	* Gets all the performance stats that we are interestd in and stores them in the data object.
	*
	* @method stats
	* @return {object} Returns all the performance stats as an object.
	*/
	var perform = {
		stats : function(toChart){
					var myStats = new Perform();
					window.document.onreadystatechange = function () {
						if (window.document.readyState == "complete") {
							toChart = toChart !== undefined ? toChart : false;
							if(toChart)
								_viewChart(myStats.getData());
							else			
								window.console.log(myStats.getData());
						}
					}
				}
	};
	
	
	return window.perform = perform;
})(window);