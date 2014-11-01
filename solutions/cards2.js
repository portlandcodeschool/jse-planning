
var MemoryCardModel = Backbone.Model.extend({
    defaults: {status:'facedown'}
});


var TestCardModel = (function(ModelClass){ // IIFE

var vals= [{val:1},{val:1},{val:2},{val:2},{val:3},{val:3},
    {val:4},{val:4},{val:5},{val:5},{val:6},{val:6}];
// When these are added to the collection, they will be converted into models with two attributes:
//'val' and 'status'

var CardModel = ModelClass.extend({
    // prototype properties (none)
},{
    // class properties
    match: function (modelA,modelB) {
        return modelA.get('val') === modelB.get('val');
    },
    display: function (model) {
        return model.get('val');
    },

    values: function(len) {
        len = Math.floor(len);
        var dfault=10, max=64;
        var vals = [];
        if (!len || len<0) len = dfault;
        if (len>max) len=max;
        for (var i = 1; (i*2)<=len; ++i) {
            vals.push({val:i});
            vals.push({val:i});
        }
        return vals;
    }
});

return CardModel;

})(MemoryCardModel); //end IIFE
// ^^^^^^^^^ parent class for subclass in IIFE
