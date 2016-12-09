const date = {
	formatDateObj: (obj) => {
		const year = obj.year;
		const month = obj.monthValue;
		const day = obj.dayOfMonth;
		const hour= obj.hour;
		const minute = obj.minute;
		const second = obj.second;

		return `${year}-${month}-${day} ${hour}:${minute}`;
	}
}

export default date;