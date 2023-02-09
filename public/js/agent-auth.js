/* eslint-disable no-unused-vars */
//TODO: Autorization Site JS Code

//* Check Number Input
function isNumber(evt) {
	evt = evt ? evt : window.event;
	var charCode = evt.which ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}
//! *****************************

//* OTP Input
$('.otp')
	.find('input')
	.each(function () {
		$(this).attr('maxlength', 1);
		$(this).on('keyup', function (e) {
			var parent = $($(this).parent());
			if (e.keyCode === 8 || e.keyCode === 37) {
				var prev = parent.find('input#' + $(this).data('previous'));
				if (prev.length) {
					$(prev).select();
				}
			} else if (
				(e.keyCode >= 48 && e.keyCode <= 57) ||
				(e.keyCode >= 65 && e.keyCode <= 90) ||
				(e.keyCode >= 96 && e.keyCode <= 105) ||
				e.keyCode === 39
			) {
				var next = parent.find('input#' + $(this).data('next'));
				if (next.length) {
					$(next).select();
				} else {
					if (parent.data('autosubmit')) {
						parent.submit();
					}
				}
			}
		});
	});
//! *****************************

//* Error Handler
$('#error').hide();
$('#submit').click(async () => {
	let mobile = $('#mobile')
		.val()
		// eslint-disable-next-line no-useless-escape
		.replace(/(\s|\_)/g, '');
	if (mobile.length < 11 || !mobile.match(/^09/))
		$('#error').show().fadeOut(3000);
	else $('#register').submit();
	event.preventDefault();
});
//! *****************************

//* Flip Register & Login Form
var register = document.querySelector('#register');
var login = document.querySelector('#login');

document.addEventListener(
	'click',
	function (event) {
		if (event.target.matches('.show')) {
			register.removeAttribute('hidden');
			register.classList.add('flipInY');
			login.setAttribute('hidden', 'true');
			login.classList.remove('flipInY');
		}
		if (event.target.matches('.hide')) {
			register.setAttribute('hidden', 'true');
			register.classList.remove('flipInY');
			login.removeAttribute('hidden');
			login.classList.add('flipInY');
		}
	},
	false,
);
//! *****************************
