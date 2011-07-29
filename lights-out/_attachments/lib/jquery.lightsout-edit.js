var Controller = function(){
    
    var buttonsPresent = function(){
        return $(".button").size() > 0;
    };
    
    var rowsPresent = function(){
        return $(".row").size() > 0;
    };
    
    var appendRow = function(){
          $(".row:last").clone().appendTo(".container");
    };
    
    var appendButton = function(){
        $(".row").each(function(){
            $(this).children().last().clone().appendTo($(this));
        });        
    }
    
    var createButton = function() {
        $(".row").append("<div class='button'>0</div>").children().last();
    }
    
    var createSeed = function(){
        $(".container").append("<div class='row'></div>");
        createButton();
    }

        this.addRow = function(){
        if (rowsPresent()) {
            appendRow();
        } else {
            createSeed();
        }
    };
    
    var setProblem = function(data) {
        $(".container").empty().each(function(){
            $(this).append($.map(data, function(row) {
                return "<div class='row'>" +
                $.map(row, function(value){
                    return "<div class='button'>" + value + "</div>";
                }).join("") +
                "</div>";
            }).join(""));
        });
    };
    
    var getProblem = function() {
        var data = [];
        $(".row").each(function(){
            var row = [];
            $(this).children().each(function(){
                row.push(parseInt($(this).text()))
            });
            data.push(row);
        });
        return data;
    }
    
    this.removeRow = function(){
        $(".row:last").remove();
    };
    
    this.addColumn = function(){
        if (buttonsPresent()) {
            appendButton();
        } else if (rowsPresent()) {
           createButton();
        } else {
            createSeed();           
        }
    };
    
    this.removeColumn = function(){
        $(".row .button:last-child").remove();
    };
    
    this.increaseQ = function(){
        $(".q").text(this.getQ() + 1);
    };
    
    this.decreaseQ = function(){
        $(".q").text(Math.max(2,this.getQ() - 1));
    };
    
    this.getQ = function() {
        return parseInt($(".q").text());
    };
    
    this.setQ = function(q) {
        $(".q").text(q);
    }
    
    this.addButtonHandlers = function() {
        $(".button").click(function(){
            var q = parseInt($(".q").text());
            var value = parseInt($(this).text());
            $(this).text((value + 1) % q);
        });
    };
    
    this.initialize = function(q,problem) {
        var c = this;
        c.setQ(q);
        setProblem(problem);
        c.addButtonHandlers();
        $(".addRow").click(function(){c.addRow(); c.addButtonHandlers();});
        $(".removeRow").click(function(){c.removeRow()});
        $(".addColumn").click(function(){c.addColumn(); c.addButtonHandlers();});
        $(".removeColumn").click(function(){c.removeColumn()});
        $(".increaseQ").click(function(){c.increaseQ()});
        $(".decreaseQ").click(function(){c.decreaseQ()});
        $(".save").click(function(){
        	$.couch.db("lights-out").saveDoc(c.describe());
        });
        return c;
    };
    
    this.describe = function(){
         var document = {
         	'type': 'description',
            'numberOfStates': parseInt($("#q").text()),
            'problem': getProblem()
        };
        if ($("#id").val()) {document['_id'] = $("#id").val()};
        if ($("#rev").val()) {document['_rev'] = $("#rev").val()};
        return document;
    };
};
