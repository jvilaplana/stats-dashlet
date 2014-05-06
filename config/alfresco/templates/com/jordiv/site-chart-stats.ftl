<#include "/org/alfresco/include/alfresco-template.ftl" />
<@templateHeader />

<@templateBody>
   <div id="alf-hd">
      <@region id="header" scope="global" protected=true/>
      <@region id="title" scope="template" protected=true />
   </div>

   <div id="bd">
      <div class="yui-t1" id="user-activity-stats">
         <div id="yui-main">
            <div class="yui-b" id="alf-content">
               <@region id="site-chart-stats" scope="template" protected=true />
            </div>
         </div>
      </div>
   </div>
</@>

<@templateFooter>
   <div id="alf-ft">
      <@region id="footer" scope="global" protected=true />
   </div>
</@>