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


<script type="text/javascript">
//<![CDATA[
    new Alfresco.dashlet.Stats("${args.htmlid}").setOptions(
        {
        "componentId": "${instance.object.id}",
        "viewType": "${viewType?string!'stats_sites'}",
        "dataList": "${dataList?string!''}"
    });
    new Alfresco.widget.DashletResizer("${args.htmlid}", "${instance.object.id}");
//]]
</script>
<div class="dashlet">
    <div class="title">${msg("label.header")}</div>
    <div class="body scrollable">
        <div class="clear"></div>
        <#if hasConfigPermission>
        <div class="toolbar">
            <a id="${args.htmlid}-configStats-link" class="configure theme-color-1" href="#">${msg("label.configure")}</a>
        </div>
        </#if>
        <div class="clear"></div>
        <#if stats?exists>
            <#if stats.sites?exists>
                <table id="${args.htmlid}-stats-sites-table" class="${args.viewType!'stats_sites'}">
                    <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><img alt="${msg("stats.dir")}" title="${msg("stats.dir")}" src="${page.url.context}/res/components/images/filetypes/generic-folder-16.png" /></td>
                            <td><img alt="${msg("stats.pdf")}" title="${msg("stats.pdf")}" src="${page.url.context}/res/components/images/filetypes/pdf-file-16.png" /></td>
                            <td><img alt="${msg("stats.doc")}" title="${msg("stats.doc")}" src="${page.url.context}/res/components/images/filetypes/doc-file-16.png" /></td>
                            <td><img alt="${msg("stats.gen")}" title="${msg("stats.gen")}" src="${page.url.context}/res/components/images/filetypes/generic-file-16.png" /></td>
                            <td><img alt="${msg("stats.htm")}" title="${msg("stats.htm")}" src="${page.url.context}/res/components/images/filetypes/html-file-16.png" /></td>
                            <td><img alt="${msg("stats.ppt")}" title="${msg("stats.ppt")}" src="${page.url.context}/res/components/images/filetypes/ppt-file-16.png" /></td>
                            <td><img alt="${msg("stats.txt")}" title="${msg("stats.txt")}" src="${page.url.context}/res/components/images/filetypes/text-file-16.png" /></td>
                            <td><img alt="${msg("stats.xls")}" title="${msg("stats.xls")}" src="${page.url.context}/res/components/images/filetypes/xls-file-16.png" /></td>
                            <td><img alt="${msg("stats.xml")}" title="${msg("stats.xml")}" src="${page.url.context}/res/components/images/filetypes/xml-file-16.png" /></td>
                            <td><img alt="${msg("stats.img")}" title="${msg("stats.img")}" src="${page.url.context}/res/components/images/filetypes/img-file-16.png" /></td>
                        </tr>
                    </thead>
                    <tbody>
                        <#list stats.sites.site as s>
                            <tr>
                                <td>
                                    <a class="theme-color-1" href="/share/page/site-chart-stats?site=${s.shortName!''}">
                                        <img alt="${s.title!''}" title="${s.title!''}" src="${page.url.context}/res/jordiv/components/dashlets/stats.png" />
                                    </a>
                                </td>
                                <td><a class="theme-color-1" href="/share/page/site/${s.shortName!''}/dashboard" title="${s.description!''}">${s.title!''}</a></td>
                                <td>${s.num_dir!''}</td>
                                <td>${s.num_pdf!''}</td>
                                <td>${s.num_doc!''}</td>
                                <td>${s.num_gen!''}</td>
                                <td>${s.num_htm!''}</td>
                                <td>${s.num_ppt!''}</td>
                                <td>${s.num_txt!''}</td>
                                <td>${s.num_xls!''}</td>
                                <td>${s.num_xml!''}</td>
                                <td>${s.num_img!''}</td>
                            </tr>
                        </#list>
                    </tbody>
                </table>
            </#if>
        </#if>
        <#if dataListItems?exists>
            <p></p>
            <h3>${msg("label.dataListItems")}:</h3>
            <table id="${args.htmlid}-stats-datalist-table" class="stats_sites_compact">
                <thead>
                    <tr>
                        <td>${msg("label.title")}</td>
                        <td>${msg("label.description")}</td>
                    </tr>
                </thead>
                <tbody>
                    <#list dataListItems as item>
                        <tr>
                            <td>${item.title!''}</td>
                            <td>${item.description!''}</td>
                        </tr>
                    </#list>
                </tbody>
            </table>
        </#if>
    </div>
</div>
