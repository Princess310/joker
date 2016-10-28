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

	request: function(method, u, params){
		const self = this;
		let url = new URL(u, window.location.href);
		let config = {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			credentials: "same-origin"
		};

		if(method !== "POST" && typeof params !== "undefined"){
			Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
		}

		// only post method to add body config
		if(method === "POST"){
			config.body = JSON.stringify(params);
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