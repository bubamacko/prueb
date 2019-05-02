var eplDoc = document, eplLL = false, eS1 = 'us.img.e-planning.net', eplArgs = { iIF:1,sV: schemeLocal() + "://ads.e-planning.net/" ,vV:"4",sI:"19ce1",sec:"ROS_MN",eIs:["300X250_DESKTOP","300X600_DESKTOP","300X600_MOBILE","Flotante_1x1_desktop","300X250_MOBILE","728X90_DESKTOP"] };
function eplCheckStart() {
	if (document.epl) {
		var e = document.epl;
		if (e.eplReady()) return true;
		e.eplInit(eplArgs);
		if (eplArgs.custom) {
			for (var s in eplArgs.custom) {
				e.setCustomAdShow(s, eplArgs.custom[s]);
			}
		}
		return e.eplReady();
	} else if (!eplLL) {
		var epl41Script = document.createElement('SCRIPT'); epl41Script.async = true;
		epl41Script.src = schemeLocal() + '://' + eS1 + '/layers/epl-41.js';
		document.head.appendChild(epl41Script);
		eplLL = true;
	}
	return false;
}

function eplSetAdM(eID,custF) {
	if (eplCheckStart()) {
    if (custF) { document.epl.setCustomAdShow(eID,eplArgs.custom[eID]); }
    document.epl.spaces[eID].ads_shown = false    
		document.epl.showSpace(eID);
	} else {
		setTimeout(eplSetAdM.bind(null, eID, custF), 500);
	}
}
function eplAD4M(eID,custF) {
	document.write('<div id="eplAdDiv'+eID+'"></div>');
	if (custF) {
	    if (!eplArgs.custom) { eplArgs.custom = {}; }
	    eplArgs.custom[eID] = custF;
	}
	eplSetAdM(eID, custF?true:false);
}
function schemeLocal() {
	protocol = document.location.protocol || window.top.location.protocol;
	if (protocol) {
		return protocol.indexOf('https') !== -1 ? 'https' : 'http';
	}
}
function eplReplaceAds() {
  const docs = document.querySelectorAll('[data-eplanning]')
  for (const el of docs) {
    if(el.innerHTML === '') {
      const docData = el.getAttribute('data-eplanning')
      el.innerHTML = `<div id="eplAdDiv${docData}"></div>`
      // eplSetAdM(docData)
    }
  }
}
function showAds() {
  const docs = document.querySelectorAll('[data-eplanning]')
  for (const el of docs) {
    const docData = el.getAttribute('data-eplanning')
    eplSetAdM(docData)
  }
}
function setUpObservable() {
  var config = { attributes: false, childList: true, subtree: false };
  const targetNode = document.getElementsByClassName('newsfull__relatedarticles')[0]
  if (targetNode) {
    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(eplReplaceAds);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }
}

if (document.readyState === "loading") {  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", () => {
    eplReplaceAds()
    showAds()
    // setUpObservable()
  });
} else {  // `DOMContentLoaded` has already fired
  eplReplaceAds()
  showAds()
  // setUpObservable()
}
