function(doc, req) {  
	var ddoc = this;
	var Mustache = require("vendor/couchapp/lib/mustache");
	var path = require("vendor/couchapp/lib/path").init(req);
	
	var context = { 
		assets : path.asset(),
		numberOfStates: 2,
		problem: JSON.stringify([]) 
	};
	if (doc && doc.type == 'description') {
		context['id'] = doc._id;
		context['rev'] = doc._rev;
		context['numberOfState'] = doc.numberOfStates;
		context['problem'] = JSON.stringify(doc.problem);
	}

	return Mustache.to_html(ddoc.template.lightsoutEdit, context, ddoc.template.partial);
}
