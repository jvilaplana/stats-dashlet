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
 * Stats configuration component POST method
 */
function main() {
    var c = sitedata.getComponent(url.templateArgs.componentId);
    var viewType = String(json.get("viewType"));
    var dataList = "";
    if(json.has("dataList")) {
        dataList += String(json.get("dataList"));
    }
    c.properties["viewType"] = viewType;
    c.properties["dataList"] = dataList;
    model.viewType = viewType;
    model.dataList = dataList;
    c.save();
}

main();
