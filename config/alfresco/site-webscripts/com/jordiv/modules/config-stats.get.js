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


main();

/**
 * Stats configuration component POST method
 */
function main() {
    var site = url.args.split("_")[6];
    if(site != null) {
        var dataList = getDataList(site);
        if(dataList != undefined) {
            model.dataLists = dataList.datalists;
        }
    }
}

/**
 * Gets all the data lists from a given site
 * 
 * @param {string} Short name of the site
 * @return Data List list, undefined if any error
 */
function getDataList(site) {
    var theUrl, connector, result;
    theUrl = "/slingshot/datalists/lists/site/" + site + "/dataLists";
    connector = remote.connect("alfresco");
    result = connector.get(theUrl);
    if(result.status == 200) {
        return eval('(' + result.response + ')');
    }
    else {
        return undefined;
    }
}
