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
 * Passes to the view template an array containing some basic
 * information of a list of sites.
 */
function main() {
    var sites = [];
    var nameFilter = getArguments();
    var sitesList = siteService.listSites(nameFilter, "");

    // Use of Logging API. More info at:
    // http://wiki.alfresco.com/wiki/4.0_JavaScript_API#Logging_API
    if(logger.isLoggingEnabled()) {
        logger.log("[alfstats.get.js] nameFilter = (" + nameFilter + ")");
    }

    for(var i in sitesList) {
        var counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var nodeVar = siteService.getSite(sitesList[i].shortName).node.childByNamePath("documentLibrary");
        var num = count(nodeVar, counter);
        sites.push([
            sitesList[i].shortName,
            sitesList[i].sitePreset,
            sitesList[i].title,
            sitesList[i].description,
            sitesList[i].node,
            sitesList[i].visibility,
            num[0] - 1,
            num[1],
            num[2],
            num[3],
            num[4],
            num[5],
            num[6],
            num[7],
            num[8],
            num[9]
        ]);
    }
    // The sites array will be available in the view template.
    model.sites = sites;
}

/**
 * Gets the parameters from argsM global variable.
 * argsM is an associative array of all URI parameters.
 * Each key is an argument name and each value is an array containing
 * all respective argument values, even if only one is supplied).
 *
 * @returns {String} Value of "filter" parameter, or empty string if any supplied.
 */
function getArguments() {
    if(argsM["filter"] != null && argsM["filter"] != undefined && argsM["filter"] != '') {
        return "" + argsM["filter"][0];
    }
    else return "";
}

/**
 * Counts recursively the number of documents and folders within a node.
 * 
 * @param {String} nodeVar Starting node.
 * @param {Number} counter Array of integers.
 * @returns {Number[]} counter
 */
function count(nodeVar, counter) {
    if(nodeVar == null || nodeVar == undefined) return -1;
    if(nodeVar.isDocument) {
        var mimeType = "" + nodeVar.mimetype;
        switch(mimeType) {
            case "application/pdf":
                counter[1]++;
                break;
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            case "application/vnd.oasis.opendocument.text":
                counter[2]++;
                break;
            case "text/html":
                counter[4]++;
                break;
            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                counter[5]++;
                break;
            case "text/plain":
                counter[6]++;
                break;
            case "application/vnd.ms-excel":
                counter[7]++;
                break;
            case "application/xhtml+xml":
            case "text/xml":
                counter[8]++;
                break;
            case "image/bmp":
            case "image/jpeg":
            case "image/gif":
                counter[9]++;
                break;
            default:
                counter[3]++;
        }
    }
    else if(nodeVar.isContainer) {
        counter[0]++;
        var childrenList = nodeVar.children;
        for(var i = 0; i < childrenList.length; i++) {
            counter = count(childrenList[i], counter);
        }
    }
    return counter;
}
