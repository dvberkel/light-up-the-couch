function (newDoc, oldDoc, userCtx) {
	function require(field, reason) {
		reason = reason || "Document requires a " + field;
		if (!newDoc[field]) {
			throw({"forbidden" : reason});
		}
	}

	require('type');
}
