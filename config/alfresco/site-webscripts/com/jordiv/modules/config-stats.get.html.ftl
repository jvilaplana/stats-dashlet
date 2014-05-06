<#--
    Copyright (c) 2011, Jordi Vilaplana <gatasuna@gmail.com>
    
    This file is part of Stats Dashlet.
    
    Foobar is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
  
    Foobar is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
  
    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
    
-->


<div id="${args.htmlid}-configDialog" class="config-stats">
    <div class="hd">${msg("label.dialogTitle")}</div>
    <div class="bd">
        <form id="${args.htmlid}-form" action="" method="POST">
            <div class="yui-gd">
                <div class="yui-u first"><label for="${args.htmlid}-viewType">${msg("label.viewType")}:</label></div>
                <div class="yui-u">
                    <select id="${args.htmlid}-viewType" name="viewType">
                        <option value="stats_sites">${msg("label.viewType.normal")}</option>
                        <option value="stats_sites_compact">${msg("label.viewType.compact")}</option>
                    </select>
                </div>
            </div>
            <#if dataLists??>
                <div class="yui-gd">
                    <div class="yui-u first">
                        <label for="${args.htmlid}-dataList">${msg("label.dataList")}:</label>
                    </div>
                    <div class="yui-u">
                        <select id="${args.htmlid}-dataList" name="dataList">
                            <option value=""></option>
                            <#list dataLists as dataList>
                                <option value="${dataList.nodeRef!''}">${dataList.title!''}</option>
                            </#list>
                        </select>
                    </div>
                </div>
            </#if>
            <div class="bdft">
                <input type="submit" id="${args.htmlid}-ok" value="${msg("button.ok")}" />
                <input type="button" id="${args.htmlid}-cancel" value="${msg("button.cancel")}" />
            </div>
        </form>
    </div>
</div>
