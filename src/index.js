function displayRecommendation(){
	var trackURI = document.getElementById("trackID").value;
    fetch('http://127.0.0.1:8080/getSpotify?seed_tracks=' + trackURI.substring(31, 53))
    	.then(function (response) {
			console.log(response);
       		return response.json();
     	})
      	.then(function (myJson) {
			console.log(myJson.tracks);
			let tablehtml = showSpotifyRecommendation(myJson);
			console.log(trackURI.substring(31, 53));
			document.querySelector("#SpotifyRecommendation").innerHTML = tablehtml;
			console.log(tablehtml);
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
