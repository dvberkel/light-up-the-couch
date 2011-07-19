function(doc, req) {  
	var ddoc = this;
	var Mustache = require("vendor/couchapp/lib/mustache");
	var path = require("vendor/couchapp/lib/path").init(req);

	var context = {
		assets : path.asset()
	};

	return Mustache.to_html(ddoc.template.lightsout, context, ddoc.template.partial);
}
