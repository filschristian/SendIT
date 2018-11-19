const box = document.getElementById("dialog-box");

/* Open box for editing */
const openBox = () => {
	box.style.display = "block";
};

/* Close box for editing */
const closeBox = () => {
	box.style.display = "none";
	box.style.transition = "display 5s";
};

/* Otherwise close the box */
window.onclick = event => {
	if (event.target == box) {
		box.style.display = "none";
	}
};