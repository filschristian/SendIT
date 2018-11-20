const box = document.getElementById("dialog-box");
const cancel_box=document.getElementById("cancel-box");

/* Open box for editing */
const openBox = () => {
	box.style.display = "block";
};

const openCancelBox = () => {
	cancel_box.style.display = "block";
};

/* Close box for editing */
const closeBox = () => {
	box.style.display = "none";
	box.style.transition = "display 5s";
};

const closeCancelBox = () => {
	cancel_box.style.display = "none";
	cancel_box.style.transition = "display 5s";
};

/* Otherwise close the box */
window.onclick = event => {
	if (event.target == box) {
		box.style.display = "none";
	}
};