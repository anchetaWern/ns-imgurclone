var _ = require('lodash');
var api = require('../../lib/api');
var frame = require('ui/frame');

var topmost = frame.topmost();

var unfiltered_photos = [];
var page;
var photos = [];

function pageLoaded(args){
	page = args.object;

	var topic_id = page.navigationContext.id;

	var spinner = page.getViewById('spinner');
	spinner.busy = true;

	api.get('https://api.imgur.com/3/topics/' + topic_id + '/viral/1').then(function(json){

		unfiltered_photos = json.data;
		photos = getPhotos(unfiltered_photos);

		page.bindingContext = {
			photos: photos
		}

		spinner.busy = false;
	
	});

}

function backToTopics(){
	topmost.goBack();
}


function pickRandomItems(){
	photos = getPhotos(unfiltered_photos);

	page.bindingContext = {
		photos: photos
	}	
}

function getPhotos(unfiltered_photos){

	var photos_to_show = 5;

	var filtered_photos = _.reject(unfiltered_photos, function(photo){
		return photo.is_album;
	});

	var random = _.random(0, filtered_photos.length - photos_to_show - 1);

	var photos = _.slice(filtered_photos, random, random + photos_to_show);   
	return photos;

}

function viewImage(args){
	
	var link = photos[args.index].link;

	topmost.navigate({
		moduleName: 'views/image/image',
		context: {
			url: link
		}
	});
}

exports.pageLoaded = pageLoaded;
exports.backToTopics = backToTopics;
exports.pickRandomItems = pickRandomItems;
exports.viewImage = viewImage;