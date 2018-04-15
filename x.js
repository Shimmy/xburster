var urls_url = "https://gist.githubusercontent.com/Shimmy/cb49e0d4ad66f89d4c3afe737cbccb38/raw/37a252ea52bddea95313fb5559e8839d36608af5/urls";
var url_categories = [];
var foo=[];
var c=0;
browser.browserAction.onClicked.addListener(function(tab) {
	var tabUrl = /.*\//.exec(tab.url)
	$.get(urls_url, function(data){
		// Fetch categories
		re = /^\[(.*?)\]$/gm;
		
		while (categories = re.exec(data)) {
			url_categories.push(categories[1]);
		}
		console.log(url_categories);

		re = /\[.*?\]/;
		sections = data.split(re);
		sections.shift();
		console.log(sections);
		console.log("new section");
		$.each(sections, function(index, section) {
			re = /\n/;			
			urls = section.split(re);
			foo[url_categories[c]] = [];
			$.each(urls, function(index, url) {
				if (url.length>0) {
					console.log(tabUrl+url);
					foo[url_categories[c]].push(tabUrl+url);
				}
			});
			c=c+1;
		});
		console.log(foo);
	});
});

function openTab(url) {
	var creating = browser.tabs.create({
	   url:url
	 });
	 creating.then(function() {}, onError);
}
function onError(error) {
	console.log("something is wrong "+error);
}