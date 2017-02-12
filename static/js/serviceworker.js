if ('serviceWorker' in navigator) {
	console.log("Will the service worker register?");
	navigator.serviceWorker.register('service-worker.js')
 	.then((reg) => {
		console.log("Yes, it did.");
	}).catch((err) => {
		console.log("No it didn't. This happened: ", err);
	});
}