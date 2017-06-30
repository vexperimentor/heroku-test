var config = require('../config');
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
mongoose.Promise = require('bluebird');
mongoose.createConnection(config.mongodb);
var Schema = mongoose.Schema;

var ruleSchema = new Schema({
	max_value: Schema.Types.Double,
	min_value: Schema.Types.Double,
	max_length: Number,
	min_length: Number,
	min_grid: String,
	max_grid: String,
	regex: String,
	is_required: Boolean
});
var variableSchema = new Schema({
	info: {
		name: String,
		description: String,
		v_type: String,
		v_default: String,
		v_attrs: String,
		rules: [ruleSchema]
	}	
});

variableSchema.pre('save', function(next){
	if (this.info.v_type == '') next();

	var allowedTypes = ['String', 'Int', 'Number', 'Boolean', 'Range', 'Checklist', 'Radiolist', 'Dropdown', 'Float', 'Date', 'Paragraph', 'Matrix', 'Array'];
	if (allowedTypes.indexOf(this.info.v_type) == -1){
		//Unknown variable type
		var err = new Error('Invalid Variable Type');
		next(err);
	}else{
		next();
	}
})
var Variable = mongoose.model('Variable', variableSchema);
module.exports = Variable;