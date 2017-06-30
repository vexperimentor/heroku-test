var config = require('../config');
var httpClient = require('node-rest-client').Client;

var client = new httpClient();

var sendgrid_key = process.env.SEND_GRID_API_KEY || config.sendgrid_key;

module.exports = {
	sendEmail: function(email, template_name, sub_params){
		var args = {
			parameters: 
			{
				"to": email,
				"subject": "Dynos",
				"text": "-------",
				"from": config.sendgrid_email,
				"fromname": "Dynos Team",
				"x-smtpapi": null
			},
			headers: {
				"Authorization": "Bearer " + sendgrid_key
			}
		};

		var xmtp_obj = {
			"sub": {},
			"category": ["Notifications"],
			"filters": {
				"templates": {
					"settings": {
						"enable": 1,
						"template_id": config.sendgrid_templates[template_name]
					}
				}
			}
		};

		for (var key in sub_params){
			xmtp_obj["sub"][key] = [sub_params[key]];
		}

		args["parameters"]["x-smtpapi"] = JSON.stringify(xmtp_obj);

		client.post(config.sendgrid_url, args, function(data, res){
			console.log("Email Processed : " + template_name);
			console.log(args);
			console.log(data);
		});
	},
	sendConfirmationEmail: function(email, verify_code){
		var args = {
			parameters: 
			{
				"to": email,
				"subject": "Dynos",
				"text": "-------",
				"from": config.sendgrid_email,
				"fromname": "Dynos Team",
				"x-smtpapi": null
			},
			headers: {
				"Authorization": "Bearer " + sendgrid_key
			}
		};

		args["parameters"]["x-smtpapi"] = JSON.stringify({
			"sub": {
				":verify_url": [
					config.verify_url + verify_code
				]
			},
			"category": [
				"Notifications"
			],
			"filters": {
				"templates": {
					"settings": {
						"enable": 1,
						"template_id": "3b234ed7-27ba-4a00-95f1-c9b14e016992"
					}
				}
			}
		});

		client.post(config.sendgrid_url, args, function(data, res){
			console.log("Verify Email Processed");
			console.log(args);
			console.log(data);
		});
	},
	sendRecoverEmail: function(email, user_oid, verify_code){
		var args = {
			parameters:
			{
				"to": email,
				"subject": "Dynos",
				"text": "--------",
				"from": config.sendgrid_email,
				"fromname": "Dynos Team",
				"x-smtpapi": null
			},
			headers: {
				"Authorization": "Bearer " + sendgrid_key
			}
		};

		args["parameters"]["x-smtpapi"] = JSON.stringify({
			"sub": {
				":url": [
					config.reset_url + 'id=' + user_oid + '&token=' + verify_code
				]
			},
			"category": [
				"Notifications"
			],
			"filters": {
				"templates": {
					"settings": {
						"enable": 1,
						"template_id": "71d9a777-7103-4b2b-9de6-65cbc47bb361"
					}
				}
			}
		});

		console.log(config.reset_url + 'id=' + user_oid + '&token=' + verify_code);
		client.post(config.sendgrid_url, args, function(data, res){
			console.log("Reset Email Processed");
			console.log(args);
			console.log(data);
		});

	},
	sendSuccessEmail: function(email){
		var args = {
			parameters: 
			{
				"to": email,
				"subject": "Welcome",
				"text": "-------",
				"from": config.sendgrid_email,
				"fromname": "Dynos Team",
				"x-smtpapi": null
			},
			headers: {
				"Authorization": "Bearer " + sendgrid_key
			}
		};

		args["parameters"]["x-smtpapi"] = JSON.stringify({
			"category": [
				"Notifications"
			],
			"filters": {
				"templates": {
					"settings": {
						"enable": 1,
						"template_id": "6f38f460-73a4-4657-abe6-d0e907a37a6a"
					}
				}
			}
		});

		client.post(config.sendgrid_url, args, function(data, res){
			console.log("Confirm Email Processed");
			console.log(args);
			console.log(data);
		});
	}
}