// shows a list of running tabs in the window
function init() {
  chrome.windows.getCurrent({populate: true}, function(currentWindow) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    	for (var i = 0; i < tabs.length; i++) {
    		var outputDiv = document.getElementById("tab-list");
    		displayTabInfo(tabs[i].windowId, tabs[i], outputDiv);
    	}
    });
  });
}

// Print a link to a given tab
function displayTabInfo(windowId, tab, outputDiv) {
  if (tab.favIconUrl != undefined) {
    outputDiv.innerHTML += "<img src='chrome://favicon/" + tab.url + "'>\n";
  }
  outputDiv.innerHTML +=
    "<b><a href='#' onclick='showTab(window, " + windowId + ", " + tab.id +
    ")'>" + tab.title + "</a></b><br>\n" +
    "<i>" + tab.url + "</i><br>\n";
}

function moveTabData(id) {
  return {
    'index': parseInt(document.getElementById('index_' + id).value),
  }
}

function moveTabs(tabs) {
	for (var i = 0; i < tabs.length; i++) {
		try {
			//chrome.tabs.move(tabs[i].tabId, moveTabData(i));
			chrome.tabs.move(tabs[i].tabId, -1);
		} catch (e) {
			alert(e);
		}
	}
}

function sortAlpha() {
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		tabs.sort(function(a, b) {
			return b.favIconUrl - a.favIconUrl;
		});
	});
	return tabs;
}

// Kick things off.
document.addEventListener('DOMContentLoaded', init);