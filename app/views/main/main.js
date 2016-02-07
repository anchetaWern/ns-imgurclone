var api = require('../../lib/api');
var frame = require('ui/frame');

var topics = [];

function pageLoaded(args){
    var page = args.object;

    var spinner = page.getViewById('spinner');
    spinner.busy = true;

	api.get('https://api.imgur.com/3/topics/defaults').then(function(json){
	    spinner.busy = false;
	    topics = json.data;

		page.bindingContext = {
			topics: topics
		}

	});

}

function openTopic(args){

	var id = topics[args.index].id;
	var topmost = frame.topmost();

	topmost.navigate({
		moduleName: 'views/topic/topic',
		context: {
			id: id
		}
	});
	
}

exports.pageLoaded = pageLoaded;
exports.openTopic = openTopic;