/* eslint-disable no-unused-vars */
//TODO: Fetch Code

//* POST
async function postData(url, data) {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	return response.json();
}
//! *****************************
