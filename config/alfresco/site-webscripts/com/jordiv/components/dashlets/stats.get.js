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


function main() {
    var theUrl, connector, result;
    var viewType = args.viewType;
    var dataList = args.dataList;
    // Create XML object to pull values from configuration file
    var conf = new XML(config.script);
    // Use the defaults from the XML configuration file (stats.get.config.xml) if no values in args array
    if(!viewType) { viewType = conf.viewType[0]; }
    if(!dataList) { dataList = conf.dataList[0]; }
    // Set values on the model for use in templates
    model.viewType = "" + viewType;
    model.dataList = "" + dataList;
    theUrl = "/jordiv/stats/alfstats";
    if(page.url.templateArgs.site != null) {
        theUrl += "?filter=" + page.url.templateArgs.site;
    }
    connector = remote.connect("alfresco");
    result = connector.get(theUrl);
    if(result.status == 200) {
        model.stats = eval('(' + result.response + ')');
    }
    // Check if the dashlet is in a site or user dashboard
    if(page.url.templateArgs.site != null) {
        // Site dashboard
        if(dataList != undefined && dataList != null && dataList != "") {
            var nodeRef = dataList.substring(dataList.lastIndexOf("/") + 1, dataList.length);
            var items = getDataListItems(nodeRef);
            if(items != undefined && items != null && items.datalists != undefined) {
                model.dataListItems = items.datalists;
            }
        }
        model.hasConfigPermission = hasConfigPermission();
    }
    else {
        //User dashboard
        model.hasConfigPermission = true;
    }
}

main();

/**
 * Gets all the items from a given site Data List
 * 
 * @param {string} nodeRef of the data list
 * @return Item list, undefined if any error
 */
function getDataListItems(dataListNode) {
    var url, connector, result;
    url = "/slingshot/datalists/lists/node/workspace/SpacesStore/" + dataListNode;
    connector = remote.connect("alfresco");
    result = connector.call(url);
    if(result.status == 200) {
        return eval('(' + result.response + ')');
    }
    else {
        return undefined;
    }
}

/**
 * Checks if current user has admin permissions for a site.
 *
 * @return {boolean} true if SiteManager, false otherwise.
*/
function hasConfigPermission() {
    // Call the repository to see if the user is a site manager or not
    var obj = context.properties["memberships"];
    if(!obj) {
        var json = remote.call("/api/sites/" + page.url.templateArgs.site + "/memberships/" + stringUtils.urlEncode(user.name));
        if(json.status == 200) {
            obj = eval('(' + json + ')');
        }
    }
    if(obj) {
        return (obj.role == "SiteManager");
    }
    else {
        return false;
    }
}
