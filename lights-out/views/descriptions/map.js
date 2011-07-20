function(doc) {
	if (doc.type == 'description') {
		emit(doc.numberOfStates,doc.problem);
	} 
}
