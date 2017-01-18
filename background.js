chrome.browserAction.onClicked.addListener(
	function(tab) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var sites = localStorage.getItem("sites");
			sites = JSON.parse(sites);
			if (sites == null) {
				sites = [];
			}
			sites.push({
				title: tabs[0].title,
				url: tabs[0].url
			});
			sites = JSON.stringify(sites);
			localStorage.setItem("sites", sites);
		});
	});

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
	id: "Data Preview",
	title: "Data Preview",
	contexts: ["browser_action"]
});
chrome.contextMenus.onClicked.addListener(
	function() {
		chrome.windows.create({
			url : "preview.html",
			focused : true,
			type : "normal"
		});

	});
