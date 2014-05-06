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
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "${msg("label.chart.mimetype")}");
        data.addColumn("number", "${msg("label.chart.items")}");
        data.addRows(9);
        data.setValue(0, 0, "${msg("label.pdf")}");
        data.setValue(0, 1, ${site.num_pdf!0});
        data.setValue(1, 0, "${msg("label.doc")}");
        data.setValue(1, 1, ${site.num_doc!0});
        data.setValue(2, 0, "${msg("label.gen")}");
        data.setValue(2, 1, ${site.num_gen!0});
        data.setValue(3, 0, "${msg("label.htm")}");
        data.setValue(3, 1, ${site.num_htm!0});
        data.setValue(4, 0, "${msg("label.txt")}");
        data.setValue(4, 1, ${site.num_txt!0});
        data.setValue(5, 0, "${msg("label.ppt")}");
        data.setValue(5, 1, ${site.num_ppt!0});
        data.setValue(6, 0, "${msg("label.xls")}");
        data.setValue(6, 1, ${site.num_xls!0});
        data.setValue(7, 0, "${msg("label.xml")}");
        data.setValue(7, 1, ${site.num_xml!0});
        data.setValue(8, 0, "${msg("label.img")}");
        data.setValue(8, 1, ${site.num_img!0});
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, {width: 450, height: 300, title: '${msg("label.chart.title")}'});
    }
</script>
<div class="body" id="${args.htmlid}-body">
    <div id="${args.htmlid}">
        <h2>${site.title!''}</h2>
        <h3>${site.description!''}</h2>
    </div>
    <div id="chart_div"></div>
</div>
