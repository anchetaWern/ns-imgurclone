exports.get = function(url){
	return fetch(
		url, 
		{
			'headers': {'Authorization': 'Client-ID xxxxxxxx'}
		}
	).then(function(response){
		return response.json();
	}).then(function(json){
		return json;
	});
}

