/**
 * app.js
 *
 * made by Rick Nienhuis & Niels Haan
 */

require(['login', 'session', 'gui', 'device'], function (login, session, gui, device) {  
	function update() {
		gui.draw();
		device.listen();
		setTimeout(update, 1000);
	}

	function loginSucces() {
		session.create(ctxWords);
		session.printWords();
		gui.create(ctxWords);
		device.create();
		update();
	}

	var canvasWords = document.getElementById("wordSpace"); 
	var ctxWords = canvasWords.getContext("2d");
	
	new login(loginSucces);
});