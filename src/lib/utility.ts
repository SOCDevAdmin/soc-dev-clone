export const toTitleCase = (text: string) => {
	return text
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
};

export const checkStreetAddressString = (streetaddress: string) => {
	let streetRegEx =
		/^\d+[a-zA-Z]?\s*\w+(\s+\w+)*\s+\w+(\s+\w+)*\s+(ALLEY|ARCADE|AVENUE|BOULEVARD|BYPASS|CIRCUIT|CLOSE|CORNER|COURT|CRESCENT|CUL-DE-SAC|DRIVE|ESPLANADE|GREEN|GROVE|HIGHWAY|JUNCTION|LANE|LINK|LMEWS|PARADE|PLACE|RIDGE|ROAD|SQUARE|STREET|TERRACE|WAY|)$/;
	return streetRegEx.test(String(streetaddress).toUpperCase());
};

export const checkSuburbString = (suburb: string) => {
	let suburbRegex = /^(?:(?!NSW|NEW\sSOUTH\sWALES)[A-Z\s])+$/;
	return suburbRegex.test(String(suburb).toUpperCase());
};

export function setUpperCase(node: HTMLInputElement) {
	function handleInput(event: Event) {
		const inputValue = (event.target as HTMLInputElement).value.toUpperCase();
		node.value = inputValue;
	}

	node.addEventListener('input', handleInput);

	return {
		destroy() {
			node.removeEventListener('input', handleInput);
		}
	};
}

export const formatMobile = (mobileNumber: string, digit: string) => {
	mobileNumber += digit;
	if (mobileNumber.length == 4) {
		mobileNumber += ' ';
	}
	if (mobileNumber.length == 8) {
		mobileNumber += ' ';
	}
	return mobileNumber;
};

export const formatPhone = (phoneNumber: string, digit: string) => {
	phoneNumber += digit;
	if (phoneNumber.length == 4) {
		phoneNumber += ' ';
	}
	return phoneNumber;
};
