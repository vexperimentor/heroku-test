var SHA256 = require('crypto-js/sha256');
module.exports = {
	generateVerificationCode: function(email){
		return SHA256(email);
	}
}