// shows a list of running tabs in the window
function init() {
  chrome.storage.sync.get({
    extensionActive: true,
    alphaOrder: false
  }, function(items) {
    var active = items.extensionActive;
    var reverse = items.alphaOrder;
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      // sort tabs
      tabs = sort(tabs, reverse);
      // add sorted tabs to popup
    	for (var i = 0; i < tabs.length; i++) {
    		var outputDiv = document.getElementById("tabs");
    		displayTabInfo(tabs[i].windowId, tabs[i], outputDiv);
    	}
      // move tabs in window
      if(active === true)
        moveTabs(tabs);
    });
  });
}

// print a link to a given tab
function displayTabInfo(windowId, tab, outputDiv) {
  if (tab.favIconUrl != undefined) {
    outputDiv.innerHTML += "<img src='chrome://favicon/" + tab.url + "'>\n";
  }
  outputDiv.innerHTML +=
    "<b><a href='#' onclick='showTab(window, " + windowId + ", " + tab.id +
    ")'>" + tab.title + "</a></b><br>\n" +
    "<i>" + tab.url + "</i><br>\n";
}

function moveTabData(new_index) {
  return {
    'index': new_index
  }
}

// move tabs according to sort
function moveTabs(tabs) {
	for (var i = 0; i < tabs.length; i++) {
		try {
			chrome.tabs.move(tabs[i].id, moveTabData(i));
		} catch (e) {
			alert(e);
		}
	}
}

// sort tabs alphabetically
function sort(tabs, reverse) {
  return tabs.sort(function(a, b) {
    if (reverse === false) {
      if (a.url < b.url)
        return -1;
      return 1;
    } else {
      if (a.url > b.url)
        return -1;
      return 1;
    }
  });
}

// start extension
document.addEventListener('DOMContentLoaded', init);
