function displayRecommendation(){
	var trackURI = document.getElementById("trackID").value;
    fetch('getSpotify?seed_tracks=' + trackURI.substring(31, 53))
    	.then(function (response) {
			//console.log(response);
       		return response.json();
     	})
      	.then(function (myJson) {
			//console.log(myJson.tracks);
			let tablehtml = showSpotifyRecommendationCard(myJson);
			//console.log(trackURI.substring(31, 53));
			document.querySelector("#SpotifyRecommendation").innerHTML = tablehtml;
			//console.log(tablehtml);
		})
		.catch(function (error) {
    		console.log("Error: " + error);
    });
}

function displayDefaultRecommendation(){
	var trackID = '6mFkJmJqdDVQ1REhVfGgd1'
    fetch('getSpotify?seed_tracks=' + trackID)
    	.then(function (response) {
			//console.log(response);
       		return response.json();
     	})
      	.then(function (myJson) {
			//console.log(myJson.tracks);
			let tablehtml = showSpotifyRecommendationCard(myJson);
			//console.log(trackURI.substring(31, 53));
			document.querySelector("#SpotifyRecommendation").innerHTML = tablehtml;
			//console.log(tablehtml);
		})
		.catch(function (error) {
    		console.log("Error: " + error);
    });
}

function showSpotifyRecommendation(myJson){
    let html = "<table class = 'table'>";
    html += "<caption style = 'caption-side: top'>Recommendations</caption>";
	html += "<tr><th>Track</th><th>Artist</th><th>Album</th></tr>";
	myJson.tracks.forEach(item => {
		let embed = item.external_urls.spotify.substring(0,25) + "embed/" + item.external_urls.spotify.substring(25);
		html += "<tr>";
		html += "<td><iframe src = '" + embed + "' width='300' height='80'>" + item.name + "</iframe></td>";
		html += "<td><a href = '" + item.album.artists[0].uri + "'>" + item.album.artists[0].name + "</a></td>";
		html += "<td><a href = '" + item.album.uri + "'>" + item.album.name + "</a></td>"; 
 		html += "</tr>";
	});
    html += "</table>";
    return html;
}

function showSpotifyRecommendationCard(myJson){
    let html = "<div class='row row-cols-1 row-cols-md-4'>";
    
	//html += "<tr><th>Track</th><th>Artist</th><th>Album</th></tr>";
	myJson.tracks.forEach(item => {
		let embed = item.external_urls.spotify.substring(0,25) + "embed/" + item.external_urls.spotify.substring(25);
		html += "<div class='col mb-4 card-deck'>";
		html += "<div class='card border-secondary'>";
		//html += "<iframe src = '" + embed + "' width='200' height='80'>" + item.name + "</iframe>";
		html += "<div class='card-body'>";
		html += "<iframe src = '" + embed + "' height='80' >" + item.name + "</iframe>";
		html += "<h6 class='card-title'>Artist: <a href = '" + item.album.artists[0].external_urls.spotify + "'>" + item.album.artists[0].name + "</a></h5>";
		html += "<p class='card-text'>Album: <a href = '" + item.album.external_urls.spotify + "'>" + item.album.name + "</a></p>";
		html += '</div><div class="card-footer">';
        html += '<small class="text-muted">Released on '+ item.album.release_date +'</small>';
    	html += "</div>";
 		html += "</div></div>";
	});
    html += "</div>";
    return html;
}

function showAlert(event) {
	let html = `<div class="alert alert-success alert-dismissible fade show" role="alert">
					Thanks for your feedback! Please continue to support our site.
					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
	  					<span aria-hidden="true">&times;</span>
					</button>
				  </div>`;
	
	document.querySelector("#EmbedHTML").innerHTML = html;
	event.preventDefault();
}
