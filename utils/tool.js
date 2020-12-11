class tool{
	formDate(date, type = 1){;
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
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
			case '3':
				timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
			break;
			case 4:
				timer =  hour + ':' + minute;
			break;
			default:
				timer = year + ':' + month + ':' + day + ' ' + hour + ':' + minute + ':' + second;
			break;
		}
		console.log(type,timer)
		return timer;
	}
	
}

export default tool;