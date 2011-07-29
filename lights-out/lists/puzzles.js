function(head, req) {
	var ddoc = this;
	var Mustache = require("vendor/couchapp/lib/mustache");
	var path = require("vendor/couchapp/lib/path").init(req);
	var assets = path.asset();
	
	start({ "headers": { "Content-Type": "text/html"} });
	send(ddoc.template.partial.puzzlesHead)
	while (row = getRow()) {
		var context = {
			'assets': assets,
			'id' : row.id,
			'name': row.value.name
		};
		send(Mustache.to_html(ddoc.template.partial.puzzlesRow, context));
	}
	send(ddoc.template.partial.puzzlesTail)
}
