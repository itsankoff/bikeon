$( "#subscribe" ).click(function() {
  var email = $("#sub-email").val();

	var request = {
	  type: 'subscribe',
	  email: email
	};

	console.log(request);

	fetch('http://localhost:9999/api/subscribe', {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(request),
	}).then((res) => {
	  console.log(res.statusText);
	  if(res.statusText == "OK"){
	  	$("#subscribe").text("Subscribed");
	  }
	  console.log(res.type);
	  res.text().then((text) => {
	    console.log(text);
	  });
	}).catch((err) => {
	  console.error(err);
	});
});
