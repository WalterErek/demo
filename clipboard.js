/* @charset "utf-8";bower by lightHorse; */function clipboard(e,t,o){var c="string"==typeof e?e:e+"";try{getComputedStyle(document.body,"");if(!document.querySelector(".hexin_clipboard_copydom")){var n=document.createElement("div");n.setAttribute("class","hexin_clipboard_copydom"),n.innerHTML=c,n.style.position="fixed",n.style.left="9999px",n.style.top="9999px",document.body.appendChild(n)}var l=document.querySelector(".hexin_clipboard_copydom");l.style["-webkit-user-select"]="all",l.innerHTML=c,l.hasAttribute("contenteditable")&&l.focus();var d=window.getSelection(),i=document.createRange();i.selectNodeContents(l),d.removeAllRanges(),d.addRange(i);var r=document.execCommand("copy"),a=r?"successful":"failed";console.log("copy status:"+a),r?"function"==typeof t&&t():"function"==typeof o&&o()}catch(e){console.log("error,unable to copy!")}}