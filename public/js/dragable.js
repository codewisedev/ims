//TODO: Drag And Drop JS Code

$(function () {
	$(
		'#sortable1, #sortable2, #sortable3, #sortable4, #sortable5, #sortable6',
	).sortable({
		appendTo: document.body,
		cancel: '.disable-sort-item',
		cursor: 'move',
		cursorAt: { left: 1 },
		opacity: 0.5,
		zIndex: 9999,
		distance: 5,
		items: '> li',
		placeholder: 'sortable-placeholder',
		dropOnEmpty: true,
		forcePlaceholderSize: true,
		tolerance: 'pointer',
		start: function (e, ui) {
			$(ui.placeholder).hide(150);
		},
		change: function (e, ui) {
			$(ui.placeholder).show(150);
		},
	});

	$('#sortable1, #sortable2').sortable({
		connectWith: '.connectedSortable1',
	});

	$('#sortable1').sortable({
		remove: function (event, ui) {
			$(ui.item).addClass('ui-card-two', 700, 'easeOutSine');
			$(ui.item).removeClass('ui-card-one', 700, 'easeOutSine');
			$('#preFollowModal').modal();
			$('#preFollowModal').on('hidden.bs.modal', function () {
				$(ui.item).addClass('ui-card-one', 700, 'easeOutSine');
				$(ui.item).removeClass('ui-card-two', 700, 'easeOutSine');
				$('#sortable1').sortable('cancel');
			});
		},
		stop: async function (event, ui) {
			$('#preFollowCustomer').val($(ui.item)[0].id);
			var data = await $('#sortable1').sortable('toArray');
			fetch('/agent/customer/ledgerbinder/sort', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ data }),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		},
	});

	$('#sortable2, #sortable3').sortable({
		connectWith: '.connectedSortable2',
		drag: function (event, ui) {
			$(ui.item).addClass('ui-card-three', 700, 'easeOutSine');
			$(ui.item).removeClass('ui-card-two', 700, 'easeOutSine');
		},
	});

	$('#sortable3, #sortable4').sortable({
		connectWith: '.connectedSortable3',
		drag: function (event, ui) {
			$(ui.item).addClass('ui-card-four', 700, 'easeOutSine');
			$(ui.item).removeClass('ui-card-three', 700, 'easeOutSine');
		},
	});

	$('#sortable4, #sortable5').sortable({
		connectWith: '.connectedSortable4',
		drag: function (event, ui) {
			$(ui.item).addClass('ui-card-five', 700, 'easeOutSine');
			$(ui.item).removeClass('ui-card-four', 700, 'easeOutSine');
		},
	});

	$('#sortable5, #sortable6').sortable({
		connectWith: '.connectedSortable5',
		drag: function (event, ui) {
			$(ui.item).addClass('ui-card-six', 700, 'easeOutSine');
			$(ui.item).removeClass('ui-card-five', 700, 'easeOutSine');
		},
	});

	$('#sortable6, #sortable7').sortable({
		connectWith: '.connectedSortable6',
	});
});
//! *****************************
