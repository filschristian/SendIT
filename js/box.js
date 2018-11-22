const box = document.getElementById('dialog-box');
const cancelBox = document.getElementById('cancel-box');
const loginBox = document.getElementById('login-form');

/* Open box for editing */
const openBox = () => {
	box.style.display = 'block';
};

const openCancelBox = () => {
	cancelBox.style.display = 'block';
};

const openLoginBox = () => {
	loginBox.style.display = 'block';
};

/* Close box for editing */
const closeBox = () => {
	box.style.display = 'none';
	box.style.transition = 'display 5s';
};

const closeCancelBox = () => {
	cancelBox.style.display = 'none';
	cancelBox.style.transition = 'display 5s';
};

/* Otherwise close the box */
window.onclick = (event) => {
	if (event.target == box) {
		box.style.display = 'none';
	}else if (event.target == cancelBox) {
		cancelBox.style.display = 'none';
	}
};
