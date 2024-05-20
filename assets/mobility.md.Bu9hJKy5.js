import{_ as t,c as o,o as r,a4 as s,l as e,a}from"./chunks/framework.DZXLJAMc.js";const n="/kasten-ocpv-lab/assets/1.CVJE4U2j.png",i="/kasten-ocpv-lab/assets/2.BbaMFEId.png",c="/kasten-ocpv-lab/assets/3.qJ30swjY.png",l="/kasten-ocpv-lab/assets/3b.pXhmZ9DK.png",p="/kasten-ocpv-lab/assets/4.Cwv3XJDK.png",d="/kasten-ocpv-lab/assets/5.CTdtncI2.png",m="/kasten-ocpv-lab/assets/6.ojoTLZja.png",S=JSON.parse('{"title":"App Mobility","description":"","frontmatter":{},"headers":[],"relativePath":"mobility.md","filePath":"mobility.md"}'),u={name:"mobility.md"},h=s('<h1 id="app-mobility" tabindex="-1">App Mobility <a class="header-anchor" href="#app-mobility" aria-label="Permalink to &quot;App Mobility&quot;">​</a></h1><h2 id="_1-introduction" tabindex="-1">1. Introduction <a class="header-anchor" href="#_1-introduction" aria-label="Permalink to &quot;1. Introduction&quot;">​</a></h2><p><em>In this exercise you will restore an OpenShift Virtual Machine to an alternate cluster from a Kasten backup.</em></p><div class="important custom-block github-alert"><p class="custom-block-title">IMPORTANT</p><p></p><p>This exercise should be completed by the <code>cluster-1</code> user <em><strong>ONLY</strong></em>.</p></div><h2 id="_2-creating-an-import-policy" tabindex="-1">2. Creating an Import Policy <a class="header-anchor" href="#_2-creating-an-import-policy" aria-label="Permalink to &quot;2. Creating an Import Policy&quot;">​</a></h2><p>Unlike the &quot;Snapshot&quot; policy created in a previous exercise, an &quot;Import&quot; policy is used to import Kasten RestorePoints to a different cluster.</p><ol><li><p>In the <em><strong>Kasten Dashboard</strong></em>, select <code>cluster-1</code> from the multi-cluster dropdown menu and select <em><strong>Policies → Policies</strong></em> from the sidebar.</p></li><li><p>Under your <code>kasten-lab-backup</code> Policy, click <em><strong>Show import details...</strong></em>.</p><p><img src="'+n+'" alt=""></p></li><li><p>Click <em><strong>Copy to Clipboard</strong></em> to copy the migration token. Save this value to be used in an upcoming step.</p><p><img src="'+i+'" alt=""></p></li><li><p>Select <code>cluster-2</code> from the multi-cluster dropdown menu and select <em><strong>Policies → Policies</strong></em> from the sidebar.</p></li><li><p>Click <em><strong>+ New Policy</strong></em> and fill out the following fields:</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><em><strong>Name</strong></em></td><td><code>kasten-lab-import</code></td></tr><tr><td><em><strong>Action</strong></em></td><td>Select <em><strong>Import</strong></em></td></tr><tr><td><em><strong>Restore After Import</strong></em></td><td>Click to enable</td></tr><tr><td><em><strong>Import Frequency</strong></em></td><td>Select <em><strong>On-Demand</strong></em></td></tr><tr><td><em><strong>Config Data for Import</strong></em></td><td>Paste the migration token</td></tr><tr><td><em><strong>Profile for Import</strong></em></td><td>Select <code>global-profile-example</code></td></tr></tbody></table><p><img src="'+c+'" alt=""></p><p><img src="'+l+'" alt=""></p><blockquote><p>[!CRITICAL]</p><p>Ensure <code>global-profile-example</code> is selected, not <code>ceph-rgw-immutable</code> - this is because <code>global-profile-example</code> points to the backup repository on <code>cluster-1</code>, whereas the <code>ceph-rgw-immutable</code> profile on <code>cluster-2</code> points to its own, local Ceph bucket.</p></blockquote></li><li><p>Click <em><strong>Create Policy</strong></em>.</p></li><li><p>Under the new <code>kasten-lab-import</code> Policy, click <em><strong>Run Once → Yes</strong></em> to initiate importing <code>kasten-lab</code> RestorePoints.</p><p><img src="'+p+'" alt=""></p></li><li><p>Return to <em><strong>Dashboard</strong></em> in the sidebar and select the <code>kasten-lab-import</code> Policy Run under <em><strong>Actions</strong></em> to monitor status.</p><p><img src="'+d+'" alt=""></p><p>Once the Import completes, you should observe the Restore action start immediately, using the most recent <code>kasten-lab</code> RestorePoint.</p></li><li><p>Once the restore completes, open <em><strong>OpenShift Console → Virtualization → Virtual Machines</strong></em> on <code>cluster-2</code>.</p><p><img src="'+m+'" alt=""></p><p>You should observe the <code>fedora-k10</code> VM from <code>cluster-1</code> running in the <code>kasten-lab</code> namespace (in addition to the <code>fedora-k10</code> VM cloned in a previous lab exercise).</p></li></ol><h2 id="_3-advanced-options" tabindex="-1">3. Advanced Options <a class="header-anchor" href="#_3-advanced-options" aria-label="Permalink to &quot;3. Advanced Options&quot;">​</a></h2><blockquote><p><em>What if you want to automate restoring the most recent backup to a standby cluster for DR or test/dev purposes?</em></p></blockquote><p>Simply update the <code>kasten-lab-import</code> Policy&#39;s frequency from <em><strong>On-Demand</strong></em> to the desired frequency (e.g. Hourly, Daily, etc.).</p><blockquote><p><em>What if you need to make changes such as targeting an alternate StorageClass for restore or modifying the Route hostname?</em></p></blockquote><p>Kasten provides a robust transformation engine, allowing you to...</p><p>Check out the video below to see an example of creating and applying transforms to an application migrating from an on-premises OpenShift cluster to a ROSA cluster:</p>',13),g=e("iframe",{width:"847",height:"476",src:"https://www.youtube.com/embed/qocZk5fdxsY",title:"Scaling Restore Operations with K10 Transform Sets",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1),b=e("h2",{id:"_4-takeaways",tabindex:"-1"},[a("4. Takeaways "),e("a",{class:"header-anchor",href:"#_4-takeaways","aria-label":'Permalink to "4. Takeaways"'},"​")],-1),f=e("ul",null,[e("li",null,"Kasten backups can be restored to different clusters using Import policies"),e("li",null,"Import policies can automate restore from the latest backup for use in DR or test/dev environments"),e("li",null,"Transforms can be used to alter manifest specifications to aide in moving workloads between different clusters, storage, or clouds")],-1),k=[h,g,b,f];function _(y,w,v,P,q,I){return r(),o("div",null,k)}const x=t(u,[["render",_]]);export{S as __pageData,x as default};
