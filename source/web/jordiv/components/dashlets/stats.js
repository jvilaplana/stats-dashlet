/*
 *  Copyright (c) 2011, Jordi Vilaplana <gatasuna@gmail.com>
 *  
 *  This file is part of Stats Dashlet.
 *  
 *  Foobar is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *  
 */


/** Stats Dashlet */
(function() {
    var Dom = YAHOO.util.Dom;
    var Event = YAHOO.util.Event;
    Alfresco.dashlet.Stats = function Stats_constructor(htmlId) {
        Alfresco.dashlet.Stats.superclass.constructor.call(this, "Alfresco.dashlet.Stats", htmlId);
        this.configDialog = null;
        return this;
    };
    YAHOO.extend(Alfresco.dashlet.Stats, Alfresco.component.Base, {
        options: {
            componentId: "",
            viewType: "",
            dataList: ""
        },
        onReady: function ST_onReady() {
            // Add click handler to config Stats link that will be visible if user is site manager.
            var configStatsLink = Dom.get(this.id + "-configStats-link");
            if (configStatsLink) {
                Event.addListener(configStatsLink, "click", this.onConfigStatsClick, this, true);
            }
        },
        /**
         * Called when the user clicks the config Stats link.
         * Will open a Stats config dialog
         *
         * @method onConfigStatsClick
         * @param e The click event
         */
        onConfigStatsClick: function ST_onConfigStatsClick(e) {
            Event.stopEvent(e);
            var actionUrl = Alfresco.constants.URL_SERVICECONTEXT + "jordiv/stats/config/" + encodeURIComponent(this.options.componentId);
            if (!this.configDialog) {
                this.configDialog = new Alfresco.module.SimpleDialog(this.id + "-configDialog").setOptions( {
                    width: "30em",
                    templateUrl: Alfresco.constants.URL_SERVICECONTEXT + "jordiv/stats/config",
                    actionUrl: actionUrl,
                    onSuccess: {
                        fn: function Stats_onConfigFeed_callback(response) {
                            var stats = response.json;
                            // Save values for new config dialog openings
                            //this.options.viewType = (stats && stats.viewType) ? stats.viewType : this.options.viewType;
                            this.options.viewType = stats.viewType;
                            this.options.dataList = stats.dataList;
                            // Update dashlet body with new values
                            Dom.get(this.id + "-stats-sites-table").className = stats ? stats.viewType : "stats_sites";
                        },
                        scope: this
                    },
                    doSetupFormsValidation: {
                        fn: function Stats_doSetupForm_callback(form) {
                            form.setShowSubmitStateDynamically(true, false);
                            var select = Dom.get(this.configDialog.id + "-viewType"), options = select.options, option, i, j;
                            for (i = 0, j = options.length; i < j; i++) {
                                option = options[i];
                                if (option.value.localeCompare(this.options.viewType) == 0) {
                                    option.selected = true;
                                    break;
                                }
                            }
                            select = Dom.get(this.configDialog.id + "-dataList");
                            if(select) {
                                options = select.options, option, i, j;
                                for (i = 0, j = options.length; i < j; i++) {
                                    option = options[i];
                                    if (option.value.localeCompare(this.options.dataList) == 0) {
                                        option.selected = true;
                                        break;
                                    }
                                }
                            }
                        },
                        scope: this
                    }
                });
            }
            this.configDialog.setOptions({actionUrl: actionUrl});
            this.configDialog.show();
        }
    });
})();
