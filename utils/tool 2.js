class tool{
	formDate(date, type = 1){
		console.log(date);
		var year = date.getFullYear();
		console.log(year);
		var month = date.getMonth() + 1;
		console.log(month);
		var day = date.getDate();
		console.log(day);
		var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
		var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
		var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		month >= 1 && month <= 9 ? (month = "0" + month) : "";
		day >= 0 && day <= 9 ? (day = "0" + day) : "";
		var timer = '';
		switch(type){
			case '1':
				timer = year + ':' + month + ':' + day + ' ' + hour + ':' + minute + ':' + second;
			break;
			case '2':
				timer = year + ':' + month + ':' + day + ' ' + hour + ':' + minute;
			break;
			default:
				timer = year + ':' + month + ':' + day + ' ' + hour + ':' + minute + ':' + second;
			break;
		}
		return timer;
	}
}

export default tool;