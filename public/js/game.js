window.addEventListener("load", (event) => {
	const socket = io();
	const uuid = document.getElementById("uuid").value;

	socket.on("connect", () => {
		socket.emit("uuid", uuid);
	});

	socket.on("message", (data) => {
		console.log(`Received from server: ${data}`);
	});

	socket.on("joined", (data) => {
		console.log(`${data}`);
	});
});
