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


{
    "sites" : {
        <#if sites?exists>
            "site" : [
                <#list sites as s>
                    {
                    "shortName"     : "${s[0]}",
                    "sitePreset"    : "${s[1]}",
                    "title"         : "${s[2]}",
                    "description"   : "${s[3]?js_string}",
                    "node"          : "${s[4]}",
                    "visibility"    : "${s[5]}",
                    "num_dir"       : "${s[6]}",
                    "num_pdf"       : "${s[7]}",
                    "num_doc"       : "${s[8]}",
                    "num_gen"       : "${s[9]}",
                    "num_htm"       : "${s[10]}",
                    "num_ppt"       : "${s[11]}",
                    "num_txt"       : "${s[12]}",
                    "num_xls"       : "${s[13]}",
                    "num_xml"       : "${s[14]}",
                    "num_img"       : "${s[15]}"
                    },
                </#list>
            ]
        </#if>
    }
}
