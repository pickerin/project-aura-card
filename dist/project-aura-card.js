function t(t,e,i,n){var s,r=arguments.length,o=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(o=(r<3?s(o):r>3?s(e,i,o):s(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const o=t=>new r("string"==typeof t?t:t+"",void 0,n),a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,g=f.trustedTypes,m=g?g.emptyScript:"",v=f.reactiveElementPolyfillSupport,$=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&c(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const r=n?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of n){const n=document.createElement("style"),s=e.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=n;const r=s.fromAttribute(e,t.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(t,e,i,n=!1,s){if(void 0!==t){const r=this.constructor;if(!1===n&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[$("elementProperties")]=new Map,w[$("finalized")]=new Map,v?.({ReactiveElement:w}),(f.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,S=x.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+O,k=`<${P}>`,H=document,M=()=>H.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,R="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,V=/>/g,j=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,G=H.createTreeWalker(H,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,n=[];let s,r=2===e?"<svg>":3===e?"<math>":"",o=L;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===L?"!--"===l[1]?o=N:void 0!==l[1]?o=V:void 0!==l[2]?(I.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=s??L,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?D:z):o===D||o===z?o=j:o===N||o===V?o=L:(o=j,s=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";r+=o===L?i+k:c>=0?(n.push(a),i.slice(0,c)+C+i.slice(c)+O+d):i+O+(-2===c?e:d)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class Q{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,r=0;const o=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Q.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=G.nextNode())&&a.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(C)){const e=c[r++],i=n.getAttribute(t).split(O),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?nt:tt}),n.removeAttribute(t)}else t.startsWith(O)&&(a.push({type:6,index:s}),n.removeAttribute(t));if(I.test(n.tagName)){const t=n.textContent.split(O),e=t.length-1;if(e>0){n.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],M()),G.nextNode(),a.push({type:2,index:++s});n.append(t[e],M())}}}else if(8===n.nodeType)if(n.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(O,t+1));)a.push({type:7,index:s}),t+=O.length-1}s++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,n){if(e===F)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,n)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??H).importNode(e,!0);G.currentNode=n;let s=G.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new st(s,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(s=G.nextNode(),r++)}return G.currentNode=H,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new X(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Q(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new Y(this.O(M()),this.O(M()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,n){const s=this.strings;let r=!1;if(void 0===s)t=Z(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const n=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=Z(this,n[i+o],e,o),a===F&&(a=this._$AH[o]),r||=!U(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+s[o+1]),this._$AH[o]=a}r&&!n&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class nt extends tt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===F)return;const i=this._$AH,n=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(Q,Y),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new Y(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const ct={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:y},ht=(t=ct,e,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,s,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];e.call(this,i),this.requestUpdate(n,s,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){switch(t){case"green":return"var(--success-color, var(--state-sensor-on-color, #43a047))";case"yellow":return"var(--warning-color, #ff9800)";case"orange":return"#ff6f00";case"red":return"var(--error-color, var(--state-sensor-off-color, #d32f2f))";default:return"var(--disabled-text-color, #9e9e9e)"}}function pt(t){const e=ut(t.severity);return B`
    <div
      class="aura-tile"
      @click=${t.onClick??W}
      role=${t.onClick?"button":W}
      tabindex=${t.onClick?0:W}
    >
      <div class="tile-header">
        <span class="tile-label">${t.label}</span>
        <span
          class="tile-pip"
          style="background-color: ${e};"
          aria-label="Status: ${t.severity}"
        ></span>
      </div>
      <div class="tile-value">
        <span class="value-number">${t.value}</span>
        ${t.unit?B`<span class="value-unit">${t.unit}</span>`:W}
      </div>
      ${t.secondaryLine?B`<div class="tile-secondary">${t.secondaryLine}</div>`:W}
    </div>
  `}const ft=new Set(["unknown","unavailable","none",""]);function gt(t,e,i){const n=`sensor.${e}_${i}`,s=t.states[n];if(!s)return{entityId:n,available:!1,rawState:null,numericValue:null,unit:null,friendlyName:null};const r=s.state,o=ft.has(String(r).toLowerCase()),a=o?null:Number.parseFloat(r);return{entityId:n,available:!o,rawState:r,numericValue:Number.isFinite(a)?a:null,unit:s.attributes?.unit_of_measurement??null,friendlyName:s.attributes?.friendly_name??null}}function mt(t,e,i){const n=`switch.${e}_${i}`,s=t.states[n];return{entityId:n,available:Boolean(s)&&!ft.has(String(s?.state??"").toLowerCase()),isOn:"on"===s?.state}}function vt(t,e=0){return t.available&&null!==t.numericValue?t.numericValue.toFixed(e):"--"}function $t(t){return"°F"===t.unit||"F"===t.unit}const _t={green:800,yellow:1e3,orange:1500},yt={green:9,yellow:35,orange:100},bt={green:12,yellow:35,orange:55},wt={green:10,yellow:25,orange:50},xt={green:25,yellow:50,orange:75},At={green:54,yellow:154,orange:254},St={green:250,yellow:600,orange:1200},Et={green:30,yellow:60,orange:100},Ct={green:150,yellow:250,orange:350},Ot={green:50,yellow:100,orange:200},Pt={redLow:16,orangeLow:18,yellowLow:20,yellowHigh:25,orangeHigh:26,redHigh:28},kt={redLow:20,orangeLow:30,yellowLow:40,yellowHigh:60,orangeHigh:65,redHigh:70},Ht={redLow:5,orangeLow:8,yellowLow:10,yellowHigh:16,orangeHigh:18,redHigh:21},Mt={redLow:4,orangeLow:5,yellowLow:7,yellowHigh:15,orangeHigh:18,redHigh:20},Ut={green:3,yellow:5,orange:7};function Tt(t,e){return null!==t&&Number.isFinite(t)?t<=e.green?"green":t<=e.yellow?"yellow":t<=e.orange?"orange":"red":"unknown"}function Rt(t,e){return null!==t&&Number.isFinite(t)?t<e.redLow?"red":t<e.orangeLow?"orange":t<e.yellowLow?"yellow":t>e.redHigh?"red":t>e.orangeHigh?"orange":t>e.yellowHigh?"yellow":"green":"unknown"}function Lt(t){return 5/9*(t-32)}function Nt(t,e){const i=gt(t,e,"temperature"),n=gt(t,e,"humidity"),s=gt(t,e,"absolute_humidity"),r=gt(t,e,"dew_point"),o=null!==i.numericValue&&$t(i)?Lt(i.numericValue):i.numericValue,a=null!==r.numericValue&&$t(r)?Lt(r.numericValue):r.numericValue,l=function(t,e){if(null===t||null===e)return null;if(!Number.isFinite(t)||!Number.isFinite(e)||e<0||e>100)return null;const i=(e-55)/4+(t-18)/7;return Math.round(Math.min(Math.max(i,0),10))}(o,n.numericValue);return B`
    <div class="section-header">
      <ha-icon icon="mdi:home-thermometer-outline"></ha-icon>
      <span>Comfort</span>
    </div>
    <div class="section-grid">
      ${pt({label:"Temp",value:vt(i,1),unit:i.unit,severity:Rt(o,Pt)})}
      ${pt({label:"RH",value:vt(n,0),unit:"%",severity:Rt(n.numericValue,kt)})}
      ${pt({label:"AH",value:vt(s,1),unit:"g/m³",severity:Rt(s.numericValue,Mt)})}
      ${pt({label:"DP",value:vt(r,0),unit:r.unit,severity:Rt(a,Ht)})}
      ${pt({label:"MR",value:null!==l?String(l):"--",unit:"/10",severity:Tt(l,Ut),secondaryLine:"Mold Risk"})}
    </div>
  `}function Vt(t,e){if(null===t)return"unknown";const i=Math.abs(t);return 3===e?i<1.5?"green":i<3?"yellow":i<5?"orange":"red":i<5?"green":i<10?"yellow":i<15?"orange":"red"}function jt(t,e){if(null===t)return"--";const i="inHg"===e?2:1;return`${t>=0?"+":""}${t.toFixed(i)}`}function zt(t){return B`
    <button
      class="control-tile"
      @click=${t.onTap}
      ?disabled=${!t.available}
    >
      <span class="control-icon-circle ${t.isOn?"control-icon-circle--on":""}">
        <ha-icon icon=${t.icon}></ha-icon>
      </span>
      <span class="control-label">
        <span class="control-name">${t.label}</span>
        <span class="control-state">${t.stateLabel}</span>
      </span>
    </button>
  `}function Dt(t,e){return t?e?"On":"Off":"--"}function It(t,e){const i=mt(t,e,"night_mode"),n=mt(t,e,"backlight"),s=mt(t,e,"alert_blink"),r=`button.${e}_restart`,o=t.states[r],a=Boolean(o)&&"unavailable"!==o.state;if(!(i.available||n.available||s.available||a))return W;const l=(e,i)=>t.callService("switch",i?"turn_off":"turn_on",{},{entity_id:e});return B`
    <div class="section-header">
      <ha-icon icon="mdi:tune"></ha-icon>
      <span>Controls</span>
    </div>
    <div class="controls-grid">
      ${zt({label:"Night Mode",icon:"mdi:weather-night",available:i.available,isOn:i.isOn,stateLabel:Dt(i.available,i.isOn),onTap:()=>l(i.entityId,i.isOn)})}
      ${zt({label:"Backlight",icon:"mdi:television",available:n.available,isOn:n.isOn,stateLabel:Dt(n.available,n.isOn),onTap:()=>l(n.entityId,n.isOn)})}
      ${zt({label:"Alert Blink",icon:"mdi:alarm-light",available:s.available,isOn:s.isOn,stateLabel:Dt(s.available,s.isOn),onTap:()=>l(s.entityId,s.isOn)})}
      ${zt({label:"Restart",icon:"mdi:restart-alert",available:a,isOn:!1,stateLabel:(c=o?.state??null,c?"unknown"===c?"Unknown":"unavailable"===c?"--":"Ready":"--"),onTap:()=>{return e=r,t.callService("button","press",{},{entity_id:e});var e}})}
    </div>
  `;var c}const Bt=o("\n  .aura-tile {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 12px 14px;\n    background-color: var(--card-background-color, #1c1c1c);\n    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));\n    border-radius: 12px;\n    min-height: 84px;\n    transition: border-color 0.2s ease, transform 0.1s ease;\n    box-sizing: border-box;\n  }\n  .aura-tile[role='button'] {\n    cursor: pointer;\n  }\n  .aura-tile[role='button']:hover {\n    border-color: var(--primary-color, #03a9f4);\n  }\n  .aura-tile[role='button']:active {\n    transform: scale(0.98);\n  }\n  .tile-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .tile-label {\n    font-size: 0.75rem;\n    font-weight: 500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--secondary-text-color, #a0a0a0);\n  }\n  .tile-pip {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    flex-shrink: 0;\n    box-shadow: 0 0 6px currentColor;\n  }\n  .tile-value {\n    display: flex;\n    align-items: baseline;\n    gap: 4px;\n    margin-top: 4px;\n  }\n  .value-number {\n    font-size: 1.8rem;\n    font-weight: 600;\n    color: var(--primary-text-color, #ffffff);\n    line-height: 1.1;\n  }\n  .value-unit {\n    font-size: 0.75rem;\n    color: var(--secondary-text-color, #a0a0a0);\n  }\n  .tile-secondary {\n    font-size: 0.7rem;\n    color: var(--secondary-text-color, #a0a0a0);\n    margin-top: 2px;\n  }\n"),Ft=o("\n  .status-banner {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 10px 14px;\n    border: 2px solid;\n    border-radius: 10px;\n    background-color: var(--card-background-color, #1c1c1c);\n    margin-bottom: 12px;\n  }\n  .status-banner ha-icon {\n    --mdc-icon-size: 20px;\n    flex-shrink: 0;\n  }\n  .status-text {\n    font-size: 0.9rem;\n    font-weight: 500;\n    color: var(--primary-text-color, #ffffff);\n    letter-spacing: 0.02em;\n  }\n"),Wt="project_aura";let qt=class extends at{constructor(){super(...arguments),this._graphCards=new Map}static getStubConfig(){return{type:"custom:project-aura-card",entity_prefix:Wt,title:"Air Quality",show_status_banner:!0,show_controls:!0,show_pressure_section:!0,show_graphs:!0,compact:!1}}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={entity_prefix:Wt,show_status_banner:!0,show_controls:!0,show_pressure_section:!0,show_graphs:!0,compact:!1,...t}}getCardSize(){let t=1;return this._config?.show_status_banner&&(t+=1),!1!==this._config?.show_controls&&(t+=2),t+=2,t+=2,t+=2,this._config?.show_pressure_section&&(t+=2),!1!==this._config?.show_graphs&&(t+=6),t}updated(t){super.updated(t),this._config&&this.hass&&!1!==this._config.show_graphs&&this._updateGraphCards()}async _updateGraphCards(){const t=await(window.loadCardHelpers?.());if(!t)return;const e=this._config.entity_prefix??Wt,i=[{key:"temperature",entity:`sensor.${e}_temperature`,title:"Temperature"},{key:"humidity",entity:`sensor.${e}_humidity`,title:"Humidity"},{key:"co2",entity:`sensor.${e}_co2`,title:"CO2 Concentration"}];for(const{key:e,entity:n,title:s}of i){const i=this.shadowRoot?.querySelector(`#graph-${e}`);if(!i)continue;let r=this._graphCards.get(e);if(!r){if(r=await t.createCardElement({type:"history-graph",entities:[{entity:n,name:s}],hours_to_show:24,title:s}),!r)continue;i.appendChild(r),this._graphCards.set(e,r)}r.hass=this.hass}}shouldUpdate(t){if(t.has("_config"))return!0;const e=t.get("hass");return!e||this._relevantStatesChanged(e,this.hass)}_relevantStatesChanged(t,e){const i=this._config.entity_prefix??Wt,n=t=>t.startsWith(`sensor.${i}_`)||t.startsWith(`switch.${i}_`)||t.startsWith(`button.${i}_`);for(const i of Object.keys(e.states))if(n(i)&&t.states[i]?.state!==e.states[i].state)return!0;return!1}render(){if(!this._config||!this.hass)return W;const t=this._config.entity_prefix??Wt;return Boolean(this.hass.states[`sensor.${t}_co2`]||this.hass.states[`sensor.${t}_temperature`])?B`
      <ha-card>
        ${this._config.title?B`<h1 class="card-title">${this._config.title}</h1>`:W}
        <div class="card-content">
          ${!1!==this._config.show_status_banner?function(t,e){const i=t.states[`sensor.${e}_air_status`],n=t.states[`sensor.${e}_main_issue`],s=i?.state??null,r=n?.state??"Unknown",o=function(t){switch((t??"").toLowerCase()){case"excellent":case"good":return"green";case"fair":return"yellow";case"poor":return"red";default:return"unknown"}}(s),a="Clear"===r||"unknown"===r?`All readings normal (${s??"--"})`:r;return B`
    <div
      class="status-banner"
      style="border-color: ${ut(o)};"
    >
      <ha-icon
        icon=${function(t){switch(t){case"green":return"mdi:check-circle";case"yellow":return"mdi:alert-circle-outline";case"orange":return"mdi:alert";case"red":return"mdi:alert-octagon";default:return"mdi:help-circle-outline"}}(o)}
        style="color: ${ut(o)};"
      ></ha-icon>
      <span class="status-text">STATUS: ${a}</span>
    </div>
  `}(this.hass,t):W}
          ${!1!==this._config.show_controls?B`<div class="section">${It(this.hass,t)}</div>`:W}
          <div class="section">${Nt(this.hass,t)}</div>
          <div class="section">${function(t,e){const i=gt(t,e,"pm0_5"),n=gt(t,e,"pm1_0"),s=gt(t,e,"pm2_5"),r=gt(t,e,"pm4_0"),o=gt(t,e,"pm10");return B`
    <div class="section-header">
      <ha-icon icon="mdi:grain"></ha-icon>
      <span>Particulates</span>
    </div>
    <div class="section-grid">
      ${pt({label:"PM0.5",value:vt(i,0),unit:"#/cm³",severity:Tt(i.numericValue,St)})}
      ${pt({label:"PM1",value:vt(n,1),unit:"μg/m³",severity:Tt(n.numericValue,wt)})}
      ${pt({label:"PM2.5",value:vt(s,1),unit:"μg/m³",severity:Tt(s.numericValue,bt)})}
      ${pt({label:"PM4",value:vt(r,1),unit:"μg/m³",severity:Tt(r.numericValue,xt)})}
      ${pt({label:"PM10",value:vt(o,1),unit:"μg/m³",severity:Tt(o.numericValue,At)})}
    </div>
  `}(this.hass,t)}</div>
          <div class="section">${function(t,e){const i=gt(t,e,"co2"),n=gt(t,e,"voc_index"),s=gt(t,e,"nox_index"),r=gt(t,e,"hcho"),o=gt(t,e,"co");return B`
    <div class="section-header">
      <ha-icon icon="mdi:molecule"></ha-icon>
      <span>Gases</span>
    </div>
    <div class="section-grid">
      ${pt({label:"CO2",value:vt(i,0),unit:"ppm",severity:Tt(i.numericValue,_t)})}
      ${pt({label:"VOC",value:vt(n,0),unit:"index",severity:Tt(n.numericValue,Ct)})}
      ${pt({label:"NOx",value:vt(s,0),unit:"index",severity:Tt(s.numericValue,Ot)})}
      ${r.available?pt({label:"HCHO",value:vt(r,0),unit:"ppb",severity:Tt(r.numericValue,Et)}):W}
      ${o.available?pt({label:"CO",value:vt(o,1),unit:o.unit??"ppm",severity:Tt(o.numericValue,yt)}):W}
    </div>
  `}(this.hass,t)}</div>
          ${!1!==this._config.show_pressure_section?B`<div class="section">${function(t,e){const i=gt(t,e,"pressure"),n=gt(t,e,"pressure_delta_3h"),s=gt(t,e,"pressure_delta_24h");return i.available?B`
    <div class="section-header">
      <ha-icon icon="mdi:gauge"></ha-icon>
      <span>Pressure</span>
    </div>
    <div class="section-grid pressure-grid">
      ${pt({label:"MSL Pressure",value:vt(i,"inHg"===i.unit?2:1),unit:i.unit,severity:"green"})}
      ${pt({label:"3h Trend",value:jt(n.numericValue,n.unit),unit:n.unit,severity:Vt(n.numericValue,3)})}
      ${pt({label:"24h Trend",value:jt(s.numericValue,s.unit),unit:s.unit,severity:Vt(s.numericValue,24)})}
    </div>
  `:B`${W}`}(this.hass,t)}</div>`:W}
          ${!1!==this._config.show_graphs?B`<div class="section">${B`
    <div class="section-header">
      <ha-icon icon="mdi:chart-line"></ha-icon>
      <span>Graphs</span>
    </div>
    <div class="graphs-row">
      <div id="graph-temperature" class="graph-container"></div>
      <div id="graph-humidity" class="graph-container"></div>
      <div id="graph-co2" class="graph-container"></div>
    </div>
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
                No entities found with prefix <code>sensor.${t}_*</code>.
                Check your MQTT base topic or adjust <code>entity_prefix</code> in the card config.
              </div>
            </div>
          </div>
        </ha-card>
      `}};qt.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new r(i,t,n)})`
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
    .graphs-row {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .control-tile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
      border-radius: 12px;
      border: none;
      cursor: pointer;
      color: var(--primary-text-color);
      width: 100%;
      text-align: left;
      transition: filter 0.15s ease;
    }
    .control-tile:hover {
      filter: brightness(1.1);
    }
    .control-tile:active {
      filter: brightness(0.9);
    }
    .control-tile:disabled {
      opacity: 0.4;
      cursor: default;
      filter: none;
    }
    .control-icon-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba(120, 120, 128, 0.2);
      color: var(--secondary-text-color);
    }
    .control-icon-circle--on {
      background: color-mix(in srgb, var(--accent-color, #ff9800) 20%, transparent);
      color: var(--accent-color, #ff9800);
    }
    .control-icon-circle ha-icon {
      --mdc-icon-size: 22px;
    }
    .control-label {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .control-name {
      font-size: 0.9rem;
      font-weight: 500;
      line-height: 1.2;
    }
    .control-state {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }
    .graph-container {
      flex: 1;
      min-width: 0;
    }
    ${Bt}
    ${Ft}
  `,t([dt({attribute:!1})],qt.prototype,"hass",void 0),t([function(t){return dt({...t,state:!0,attribute:!1})}()],qt.prototype,"_config",void 0),qt=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("project-aura-card")],qt);const Gt=window;Gt.customCards=Gt.customCards??[],Gt.customCards.push({type:"project-aura-card",name:"Project Aura Card",description:"Mirrors the physical Project Aura air quality monitor display with firmware-aligned severity thresholds.",preview:!0,documentationURL:"https://github.com/pickerin/project-aura-card"}),console.info("%c PROJECT-AURA-CARD %c v0.2.5 ","color: white; background: #43a047; font-weight: 700;","color: #43a047; background: white; font-weight: 700;");export{qt as ProjectAuraCard};
