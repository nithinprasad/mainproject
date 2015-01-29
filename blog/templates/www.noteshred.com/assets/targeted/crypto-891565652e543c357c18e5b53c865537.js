"use strict";var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),sjcl.cipher.aes=function(t){this.h[0][0][0]||this.z();var e,i,s,n,c=this.h[0][4],r=this.h[1];e=t.length;var o=1;if(4!==e&&6!==e&&8!==e)throw new sjcl.exception.invalid("invalid aes key size");for(this.a=[s=t.slice(0),n=[]],t=e;4*e+28>t;t++)i=s[t-1],(0===t%e||8===e&&4===t%e)&&(i=c[i>>>24]<<24^c[255&i>>16]<<16^c[255&i>>8]<<8^c[255&i],0===t%e&&(i=i<<8^i>>>24^o<<24,o=o<<1^283*(o>>7))),s[t]=s[t-e]^i;for(e=0;t;e++,t--)i=s[3&e?t:t-4],n[e]=4>=t||4>e?i:r[0][c[i>>>24]]^r[1][c[255&i>>16]]^r[2][c[255&i>>8]]^r[3][c[255&i]]},sjcl.cipher.aes.prototype={encrypt:function(t){return this.I(t,0)},decrypt:function(t){return this.I(t,1)},h:[[[],[],[],[],[]],[[],[],[],[],[]]],z:function(){var t,e,i,s,n,c,r,o=this.h[0],a=this.h[1],h=o[4],l=a[4],f=[],u=[];for(t=0;256>t;t++)u[(f[t]=t<<1^283*(t>>7))^t]=t;for(e=i=0;!h[e];e^=s||1,i=u[i]||1)for(c=i^i<<1^i<<2^i<<3^i<<4,c=99^(c>>8^255&c),h[e]=c,l[c]=e,n=f[t=f[s=f[e]]],r=16843009*n^65537*t^257*s^16843008*e,n=257*f[c]^16843008*c,t=0;4>t;t++)o[t][e]=n=n<<24^n>>>8,a[t][c]=r=r<<24^r>>>8;for(t=0;5>t;t++)o[t]=o[t].slice(0),a[t]=a[t].slice(0)},I:function(t,e){if(4!==t.length)throw new sjcl.exception.invalid("invalid aes block size");var i=this.a[e],s=t[0]^i[0],n=t[e?3:1]^i[1],c=t[2]^i[2];t=t[e?1:3]^i[3];var r,o,a,h,l=i.length/4-2,f=4,u=[0,0,0,0];r=this.h[e];var d=r[0],p=r[1],j=r[2],g=r[3],m=r[4];for(h=0;l>h;h++)r=d[s>>>24]^p[255&n>>16]^j[255&c>>8]^g[255&t]^i[f],o=d[n>>>24]^p[255&c>>16]^j[255&t>>8]^g[255&s]^i[f+1],a=d[c>>>24]^p[255&t>>16]^j[255&s>>8]^g[255&n]^i[f+2],t=d[t>>>24]^p[255&s>>16]^j[255&n>>8]^g[255&c]^i[f+3],f+=4,s=r,n=o,c=a;for(h=0;4>h;h++)u[e?3&-h:h]=m[s>>>24]<<24^m[255&n>>16]<<16^m[255&c>>8]<<8^m[255&t]^i[f++],r=s,s=n,n=c,c=t,t=r;return u}},sjcl.bitArray={bitSlice:function(t,e,i){return t=sjcl.bitArray.P(t.slice(e/32),32-(31&e)).slice(1),void 0===i?t:sjcl.bitArray.clamp(t,i-e)},extract:function(t,e,i){var s=Math.floor(31&-e-i);return(-32&(e+i-1^e)?t[0|e/32]<<32-s^t[0|e/32+1]>>>s:t[0|e/32]>>>s)&(1<<i)-1},concat:function(t,e){if(0===t.length||0===e.length)return t.concat(e);var i=t[t.length-1],s=sjcl.bitArray.getPartial(i);return 32===s?t.concat(e):sjcl.bitArray.P(e,s,0|i,t.slice(0,t.length-1))},bitLength:function(t){var e=t.length;return 0===e?0:32*(e-1)+sjcl.bitArray.getPartial(t[e-1])},clamp:function(t,e){if(32*t.length<e)return t;t=t.slice(0,Math.ceil(e/32));var i=t.length;return e&=31,i>0&&e&&(t[i-1]=sjcl.bitArray.partial(e,t[i-1]&2147483648>>e-1,1)),t},partial:function(t,e,i){return 32===t?e:(i?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,e){if(sjcl.bitArray.bitLength(t)!==sjcl.bitArray.bitLength(e))return!1;var i,s=0;for(i=0;i<t.length;i++)s|=t[i]^e[i];return 0===s},P:function(t,e,i,s){var n;for(n=0,void 0===s&&(s=[]);e>=32;e-=32)s.push(i),i=0;if(0===e)return s.concat(t);for(n=0;n<t.length;n++)s.push(i|t[n]>>>e),i=t[n]<<32-e;return n=t.length?t[t.length-1]:0,t=sjcl.bitArray.getPartial(n),s.push(sjcl.bitArray.partial(31&e+t,e+t>32?i:s.pop(),1)),s},k:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]}},sjcl.codec.utf8String={fromBits:function(t){var e,i,s="",n=sjcl.bitArray.bitLength(t);for(e=0;n/8>e;e++)0===(3&e)&&(i=t[e/4]),s+=String.fromCharCode(i>>>24),i<<=8;return decodeURIComponent(escape(s))},toBits:function(t){t=unescape(encodeURIComponent(t));var e,i=[],s=0;for(e=0;e<t.length;e++)s=s<<8|t.charCodeAt(e),3===(3&e)&&(i.push(s),s=0);return 3&e&&i.push(sjcl.bitArray.partial(8*(3&e),s)),i}},sjcl.codec.hex={fromBits:function(t){var e,i="";for(e=0;e<t.length;e++)i+=((0|t[e])+0xf00000000000).toString(16).substr(4);return i.substr(0,sjcl.bitArray.bitLength(t)/4)},toBits:function(t){var e,i,s=[];for(t=t.replace(/\s|0x/g,""),i=t.length,t+="00000000",e=0;e<t.length;e+=8)s.push(0^parseInt(t.substr(e,8),16));return sjcl.bitArray.clamp(s,4*i)}},sjcl.codec.base64={F:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,e,i){var s="",n=0,c=sjcl.codec.base64.F,r=0,o=sjcl.bitArray.bitLength(t);for(i&&(c=c.substr(0,62)+"-_"),i=0;6*s.length<o;)s+=c.charAt((r^t[i]>>>n)>>>26),6>n?(r=t[i]<<6-n,n+=26,i++):(r<<=6,n-=6);for(;3&s.length&&!e;)s+="=";return s},toBits:function(t,e){t=t.replace(/\s|=/g,"");var i,s=[],n=0,c=sjcl.codec.base64.F,r=0;for(e&&(c=c.substr(0,62)+"-_"),e=0;e<t.length;e++){if(i=c.indexOf(t.charAt(e)),0>i)throw new sjcl.exception.invalid("this isn't base64!");n>26?(n-=26,s.push(r^i>>>n),r=i<<32-n):(n+=6,r^=i<<32-n)}return 56&n&&s.push(sjcl.bitArray.partial(56&n,r,1)),s}},sjcl.codec.base64url={fromBits:function(t){return sjcl.codec.base64.fromBits(t,1,1)},toBits:function(t){return sjcl.codec.base64.toBits(t,1)}},sjcl.hash.sha256=function(t){this.a[0]||this.z(),t?(this.n=t.n.slice(0),this.i=t.i.slice(0),this.e=t.e):this.reset()},sjcl.hash.sha256.hash=function(t){return(new sjcl.hash.sha256).update(t).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.n=this.N.slice(0),this.i=[],this.e=0,this},update:function(t){"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t));var e,i=this.i=sjcl.bitArray.concat(this.i,t);for(e=this.e,t=this.e=e+sjcl.bitArray.bitLength(t),e=-512&512+e;t>=e;e+=512)this.D(i.splice(0,16));return this},finalize:function(){var t,e=this.i,i=this.n;for(e=sjcl.bitArray.concat(e,[sjcl.bitArray.partial(1,1)]),t=e.length+2;15&t;t++)e.push(0);for(e.push(Math.floor(this.e/4294967296)),e.push(0|this.e);e.length;)this.D(e.splice(0,16));return this.reset(),i},N:[],a:[],z:function(){function t(t){return 0|4294967296*(t-Math.floor(t))}var e,i=0,s=2;t:for(;64>i;s++){for(e=2;s>=e*e;e++)if(0===s%e)continue t;8>i&&(this.N[i]=t(Math.pow(s,.5))),this.a[i]=t(Math.pow(s,1/3)),i++}},D:function(t){var e,i,s=t.slice(0),n=this.n,c=this.a,r=n[0],o=n[1],a=n[2],h=n[3],l=n[4],f=n[5],u=n[6],d=n[7];for(t=0;64>t;t++)16>t?e=s[t]:(e=s[15&t+1],i=s[15&t+14],e=s[15&t]=0|(e>>>7^e>>>18^e>>>3^e<<25^e<<14)+(i>>>17^i>>>19^i>>>10^i<<15^i<<13)+s[15&t]+s[15&t+9]),e=e+d+(l>>>6^l>>>11^l>>>25^l<<26^l<<21^l<<7)+(u^l&(f^u))+c[t],d=u,u=f,f=l,l=0|h+e,h=a,a=o,o=r,r=0|e+(o&a^h&(o^a))+(o>>>2^o>>>13^o>>>22^o<<30^o<<19^o<<10);n[0]=0|n[0]+r,n[1]=0|n[1]+o,n[2]=0|n[2]+a,n[3]=0|n[3]+h,n[4]=0|n[4]+l,n[5]=0|n[5]+f,n[6]=0|n[6]+u,n[7]=0|n[7]+d}},sjcl.mode.ccm={name:"ccm",encrypt:function(t,e,i,s,n){var c,r=e.slice(0),o=sjcl.bitArray,a=o.bitLength(i)/8,h=o.bitLength(r)/8;if(n=n||64,s=s||[],7>a)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(c=2;4>c&&h>>>8*c;c++);return 15-a>c&&(c=15-a),i=o.clamp(i,8*(15-c)),e=sjcl.mode.ccm.H(t,e,i,s,n,c),r=sjcl.mode.ccm.J(t,r,i,e,n,c),o.concat(r.data,r.tag)},decrypt:function(t,e,i,s,n){n=n||64,s=s||[];var c=sjcl.bitArray,r=c.bitLength(i)/8,o=c.bitLength(e),a=c.clamp(e,o-n),h=c.bitSlice(e,o-n);if(o=(o-n)/8,7>r)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(e=2;4>e&&o>>>8*e;e++);if(15-r>e&&(e=15-r),i=c.clamp(i,8*(15-e)),a=sjcl.mode.ccm.J(t,a,i,h,n,e),t=sjcl.mode.ccm.H(t,a.data,i,s,n,e),!c.equal(a.tag,t))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return a.data},H:function(t,e,i,s,n,c){var r=[],o=sjcl.bitArray,a=o.k;if(n/=8,n%2||4>n||n>16)throw new sjcl.exception.invalid("ccm: invalid tag length");if(s.length>4294967295||e.length>4294967295)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");if(c=[o.partial(8,(s.length?64:0)|n-2<<2|c-1)],c=o.concat(c,i),c[3]|=o.bitLength(e)/8,c=t.encrypt(c),s.length)for(i=o.bitLength(s)/8,65279>=i?r=[o.partial(16,i)]:4294967295>=i&&(r=o.concat([o.partial(16,65534)],[i])),r=o.concat(r,s),s=0;s<r.length;s+=4)c=t.encrypt(a(c,r.slice(s,s+4).concat([0,0,0])));for(s=0;s<e.length;s+=4)c=t.encrypt(a(c,e.slice(s,s+4).concat([0,0,0])));return o.clamp(c,8*n)},J:function(t,e,i,s,n,c){var r,o=sjcl.bitArray;r=o.k;var a=e.length,h=o.bitLength(e);if(i=o.concat([o.partial(8,c-1)],i).concat([0,0,0]).slice(0,4),s=o.bitSlice(r(s,t.encrypt(i)),0,n),!a)return{tag:s,data:[]};for(r=0;a>r;r+=4)i[3]++,n=t.encrypt(i),e[r]^=n[0],e[r+1]^=n[1],e[r+2]^=n[2],e[r+3]^=n[3];return{tag:s,data:o.clamp(e,h)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(t,e,i,s,n,c){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits");var r,o=sjcl.mode.ocb2.B,a=sjcl.bitArray,h=a.k,l=[0,0,0,0];i=o(t.encrypt(i));var f,u=[];for(s=s||[],n=n||64,r=0;r+4<e.length;r+=4)f=e.slice(r,r+4),l=h(l,f),u=u.concat(h(i,t.encrypt(h(i,f)))),i=o(i);return f=e.slice(r),e=a.bitLength(f),r=t.encrypt(h(i,[0,0,0,e])),f=a.clamp(h(f.concat([0,0,0]),r),e),l=h(l,h(f.concat([0,0,0]),r)),l=t.encrypt(h(l,h(i,o(i)))),s.length&&(l=h(l,c?s:sjcl.mode.ocb2.pmac(t,s))),u.concat(a.concat(f,a.clamp(l,n)))},decrypt:function(t,e,i,s,n,c){if(128!==sjcl.bitArray.bitLength(i))throw new sjcl.exception.invalid("ocb iv must be 128 bits");n=n||64;var r,o,a=sjcl.mode.ocb2.B,h=sjcl.bitArray,l=h.k,f=[0,0,0,0],u=a(t.encrypt(i)),d=sjcl.bitArray.bitLength(e)-n,p=[];for(s=s||[],i=0;d/32>i+4;i+=4)r=l(u,t.decrypt(l(u,e.slice(i,i+4)))),f=l(f,r),p=p.concat(r),u=a(u);if(o=d-32*i,r=t.encrypt(l(u,[0,0,0,o])),r=l(r,h.clamp(e.slice(i),o).concat([0,0,0])),f=l(f,r),f=t.encrypt(l(f,l(u,a(u)))),s.length&&(f=l(f,c?s:sjcl.mode.ocb2.pmac(t,s))),!h.equal(h.clamp(f,n),h.bitSlice(e,d)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return p.concat(h.clamp(r,o))},pmac:function(t,e){var i,s=sjcl.mode.ocb2.B,n=sjcl.bitArray,c=n.k,r=[0,0,0,0],o=t.encrypt([0,0,0,0]);for(o=c(o,s(s(o))),i=0;i+4<e.length;i+=4)o=s(o),r=c(r,t.encrypt(c(o,e.slice(i,i+4))));return e=e.slice(i),n.bitLength(e)<128&&(o=c(o,s(o)),e=n.concat(e,[-2147483648,0,0,0])),r=c(r,e),t.encrypt(c(s(c(o,s(o))),r))},B:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},sjcl.misc.hmac=function(t,e){this.M=e=e||sjcl.hash.sha256;var i=[[],[]],s=e.prototype.blockSize/32;for(this.l=[new e,new e],t.length>s&&(t=e.hash(t)),e=0;s>e;e++)i[0][e]=909522486^t[e],i[1][e]=1549556828^t[e];this.l[0].update(i[0]),this.l[1].update(i[1])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(t,e){return t=new this.M(this.l[0]).update(t,e).finalize(),new this.M(this.l[1]).update(t).finalize()},sjcl.misc.pbkdf2=function(t,e,i,s,n){if(i=i||1e3,0>s||0>i)throw sjcl.exception.invalid("invalid params to pbkdf2");"string"==typeof t&&(t=sjcl.codec.utf8String.toBits(t)),n=n||sjcl.misc.hmac,t=new n(t);var c,r,o,a,h=[],l=sjcl.bitArray;for(a=1;32*h.length<(s||1);a++){for(n=c=t.encrypt(l.concat(e,[a])),r=1;i>r;r++)for(c=t.encrypt(c),o=0;o<c.length;o++)n[o]^=c[o];h=h.concat(n)}return s&&(h=l.clamp(h,s)),h},sjcl.random={randomWords:function(t,e){var i=[];e=this.isReady(e);var s;if(0===e)throw new sjcl.exception.notReady("generator isn't seeded");for(2&e&&this.U(!(1&e)),e=0;t>e;e+=4)0===(e+1)%65536&&this.L(),s=this.w(),i.push(s[0],s[1],s[2],s[3]);return this.L(),i.slice(0,t)},setDefaultParanoia:function(t){this.t=t},addEntropy:function(t,e,i){i=i||"user";var s,n,c=(new Date).valueOf(),r=this.q[i],o=this.isReady(),a=0;switch(s=this.G[i],void 0===s&&(s=this.G[i]=this.R++),void 0===r&&(r=this.q[i]=0),this.q[i]=(this.q[i]+1)%this.b.length,typeof t){case"number":void 0===e&&(e=1),this.b[r].update([s,this.u++,1,e,c,1,0|t]);break;case"object":if(i=Object.prototype.toString.call(t),"[object Uint32Array]"===i){for(n=[],i=0;i<t.length;i++)n.push(t[i]);t=n}else for("[object Array]"!==i&&(a=1),i=0;i<t.length&&!a;i++)"number"!=typeof t[i]&&(a=1);if(!a){if(void 0===e)for(i=e=0;i<t.length;i++)for(n=t[i];n>0;)e++,n>>>=1;this.b[r].update([s,this.u++,2,e,c,t.length].concat(t))}break;case"string":void 0===e&&(e=t.length),this.b[r].update([s,this.u++,3,e,c,t.length]),this.b[r].update(t);break;default:a=1}if(a)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.j[r]+=e,this.f+=e,0===o&&(0!==this.isReady()&&this.K("seeded",Math.max(this.g,this.f)),this.K("progress",this.getProgress()))},isReady:function(t){return t=this.C[void 0!==t?t:this.t],this.g&&this.g>=t?this.j[0]>80&&(new Date).valueOf()>this.O?3:1:this.f>=t?2:0},getProgress:function(t){return t=this.C[t?t:this.t],this.g>=t?1:this.f>t?1:this.f/t},startCollectors:function(){if(!this.m){if(window.addEventListener)window.addEventListener("load",this.o,!1),window.addEventListener("mousemove",this.p,!1);else{if(!document.attachEvent)throw new sjcl.exception.bug("can't attach event");document.attachEvent("onload",this.o),document.attachEvent("onmousemove",this.p)}this.m=!0}},stopCollectors:function(){this.m&&(window.removeEventListener?(window.removeEventListener("load",this.o,!1),window.removeEventListener("mousemove",this.p,!1)):window.detachEvent&&(window.detachEvent("onload",this.o),window.detachEvent("onmousemove",this.p)),this.m=!1)},addEventListener:function(t,e){this.r[t][this.Q++]=e},removeEventListener:function(t,e){var i;t=this.r[t];var s=[];for(i in t)t.hasOwnProperty(i)&&t[i]===e&&s.push(i);for(e=0;e<s.length;e++)i=s[e],delete t[i]},b:[new sjcl.hash.sha256],j:[0],A:0,q:{},u:0,G:{},R:0,g:0,f:0,O:0,a:[0,0,0,0,0,0,0,0],d:[0,0,0,0],s:void 0,t:6,m:!1,r:{progress:{},seeded:{}},Q:0,C:[0,48,64,96,128,192,256,384,512,768,1024],w:function(){for(var t=0;4>t&&(this.d[t]=0|this.d[t]+1,!this.d[t]);t++);return this.s.encrypt(this.d)},L:function(){this.a=this.w().concat(this.w()),this.s=new sjcl.cipher.aes(this.a)},T:function(t){for(this.a=sjcl.hash.sha256.hash(this.a.concat(t)),this.s=new sjcl.cipher.aes(this.a),t=0;4>t&&(this.d[t]=0|this.d[t]+1,!this.d[t]);t++);},U:function(t){var e,i=[],s=0;for(this.O=i[0]=(new Date).valueOf()+3e4,e=0;16>e;e++)i.push(0|4294967296*Math.random());for(e=0;e<this.b.length&&(i=i.concat(this.b[e].finalize()),s+=this.j[e],this.j[e]=0,t||!(this.A&1<<e));e++);this.A>=1<<this.b.length&&(this.b.push(new sjcl.hash.sha256),this.j.push(0)),this.f-=s,s>this.g&&(this.g=s),this.A++,this.T(i)},p:function(t){sjcl.random.addEntropy([t.x||t.clientX||t.offsetX,t.y||t.clientY||t.offsetY],2,"mouse")},o:function(){sjcl.random.addEntropy((new Date).valueOf(),2,"loadtime")},K:function(t,e){var i;t=sjcl.random.r[t];var s=[];for(i in t)t.hasOwnProperty(i)&&s.push(t[i]);for(i=0;i<s.length;i++)s[i](e)}};try{var s=new Uint32Array(32);crypto.getRandomValues(s),sjcl.random.addEntropy(s,1024,"crypto['getRandomValues']")}catch(t){}sjcl.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(t,e,i,s){i=i||{},s=s||{};var n,c=sjcl.json,r=c.c({iv:sjcl.random.randomWords(4,0)},c.defaults);if(c.c(r,i),i=r.adata,"string"==typeof r.salt&&(r.salt=sjcl.codec.base64.toBits(r.salt)),"string"==typeof r.iv&&(r.iv=sjcl.codec.base64.toBits(r.iv)),!sjcl.mode[r.mode]||!sjcl.cipher[r.cipher]||"string"==typeof t&&r.iter<=100||64!==r.ts&&96!==r.ts&&128!==r.ts||128!==r.ks&&192!==r.ks&&256!==r.ks||r.iv.length<2||r.iv.length>4)throw new sjcl.exception.invalid("json encrypt: invalid parameters");return"string"==typeof t&&(n=sjcl.misc.cachedPbkdf2(t,r),t=n.key.slice(0,r.ks/32),r.salt=n.salt),"string"==typeof e&&(e=sjcl.codec.utf8String.toBits(e)),"string"==typeof i&&(i=sjcl.codec.utf8String.toBits(i)),n=new sjcl.cipher[r.cipher](t),c.c(s,r),s.key=t,r.ct=sjcl.mode[r.mode].encrypt(n,e,r.iv,i,r.ts),c.encode(r)},decrypt:function(t,e,i,s){i=i||{},s=s||{};var n=sjcl.json;e=n.c(n.c(n.c({},n.defaults),n.decode(e)),i,!0);var c;if(i=e.adata,"string"==typeof e.salt&&(e.salt=sjcl.codec.base64.toBits(e.salt)),"string"==typeof e.iv&&(e.iv=sjcl.codec.base64.toBits(e.iv)),!sjcl.mode[e.mode]||!sjcl.cipher[e.cipher]||"string"==typeof t&&e.iter<=100||64!==e.ts&&96!==e.ts&&128!==e.ts||128!==e.ks&&192!==e.ks&&256!==e.ks||!e.iv||e.iv.length<2||e.iv.length>4)throw new sjcl.exception.invalid("json decrypt: invalid parameters");return"string"==typeof t&&(c=sjcl.misc.cachedPbkdf2(t,e),t=c.key.slice(0,e.ks/32),e.salt=c.salt),"string"==typeof i&&(i=sjcl.codec.utf8String.toBits(i)),c=new sjcl.cipher[e.cipher](t),i=sjcl.mode[e.mode].decrypt(c,e.ct,e.iv,i,e.ts),n.c(s,e),s.key=t,sjcl.codec.utf8String.fromBits(i)},encode:function(t){var e,i="{",s="";for(e in t)if(t.hasOwnProperty(e)){if(!e.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");switch(i+=s+'"'+e+'":',s=",",typeof t[e]){case"number":case"boolean":i+=t[e];break;case"string":i+='"'+escape(t[e])+'"';break;case"object":i+='"'+sjcl.codec.base64.fromBits(t[e],1)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type")}}return i+"}"},decode:function(t){if(t=t.replace(/\s/g,""),!t.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");t=t.replace(/^\{|\}$/g,"").split(/,/);var e,i,s={};for(e=0;e<t.length;e++){if(!(i=t[e].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");s[i[2]]=i[3]?parseInt(i[3],10):i[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(i[4]):unescape(i[4])}return s},c:function(t,e,i){if(void 0===t&&(t={}),void 0===e)return t;var s;for(s in e)if(e.hasOwnProperty(s)){if(i&&void 0!==t[s]&&t[s]!==e[s])throw new sjcl.exception.invalid("required parameter overridden");t[s]=e[s]}return t},W:function(t,e){var i,s={};for(i in t)t.hasOwnProperty(i)&&t[i]!==e[i]&&(s[i]=t[i]);return s},V:function(t,e){var i,s={};for(i=0;i<e.length;i++)void 0!==t[e[i]]&&(s[e[i]]=t[e[i]]);return s}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.S={},sjcl.misc.cachedPbkdf2=function(t,e){var i,s=sjcl.misc.S;return e=e||{},i=e.iter||1e3,s=s[t]=s[t]||{},i=s[i]=s[i]||{firstSalt:e.salt&&e.salt.length?e.salt.slice(0):sjcl.random.randomWords(2,0)},s=void 0===e.salt?i.firstSalt:e.salt,i[s]=i[s]||sjcl.misc.pbkdf2(t,s,e.iter),{key:i[s].slice(0),salt:s.slice(0)}};