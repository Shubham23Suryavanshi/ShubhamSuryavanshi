const P=[
{t:"AI Meeting Assistant",c:"AI",d:"Turns meeting audio into structured Minutes of Meeting.",m:"Speech-to-text models plus NLP summarization, with audio chunking, asynchronous processing and a REST API.",k:["Speech-to-text","NLP","REST API"]},
{t:"AI Voice Receptionist",c:"AI",d:"A real-time voice assistant that answers like a receptionist.",m:"Built on the Eleven Labs platform with prompt engineering, custom voices and low-latency audio generation.",k:["Eleven Labs","Prompting","Text-to-speech"]},
{t:"Windows Server and Active Directory",c:"Infrastructure",d:"Central user and policy management for a Windows network.",m:"Windows Server 2019 with Active Directory, DNS and DHCP, plus account policies and group permissions.",k:["Windows Server 2019","Active Directory","DNS/DHCP"]},
{t:"Load-balanced Web Hosting",c:"Cloud",d:"Apache servers behind a reverse proxy, locked down.",m:"Apache on Linux with reverse-proxy load balancing, SSL/TLS and strict firewall rules.",k:["Apache","Linux","SSL/TLS"]},
{t:"Academic ERP Modules",c:"Web",d:"PHP and MySQL modules for day-to-day academic operations.",m:"Core PHP with sessions, form handling and MySQL joins, deployed on managed servers.",k:["PHP","MySQL","JavaScript"]}];
const S={"Backend":["Core PHP","Sessions","Form handling","REST APIs","MySQL"],"Frontend":["HTML5","CSS3","JavaScript","Responsive layouts"],"Cloud":["AWS EC2","VPC","IAM","Load Balancer","Auto Scaling","Azure"],"Systems":["Ubuntu Linux","Windows Server 2019","Active Directory","Apache and IIS","macOS"],"Automation":["Shell scripting","Python"]};
const $=s=>document.querySelector(s),el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h)e.innerHTML=h;return e};
let cat="All";
function draw(){const g=$("#grid");g.innerHTML="";P.filter(p=>cat=="All"||p.c==cat).forEach(p=>{const b=el("button","card",`<h3>${p.t}</h3><p>${p.d}</p><div class="more"><p>${p.m}</p></div>${p.k.map(k=>`<span class="tag">${k}</span>`).join("")}<span class="hint">Read more</span>`);b.setAttribute("aria-expanded","false");b.onclick=()=>{const o=b.getAttribute("aria-expanded")=="true";b.setAttribute("aria-expanded",!o);b.querySelector(".hint").textContent=o?"Read more":"Show less"};g.append(b)})}
["All",...new Set(P.map(p=>p.c))].forEach(c=>{const b=el("button","",c);b.setAttribute("aria-pressed",c=="All");b.onclick=()=>{cat=c;document.querySelectorAll("#tabs button").forEach(x=>x.setAttribute("aria-pressed",x==b));draw()};$("#tabs").append(b)});draw();
for(const k in S)$("#sk").append(el("div","",`<h3>${k}</h3>${S[k].map(s=>`<span>${s}</span>`).join("")}`));
// terminal
const out=$("#out"),cmd=$("#cmd");
const C={
help:"Commands: <b>about</b>, <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>contact</b>, <b>clear</b>",
about:"Shubham Kumar Suryavanshi. PHP developer and cloud trainer in Bhopal. I build ERP modules and web apps, and own the deployment from code to secure server.",
skills:"Backend: PHP, MySQL, REST APIs\nFrontend: HTML5, CSS3, JavaScript\nCloud: AWS, Azure, Linux, Windows Server",
projects:P.map(p=>"- "+p.t).join("\n")+"\n(scroll down for details)",
experience:"2024- Cloud & Virtualization Trainer, i-Nurture\n2024  IT Administrator, FitBliss By SK\n2023  AWS Administrator intern, Nuevera Infotech",
contact:"shubham23022001@gmail.com\n+91 70009 25966"};
const say=t=>{out.innerHTML+=t+"\n";out.scrollTop=out.scrollHeight};
function run(v){v=v.trim().toLowerCase();if(!v)return;say("<b>$</b> "+v.replace(/</g,"&lt;"));if(v=="clear"){out.innerHTML="";return}say(C[v]||`Command not found: ${v}. Type <b>help</b>.`)}
cmd.addEventListener("keydown",e=>{if(e.key=="Enter"){run(cmd.value);cmd.value=""}});
["about","skills","projects","experience","contact"].forEach(c=>{const b=el("button","",c);b.onclick=()=>run(c);$("#chips").append(b)});
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches,intro="Hi, I’m Shubham. I write PHP and keep the servers running.\nType a command or tap one below.\n";
if(rm)say(intro);else{let i=0;(function t(){out.textContent=intro.slice(0,++i);if(i<intro.length)setTimeout(t,22);else out.innerHTML+="\n"})()}
// contact, theme, nav highlight
$("#f").onsubmit=e=>{e.preventDefault();location.href="mailto:shubham23022001@gmail.com?subject="+encodeURIComponent("Portfolio enquiry from "+$("#n").value)+"&body="+encodeURIComponent($("#m").value)};
$("#theme").onclick=()=>{const r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
const links=[...document.querySelectorAll("nav a")];
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.hash=="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"}).observe&&document.querySelectorAll("section").forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.hash=="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"}).observe(s));
// blog
const B=[
{t:"Load balancing Apache with a reverse proxy",d:"Oct 2026",g:"Cloud",r:3,x:"Spread traffic across two web servers with mod_proxy_balancer.",b:"<p>Apache can sit in front of several backends and share requests between them. Enable the modules first:</p><pre>sudo a2enmod proxy proxy_http proxy_balancer lbmethod_byrequests\nsudo systemctl restart apache2</pre><p>Then define the pool and send traffic to it:</p><pre>&lt;Proxy \"balancer://app\"&gt;\n  BalancerMember \"http://10.0.0.11:80\"\n  BalancerMember \"http://10.0.0.12:80\"\n&lt;/Proxy&gt;\nProxyPass \"/\" \"balancer://app/\"\nProxyPassReverse \"/\" \"balancer://app/\"</pre><p>Add SSL/TLS on the proxy and keep the backends reachable only from it through the firewall.</p>"},
{t:"Five PHP session habits that prevent bugs and breaches",d:"Sep 2026",g:"PHP",r:3,x:"Small session rules that keep ERP logins safe.",b:"<p>Sessions are where many small PHP apps leak. These five habits help:</p><p>1. Call <code>session_start()</code> before any output.<br>2. Run <code>session_regenerate_id(true)</code> right after login.<br>3. Set cookies to HttpOnly, Secure and SameSite.<br>4. On logout, clear the session array and call <code>session_destroy()</code>.<br>5. Store a user ID in the session, never passwords or full records.</p>"},
{t:"A first-hour checklist for a new Linux server",d:"Aug 2026",g:"Linux",r:4,x:"Lock down a fresh Ubuntu server before you deploy anything.",b:"<p>Do this before installing the app:</p><p>1. Update packages with <code>apt update &amp;&amp; apt upgrade</code>.<br>2. Create a non-root user with sudo rights.<br>3. Use SSH keys and turn off password login.<br>4. Enable the firewall and allow only the ports you need.<br>5. Turn on unattended security updates.<br>6. Set up backups and test a restore.</p>"}];
let bc="All";
function bdraw(){const q=$("#q").value.toLowerCase(),l=B.filter(p=>(bc=="All"||p.g==bc)&&(p.t+p.x+p.b).toLowerCase().includes(q)),g=$("#bgrid");g.innerHTML="";l.forEach(p=>{const b=el("button","card",`<span class="meta">${p.d} · ${p.r} min read</span><h3>${p.t}</h3><p>${p.x}</p><span class="tag">${p.g}</span>`);b.onclick=()=>{dlg.innerHTML=`<span class="meta">${p.d} · ${p.r} min read · ${p.g}</span><h3>${p.t}</h3>${p.b}<p><button class="btn p" onclick="dlg.close()">Close</button></p>`;dlg.showModal()};g.append(b)});$("#none").hidden=l.length>0}
["All",...new Set(B.map(p=>p.g))].forEach(c=>{const b=el("button","",c);b.setAttribute("aria-pressed",c=="All");b.onclick=()=>{bc=c;document.querySelectorAll("#btabs button").forEach(x=>x.setAttribute("aria-pressed",x==b));bdraw()};$("#btabs").append(b)});
$("#q").oninput=bdraw;bdraw();dlg.onclick=e=>{if(e.target==dlg)dlg.close()};
// preloader, game, extras
(function(){
const pre=$('#pre'),pf=$('#pf'),pp=$('#pp'),pt=$('#pt'),M=['Booting portfolio','Starting servers','Loading projects','Ready'];let n=0;
const tm=setInterval(()=>{n+=rm?25:Math.random()*7+3;if(n>=100){n=100;clearInterval(tm);setTimeout(()=>{pre.classList.add('gone');document.body.classList.add('ready');setTimeout(()=>pre.remove(),900)},250)}pf.style.width=n+'%';pp.textContent=Math.floor(n)+'%';pt.textContent=M[Math.min(3,Math.floor(n/34))]},rm?30:90);
const L=[['PHP','#777BB4','php','#fff',12],['MySQL','#00758F','SQL','#fff',11],['JavaScript','#F7DF1E','JS','#222',13],['AWS','#FF9900','aws','#232F3E',12],['Azure','#0078D4','Az','#fff',13],['Linux','#2A2A2E','🐧','#fff',16],['Apache','#D22128','Ap','#fff',13],['Active Directory','#0F5FA8','AD','#fff',13],['Python','#3776AB','Py','#FFD43B',13],['Shell scripting','#2E7D32','>_','#fff',13]];$('#mt').innerHTML=L.concat(L).map(([n,bg,t,fg,fs])=>`<span><svg width='34' height='34' viewBox='0 0 30 30' aria-hidden='true'><rect width='30' height='30' rx='8' fill='${bg}'/><text x='15' y='${fs>14?21:19.5}' text-anchor='middle' font-family='IBM Plex Sans,sans-serif' font-weight='700' font-size='${fs}' fill='${fg}'>${t}</text></svg>${n}</span>`).join('');
const tx=(t,c,s)=>{const e=el(t,c);e.textContent=s;return e};
const Q0=[{q:'Which Apache module provides the balancer?',o:['mod_proxy_balancer','mod_rewrite','mod_ssl'],a:0,xp:100,s:2},{q:'When should you call session_regenerate_id(true)?',o:['Right after login','Only on logout','Never'],a:0,xp:80,s:1},{q:'What should you use to log in to a new server?',o:['A shared password','SSH keys','No authentication'],a:1,xp:120,s:3}];
const BASE=B.map((p,i)=>({id:'starter-'+(i+1),t:p.t,d:p.d,g:p.g,r:p.r,x:p.x,html:p.b,xp:Q0[i].xp,s:Q0[i].s,quiz:Q0[i]}));
const UPLOAD_ON=false;let POSTS=BASE.slice(),st={},lv={},V={},mine={},CM={},db=null,user=null,uid=null,cur=null,admin=false,opened=false;
try{st=JSON.parse(localStorage.getItem('qx2')||'{}');lv=JSON.parse(localStorage.getItem('lv')||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem('qx2',JSON.stringify(st));localStorage.setItem('lv',JSON.stringify(lv))}catch(e){}};
const LV=['Rookie','Sysadmin','DevOps Ranger','Cloud Architect'],BG=['First clear','Halfway there','Quest master'];
$('#hud').innerHTML=`<div class='lv' id='lv'></div><div class='hb'><div class='hn' id='hn'></div><div class='xb'><i id='xf'></i></div><small id='xt'></small></div><div class='bd' id='bd'>${BG.map(b=>`<span>${b}</span>`).join('')}</div>`;
function upd(){const N=POSTS.length,c=POSTS.filter(p=>st[p.id]).length,tot=POSTS.reduce((a,p)=>a+p.xp,0),x=POSTS.reduce((a,p)=>a+(st[p.id]?p.xp:0),0),l=c==0?0:c>=N?3:(c/N<.5?1:2),need=[1,Math.ceil(N/2),N];$('#lv').textContent='LV '+(l+1);$('#hn').textContent=LV[l];$('#xt').textContent=x+' / '+tot+' XP';setTimeout(()=>$('#xf').style.width=(tot?x/tot*100:0)+'%',60);document.querySelectorAll('#bd span').forEach((s,i)=>s.classList.toggle('on',c>=need[i]))}
const cnt=id=>db?(V[id]||{u:0,d:0}):{u:lv[id]==1?1:0,d:lv[id]==-1?1:0},myv=id=>db?(mine[id]||0):(lv[id]||0);
function vote(id,v){const nv=myv(id)==v?0:v;if(db&&uid){mine[id]=nv;db.doc('votes/'+uid).set(Object.assign({},mine)).catch(()=>{})}else{lv[id]=nv;save()}sync();draw()}
function boom(){if(rm)return;for(let i=0;i<28;i++){const s=el('i'),a=Math.random()*6.28,d=80+Math.random()*180;s.style.cssText=`position:absolute;left:50%;top:45%;width:8px;height:8px;border-radius:2px;pointer-events:none;background:${['#E8A317','#2F9AA0','#4CC38A','#e5484d'][i%4]}`;dlg.append(s);s.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+60}px) rotate(${Math.random()*540}deg)`,opacity:0}],{duration:900+Math.random()*500,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>s.remove()}}
function clear(p){if(st[p.id])return;st[p.id]=1;save();upd();draw();boom()}
function body(t){const f=document.createDocumentFragment();let code=null,par=[];const fl=()=>{if(par.length){f.append(tx('p','',par.join(' ')));par=[]}};t.split('\n').forEach(l=>{if(l.trim().startsWith('```')){if(code===null){fl();code=[]}else{f.append(tx('pre','',code.join('\n')));code=null}}else if(code!==null)code.push(l);else if(!l.trim())fl();else par.push(l.trim())});fl();if(code)f.append(tx('pre','',code.join('\n')));return f}
function sync(){if(cur===null||!$('#bu'))return;const n=cnt(cur),m=myv(cur),cl=CM[cur]||[];$('#bu').textContent='👍 '+n.u;$('#bdn').textContent='👎 '+n.d;$('#bu').classList.toggle('on',m==1);$('#bdn').classList.toggle('on',m==-1);$('#bcm').textContent='💬 '+cl.length;const L=$('#cl');L.innerHTML='';if(!cl.length)L.append(tx('p','meta','No comments yet. Be the first.'));cl.forEach(c=>{const r=el('div','c'),nm=tx('b','','Visitor');r.append(nm,tx('small','',new Date(c.ts).toLocaleDateString()),tx('div','',c.t));if(c.u&&user)user.profiles([c.u]).then(P=>{if(P[c.u]&&P[c.u].name)nm.textContent=P[c.u].name}).catch(()=>{});if(db&&(c.u==uid||admin)){const x=tx('button','ico','Delete');x.onclick=()=>db.doc('comments/'+c.id).delete();r.append(x)}L.append(r)})}
function play(id){const p=POSTS.find(x=>x.id==id);if(!p)return;cur=id;dlg.innerHTML='';
dlg.append(tx('span','meta',[p.d,p.r+' min read',p.g].filter(Boolean).join(' · ')),tx('h3','',p.t));
const bd=el('div');if(p.html)bd.innerHTML=p.html;else bd.append(body(p.text));dlg.append(bd);
const act=el('div','act');act.innerHTML="<button id='bu'></button><button id='bdn'></button><button id='bcm'></button><button id='bsh'>Share</button>";dlg.append(act);
const u=location.href.split('#')[0]+'#post='+encodeURIComponent(id),enc=encodeURIComponent,msg=p.t+' by Shubham Suryavanshi',sh=el('div','shr'),inp=el('input');sh.hidden=true;inp.readOnly=true;inp.value=u;inp.setAttribute('aria-label','Post link');
const cp=tx('button','btn','Copy link');cp.onclick=async()=>{inp.select();try{await navigator.clipboard.writeText(u);cp.textContent='Copied'}catch(e){cp.textContent='Press Ctrl+C'}};sh.append(inp,cp);
[['WhatsApp','https://wa.me/?text='+enc(msg+' '+u)],['LinkedIn','https://www.linkedin.com/sharing/share-offsite/?url='+enc(u)],['X','https://twitter.com/intent/tweet?text='+enc(msg)+'&url='+enc(u)]].forEach(([n,h])=>{const a=tx('a','btn',n);a.href=h;a.target='_blank';a.rel='noopener';sh.append(a)});dlg.append(sh);
const cm=el('div','cm');cm.hidden=true;cm.innerHTML="<div id='cl'></div>";const note=tx('p','meta','');
if(db&&uid){const ta=el('textarea');ta.maxLength=500;ta.rows=3;ta.placeholder='Write a comment';ta.setAttribute('aria-label','Comment');const pb=tx('button','btn p','Post comment');pb.onclick=()=>{const t=ta.value.trim();if(!t)return;pb.disabled=true;db.collection('comments').add({post:id,uid,text:t.slice(0,500),ts:Date.now()}).then(()=>{ta.value='';note.textContent=''}).catch(()=>{note.textContent='Could not post. Your access may be read-only.'}).finally(()=>pb.disabled=false)};cm.append(ta,pb)}else note.textContent='Comments are open to signed-in viewers. Likes are saved on this device only.';cm.append(note);dlg.append(cm);
act.querySelector('#bu').onclick=()=>vote(id,1);act.querySelector('#bdn').onclick=()=>vote(id,-1);act.querySelector('#bcm').onclick=()=>{cm.hidden=!cm.hidden};act.querySelector('#bsh').onclick=()=>{sh.hidden=!sh.hidden};
const z=p.quiz,qz=el('div','qz');
if(z){qz.append(tx('b','','Boss question (+'+p.xp+' XP)'),tx('p','',z.q));const f=tx('p','',st[id]?'Already cleared. Replay for fun.':'');f.setAttribute('aria-live','polite');z.o.forEach((o,k)=>{const b=tx('button','',o);b.onclick=()=>{const ok=k==z.a;b.classList.add(ok?'ok':'no');if(!ok){f.textContent='Not quite. Re-read the post and try again.';return}qz.querySelectorAll('button').forEach(x=>x.disabled=true);if(st[id]){f.textContent='Correct!';return}f.textContent='Quest cleared! +'+p.xp+' XP';clear(p)};qz.append(b)});qz.append(f)}
else{const b=tx('button','btn p',st[id]?'Cleared':'Mark quest cleared (+'+p.xp+' XP)');b.onclick=()=>{clear(p);b.textContent='Cleared'};qz.append(b)}
dlg.append(qz);const ft=el('p');ft.append(tx('button','btn p','Close'));ft.firstChild.onclick=()=>dlg.close();
if(UPLOAD_ON&&admin&&p.db){const dl=tx('button','btn','Delete post');dl.onclick=()=>{if(dl.dataset.s){db.doc('posts/'+id).delete().then(()=>dlg.close())}else{dl.dataset.s=1;dl.textContent='Click again to delete'}};ft.append(dl)}dlg.append(ft);sync();dlg.showModal()}
function draw(){const q=$('#q').value.toLowerCase(),g=$('#bgrid');g.innerHTML='';let c=0;POSTS.forEach((p,i)=>{if(!((bc=='All'||p.g==bc)&&(p.t+p.x+(p.html||p.text||'')).toLowerCase().includes(q)))return;c++;const d=st[p.id],n=cnt(p.id),b=el('button','card'+(d?' cl':''));b.append(tx('span','xp','+'+p.xp+' XP'),tx('span','meta','Quest '+(i+1)+' · '+'★'.repeat(p.s)+'☆'.repeat(3-p.s)),tx('h3','',p.t),tx('p','',p.x),tx('span','tag',p.g),tx('span','tag',d?'Cleared ✓':'Open quest'),tx('div','cf','👍 '+n.u+'   👎 '+n.d+'   💬 '+(CM[p.id]||[]).length));b.onclick=()=>play(p.id);g.append(b)});$('#none').hidden=c>0}
function rebuildTabs(){const t=$('#btabs');t.innerHTML='';['All',...new Set(POSTS.map(p=>p.g))].forEach(c=>{const b=tx('button','',c);b.setAttribute('aria-pressed',c==bc);b.onclick=()=>{bc=c;t.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x==b));draw()};t.append(b)})}
function openFromHash(){const m=location.hash.match(/#post=(.+)/);if(m&&!opened&&POSTS.some(p=>p.id==decodeURIComponent(m[1]))){opened=true;play(decodeURIComponent(m[1]))}}
bdraw=draw;rebuildTabs();$('#q').oninput=draw;draw();upd();openFromHash();dlg.addEventListener('close',()=>{cur=null});
$('#af').onsubmit=e=>{e.preventDefault();const g=i=>$('#'+i).value.trim(),bodyT=g('ab'),o=[g('ao1'),g('ao2'),g('ao3')].filter(Boolean),q=g('aq'),doc={title:g('at'),tag:g('ag')||'General',summary:g('ax'),body:bodyT,date:new Date().toLocaleDateString('en-IN',{month:'short',year:'numeric'}),minutes:Math.max(1,Math.round(bodyT.split(/\s+/).length/200)),xp:Math.min(500,+g('axp')||100),stars:+g('as')||1,created:Date.now()};if(q&&o.length>1)doc.quiz={q,o,a:Math.min(o.length-1,(+g('aa')||1)-1)};db.collection('posts').add(doc).then(()=>{$('#af').reset();$('#am').textContent='Published. It is on the quest board now.'}).catch(()=>{$('#am').textContent='Could not publish. You need editor access.'})};
if(window.claude&&claude.use)Promise.all([claude.use('db'),claude.use('user')]).then(async([d,u])=>{user=u;if(u){uid=await u.id();admin=await u.canEdit()}db=d;if(!d){return}
if(UPLOAD_ON&&admin)$('#adm').hidden=false;
d.collection('posts').onSnapshot(s=>{const L=s.docs.map(x=>{const o=x.data()||{};return{id:x.id,db:1,t:String(o.title||'Untitled'),d:String(o.date||''),g:String(o.tag||'General'),r:+o.minutes||1,x:String(o.summary||''),text:String(o.body||''),xp:Math.min(500,+o.xp||100),s:Math.min(3,Math.max(1,+o.stars||1)),quiz:o.quiz&&Array.isArray(o.quiz.o)?{q:String(o.quiz.q),o:o.quiz.o.map(String),a:+o.quiz.a||0}:null,c:+o.created||0}}).sort((a,b)=>b.c-a.c);POSTS=L.concat(BASE);rebuildTabs();upd();draw();openFromHash()});
d.collection('votes').onSnapshot(s=>{V={};mine={};s.docs.forEach(x=>{const m=x.data()||{};for(const k in m){if(m[k]!==1&&m[k]!==-1)continue;(V[k]=V[k]||{u:0,d:0})[m[k]==1?'u':'d']++;if(x.id==uid)mine[k]=m[k]}});draw();sync()});
d.collection('comments').onSnapshot(s=>{CM={};s.docs.forEach(x=>{const o=x.data()||{};(CM[o.post]=CM[o.post]||[]).push({id:x.id,u:o.uid,t:String(o.text||''),ts:+o.ts||0})});for(const k in CM)CM[k].sort((a,b)=>a.ts-b.ts);draw();sync()})}).catch(()=>{});

if(!rm&&matchMedia('(hover:hover)').matches){const g=el('div');g.id='glow';document.body.append(g);let tx=0,ty=0,x=0,y=0;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY});(function f(){x+=(tx-x)*.12;y+=(ty-y)*.12;g.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(f)})();
document.addEventListener('mousemove',e=>{const b=e.target.closest&&e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});document.addEventListener('mouseout',e=>{const b=e.target.closest&&e.target.closest('.btn');if(b)b.style.transform=''})}
})();
// animation
(function(){
const nm=$("#nm"),txt=nm.textContent;nm.setAttribute("aria-label",txt);nm.innerHTML="";let k=0;
txt.split(" ").forEach(w=>{const s=el("span","w");s.setAttribute("aria-hidden","true");[...w].forEach(c=>{const h=el("span","ch",c);h.style.animationDelay=(k++*.04)+"s";s.append(h)});nm.append(s)});
const R=["PHP and MySQL ERP modules","Linux and AWS deployments","secure Apache hosting","AI voice and meeting tools"],rot=$("#rot");
if(rm)rot.textContent=R[0];else{let i=0,j=0,del=false;(function t(){const w=R[i];j+=del?-1:1;rot.textContent=w.slice(0,j);let d=del?35:70;if(!del&&j==w.length){del=true;d=1600}else if(del&&j==0){del=false;i=(i+1)%R.length;d=300}setTimeout(t,d)})()}
const cv=$("#net"),cx=cv.getContext("2d"),hero=document.querySelector(".hero");let W,H,pts=[],m={x:-999,y:-999};
function size(){const r=cv.getBoundingClientRect(),dp=devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*dp;cv.height=H*dp;cx.setTransform(dp,0,0,dp,0,0);const n=Math.min(70,Math.floor(W*H/9000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))}
size();addEventListener("resize",size);hero.addEventListener("mousemove",e=>{const r=cv.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});hero.addEventListener("mouseleave",()=>{m.x=m.y=-999});
function frame(){const col=getComputedStyle(document.documentElement).getPropertyValue("--teal").trim()||"#2F6F73";cx.clearRect(0,0,W,H);
for(const p of pts){if(!rm){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<120){p.x+=dx/d*1.6;p.y+=dy/d*1.6}}cx.globalAlpha=.5;cx.fillStyle=col;cx.beginPath();cx.arc(p.x,p.y,2,0,7);cx.fill()}
for(let a=0;a<pts.length;a++)for(let b=a+1;b<pts.length;b++){const d=Math.hypot(pts[a].x-pts[b].x,pts[a].y-pts[b].y);if(d<110){cx.globalAlpha=(1-d/110)*.35;cx.strokeStyle=col;cx.beginPath();cx.moveTo(pts[a].x,pts[a].y);cx.lineTo(pts[b].x,pts[b].y);cx.stroke()}}
if(!rm)requestAnimationFrame(frame)}frame();
// reveal, counters, progress, tilt
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll("section>h2,section>.sub,.job,.sk>div,.two>div,.stats,form,.tools").forEach(e=>{e.classList.add("rv");io.observe(e)});
new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.unobserve(e.target);e.target.querySelectorAll("b").forEach(b=>{const n=+b.dataset.n;if(rm){b.textContent=n;return}let v=0;const t=setInterval(()=>{b.textContent=++v;if(v>=n)clearInterval(t)},260)})}),{threshold:.5}).observe(document.querySelector(".stats"));
const bar=document.createElement("div");bar.id="bar";document.body.prepend(bar);
addEventListener("scroll",()=>{bar.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+"%"},{passive:true});
if(!rm){document.addEventListener("mousemove",e=>{const c=e.target.closest&&e.target.closest(".card");if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-3px)`});document.addEventListener("mouseout",e=>{const c=e.target.closest&&e.target.closest(".card");if(c)c.style.transform=""})}
})();
// avatar
(function(){
const av=document.createElement('div');av.id='av';av.hidden=true;av.setAttribute('popover','manual');
av.innerHTML="<div id='avb' role='status' aria-live='polite'></div><img src='assets/images/avatar.jpg' alt='Photo of Shubham, who reacts to what you do' width='88' height='88' data-m='n'>";
document.body.append(av);
const b=av.querySelector('#avb'),svg=av.querySelector('img');
const top=()=>{try{av.hidePopover()}catch(e){}try{av.showPopover()}catch(e){}};
function mood(k){svg.dataset.m=k;if(k!='n'&&k!='z'&&!rm){svg.animate([{transform:'scale(1)'},{transform:'scale(1.18) rotate('+(k=='s'?-6:6)+'deg)'},{transform:'scale(1)'}],{duration:450,easing:'ease-out'})}}
let tm,last=0,sl=false,idle;
function pop(em){if(rm)return;for(let i=0;i<3;i++){const s=document.createElement('span');s.textContent=em;s.style.cssText='position:absolute;right:'+(10+Math.random()*50)+'px;bottom:70px;font-size:22px;pointer-events:none';av.append(s);s.animate([{transform:'translateY(0) scale(.6)',opacity:1},{transform:`translate(${(Math.random()-.5)*50}px,-${70+Math.random()*50}px) scale(1.1)`,opacity:0}],{duration:1100,delay:i*120,easing:'ease-out',fill:'backwards'}).onfinish=()=>s.remove()}}
function say(t,k,em,ms){const n=Date.now();if(n-last<500)return;last=n;b.textContent=t;b.classList.add('on');mood(k||'h');if(em)pop(em);clearTimeout(tm);tm=setTimeout(()=>{b.classList.remove('on');mood('n')},ms||3200)}
function act(){clearTimeout(idle);if(sl){sl=false;mood('n');say('Welcome back!','h','👋')}idle=setTimeout(()=>{sl=true;b.textContent='zzz…';b.classList.add('on');mood('z')},30000)}
['mousemove','scroll','keydown','touchstart','click'].forEach(v=>addEventListener(v,act,{passive:true}));
addEventListener('mousemove',e=>{if(rm)return;const r=svg.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),d=Math.hypot(dx,dy)||1,k=Math.min(4,d/80);svg.style.objectPosition=(50+dx/d*k)+'% '+(50+dy/d*k)+'%'},{passive:true});
const tips=['Hi! Scroll down to see my projects.','Try the terminal at the top.','Blog quests give you XP.','Want to talk? Use the contact form.'];let ti=0;
svg.onclick=()=>say(tips[ti++%tips.length],'h','👋');
document.addEventListener('click',e=>{const t=e.target,cl=s=>t.closest&&t.closest(s);
if(t.classList.contains('ok'))return say('Correct! Nice one.','h','🎉');
if(t.classList.contains('no'))return say('Oops, give it another try.','s','🤔');
if(t.id=='bu')return t.classList.contains('on')?say('Thanks for the like!','h','👍'):say('No problem, vote removed.','n');
if(t.id=='bdn')return t.classList.contains('on')?say('Noted. I will improve this one.','n','🙏'):say('Vote removed.','n');
if(t.id=='bsh')return say('Thanks for sharing!','h','🔗');
if(t.id=='bcm')return say('Join the discussion!','w','💬');
if(cl('#theme'))return say('Switching the lights.','w','💡');
if(cl('.chips button'))return say('Nice command!','h','⌨️');
if(cl('#bgrid .card'))return say('A new quest. Good luck!','w','🎮');
if(cl('#grid .card'))return say('Good pick! Read more.','h','✨');
if(cl('.tabs button'))return say('Filtering for you.','n','🔍');
if(cl('a[href*="drive.google"]'))return say('Thanks for checking my resume!','h','📄')});
document.addEventListener('submit',e=>{if(e.target.id=='f')say('Opening your email app…','h','✉️')});
function start(){if(!av.hidden)return;av.hidden=false;top();new MutationObserver(()=>{if(dlg.open)top()}).observe(dlg,{attributes:true,attributeFilter:['open']});say('Hi, I’m Shubham! Look around. I will react.','h','👋',4500);act();
const S={experience:['Three roles so far, and still learning.','n'],projects:['Open a card to read the details.','w'],blog:['Clear quests to earn XP!','h'],skills:['Code on top, servers underneath.','n'],education:['Always studying. M.Tech is next.','h'],contact:['Say hi! I reply quickly.','h']},seen={},io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!seen[e.target.id]){seen[e.target.id]=1;say(S[e.target.id][0],S[e.target.id][1])}}),{threshold:.35});Object.keys(S).forEach(k=>io2.observe(document.getElementById(k)))}
const wt=setInterval(()=>{if(document.body.classList.contains('ready')){clearInterval(wt);setTimeout(start,500)}},200);setTimeout(()=>{clearInterval(wt);start()},6500);
})();
