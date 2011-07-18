(function($){
	$.q = 3;

	$.getQ = function(){ return $.q; };
	$.setQ = function(q){ return $.q = q; };

	$.state = function(){ return "state" + $(this).text(); };

	$.changeNeighbourhood = function(){
		var t = $(this); var p = t.parent();
		var index = p.children().index(t);
		var wrappedSet = t.add(t.prev()).add(t.next())
			.add(p.prev().children().eq(index))
			.add(p.next().children().eq(index));
		wrappedSet.removeState().increase().addState();
	};

	$.fn.create = function(q,data){
		$.setQ(q);
		return this.each(function(){
			$(this).append($.map(data, function(row) {
				return "<div class='row'>" +
				$.map(row, function(value){
					return "<div class='button'>" + value + "</div>";
				}).join("") +
				"</div>";
			}).join(""));
		});
	};

	$.fn.normalize = function() {
		return this.each(function(){
			var state = parseInt($(this).text()) % $.getQ();
			$(this).text(state);
		});
	};

	$.fn.removeState = function(){
		return this.removeClass($.state);
	};

	$.fn.addState = function(){
		return this.addClass($.state);
	};

	$.fn.increase = function(){
		return this.each(function(){
			var state = parseInt($(this).text());
			state = (state + 1) % $.getQ();
			$(this).text(state);        
		});
	};
		
	$.fn.initialize = function(){
		return $(".button").normalize().addState().click($.changeNeighbourhood);
	};
})(jQuery);
