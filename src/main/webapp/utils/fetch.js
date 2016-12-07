import 'whatwg-fetch';

/*for example: 
*	fetch.doGet("api/user_login.json").then(function(userInfo){
*		userInfo -> return data
*	}, function(error){
*		error -> error info
*	});
*/

const fetchDao = {
	doGet: function(url, params){
		return this.request("GET", url, params);
	},

	doPost: function(url, params){
		return this.request("POST", url, params);
	},

	doPut: function(url, params){
		return this.request("PUT", url, params);
	},

	doDelete: function(url, params){
		return this.request("DELETE", url, params);
	},

	doUploadFile: function(url, params){
		return this.request("POST", url, params, true);
	},

	request: function(method, u, params, file){
		const self = this;
		let url = new URL(u, window.location.href);
		let config = {
			method: method,
			headers: {},
			credentials: "same-origin"
		};

		if(method !== "POST" && typeof params !== "undefined"){
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		}

		// only post method to add body config
		if(method === "POST" && typeof params !== "undefined"){
			let payload = [];
			Object.keys(params).forEach(key => payload.push(key + "=" + params[key]));
			config.body = payload.join("&");

			if(file){
				let formData = new FormData();
				formData.append("file", params.file);
				config.body = formData;
			}else {
				// change the Content-Type for mime
				config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
			}
		}

		return new Promise(function (resolve, reject) {
			fetch(url, config)
			.then(self.checkStatus)
			.then(self.parseJSON)
			.then(function(data) {
				resolve(data);
			}).catch(function(error){
				reject(error);
			});
		});
	},

	checkStatus: function(response){
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	},

	parseJSON: function(response){
		return response.json();
	}
};

export default fetchDao;