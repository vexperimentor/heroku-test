module.exports = function (err, res){
	if (err.name == 'ValidationError') {
        for (field in err.errors) {
        	res.status(422).json({
        		field: field,
        		description: err.errors[field].message
        	});
        	break;
        }
    }else {
        console.log(err);
    	res.status(400).json({
    		description: 'Unknown error occurred.'
    	});
    }
}