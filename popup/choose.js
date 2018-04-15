var urls_url = "https://gist.githubusercontent.com/Shimmy/cb49e0d4ad66f89d4c3afe737cbccb38/raw/";
var url_categories = [];
var foo=[];
var c=0;
browser.tabs.query({active: true, currentWindow: true})
        .then(function(tab) {
        
        	var tabUrl = /.*\//.exec(tab[0].url)
        	$.get(urls_url, function(data){
        		// Fetch categories
        		re = /^\[(.*?)\]$/gm;
        		
        		while (categories = re.exec(data)) {
        			url_categories.push(categories[1]);
        		}
        		re = /\[.*?\]/;
        		sections = data.split(re);
        		sections.shift();       		
        		$.each(sections, function(index, section) {
        			re = /\n/;			
        			urls = section.split(re);
        			foo[url_categories[c]] = [];
        			$("#popup-content").append("<div class=\"button btn\" id=\""+c+"\">"+url_categories[c]+"</div>");
        			$.each(urls, function(index, url) {
        				if (url.length>0) {
        					foo[url_categories[c]].push(tabUrl+url);
        				}
        			});
        			c=c+1;
        		});
        		$(".btn").on("click", function() {
        			urls = foo[url_categories[$(this).attr('id')]];
        			$.each(urls, function(index, url) {
        				openTab(url);
        			});
        		});
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
