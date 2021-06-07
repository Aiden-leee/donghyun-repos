const timeFilterFormat = time => {
	let result;
	if (time < 10) {
		result = '0' + time + ':00';
	} else {
		result = time + ':00';
	}
	return result;
};

const dayFilterFormat = day => {
	let result = '';
	let split_day = day.split('');
	split_day.forEach((item, idx) => {
		if (idx > 0 || idx == split_day.length) {
			result += ', (' + item + ')';
		} else {
			result += '(' + item + ')';
		}
	});
	return result;
};

export { timeFilterFormat, dayFilterFormat };
