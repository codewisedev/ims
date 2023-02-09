/* eslint-disable no-undef */
//TODO: Dashboard Panel

$(function () {
	'use strict';

	//* Config Chart
	Chart.defaults.global.defaultFontFamily = 'Vazir';
	var salesChartCanvas = document.getElementById('salesChart').getContext('2d');
	new Chart(salesChartCanvas, {
		type: 'line',
		data: {
			labels: [
				'فروردین',
				'اردیبهشت',
				'خرداد',
				'تیر',
				'مرداد',
				'شهریور',
				'مهر',
				'آبان',
				'آذر',
				'دی',
				'بهمن',
				'اسفند',
			],
			datasets: [
				{
					label: 'فروش',
					data: [10, 20, 30, 40, 50, 40, 30, 20, 60, 70, 80, 50],
					backgroundColor: 'rgba(40, 167, 69, 0.2)',
					borderColor: 'rgb(1, 98, 87, 1)',
					borderWidth: 1,
				},
			],
		},
		options: {
			maintainAspectRatio: true,
			responsive: true,
		},
	});
	//! *****************************
});
