function (newDoc, oldDoc, userCtx) {
	function require(field, reason) {
		reason = reason || "Document requires a " + field;
		if (!newDoc[field]) {
			throw({"forbidden" : reason});
		}
	}

	function restrict(field, options, reason) {
		reason = reason || "Document " + field + " is restricted to " + options.join(":");
		var allowed = false;
		for (var index = 0; index < options.length; index++) {
			if (newDoc[field] == options[index]) {
				allowed = true;
				break;
			}
		}
		if (!allowed) {
			throw({"forbidden" : reason});
		}
	}
	
	require('type');
	restrict('type', ['description']);
	
	if (newDoc.type == 'description') {
		require('numberOfStates');
		require('problem');
	}
}
