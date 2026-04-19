function e(e,t,i,s){var n,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(o=(r<3?n(o):r>3?n(t,i,o):n(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const o=e=>new r("string"==typeof e?e:e+"",void 0,s),a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return o(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",$=f.reactiveElementPolyfillSupport,_=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);n?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...u(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=s;const r=n.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(void 0!==e){const r=this.constructor;if(!1===s&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??v)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,$?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,x=e=>e,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+P,k=`<${H}>`,M=document,O=()=>M.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,V=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,J=M.createTreeWalker(M,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,s=[];let n,r=2===t?"<svg>":3===t?"<math>":"",o=R;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===R?"!--"===l[1]?o=L:void 0!==l[1]?o=V:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=n??R,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?D:z):o===D||o===z?o=j:o===L||o===V?o=R:(o=j,n=void 0);const u=o===j&&e[t+1].startsWith("/>")?" ":"";r+=o===R?i+k:c>=0?(s.push(a),i.slice(0,c)+C+i.slice(c)+P+u):i+P+(-2===c?t:u)}return[G(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Q{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0;const o=e.length-1,a=this.parts,[l,c]=K(e,t);if(this.el=Q.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=J.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[r++],i=s.getAttribute(e).split(P),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?te:"?"===o[1]?ie:"@"===o[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(P)&&(a.push({type:6,index:n}),s.removeAttribute(e));if(I.test(s.tagName)){const e=s.textContent.split(P),t=e.length-1;if(t>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],O()),J.nextNode(),a.push({type:2,index:++n});s.append(e[t],O())}}}else if(8===s.nodeType)if(s.data===H)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(P,e+1));)a.push({type:7,index:n}),e+=P.length-1}n++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===F)return t;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(t=Z(e,n._$AS(e,t.values),n,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??M).importNode(t,!0);J.currentNode=s;let n=J.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new Y(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new ne(n,this,e)),this._$AV.push(t),a=i[++o]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=M,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),U(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Q(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const n=this.strings;let r=!1;if(void 0===n)e=Z(this,e,t,0),r=!U(e)||e!==this._$AH&&e!==F,r&&(this._$AH=e);else{const s=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=Z(this,s[i+o],t,o),a===F&&(a=this._$AH[o]),r||=!U(a)||a!==this._$AH[o],a===W?e=W:e!==W&&(e+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends ee{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??W)===F)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const re=A.litHtmlPolyfillSupport;re?.(Q,Y),(A.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class ae extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let n=s._$litPart$;if(void 0===n){const e=i?.renderBefore??null;s._$litPart$=n=new Y(t.insertBefore(O(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ae._$litElement$=!0,ae.finalized=!0,oe.litElementHydrateSupport?.({LitElement:ae});const le=oe.litElementPolyfillSupport;le?.({LitElement:ae}),(oe.litElementVersions??=[]).push("4.2.2");const ce={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},he=(e=ce,t,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,n,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];t.call(this,i),this.requestUpdate(s,n,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ue(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function de(e){switch(e){case"green":return"var(--success-color, var(--state-sensor-on-color, #43a047))";case"yellow":return"var(--warning-color, #ff9800)";case"orange":return"#ff6f00";case"red":return"var(--error-color, var(--state-sensor-off-color, #d32f2f))";default:return"var(--disabled-text-color, #9e9e9e)"}}function pe(e){const t=de(e.severity);return B`
    <div
      class="aura-tile"
      @click=${e.onClick??W}
      role=${e.onClick?"button":W}
      tabindex=${e.onClick?0:W}
    >
      <div class="tile-header">
        <span class="tile-label">${e.label}</span>
        <span
          class="tile-pip"
          style="background-color: ${t};"
          aria-label="Status: ${e.severity}"
        ></span>
      </div>
      <div class="tile-value">
        <span class="value-number">${e.value}</span>
        ${e.unit?B`<span class="value-unit">${e.unit}</span>`:W}
      </div>
      ${e.secondaryLine?B`<div class="tile-secondary">${e.secondaryLine}</div>`:W}
    </div>
  `}const fe=new Set(["unknown","unavailable","none",""]);function ge(e,t,i){const s=`sensor.${t}_${i}`,n=e.states[s];if(!n)return{entityId:s,available:!1,rawState:null,numericValue:null,unit:null,friendlyName:null};const r=n.state,o=fe.has(String(r).toLowerCase()),a=o?null:Number.parseFloat(r);return{entityId:s,available:!o,rawState:r,numericValue:Number.isFinite(a)?a:null,unit:n.attributes?.unit_of_measurement??null,friendlyName:n.attributes?.friendly_name??null}}function me(e,t=0){return e.available&&null!==e.numericValue?e.numericValue.toFixed(t):"--"}function $e(e){return"°F"===e.unit||"F"===e.unit}const _e={green:800,yellow:1e3,orange:1500},ye={green:9,yellow:35,orange:100},ve={green:12,yellow:35,orange:55},be={green:10,yellow:25,orange:50},we={green:25,yellow:50,orange:75},Ae={green:54,yellow:154,orange:254},xe={green:250,yellow:600,orange:1200},Ee={green:30,yellow:60,orange:100},Se={green:150,yellow:250,orange:350},Ce={green:50,yellow:100,orange:200},Pe={redLow:16,orangeLow:18,yellowLow:20,yellowHigh:25,orangeHigh:26,redHigh:28},He={redLow:20,orangeLow:30,yellowLow:40,yellowHigh:60,orangeHigh:65,redHigh:70},ke={redLow:5,orangeLow:8,yellowLow:10,yellowHigh:16,orangeHigh:18,redHigh:21},Me={redLow:4,orangeLow:5,yellowLow:7,yellowHigh:15,orangeHigh:18,redHigh:20},Oe={green:3,yellow:5,orange:7};function Ue(e,t){return null!==e&&Number.isFinite(e)?e<=t.green?"green":e<=t.yellow?"yellow":e<=t.orange?"orange":"red":"unknown"}function Te(e,t){return null!==e&&Number.isFinite(e)?e<t.redLow?"red":e<t.orangeLow?"orange":e<t.yellowLow?"yellow":e>t.redHigh?"red":e>t.orangeHigh?"orange":e>t.yellowHigh?"yellow":"green":"unknown"}function Ne(e){return 5/9*(e-32)}function Re(e,t){const i=ge(e,t,"temperature"),s=ge(e,t,"humidity"),n=ge(e,t,"absolute_humidity"),r=ge(e,t,"dew_point"),o=null!==i.numericValue&&$e(i)?Ne(i.numericValue):i.numericValue,a=null!==r.numericValue&&$e(r)?Ne(r.numericValue):r.numericValue,l=function(e,t){if(null===e||null===t)return null;if(!Number.isFinite(e)||!Number.isFinite(t)||t<0||t>100)return null;const i=(t-55)/4+(e-18)/7;return Math.round(Math.min(Math.max(i,0),10))}(o,s.numericValue);return B`
    <div class="section-header">
      <ha-icon icon="mdi:home-thermometer-outline"></ha-icon>
      <span>Comfort</span>
    </div>
    <div class="section-grid">
      ${pe({label:"Temp",value:me(i,1),unit:i.unit,severity:Te(o,Pe)})}
      ${pe({label:"RH",value:me(s,0),unit:"%",severity:Te(s.numericValue,He)})}
      ${pe({label:"AH",value:me(n,1),unit:"g/m³",severity:Te(n.numericValue,Me)})}
      ${pe({label:"DP",value:me(r,0),unit:r.unit,severity:Te(a,ke)})}
      ${pe({label:"MR",value:null!==l?String(l):"--",unit:"/10",severity:Ue(l,Oe),secondaryLine:"Mold Risk"})}
    </div>
  `}function Le(e,t){if(null===e)return"unknown";const i=Math.abs(e);return 3===t?i<1.5?"green":i<3?"yellow":i<5?"orange":"red":i<5?"green":i<10?"yellow":i<15?"orange":"red"}function Ve(e,t){if(null===e)return"--";const i="inHg"===t?2:1;return`${e>=0?"+":""}${e.toFixed(i)}`}const je=o("\n  .aura-tile {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 12px 14px;\n    background-color: var(--card-background-color, #1c1c1c);\n    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));\n    border-radius: 12px;\n    min-height: 84px;\n    transition: border-color 0.2s ease, transform 0.1s ease;\n    box-sizing: border-box;\n  }\n  .aura-tile[role='button'] {\n    cursor: pointer;\n  }\n  .aura-tile[role='button']:hover {\n    border-color: var(--primary-color, #03a9f4);\n  }\n  .aura-tile[role='button']:active {\n    transform: scale(0.98);\n  }\n  .tile-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .tile-label {\n    font-size: 0.75rem;\n    font-weight: 500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--secondary-text-color, #a0a0a0);\n  }\n  .tile-pip {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    flex-shrink: 0;\n    box-shadow: 0 0 6px currentColor;\n  }\n  .tile-value {\n    display: flex;\n    align-items: baseline;\n    gap: 4px;\n    margin-top: 4px;\n  }\n  .value-number {\n    font-size: 1.8rem;\n    font-weight: 600;\n    color: var(--primary-text-color, #ffffff);\n    line-height: 1.1;\n  }\n  .value-unit {\n    font-size: 0.75rem;\n    color: var(--secondary-text-color, #a0a0a0);\n  }\n  .tile-secondary {\n    font-size: 0.7rem;\n    color: var(--secondary-text-color, #a0a0a0);\n    margin-top: 2px;\n  }\n"),ze=o("\n  .status-banner {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 10px 14px;\n    border: 2px solid;\n    border-radius: 10px;\n    background-color: var(--card-background-color, #1c1c1c);\n    margin-bottom: 12px;\n  }\n  .status-banner ha-icon {\n    --mdc-icon-size: 20px;\n    flex-shrink: 0;\n  }\n  .status-text {\n    font-size: 0.9rem;\n    font-weight: 500;\n    color: var(--primary-text-color, #ffffff);\n    letter-spacing: 0.02em;\n  }\n"),De="project_aura";let Ie=class extends ae{constructor(){super(...arguments),this._graphCards=new Map}static getStubConfig(){return{type:"custom:project-aura-card",entity_prefix:De,title:"Air Quality",show_status_banner:!0,show_pressure_section:!0,show_graphs:!0,compact:!1}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={entity_prefix:De,show_status_banner:!0,show_pressure_section:!0,show_graphs:!0,compact:!1,...e}}getCardSize(){let e=1;return this._config?.show_status_banner&&(e+=1),e+=2,e+=2,e+=2,this._config?.show_pressure_section&&(e+=2),!1!==this._config?.show_graphs&&(e+=6),e}updated(e){if(super.updated(e),!this._config||!this.hass)return;if(!1===this._config.show_graphs)return;const t=this._config.entity_prefix??De,i=[{key:"temperature",entity:`sensor.${t}_temperature`,title:"Temperature"},{key:"humidity",entity:`sensor.${t}_humidity`,title:"Humidity"},{key:"co2",entity:`sensor.${t}_co2`,title:"CO2 Concentration"}];for(const{key:e,entity:t,title:s}of i){const i=this.shadowRoot?.querySelector(`#graph-${e}`);if(!i)continue;let n=this._graphCards.get(e);n||(n=document.createElement("hui-history-graph-card"),n.setConfig({entities:[{entity:t}],hours_to_show:24,title:s}),i.appendChild(n),this._graphCards.set(e,n)),n.hass=this.hass}}shouldUpdate(e){if(e.has("_config"))return!0;const t=e.get("hass");return!t||this._relevantStatesChanged(t,this.hass)}_relevantStatesChanged(e,t){const i=this._config.entity_prefix??De,s=e=>e.startsWith(`sensor.${i}_`)||e.startsWith(`switch.${i}_`)||e.startsWith(`button.${i}_`);for(const i of Object.keys(t.states))if(s(i)&&e.states[i]?.state!==t.states[i].state)return!0;return!1}render(){if(!this._config||!this.hass)return W;const e=this._config.entity_prefix??De;return Boolean(this.hass.states[`sensor.${e}_co2`]||this.hass.states[`sensor.${e}_temperature`])?B`
      <ha-card>
        ${this._config.title?B`<h1 class="card-title">${this._config.title}</h1>`:W}
        <div class="card-content">
          ${!1!==this._config.show_status_banner?function(e,t){const i=e.states[`sensor.${t}_air_status`],s=e.states[`sensor.${t}_main_issue`],n=i?.state??null,r=s?.state??"Unknown",o=function(e){switch((e??"").toLowerCase()){case"excellent":case"good":return"green";case"fair":return"yellow";case"poor":return"red";default:return"unknown"}}(n),a="Clear"===r||"unknown"===r?`All readings normal (${n??"--"})`:r;return B`
    <div
      class="status-banner"
      style="border-color: ${de(o)};"
    >
      <ha-icon
        icon=${function(e){switch(e){case"green":return"mdi:check-circle";case"yellow":return"mdi:alert-circle-outline";case"orange":return"mdi:alert";case"red":return"mdi:alert-octagon";default:return"mdi:help-circle-outline"}}(o)}
        style="color: ${de(o)};"
      ></ha-icon>
      <span class="status-text">STATUS: ${a}</span>
    </div>
  `}(this.hass,e):W}
          <div class="section">${Re(this.hass,e)}</div>
          <div class="section">${function(e,t){const i=ge(e,t,"pm0_5"),s=ge(e,t,"pm1_0"),n=ge(e,t,"pm2_5"),r=ge(e,t,"pm4_0"),o=ge(e,t,"pm10");return B`
    <div class="section-header">
      <ha-icon icon="mdi:grain"></ha-icon>
      <span>Particulates</span>
    </div>
    <div class="section-grid">
      ${pe({label:"PM0.5",value:me(i,0),unit:"#/cm³",severity:Ue(i.numericValue,xe)})}
      ${pe({label:"PM1",value:me(s,1),unit:"μg/m³",severity:Ue(s.numericValue,be)})}
      ${pe({label:"PM2.5",value:me(n,1),unit:"μg/m³",severity:Ue(n.numericValue,ve)})}
      ${pe({label:"PM4",value:me(r,1),unit:"μg/m³",severity:Ue(r.numericValue,we)})}
      ${pe({label:"PM10",value:me(o,1),unit:"μg/m³",severity:Ue(o.numericValue,Ae)})}
    </div>
  `}(this.hass,e)}</div>
          <div class="section">${function(e,t){const i=ge(e,t,"co2"),s=ge(e,t,"voc_index"),n=ge(e,t,"nox_index"),r=ge(e,t,"hcho"),o=ge(e,t,"co");return B`
    <div class="section-header">
      <ha-icon icon="mdi:molecule"></ha-icon>
      <span>Gases</span>
    </div>
    <div class="section-grid">
      ${pe({label:"CO2",value:me(i,0),unit:"ppm",severity:Ue(i.numericValue,_e)})}
      ${pe({label:"VOC",value:me(s,0),unit:"index",severity:Ue(s.numericValue,Se)})}
      ${pe({label:"NOx",value:me(n,0),unit:"index",severity:Ue(n.numericValue,Ce)})}
      ${r.available?pe({label:"HCHO",value:me(r,0),unit:"ppb",severity:Ue(r.numericValue,Ee)}):W}
      ${o.available?pe({label:"CO",value:me(o,1),unit:o.unit??"ppm",severity:Ue(o.numericValue,ye)}):W}
    </div>
  `}(this.hass,e)}</div>
          ${!1!==this._config.show_pressure_section?B`<div class="section">${function(e,t){const i=ge(e,t,"pressure"),s=ge(e,t,"pressure_delta_3h"),n=ge(e,t,"pressure_delta_24h");return i.available?B`
    <div class="section-header">
      <ha-icon icon="mdi:gauge"></ha-icon>
      <span>Pressure</span>
    </div>
    <div class="section-grid pressure-grid">
      ${pe({label:"MSL Pressure",value:me(i,"inHg"===i.unit?2:1),unit:i.unit,severity:"green"})}
      ${pe({label:"3h Trend",value:Ve(s.numericValue,s.unit),unit:s.unit,severity:Le(s.numericValue,3)})}
      ${pe({label:"24h Trend",value:Ve(n.numericValue,n.unit),unit:n.unit,severity:Le(n.numericValue,24)})}
    </div>
  `:B`${W}`}(this.hass,e)}</div>`:W}
          ${!1!==this._config.show_graphs?B`<div class="section">${B`
    <div class="section-header">
      <ha-icon icon="mdi:chart-line"></ha-icon>
      <span>Graphs</span>
    </div>
    <div id="graph-temperature" class="graph-container"></div>
    <div id="graph-humidity" class="graph-container"></div>
    <div id="graph-co2" class="graph-container"></div>
  `}</div>`:W}
        </div>
      </ha-card>
    `:B`
        <ha-card>
          <div class="card-error">
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <div>
              <strong>Project Aura not found</strong>
              <div class="error-detail">
                No entities found with prefix <code>sensor.${e}_*</code>.
                Check your MQTT base topic or adjust <code>entity_prefix</code> in the card config.
              </div>
            </div>
          </div>
        </ha-card>
      `}};Ie.styles=((e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)})`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
    }
    .card-title {
      margin: 0 0 12px 0;
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--primary-text-color, #ffffff);
    }
    .card-content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--secondary-text-color, #a0a0a0);
      padding-bottom: 4px;
      border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
    }
    .section-header ha-icon {
      --mdc-icon-size: 18px;
    }
    .section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
      gap: 8px;
    }
    .pressure-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
    .card-error {
      display: flex;
      gap: 12px;
      padding: 16px;
      align-items: flex-start;
    }
    .card-error ha-icon {
      --mdc-icon-size: 24px;
      color: var(--warning-color, #ff9800);
      flex-shrink: 0;
    }
    .error-detail {
      font-size: 0.85rem;
      color: var(--secondary-text-color, #a0a0a0);
      margin-top: 4px;
    }
    .error-detail code {
      background: var(--code-editor-background-color, rgba(255, 255, 255, 0.08));
      padding: 1px 5px;
      border-radius: 3px;
      font-family: 'Roboto Mono', monospace;
      font-size: 0.8rem;
    }
    .graph-container {
      width: 100%;
    }
    ${je}
    ${ze}
  `,e([ue({attribute:!1})],Ie.prototype,"hass",void 0),e([function(e){return ue({...e,state:!0,attribute:!1})}()],Ie.prototype,"_config",void 0),Ie=e([(e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)})("project-aura-card")],Ie);const Be=window;Be.customCards=Be.customCards??[],Be.customCards.push({type:"project-aura-card",name:"Project Aura Card",description:"Mirrors the physical Project Aura air quality monitor display with firmware-aligned severity thresholds.",preview:!0,documentationURL:"https://github.com/pickerin/project-aura-card"}),console.info("%c PROJECT-AURA-CARD %c v0.1.0 ","color: white; background: #43a047; font-weight: 700;","color: #43a047; background: white; font-weight: 700;");export{Ie as ProjectAuraCard};
