export function parsePatientFromSnapshot(snapshot) {
	let json = snapshot.data();

	if (typeof json['name'] !== 'string' || json['name'] === '') {
		console.info(`Invalid name on patient ${snapshot.id}`);
		return null;
	}

	if (typeof json['image'] !== 'string' || json['image'] === '') {
		console.info(`Invalid image on patient ${snapshot.id}`);
		return null;
	}

	if (typeof json['observations'] !== 'string' || json['observations'] === '') {
		console.info(`Invalid observations on patient ${snapshot.id}`);
		return null;
	}

	// if (!Array.isArray(json['tags'])) {
	// 	console.info(`Invalid tags on patient ${snapshot.id}`);
	// 	return null;
	// }

	if (json['status'] == 'invisible') {
		return null;
	}
	json['id'] = snapshot.id;
	return json;
}