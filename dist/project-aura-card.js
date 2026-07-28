function e(e,t,i,n){var s,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(a=(r<3?s(a):r>3?s(t,i,a):s(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),s=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const a=e=>new r("string"==typeof e?e:e+"",void 0,n),o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,n)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[n+1],e[0]);return new r(i,e,n)},l=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return a(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,g=globalThis,v=g.trustedTypes,m=v?v.emptyScript:"",_=g.reactiveElementPolyfillSupport,$=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!c(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,t);void 0!==n&&d(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){const{get:n,set:s}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:n,set(t){const r=n?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,n)=>{if(i)e.adoptedStyleSheets=n.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of n){const n=document.createElement("style"),s=t.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=i.cssText,e.appendChild(n)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,n=i._$Eh.get(e);if(void 0!==n&&this._$Em!==n){const e=i.getPropertyOptions(n),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=n;const r=s.fromAttribute(t,e.type);this[n]=r??this._$Ej?.get(n)??r,this._$Em=null}}requestUpdate(e,t,i,n=!1,s){if(void 0!==e){const r=this.constructor;if(!1===n&&(s=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??y)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===n&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,n=this[t];!0!==e||this._$AL.has(t)||void 0===n||this.C(t,void 0,i,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,_?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,S=e=>e,C=A.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,O="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,M=`<${P}>`,H=document,T=()=>H.createComment(""),V=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,L="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,I=/>/g,j=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),q=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,J=H.createTreeWalker(H,129);function Q(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,n=[];let s,r=2===t?"<svg>":3===t?"<math>":"",a=R;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===R?"!--"===l[1]?a=N:void 0!==l[1]?a=I:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=s??R,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,o=l[1],a=void 0===l[3]?j:'"'===l[3]?D:z):a===D||a===z?a=j:a===N||a===I?a=R:(a=j,s=void 0);const u=a===j&&e[t+1].startsWith("/>")?" ":"";r+=a===R?i+M:c>=0?(n.push(o),i.slice(0,c)+O+i.slice(c)+k+u):i+k+(-2===c?t:u)}return[Q(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),n]};class Z{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let s=0,r=0;const a=e.length-1,o=this.parts,[l,c]=K(e,t);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(n=J.nextNode())&&o.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const e of n.getAttributeNames())if(e.endsWith(O)){const t=c[r++],i=n.getAttribute(e).split(k),a=/([.?@])?(.*)/.exec(t);o.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?ie:"?"===a[1]?ne:"@"===a[1]?se:te}),n.removeAttribute(e)}else e.startsWith(k)&&(o.push({type:6,index:s}),n.removeAttribute(e));if(B.test(n.tagName)){const e=n.textContent.split(k),t=e.length-1;if(t>0){n.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)n.append(e[i],T()),J.nextNode(),o.push({type:2,index:++s});n.append(e[t],T())}}}else if(8===n.nodeType)if(n.data===P)o.push({type:2,index:s});else{let e=-1;for(;-1!==(e=n.data.indexOf(k,e+1));)o.push({type:7,index:s}),e+=k.length-1}s++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,n){if(t===q)return t;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const r=V(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(t=X(e,s._$AS(e,t.values),s,n)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??H).importNode(t,!0);J.currentNode=n;let s=J.nextNode(),r=0,a=0,o=i[0];for(;void 0!==o;){if(r===o.index){let t;2===o.type?t=new ee(s,s.nextSibling,this,e):1===o.type?t=new o.ctor(s,o.name,o.strings,this,e):6===o.type&&(t=new re(s,this,e)),this._$AV.push(t),o=i[++a]}r!==o?.index&&(s=J.nextNode(),r++)}return J.currentNode=H,n}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),V(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&V(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,n="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(Q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{const e=new Y(n,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=G.get(e.strings);return void 0===t&&G.set(e.strings,t=new Z(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,n=0;for(const s of e)n===t.length?t.push(i=new ee(this.O(T()),this.O(T()),this,this.options)):i=t[n],i._$AI(s),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=S(e).nextSibling;S(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,n){const s=this.strings;let r=!1;if(void 0===s)e=X(this,e,t,0),r=!V(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const n=e;let a,o;for(e=s[0],a=0;a<s.length-1;a++)o=X(this,n[i+a],t,a),o===q&&(o=this._$AH[a]),r||=!V(o)||o!==this._$AH[a],o===W?e=W:e!==W&&(e+=(o??"")+s[a+1]),this._$AH[a]=o}r&&!n&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class ne extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class se extends te{constructor(e,t,i,n,s){super(e,t,i,n,s),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??W)===q)return;const i=this._$AH,n=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==W&&(i===W||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ae=A.litHtmlPolyfillSupport;ae?.(Z,ee),(A.litHtmlVersions??=[]).push("3.3.2");const oe=globalThis;class le extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const n=i?.renderBefore??t;let s=n._$litPart$;if(void 0===s){const e=i?.renderBefore??null;n._$litPart$=s=new ee(t.insertBefore(T(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,oe.litElementHydrateSupport?.({LitElement:le});const ce=oe.litElementPolyfillSupport;ce?.({LitElement:le}),(oe.litElementVersions??=[]).push("4.2.2");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},he=(e=ue,t,i)=>{const{kind:n,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===n&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===n){const{name:n}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(n,s,e,!0,i)},init(t){return void 0!==t&&this.C(n,void 0,e,t),t}}}if("setter"===n){const{name:n}=i;return function(i){const s=this[n];t.call(this,i),this.requestUpdate(n,s,e,!0,i)}}throw Error("Unsupported decorator location: "+n)};function pe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const n=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),n?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function fe(e){return pe({...e,state:!0,attribute:!1})}function ge(e){switch(e){case"green":return"var(--success-color, var(--state-sensor-on-color, #43a047))";case"yellow":return"var(--warning-color, #ff9800)";case"orange":return"#ff6f00";case"red":return"var(--error-color, var(--state-sensor-off-color, #d32f2f))";default:return"var(--disabled-text-color, #9e9e9e)"}}function ve(e){const t=ge(e.severity);return F`
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
        ${e.unit?F`<span class="value-unit">${e.unit}</span>`:W}
      </div>
      ${e.secondaryLine?F`<div class="tile-secondary">${e.secondaryLine}</div>`:W}
    </div>
  `}const me=new Set(["unknown","unavailable","none",""]);function _e(e,t,i){const n=`sensor.${t}_${i}`,s=e.states[n];if(!s)return{entityId:n,available:!1,rawState:null,numericValue:null,unit:null,friendlyName:null};const r=s.state,a=me.has(String(r).toLowerCase()),o=a?null:Number.parseFloat(r);return{entityId:n,available:!a,rawState:r,numericValue:Number.isFinite(o)?o:null,unit:s.attributes?.unit_of_measurement??null,friendlyName:s.attributes?.friendly_name??null}}function $e(e,t,i){const n=`switch.${t}_${i}`,s=e.states[n];return{entityId:n,available:Boolean(s)&&!me.has(String(s?.state??"").toLowerCase()),isOn:"on"===s?.state}}function be(e,t=0){return e.available&&null!==e.numericValue?e.numericValue.toFixed(t):"--"}function ye(e){return"°F"===e.unit||"F"===e.unit}const we={green:800,yellow:1e3,orange:1500},xe={green:9,yellow:35,orange:100},Ae={green:12,yellow:35,orange:55},Se={green:10,yellow:25,orange:50},Ce={green:25,yellow:50,orange:75},Ee={green:54,yellow:154,orange:254},Oe={green:250,yellow:600,orange:1200},ke={green:30,yellow:60,orange:100},Pe={green:150,yellow:250,orange:350},Me={green:50,yellow:100,orange:200},He={redLow:16,orangeLow:18,yellowLow:20,yellowHigh:25,orangeHigh:26,redHigh:28},Te={redLow:20,orangeLow:30,yellowLow:40,yellowHigh:60,orangeHigh:65,redHigh:70},Ve={redLow:5,orangeLow:8,yellowLow:10,yellowHigh:16,orangeHigh:18,redHigh:21},Ue={redLow:4,orangeLow:5,yellowLow:7,yellowHigh:15,orangeHigh:18,redHigh:20},Le={green:3,yellow:5,orange:7};function Re(e,t){return null!==e&&Number.isFinite(e)?e<=t.green?"green":e<=t.yellow?"yellow":e<=t.orange?"orange":"red":"unknown"}function Ne(e,t){return null!==e&&Number.isFinite(e)?e<t.redLow?"red":e<t.orangeLow?"orange":e<t.yellowLow?"yellow":e>t.redHigh?"red":e>t.orangeHigh?"orange":e>t.yellowHigh?"yellow":"green":"unknown"}function Ie(e,t){if(null===e||null===t)return null;if(!Number.isFinite(e)||!Number.isFinite(t)||t<0||t>100)return null;const i=(t-55)/4+(e-18)/7;return Math.round(Math.min(Math.max(i,0),10))}function je(e){return 5/9*(e-32)}function ze(e,t){if(null===e)return"unknown";const i=Math.abs(e);return 3===t?i<1.5?"green":i<3?"yellow":i<5?"orange":"red":i<5?"green":i<10?"yellow":i<15?"orange":"red"}function De(e,t){if(null===e)return"--";const i="inHg"===t?2:1;return`${e>=0?"+":""}${e.toFixed(i)}`}function Be(e){return F`
    <button
      class="control-tile"
      @click=${e.onTap}
      ?disabled=${!e.available}
    >
      <span class="control-icon-circle ${e.isOn?"control-icon-circle--on":""}">
        <ha-icon icon=${e.icon}></ha-icon>
      </span>
      <span class="control-label">
        <span class="control-name">${e.label}</span>
        <span class="control-state">${e.stateLabel}</span>
      </span>
    </button>
  `}function Fe(e,t){return e?t?"On":"Off":"--"}function qe(e,t,i){const n=$e(e,t,"night_mode"),s=$e(e,t,"backlight"),r=$e(e,t,"alert_blink"),a=`button.${t}_restart`,o=e.states[a],l=Boolean(o)&&"unavailable"!==o.state;if(!(n.available||s.available||r.available||l))return W;const c=(t,i)=>e.callService("switch",i?"turn_off":"turn_on",{},{entity_id:t});return F`
    <div class="section-header">
      <ha-icon icon="mdi:tune"></ha-icon>
      <span>Controls</span>
    </div>
    <div class="controls-grid">
      ${Be({label:"Night Mode",icon:"mdi:weather-night",available:n.available,isOn:n.isOn,stateLabel:Fe(n.available,n.isOn),onTap:()=>c(n.entityId,n.isOn)})}
      ${Be({label:"Backlight",icon:"mdi:television",available:s.available,isOn:s.isOn,stateLabel:Fe(s.available,s.isOn),onTap:()=>c(s.entityId,s.isOn)})}
      ${Be({label:"Alert Blink",icon:"mdi:alarm-light",available:r.available,isOn:r.isOn,stateLabel:Fe(r.available,r.isOn),onTap:()=>c(r.entityId,r.isOn)})}
      ${Be({label:"Restart",icon:"mdi:restart-alert",available:l,isOn:!1,stateLabel:(d=o?.state??null,d?"unknown"===d?"Unknown":"unavailable"===d?"--":"Ready":"--"),onTap:()=>{return t=a,e.callService("button","press",{},{entity_id:t});var t}})}
      ${i?Be({label:"Dashboard",icon:"mdi:web",available:!0,isOn:!1,stateLabel:"Open",onTap:()=>window.open(`http://${i}/dashboard`,"_blank")}):W}
    </div>
  `;var d}function We(e){if(!e)return"unknown";switch(e.toLowerCase()){case"excellent":return"green";case"good":return"yellow";case"fair":return"orange";case"poor":return"red";default:return"unknown"}}function Ge(e,t){const i=_e(e,t,"aqi"),n=_e(e,t,"air_status"),s=_e(e,t,"main_issue");if(!i.available&&!n.available&&!s.available)return W;const r=null!==(a=i.numericValue)&&Number.isFinite(a)?a<=25?"green":a<=50?"yellow":a<=75?"orange":"red":"unknown";var a,o,l;return F`
    <div class="section-header">
      <ha-icon icon="mdi:air-filter"></ha-icon>
      <span>Air Quality</span>
    </div>
    <div class="section-grid">
      ${ve({label:"AQI",value:be(i,0),unit:"/100",severity:r})}
      ${ve({label:"Status",value:n.rawState??"--",unit:null,severity:We(n.rawState)})}
      ${ve({label:"Main Issue",value:s.rawState??"--",unit:null,severity:(o=s.rawState,l=r,o?"clear"===o.toLowerCase()?"green":l:"unknown")})}
    </div>
  `}function Je(e){if(!e)return"unknown";switch(e.toUpperCase()){case"RUNNING":return"green";case"STOPPED":return"yellow";case"OFFLINE":return"orange";case"FAULT":return"red";default:return"unknown"}}const Qe="project_aura";let Ke=class extends le{constructor(){super(...arguments),this._now=new Date}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={entity_prefix:Qe,...e}}getCardSize(){return 6}static getStubConfig(){return{type:"custom:project-aura-compact-card",entity_prefix:Qe}}connectedCallback(){super.connectedCallback(),this._clock=window.setInterval(()=>{this._now=new Date},15e3)}disconnectedCallback(){super.disconnectedCallback(),this._clock&&window.clearInterval(this._clock)}_moreInfo(e){const t=new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:e}});this.dispatchEvent(t)}_pip(e){return F`<span
      class="pip"
      style="color: ${ge(e)}"
    ></span>`}_tile(e,t,i,n,s,r){return F`
      <div class="tile" role="button" tabindex="0"
        @click=${()=>this._moreInfo(t.entityId)}>
        <div class="tile-top"><span class="label">${e}</span>${this._pip(i)}</div>
        <div class="value-row">
          <span class="value">${be(t,n)}</span>
          <span class="unit">${s}</span>
        </div>
        ${r?F`<div class="subtitle">${r}</div>`:W}
      </div>
    `}_duoRow(e,t,i,n){return F`
      <div class="duo-row" role="button" tabindex="0"
        @click=${()=>this._moreInfo(n)}>
        <span class="label">${e}:</span>
        <span class="duo-value">${t}</span>
        ${this._pip(i)}
      </div>
    `}render(){if(!this._config||!this.hass)return F``;const e=this.hass,t=this._config.entity_prefix??Qe,i=_e(e,t,"co2"),n=_e(e,t,"temperature"),s=_e(e,t,"humidity"),r=_e(e,t,"absolute_humidity"),a=_e(e,t,"dew_point"),o=_e(e,t,"pressure"),l=_e(e,t,"pressure_delta_3h"),c=_e(e,t,"pressure_delta_24h"),d=_e(e,t,"pm0_5"),u=_e(e,t,"pm1_0"),h=_e(e,t,"pm2_5"),p=_e(e,t,"pm10"),f=_e(e,t,"voc_index"),g=_e(e,t,"nox_index"),v=_e(e,t,"hcho"),m=_e(e,t,"co"),_=_e(e,t,"air_status"),$=_e(e,t,"main_issue"),b=null===n.numericValue?null:ye(n)?je(n.numericValue):n.numericValue,y=null===a.numericValue?null:ye(a)?je(a.numericValue):a.numericValue,w=Ie(b,s.numericValue),x=Re(i.numericValue,we),A=null===i.numericValue?0:100*Math.min(1,Math.max(0,(i.numericValue-400)/1600)),S=function(e){switch((e??"").toLowerCase()){case"excellent":case"good":return"green";case"fair":return"yellow";case"poor":return"red";default:return"unknown"}}(_.rawState),C=($.rawState??"").trim(),E=C&&"clear"!==C.toLowerCase()?`STATUS: ${C}`:`STATUS: All readings normal (${_.rawState??"--"})`,O=this._now.toLocaleTimeString(void 0,{hour:"numeric",minute:"2-digit"}),[k,P]=O.split(" "),M=this._now.toLocaleDateString(void 0,{month:"2-digit",day:"2-digit",year:"numeric"});return F`
      <ha-card>
        <div class="panel">
          <div class="banner" style="border-color: ${ge(S)}"
            role="button" tabindex="0"
            @click=${()=>this._moreInfo(_.entityId)}>
            <span class="banner-text">${E}</span>
          </div>
          <div class="grid">
            <div class="tile span2" role="button" tabindex="0"
              @click=${()=>this._moreInfo(i.entityId)}>
              <div class="tile-top"><span class="label">CO2</span>${this._pip(x)}</div>
              <div class="value-row hero">
                <span class="value">${be(i,0)}</span>
                <span class="unit">${i.unit??"ppm"}</span>
              </div>
              <div class="gauge">
                <div class="gauge-marker" style="left: ${A}%"></div>
              </div>
            </div>
            ${this._tile("TEMP",n,Ne(b,He),1,n.unit??"°")}
            <div class="tile duo">
              ${this._duoRow("RH",`${be(s,0)}%`,Ne(s.numericValue,Te),s.entityId)}
              ${this._duoRow("AH",`${be(r,0)}g`,Ne(r.numericValue,Ue),r.entityId)}
            </div>
            <div class="tile duo">
              ${this._duoRow("MR",null===w?"--":`${w}`,Re(w,Le),s.entityId)}
              ${this._duoRow("DP",`${be(a,0)}${ye(a)?"F":"C"}`,Ne(y,Ve),a.entityId)}
            </div>

            <div class="tile span2" role="button" tabindex="0"
              @click=${()=>this._moreInfo(o.entityId)}>
              <div class="tile-top"><span class="label">MSL PRESSURE</span></div>
              <div class="pressure-row">
                <div class="value-row">
                  <span class="value">${be(o,1)}</span>
                  <span class="unit">${o.unit??""}</span>
                </div>
                <div class="trends">
                  <span class="trend-pill"
                    style="border-color: ${ge(ze(l.numericValue,3))}">
                    3h: ${null!==l.numericValue&&l.numericValue>=0?"+":""}${be(l,2)}
                  </span>
                  <span class="trend-pill"
                    style="border-color: ${ge(ze(c.numericValue,24))}">
                    24h: ${null!==c.numericValue&&c.numericValue>=0?"+":""}${be(c,2)}
                  </span>
                </div>
              </div>
            </div>
            ${this._tile("PM0.5",d,Re(d.numericValue,Oe),0,"#/cm³")}
            ${this._tile("PM2.5",h,Re(h.numericValue,Ae),1,"µg/m³")}
            ${this._tile("PM10",p,Re(p.numericValue,Ee),1,"µg/m³",`PM1: ${be(u,1)}`)}

            <div class="tile">
              <div class="tile-top">
                <span class="label">TIME</span>
                <span class="label">${P??""}</span>
              </div>
              <div class="value-row"><span class="value">${k}</span></div>
              <div class="subtitle">${M}</div>
            </div>
            ${this._tile("VOC",f,Re(f.numericValue,Pe),0,"Index")}
            ${this._tile("NOx",g,Re(g.numericValue,Me),0,"Index")}
            ${this._tile("HCHO",v,Re(v.numericValue,ke),0,"ppb")}
            ${this._tile("CO",m,Re(m.numericValue,xe),1,"ppm")}
          </div>
        </div>
      </ha-card>
    `}};Ke.styles=o`
    ha-card {
      background: transparent;
      border: none;
      box-shadow: none;
    }
    .panel {
      background: #101014;
      border-radius: 14px;
      padding: 12px;
      font-family: ui-monospace, 'JetBrains Mono', Menlo, Consolas, monospace;
    }
    .banner {
      display: flex;
      align-items: center;
      border: 2px solid;
      border-radius: 999px;
      padding: 7px 16px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .banner-text {
      font-size: 0.85rem;
      font-weight: 700;
      color: #f3ead0;
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .span2 {
      grid-column: span 2;
    }
    .tile {
      background: #15151b;
      border: 2px solid #cfc08f;
      border-radius: 10px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 74px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .tile-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 6px;
    }
    .label {
      font-size: 0.68rem;
      font-weight: 700;
      color: #cfc08f;
      letter-spacing: 0.05em;
    }
    .pip {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 7px currentColor;
      flex-shrink: 0;
    }
    .value-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
      justify-content: center;
    }
    .value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #f5f5f0;
      line-height: 1.05;
    }
    .hero .value {
      font-size: 2.4rem;
    }
    .unit {
      font-size: 0.65rem;
      font-weight: 700;
      color: #cfc08f;
    }
    .subtitle {
      font-size: 0.62rem;
      font-weight: 700;
      color: #9c9478;
      text-align: center;
    }
    .gauge {
      position: relative;
      height: 8px;
      border: 1px solid #cfc08f;
      border-radius: 999px;
      background: linear-gradient(
        to right,
        #43a047 0%,
        #43a047 25%,
        #fdd835 40%,
        #ff9800 65%,
        #d32f2f 100%
      );
      margin-top: 6px;
    }
    .gauge-marker {
      position: absolute;
      top: -3px;
      width: 4px;
      height: 12px;
      border-radius: 2px;
      background: #ffffff;
      transform: translateX(-50%);
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
    }
    .duo {
      padding: 4px 8px;
      gap: 2px;
    }
    .duo-row {
      display: flex;
      align-items: center;
      gap: 5px;
      flex: 1;
    }
    .duo-row + .duo-row {
      border-top: 1px solid rgba(207, 192, 143, 0.4);
    }
    .duo-value {
      font-size: 0.95rem;
      font-weight: 800;
      color: #f5f5f0;
      flex: 1;
      text-align: right;
    }
    .pressure-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .trends {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .trend-pill {
      border: 2px solid;
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 0.62rem;
      font-weight: 800;
      color: #f5f5f0;
      white-space: nowrap;
    }
    @media (max-width: 460px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .span2 {
        grid-column: span 2;
      }
    }
  `,e([pe({attribute:!1})],Ke.prototype,"hass",void 0),e([fe()],Ke.prototype,"_config",void 0),e([fe()],Ke.prototype,"_now",void 0),Ke=e([de("project-aura-compact-card")],Ke);const Ze=window;Ze.customCards=Ze.customCards??[],Ze.customCards.push({type:"project-aura-compact-card",name:"Project Aura Compact Card",description:"Compact dashboard card mimicking the physical Project Aura display"});const Xe=a("\n  .aura-tile {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    padding: 12px 14px;\n    background-color: var(--card-background-color, #1c1c1c);\n    border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));\n    border-radius: 12px;\n    min-height: 84px;\n    transition: border-color 0.2s ease, transform 0.1s ease;\n    box-sizing: border-box;\n  }\n  .aura-tile[role='button'] {\n    cursor: pointer;\n  }\n  .aura-tile[role='button']:hover {\n    border-color: var(--primary-color, #03a9f4);\n  }\n  .aura-tile[role='button']:active {\n    transform: scale(0.98);\n  }\n  .tile-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n  }\n  .tile-label {\n    font-size: 0.75rem;\n    font-weight: 500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: var(--secondary-text-color, #a0a0a0);\n  }\n  .tile-pip {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    flex-shrink: 0;\n    box-shadow: 0 0 6px currentColor;\n  }\n  .tile-value {\n    display: flex;\n    align-items: baseline;\n    gap: 4px;\n    margin-top: 4px;\n  }\n  .value-number {\n    font-size: 1.8rem;\n    font-weight: 600;\n    color: var(--primary-text-color, #ffffff);\n    line-height: 1.1;\n  }\n  .value-unit {\n    font-size: 0.75rem;\n    color: var(--secondary-text-color, #a0a0a0);\n  }\n  .tile-secondary {\n    font-size: 0.7rem;\n    color: var(--secondary-text-color, #a0a0a0);\n    margin-top: 2px;\n  }\n"),Ye=a("\n  .status-banner {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 10px 14px;\n    border: 2px solid;\n    border-radius: 10px;\n    background-color: var(--card-background-color, #1c1c1c);\n    margin-bottom: 12px;\n  }\n  .status-banner ha-icon {\n    --mdc-icon-size: 20px;\n    flex-shrink: 0;\n  }\n  .status-text {\n    font-size: 0.9rem;\n    font-weight: 500;\n    color: var(--primary-text-color, #ffffff);\n    letter-spacing: 0.02em;\n  }\n"),et="project_aura";let tt=class extends le{constructor(){super(...arguments),this._graphCards=new Map}static getStubConfig(){return{type:"custom:project-aura-card",entity_prefix:et,title:"Air Quality",show_status_banner:!0,show_air_quality:!0,show_controls:!0,show_fan:!0,show_pressure_section:!0,show_graphs:!0,compact:!1}}setConfig(e){if(!e)throw new Error("Invalid configuration");this._config={entity_prefix:et,show_status_banner:!0,show_air_quality:!0,show_controls:!0,show_fan:!0,show_pressure_section:!0,show_graphs:!0,compact:!1,...e}}getCardSize(){let e=1;return this._config?.show_status_banner&&(e+=1),!1!==this._config?.show_air_quality&&(e+=2),e+=2,e+=2,e+=2,this._config?.show_pressure_section&&(e+=2),!1!==this._config?.show_graphs&&(e+=6),!1!==this._config?.show_fan&&(e+=3),!1!==this._config?.show_controls&&(e+=2),e}updated(e){super.updated(e),this._config&&this.hass&&!1!==this._config.show_graphs&&this._updateGraphCards()}async _updateGraphCards(){const e=await(window.loadCardHelpers?.());if(!e)return;const t=this._config.entity_prefix??et,i=[{key:"temperature",entity:`sensor.${t}_temperature`,title:"Temperature"},{key:"humidity",entity:`sensor.${t}_humidity`,title:"Humidity"},{key:"co2",entity:`sensor.${t}_co2`,title:"CO2 Concentration"}];for(const{key:t,entity:n,title:s}of i){const i=this.shadowRoot?.querySelector(`#graph-${t}`);if(!i)continue;let r=this._graphCards.get(t);if(!r){if(r=await e.createCardElement({type:"history-graph",entities:[{entity:n,name:s}],hours_to_show:24,title:s}),!r)continue;i.appendChild(r),this._graphCards.set(t,r)}r.hass=this.hass}}shouldUpdate(e){if(e.has("_config"))return!0;const t=e.get("hass");return!t||this._relevantStatesChanged(t,this.hass)}_relevantStatesChanged(e,t){const i=this._config.entity_prefix??et,n=e=>e.startsWith(`sensor.${i}_`)||e.startsWith(`switch.${i}_`)||e.startsWith(`button.${i}_`);for(const i of Object.keys(t.states))if(n(i)&&e.states[i]?.state!==t.states[i].state)return!0;return!1}render(){if(!this._config||!this.hass)return W;const e=this._config.entity_prefix??et;return Boolean(this.hass.states[`sensor.${e}_co2`]||this.hass.states[`sensor.${e}_temperature`])?F`
      <ha-card>
        ${this._config.title?F`<h1 class="card-title">${this._config.title}</h1>`:W}
        <div class="card-content">
          ${!1!==this._config.show_status_banner?function(e,t){const i=e.states[`sensor.${t}_air_status`],n=e.states[`sensor.${t}_main_issue`],s=i?.state??null,r=n?.state??"Unknown",a=function(e){switch((e??"").toLowerCase()){case"excellent":case"good":return"green";case"fair":return"yellow";case"poor":return"red";default:return"unknown"}}(s),o="Clear"===r||"unknown"===r?`All readings normal (${s??"--"})`:r;return F`
    <div
      class="status-banner"
      style="border-color: ${ge(a)};"
    >
      <ha-icon
        icon=${function(e){switch(e){case"green":return"mdi:check-circle";case"yellow":return"mdi:alert-circle-outline";case"orange":return"mdi:alert";case"red":return"mdi:alert-octagon";default:return"mdi:help-circle-outline"}}(a)}
        style="color: ${ge(a)};"
      ></ha-icon>
      <span class="status-text">STATUS: ${o}</span>
    </div>
  `}(this.hass,e):W}
          ${!1!==this._config.show_air_quality?F`<div class="section">${Ge(this.hass,e)}</div>`:W}
          <div class="section">${function(e,t){const i=_e(e,t,"temperature"),n=_e(e,t,"humidity"),s=_e(e,t,"absolute_humidity"),r=_e(e,t,"dew_point"),a=null!==i.numericValue&&ye(i)?je(i.numericValue):i.numericValue,o=null!==r.numericValue&&ye(r)?je(r.numericValue):r.numericValue,l=Ie(a,n.numericValue);return F`
    <div class="section-header">
      <ha-icon icon="mdi:home-thermometer-outline"></ha-icon>
      <span>Comfort</span>
    </div>
    <div class="section-grid">
      ${ve({label:"Temp",value:be(i,1),unit:i.unit,severity:Ne(a,He)})}
      ${ve({label:"RH",value:be(n,0),unit:"%",severity:Ne(n.numericValue,Te)})}
      ${ve({label:"AH",value:be(s,1),unit:"g/m³",severity:Ne(s.numericValue,Ue)})}
      ${ve({label:"DP",value:be(r,0),unit:r.unit,severity:Ne(o,Ve)})}
      ${ve({label:"MR",value:null!==l?String(l):"--",unit:"/10",severity:Re(l,Le),secondaryLine:"Mold Risk"})}
    </div>
  `}(this.hass,e)}</div>
          <div class="section">${function(e,t){const i=_e(e,t,"pm0_5"),n=_e(e,t,"pm1_0"),s=_e(e,t,"pm2_5"),r=_e(e,t,"pm4_0"),a=_e(e,t,"pm10");return F`
    <div class="section-header">
      <ha-icon icon="mdi:grain"></ha-icon>
      <span>Particulates</span>
    </div>
    <div class="section-grid">
      ${ve({label:"PM0.5",value:be(i,0),unit:"#/cm³",severity:Re(i.numericValue,Oe)})}
      ${ve({label:"PM1",value:be(n,1),unit:"μg/m³",severity:Re(n.numericValue,Se)})}
      ${ve({label:"PM2.5",value:be(s,1),unit:"μg/m³",severity:Re(s.numericValue,Ae)})}
      ${ve({label:"PM4",value:be(r,1),unit:"μg/m³",severity:Re(r.numericValue,Ce)})}
      ${ve({label:"PM10",value:be(a,1),unit:"μg/m³",severity:Re(a.numericValue,Ee)})}
    </div>
  `}(this.hass,e)}</div>
          <div class="section">${function(e,t){const i=_e(e,t,"co2"),n=_e(e,t,"voc_index"),s=_e(e,t,"nox_index"),r=_e(e,t,"hcho"),a=_e(e,t,"co");return F`
    <div class="section-header">
      <ha-icon icon="mdi:molecule"></ha-icon>
      <span>Gases</span>
    </div>
    <div class="section-grid">
      ${ve({label:"CO2",value:be(i,0),unit:"ppm",severity:Re(i.numericValue,we)})}
      ${ve({label:"VOC",value:be(n,0),unit:"index",severity:Re(n.numericValue,Pe)})}
      ${ve({label:"NOx",value:be(s,0),unit:"index",severity:Re(s.numericValue,Me)})}
      ${r.available?ve({label:"HCHO",value:be(r,0),unit:"ppb",severity:Re(r.numericValue,ke)}):W}
      ${a.available?ve({label:"CO",value:be(a,1),unit:a.unit??"ppm",severity:Re(a.numericValue,xe)}):W}
    </div>
  `}(this.hass,e)}</div>
          ${!1!==this._config.show_pressure_section?F`<div class="section">${function(e,t){const i=_e(e,t,"pressure"),n=_e(e,t,"pressure_absolute"),s=_e(e,t,"pressure_delta_3h"),r=_e(e,t,"pressure_delta_24h");return i.available||n.available?F`
    <div class="section-header">
      <ha-icon icon="mdi:gauge"></ha-icon>
      <span>Pressure</span>
    </div>
    <div class="section-grid pressure-grid">
      ${i.available?ve({label:"MSL Pressure",value:be(i,"inHg"===i.unit?2:1),unit:i.unit,severity:"green"}):W}
      ${n.available?ve({label:"Abs Pressure",value:be(n,"inHg"===n.unit?2:1),unit:n.unit,severity:"green"}):W}
      ${ve({label:"3h Trend",value:De(s.numericValue,s.unit),unit:s.unit,severity:ze(s.numericValue,3)})}
      ${ve({label:"24h Trend",value:De(r.numericValue,r.unit),unit:r.unit,severity:ze(r.numericValue,24)})}
    </div>
  `:F`${W}`}(this.hass,e)}</div>`:W}
          ${!1!==this._config.show_graphs?F`<div class="section">${F`
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
          ${!1!==this._config.show_fan?F`<div class="section">${function(e,t){const i=_e(e,t,"fan_status");if(!i.available)return W;const n=_e(e,t,"fan_output_percent"),s=_e(e,t,"fan_timer_remaining"),r=`number.${t}_fan_manual_percent`,a=e.states[r],o=a?.state&&"unknown"!==a.state&&"unavailable"!==a.state?a.state:"--",l=`binary_sensor.${t}_fan_fault`,c=e.states[l],d=Boolean(c)&&"unavailable"!==c.state,u="on"===c?.state,h=$e(e,t,"fan_auto"),p=$e(e,t,"fan_manual"),f=$e(e,t,"fan_stop"),g=(t,i)=>e.callService("switch",i?"turn_off":"turn_on",{},{entity_id:t});return F`
    <div class="section-header">
      <ha-icon icon="mdi:fan"></ha-icon>
      <span>Ventilation</span>
    </div>
    <div class="section-grid">
      ${ve({label:"Status",value:i.rawState??"--",unit:null,severity:Je(i.rawState)})}
      ${n.available?ve({label:"Output",value:be(n,0),unit:"%",severity:"green"}):W}
      ${a?ve({label:"Speed",value:o,unit:"%",severity:"green"}):W}
      ${s.available?ve({label:"Timer",value:s.rawState??"--",unit:null,severity:"green"}):W}
      ${d?ve({label:"Fault",value:u?"Yes":"No",unit:null,severity:(v=u,v?"red":"green")}):W}
    </div>
    <div class="controls-grid">
      ${Be({label:"Auto",icon:"mdi:fan-auto",available:h.available,isOn:h.isOn,stateLabel:h.available?h.isOn?"On":"Off":"--",onTap:()=>g(h.entityId,h.isOn)})}
      ${Be({label:"Manual",icon:"mdi:fan",available:p.available,isOn:p.isOn,stateLabel:p.available?p.isOn?"On":"Off":"--",onTap:()=>g(p.entityId,p.isOn)})}
      ${Be({label:"Stop",icon:"mdi:fan-off",available:f.available,isOn:f.isOn,stateLabel:f.available?f.isOn?"On":"Off":"--",onTap:()=>g(f.entityId,f.isOn)})}
    </div>
  `;var v}(this.hass,e)}</div>`:W}
          ${!1!==this._config.show_controls?F`<div class="section">${qe(this.hass,e,this._config.device_ip)}</div>`:W}
        </div>
      </ha-card>
    `:F`
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
      `}};tt.styles=o`
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
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
    .control-tile {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 6px;
      background: var(--card-background-color, #1c1c1c);
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
      border-radius: 12px;
      cursor: pointer;
      color: var(--primary-text-color);
      flex: 1;
      text-align: center;
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
      width: 36px;
      height: 36px;
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
      --mdc-icon-size: 20px;
    }
    .control-label {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .control-name {
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1.2;
    }
    .control-state {
      font-size: 0.7rem;
      color: var(--secondary-text-color);
    }
    .graph-container {
      flex: 1;
      min-width: 0;
    }
    ${Xe}
    ${Ye}
  `,e([pe({attribute:!1})],tt.prototype,"hass",void 0),e([fe()],tt.prototype,"_config",void 0),tt=e([de("project-aura-card")],tt);const it=window;it.customCards=it.customCards??[],it.customCards.push({type:"project-aura-card",name:"Project Aura Card",description:"Mirrors the physical Project Aura air quality monitor display with firmware-aligned severity thresholds.",preview:!0,documentationURL:"https://github.com/pickerin/project-aura-card"}),console.info("%c PROJECT-AURA-CARD %c v0.4.0 ","color: white; background: #43a047; font-weight: 700;","color: #43a047; background: white; font-weight: 700;");export{tt as ProjectAuraCard};
