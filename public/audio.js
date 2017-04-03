'use strict';
let test_notes = {
	notes: [
		{
			pitch: 440,
			duration: 500,
			synthType: "sine"

		},
		{
			pitch: 512,
			duration: 500,
			synthType: "square"

		},
		{
			pitch: 330,
			duration: 500,
			synthType: "sine"

		},
		{
			pitch: 124,
			duration: 500,
			synthType: "square"

		}
	]

};

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();

let started = false;
let note_index = 0;	
function playNotes(notes, index, ctx) {
	let oscillator = ctx.createOscillator();
	oscillator.connect(ctx.destination);
	if (index === notes.notes.length - 1) {
		note_index = -1;
	}
	oscillator.type = notes.notes[index].synthType;
	oscillator.frequency.value = notes.notes[index].pitch;
	oscillator.start();
	oscillator.stop(audioCtx.currentTime + notes.notes[index].duration/1000);
	started = true;
	note_index = note_index + 1;
	setTimeout(function () {playNotes(notes, note_index, ctx)}, (notes.notes[index].duration));
}
