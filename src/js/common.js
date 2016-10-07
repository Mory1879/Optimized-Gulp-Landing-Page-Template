$(function() {

	// Обьявляем вызов Мобильного меню
	// Документация: http://mmenu.frebsite.nl/  https://github.com/FrDH/jQuery.mmenu

	$("#mobile_menu").mmenu({
		offCanvas	: {
			position : "bottom"
		},
		navbar: false,
		navbars: {
			content: ["close"],
			height: 1
		},
	});



});