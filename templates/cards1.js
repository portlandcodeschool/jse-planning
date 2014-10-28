
var MemoryCards = (function() {

function Ctor() {
    return { //make instance

// Test cardset
match: function matchFn(modelA,modelB) {
    if (modelA instanceof Backbone.Model)
        return modelA.get('val') === modelB.get('val');
    else return (modelA.val === modelB.val);
},
display: function displayFn(model) {
    if (model instanceof Backbone.Model)
        return model.get('val');
    else return model.val;
},

values: [{val:1},{val:1},{val:2},{val:2},{val:3},{val:3}]
// When these are added to the Backbone collection (in game1.js),
// they will be converted into models with two attributes: 
//  'val' and 'status'
}; //end instance
}; //end ctor

return Ctor;

})();

