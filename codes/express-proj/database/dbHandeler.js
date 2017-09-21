var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./model");

for(var i in models){ 
    mongoose.model(i,new Schema(models[i]));
}

module.exports = { 
    getModel: function(type){ 
        return _getModel(type);
    }
};

var _getModel = function(type){ 
    return mongoose.model(type);
};
