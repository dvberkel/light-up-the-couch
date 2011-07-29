function(doc) {
	if (doc.type == 'description') {
		emit(doc.numberOfStates,{
			'name': doc.name,
			'problem': doc.problem
		});
	} 
}
