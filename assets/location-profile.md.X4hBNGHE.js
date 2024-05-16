import{_ as s,c as i,o as a,a4 as t}from"./chunks/framework.DZXLJAMc.js";const e="/kasten-ocpv-lab/assets/01.CP9L_crO.png",n="/kasten-ocpv-lab/assets/02.BYQPQcmx.png",l="/kasten-ocpv-lab/assets/03.C0U5E5ve.png",p="/kasten-ocpv-lab/assets/04.B6kNqLWi.png",h="/kasten-ocpv-lab/assets/06.D9cLuzLx.png",m=JSON.parse('{"title":"Configuring Location Profiles","description":"","frontmatter":{},"headers":[],"relativePath":"location-profile.md","filePath":"location-profile.md"}'),o={name:"location-profile.md"},r=t(`<h1 id="configuring-location-profiles" tabindex="-1">Configuring Location Profiles <a class="header-anchor" href="#configuring-location-profiles" aria-label="Permalink to &quot;Configuring Location Profiles&quot;">​</a></h1><h2 id="_1-introduction" tabindex="-1">1. Introduction <a class="header-anchor" href="#_1-introduction" aria-label="Permalink to &quot;1. Introduction&quot;">​</a></h2><p>In this exercise...</p><h2 id="_2-configuring-immutable-ceph-object-gateway-bucket" tabindex="-1">2. Configuring Immutable Ceph Object Gateway Bucket <a class="header-anchor" href="#_2-configuring-immutable-ceph-object-gateway-bucket" aria-label="Permalink to &quot;2. Configuring Immutable Ceph Object Gateway Bucket&quot;">​</a></h2><ol><li><p>In your local terminal, connect to the environment using your <em><strong>Red Hat Demo Platform</strong></em> environment details:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ssh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lab-user@YOUR-LAB-IP-OR-FQDN</span></span></code></pre></div></li><li><p>From the <code>[lab-user@hypervisor ~]$</code> prompt, connect to your bastion host for CLI access:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ssh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root@192.168.123.100</span></span></code></pre></div></li><li><p>From the <code>[root@ocp4-bastion ~]#</code> prompt, create an externally accessible Route for the ODF <code>rook-ceph-rgw-ocs-storagecluster-cephobjectstore</code> Service:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> oc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">kind: Route</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">apiVersion: route.openshift.io/v1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">metadata:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  name: s3-route</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  namespace: openshift-storage</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">spec:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  to:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    kind: Service</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    name: rook-ceph-rgw-ocs-storagecluster-cephobjectstore</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  tls:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    termination: reencrypt</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    insecureEdgeTerminationPolicy: Redirect</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  port:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    targetPort: https</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CEPH_S3_ENDPOINT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">oc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get route </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  s3-route </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openshift-storage </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">-o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jsonpath=&#39;{.spec.host}&#39;)&quot;</span></span></code></pre></div></li><li><p>Install the <code>aws</code> CLI tool:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;awscliv2.zip&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">unzip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> awscliv2.zip</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./aws/install</span></span></code></pre></div></li><li><p>Configure S3 credentials:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AWS_ACCESS_KEY_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">oc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> secret</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rook-ceph-object-user-ocs-storagecluster-cephobjectstore-ocs-storagecluster-cephobjectstoreuser</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openshift-storage</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jsonpath=&#39;{.data.AccessKey}&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> base64</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --decode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AWS_SECRET_ACCESS_KEY</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">oc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> secret</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  rook-ceph-object-user-ocs-storagecluster-cephobjectstore-ocs-storagecluster-cephobjectstoreuser</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> openshift-storage</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> jsonpath=&#39;{.data.SecretKey}&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> base64</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --decode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div></li><li><p>Create <code>kasten</code> Bucket with S3 Object Lock enabled and configure the default object retention policy:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">aws</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --endpoint=\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CEPH_S3_ENDPOINT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> s3api</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> create-bucket</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --bucket</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kasten</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --object-lock-enabled-for-bucket</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">aws</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --endpoint=\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">CEPH_S3_ENDPOINT</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> s3api</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> put-object-lock-configuration</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --bucket</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kasten</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  --object-lock-configuration</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{ &quot;ObjectLockEnabled&quot;: &quot;Enabled&quot;, &quot;Rule&quot;: { &quot;DefaultRetention&quot;: { &quot;Mode&quot;: &quot;COMPLIANCE&quot;, &quot;Days&quot;: 5 }}}&#39;</span></span></code></pre></div></li><li><p>Save the values that will be used to configure your Location Profile in the next section:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">printf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;%s\\n&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;ACCESS KEY:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${AWS_ACCESS_KEY_ID} </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;SECRET KEY:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${AWS_SECRET_ACCESS_KEY} </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ENDPOINT:&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${CEPH_S3_ENDPOINT}</span></span></code></pre></div></li></ol><h2 id="_3-creating-an-s3-compatible-location-profile" tabindex="-1">3. Creating an S3-Compatible Location Profile <a class="header-anchor" href="#_3-creating-an-s3-compatible-location-profile" aria-label="Permalink to &quot;3. Creating an S3-Compatible Location Profile&quot;">​</a></h2><ol><li><p>In the <em><strong>Kasten Dashboard</strong></em>, select <em><strong>Profiles → Location</strong></em> from the sidebar and click <em><strong>+ New Profile</strong></em>.</p><p><img src="`+e+'" alt=""></p></li><li><p>Fill out the following fields <em><strong>but DO NOT click Save Profile yet</strong></em>:</p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><em><strong>Profile Name</strong></em></td><td><code>ceph-rgw-immutable</code></td></tr><tr><td><em><strong>Storage Provider</strong></em></td><td>S3 Compatible</td></tr><tr><td><em><strong>S3 Access Key</strong></em></td><td>Paste <code>ACCESS KEY</code> value</td></tr><tr><td><em><strong>S3 Secret</strong></em></td><td>Paste <code>SECRET KEY</code> value</td></tr><tr><td><em><strong>Endpoint</strong></em></td><td>Paste <code>ENDPOINT</code> value</td></tr><tr><td><em><strong>Region</strong></em></td><td><code>us-east-1</code></td></tr><tr><td><em><strong>Bucket</strong></em></td><td><code>kasten</code></td></tr></tbody></table><p><img src="'+n+'" alt=""></p></li><li><p>Select <em><strong>Enable Immutable Backups</strong></em> and click the <em><strong>Validate Bucket</strong></em> button.</p><p><img src="'+l+'" alt=""></p><p>You should expect for all checks to pass, as shown. If you encounter errors, verify your <em><strong>Endpoint</strong></em>, <em><strong>Access</strong></em>, <em><strong>Secret</strong></em>, and <em><strong>Bucket</strong></em> values are correct before attempting to validate again.</p></li><li><p>Drag the <em><strong>Protection Period</strong></em> slider to set how far into the past you want to be able to access immutable backups data.</p></li><li><p>Click <em><strong>Save Profile</strong></em>.</p><p>You should expect your <code>ceph-rgw-immutable</code> Location Profile to appear as <em><strong>Valid</strong></em>.</p><p><img src="'+p+'" alt=""></p><p>Now you&#39;re ready to start protecting apps!</p></li><li><p>Click the <em><strong>&lt; / &gt; yaml</strong></em> button to view the YAML generated by creating a Location Profile through the Dashboard.</p><p><img src="'+h+'" alt=""></p><p>As you can see from this example, Kasten Location Profiles can be created declaratively as a <code>profile.config.kio.kasten.io</code> object referencing a Secret to store access and secret keys. This Kubernetes-native implementation makes it simple to configure backup targets using a GitOps approach.</p><div class="note custom-block github-alert"><p class="custom-block-title">NOTE</p><p></p><p>See <a href="https://docs.kasten.io/latest/api/profiles.html" target="_blank" rel="noreferrer">docs.kasten.io</a> for complete documentation on defining Profile API objects.</p></div></li></ol>',7),k=[r];function c(d,g,F,C,u,y){return a(),i("div",null,k)}const b=s(o,[["render",c]]);export{m as __pageData,b as default};