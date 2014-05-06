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


/**
 * Main function to prepare Activity Stats Component
 * @return
 */
function main() {
    var theUrl, connector, result;
    theUrl = "/jordiv/stats/alfstats";
    if(page.url.args["site"] != null && page.url.args["site"] != undefined && page.url.args["site"] != "") {
       theUrl += "?filter=" + page.url.args["site"];
    }
    connector = remote.connect("alfresco");
    result = connector.get(theUrl);
    if(result.status == 200) {
        var r = eval('(' + result.response + ')');
        model.site = r.sites.site[0];
    }
}

main();
