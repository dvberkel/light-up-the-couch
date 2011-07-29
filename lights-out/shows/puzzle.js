function(doc, req) {  
	var ddoc = this;
	var Mustache = require("vendor/couchapp/lib/mustache");
	var path = require("vendor/couchapp/lib/path").init(req);
	
	var context = { "isDoc" : false	};
	if (doc && doc.type == 'description') {
		context = {
			"isDoc" : true,
			assets : path.asset(),
			name : doc.name,
			numberOfStates : doc.numberOfStates,
			problem :  JSON.stringify(doc.problem)
		};
	};

	return Mustache.to_html(ddoc.template.lightsout, context, ddoc.template.partial);
}
