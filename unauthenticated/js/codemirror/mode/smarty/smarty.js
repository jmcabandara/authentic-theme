(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("smarty",function(c,o){var l=o.rightDelimiter||"}";var i=o.leftDelimiter||"{";var j=o.version||2;var f=a.getMode(c,o.baseMode||"null");var k=["debug","extends","function","include","literal"];var e={operatorChars:/[+\-*&%=<>!?]/,validIdentifier:/[a-zA-Z0-9_]/,stringChar:/['"]/};var n;function q(s,r){n=r;return s}function b(s,r,t){r.tokenize=t;return t(s,r)}function m(r,s){if(s==null){s=r.pos}return j===3&&i=="{"&&(s==r.string.length||/\s/.test(r.string.charAt(s)))}function h(w,v){var t=w.string;for(var s=w.pos;;){var r=t.indexOf(i,s);s=r+i.length;if(r==-1||!m(w,r+i.length)){break}}if(r==w.pos){w.match(i);if(w.eat("*")){return b(w,v,d("comment","*"+l))}else{v.depth++;v.tokenize=p;n="startTag";return"tag"}}if(r>-1){w.string=t.slice(0,r)}var u=f.token(w,v.base);if(r>-1){w.string=t}return u}function p(w,u){if(w.match(l,true)){if(j===3){u.depth--;if(u.depth<=0){u.tokenize=h}}else{u.tokenize=h}return q("tag",null)}if(w.match(i,true)){u.depth++;return q("tag","startTag")}var t=w.next();if(t=="$"){w.eatWhile(e.validIdentifier);return q("variable-2","variable")}else{if(t=="|"){return q("operator","pipe")}else{if(t=="."){return q("operator","property")}else{if(e.stringChar.test(t)){u.tokenize=g(t);return q("string","string")}else{if(e.operatorChars.test(t)){w.eatWhile(e.operatorChars);return q("operator","operator")}else{if(t=="["||t=="]"){return q("bracket","bracket")}else{if(t=="("||t==")"){return q("bracket","operator")}else{if(/\d/.test(t)){w.eatWhile(/\d/);return q("number","number")}else{if(u.last=="variable"){if(t=="@"){w.eatWhile(e.validIdentifier);return q("property","property")}else{if(t=="|"){w.eatWhile(e.validIdentifier);return q("qualifier","modifier")}}}else{if(u.last=="pipe"){w.eatWhile(e.validIdentifier);return q("qualifier","modifier")}else{if(u.last=="whitespace"){w.eatWhile(e.validIdentifier);return q("attribute","modifier")}}}if(u.last=="property"){w.eatWhile(e.validIdentifier);return q("property",null)}else{if(/\s/.test(t)){n="whitespace";return null}}var v="";if(t!="/"){v+=t}var x=null;while(x=w.eat(e.validIdentifier)){v+=x}for(var s=0,r=k.length;s<r;s++){if(k[s]==v){return q("keyword","keyword")}}if(/\s/.test(t)){return null}return q("tag","tag")}}}}}}}}}function g(r){return function(u,s){var v=null;var t=null;while(!u.eol()){t=u.peek();if(u.next()==r&&v!=="\\"){s.tokenize=p;break}v=t}return"string"}}function d(s,r){return function(u,t){while(!u.eol()){if(u.match(r)){t.tokenize=h;break}u.next()}return s}}return{startState:function(){return{base:a.startState(f),tokenize:h,last:null,depth:0}},copyState:function(r){return{base:a.copyState(f,r.base),tokenize:r.tokenize,last:r.last,depth:r.depth}},innerMode:function(r){if(r.tokenize==h){return{mode:f,state:r.base}}},token:function(t,s){var r=s.tokenize(t,s);s.last=n;return r},indent:function(r,s){if(r.tokenize==h&&f.indent){return f.indent(r.base,s)}else{return a.Pass}},blockCommentStart:i+"*",blockCommentEnd:"*"+l}});a.defineMIME("text/x-smarty","smarty")});