/**
 * Activity Stats component.
 * 
 * @namespace Jordiv.component
 * @class Jordiv.component.SiteStats
 */

if (typeof Jordiv == "undefined" || !Jordiv) {
	var Jordiv = {};
}
Jordiv.component = Jordiv.component || {};

( function() {
	/**
	 * YUI Library aliases
	 */
	var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event;

	/**
	 * Alfresco Slingshot aliases
	 */
	var $html = Alfresco.util.encodeHTML;

	/**
	 * Activity Stats component constructor.
	 * 
	 * @param {String}
	 *            htmlId The HTML id of the parent element
	 * @return {Jordiv.component.SiteStats} The new component instance
	 * @constructor
	 */
	Jordiv.component.SiteStats = function SiteStats_constructor(htmlId) {
		Jordiv.component.SiteStats.superclass.constructor.call(this,
				"Jordiv.component.SiteStats", htmlId, [ "button",
						"container", "datasource", "datatable", "animation" ]);

		// Initialise prototype properties
		// this.preferencesService = new Alfresco.service.Preferences();

		return this;
	};

	YAHOO.extend(
	Jordiv.component.SiteStats,
	Alfresco.component.Base,
	{
		/**
		 * SiteStats module instance.
		 *
		 * @property createSite
		 * @type Jordiv.component.SiteStats
		 */
		siteStats : null,
		
		/**
		 * chart object
		 *
		 * @property chart
		 * @type google.visualization.LineChart
		 */
		chart : null,
		
		/**
		 * chartBySite object
		 *
		 * @property chartBySite
		 * @type google.visualization.PieChart
		 */
		chartBySite : null,
		
		/**
		 * Object container for initialization options
		 *
		 * @property options
		 * @type object
		 */
		options : {
			/**
			 * Types data
			 *
			 * @property types
			 * @type string
			 * @default all
			 */
			 types: "all",
			/**
			 * Period data
			 *
			 * @property period
			 * @type string
			 * @default today
			 */
			 period: "today",
			/**
			 * Sites data
			 *
			 * @property sites
			 * @type string
			 * @default all
			 */
			 sites: "all",
			/**
			 * Person data
			 *
			 * @property person
			 * @type string
			 * @default all
			 */
			 person: "all",
			 
			 /**
			 * Div ID for the chart
			 *
			 * @property chartId
			 * @type string
			 */
			 chartId: "",
			 /**
			 *  ChartByDate properties
			 *
			 * @property chartByDate
			 * @type Object
			 */
			 chartByDate: {
				 title: "Activity Stats by date",
				 width: 600,
				 height: 300
			 },
			 /**
			 *  ChartBySite properties
			 *
			 * @property chartBySite
			 * @type Object
			 */
			 chartBySite: {
				 title: "Activity Stats by site",
				 width: 450,
				 height: 300
			 }
		},

		/**
		 * Fired by YUI when parent element is available for scripting
		 * @method onReady
		 */
		onReady : function SiteStats_onReady() {
			var me = this;
			this.widgets.refreshButton = Alfresco.util.createYUIButton(this, "filters-refresh",	this.onRefresh);
			this.initMultiSelect(this.id + '-filters-form-types');
			this.initMultiSelect(this.id + '-filters-form-sites');
			this.formElement = new Alfresco.forms.Form(this.id + "-filters-form");
			this.loadSiteStats();
		},

		/**
		 * Fired on click on Refresh button
		 *
		 * @method onRefresh
		 * @param p_data {object} call result data
		 */
		onRefresh : function SiteStats_onRefresh(p_data) {
			this.options.types = this.getTypesValues();
			this.options.sites = this.getSitesValues();
			this.options.person = this.getPersonValue();
			this.options.period = this.getPeriodValue();
			this.loadSiteStats();
		},
		
		/**
		 * Refresh Activity stats
		 * This method will call service via PROXY
		 * @method loadSiteStats
		 */
		 loadSiteStats : function SiteStats_loadSiteStats() {
			this.widgets.feedbackMessage = Alfresco.util.PopupManager.displayMessage( {
				text : this.msg("site-stats.message.refreshing"),
				spanClass : "wait",
				displayTime : 0
			});
			Alfresco.util.Ajax.request(
			{		
				//TODO : use POST method
				method: Alfresco.util.Ajax.GET,
				url: Alfresco.constants.PROXY_URI + "jordiv/site-stats/site-stats",
				requestContentType : "application/json",
	            responseContentType : "application/json",
	            dataObj: {
					types: 	this.options.types,
					sites: 	this.options.sites,
					person: this.options.person,
					period: this.options.period
				},
				successCallback: {
					fn: this.onSuccess,
					scope: this
				},
				//successMessage: this.msg("site-stats.message.success"),
				failureCallback: {
					fn: this.onFailure,
					scope: this
				},
				failureMessage: this.msg("site-stats.message.failure"),
				execScripts: true
			});
		},
		
		/**
		 * Fired on ajax call success
		 *
		 * @method onSuccess
		 * @param p_data {object} call result data
		 */
		onSuccess : function SiteStats_onSuccess(p_data) {
			this.populateCharts(p_data.json.charts);
			//this.widgets.feedbackMessage.destroy();
		},

		/**
		 * Fired on ajax call failure
		 *
		 * @method onFailure
		 * @param p_data {object} call result data
		 */
		onFailure : function SiteStats_onFailure(p_data) {
			this.widgets.feedbackMessage.destroy();
		},

		/**
		 * Retrieve period value
		 *
		 * @method getPeriodValue
		 */
		getPeriodValue : function SiteStats_getPeriodValue() {
			return Dom.get(this.id + "-filters-form-period").value;

		},
		
		/**
		 * Init Multi Select
		 * This multiselect is using a div with a list of label and hidden checkbox
		 * Used to avoid users to need to click on CTRL
		 *
		 * @method initMultiSelect
		 * @param divId
		 */
		 initMultiSelect : function SiteStats_initMultiSelect(divId) {
			var labels = document.getElementById(divId).getElementsByTagName('label');
			for (var i = 0, j = labels.length; i < j; i++) {
		  		labels[i].onclick = function() {
		  			if(!this.lastChild.checked){
		    			this.lastChild.checked = true;
		    			this.className = 'highlight';
		    		}
		    		else {
		    			this.lastChild.checked = false;
		    			this.className = '';	
		    		}
		  		}
			}
		},
		/**
		 * Retrieve person value
		 *
		 * @method getPersonValue
		 */
		 getPersonValue : function SiteStats_getPersonValue() {
			return Dom.get(this.id + "-filters-form-person").value;

		},

		/**
		 * Retrieve selected types values
		 *
		 * @method getTypesValues
		 */
		getTypesValues : function SiteStats_getTypesValues() {
			return this.getMultipleValues(this.id + "-filters-form-types");

		},
		
		/**
		 * Retrieve selected sites values
		 *
		 * @method getSitesValues
		 */
		getSitesValues : function SiteStats_getSitesValues() {
			return this.getMultipleValues(this.id + "-filters-form-sites");

		},
		
		/**
		 * Retrieve selected multiple values
		 *
		 * @method getMultipleValues
		 * @param divId 
		 */
		 getMultipleValues : function SiteStats_getMultipleValues(divId) {
			var div = Dom.get(divId);
			var inputs = div.getElementsByTagName('input');
			var values = "";
			for ( var i = 0; i < inputs.length; i++) {
				if (inputs[i].checked) {
					if (values != "") {
						values += ",";
					}
					values += inputs[i].value;
				}
			}
			return values;
		},
		/**
		 * Populate charts
		 *
		 * @method populateCharts
		 * @param charts loaded charts data 
		 */
		populateCharts : function SiteStats_populateCharts(charts) {
			if(charts.length > 0){
				
				//Chart: Activities by date
				var data = new google.visualization.DataTable();
				var activitiesSum = 0;
				data.addColumn('string', 'Time');
			    // Set 1 column by chart
			    for(var i=0 ; i < charts.length ; i++){
			    	activitiesSum += parseInt(charts[i].sum);
			    	if(charts[i].name == "all"){
			    		data.addColumn('number', this.msg("site-stats.sites.all"));
			    	}
			    	else{
			    		data.addColumn('number', charts[i].displayName);
			    	}
			    }
			    
			    // Add rows (chart point)
				data.addRows(charts[0].points.length);
				
				// Add values for axis X
				for(var i=0 ; i < charts[0].points.length ; i++){
					data.setValue(i, 0, this.convertDateToLabel(charts[0].points[i].start));
				}
				
				// Add values for axis Y for each chart
				for(var i=0 ; i < charts.length ; i++){
					for(var j=0 ; j < charts[i].points.length ; j++){
						data.setValue(j, i+1, parseInt(charts[i].points[j].value));
				
					}
				}
				
			    if (this.chart == null){
			    	this.chart = new google.visualization.LineChart(Dom.get(this.id + "-chart-activities-by-date"));
			    }
			    this.chart.draw(data, {width: this.options.chartByDate.width, height: this.options.chartByDate.height, title: this.options.chartByDate.title});
			
			    //Chart: Activities by site
			    var dataBySite = new google.visualization.DataTable();
				dataBySite.addColumn('string', 'Sites');
			    dataBySite.addColumn('number', 'Activities by site');
		        // Add rows (chart point)
			    dataBySite.addRows(charts.length);
			    // Add values
				for(var i=0 ; i < charts.length ; i++){
					// Do not display all in this chart
					if(charts[i].name != "all"){
						dataBySite.setValue(i, 0, charts[i].displayName);
						dataBySite.setValue(i, 1, parseInt(charts[i].sum));	
					}
				}
				
			    if (this.chartBySite == null){
			    	this.chartBySite = new google.visualization.PieChart(Dom.get(this.id + "-chart-activities-by-site"));
				}
			    this.chartBySite.draw(dataBySite, {width: this.options.chartBySite.width, height: this.options.chartBySite.height, title: this.options.chartBySite.title});
				// If there is no activity
				if(activitiesSum == 0){
					this.widgets.feedbackMessage.destroy();
					this.widgets.feedbackMessage = Alfresco.util.PopupManager.displayMessage( {
						text : this.msg("site-stats.message.no-activity"),
						spanClass : "alert",
						displayTime : 3
					});
					return;
				}
				this.widgets.feedbackMessage = Alfresco.util.PopupManager.displayMessage( {
					text : this.msg("site-stats.message.success"),
					spanClass : "alert",
					displayTime : 3
				});	
				return;
			}
			this.widgets.feedbackMessage = Alfresco.util.PopupManager.displayMessage( {
				text : this.msg("site-stats.message.failed"),
				spanClass : "alert",
				displayTime : 3
			});
		}, 
		
		/**
		 * Convert date string to a display label
		 *
		 * @method populateChart
		 * @param charts loaded charts data 
		 */
		convertDateToLabel : function SiteStats_convertDateToLabel(dateStr) {
			switch(this.options.period){
			case "today":
				return dateStr.substring(11, 16);
			case "week":
			case "month":
				return dateStr.substring(5, 10);
			case "year":
				return dateStr.substring(0, 7);
			default:
				return dateStr;
			}
			return dateStr;
		}

	});

	/* Dummy instance to load optional YUI components early */
	var dummyInstance = new Jordiv.component.SiteStats("null");

})();
