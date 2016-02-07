var frame = require('ui/frame');
var topmost = frame.topmost();

function pageLoaded(args){
	var page = args.object;
	var url = page.navigationContext.url;
	page.bindingContext = {
		imageUrl: url
	}
}


function backToTopic(){
	topmost.goBack();
}

exports.pageLoaded = pageLoaded;
exports.backToTopic = backToTopic;
