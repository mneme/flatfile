var path = require('path'),
		glob = require('glob'),
	_ = require('lodash');

function parseElement(el){	
	el.fill = el.fill || " ";
	el.adjust = el.adjust || "left";
	if(!el.length){
		throw new Error("required: length");
	}
	if(!(el.adjust === "left" || el.adjust === "right")){
		throw new Error("unsupported direction: " + el.direction)
	}
	if(!el.property){
		el.value = el.value || "";
	}
}

function loadSpec(file){
	var spec = require(path.resolve(process.cwd(),file))
	if(!spec || !Array.isArray(spec)){
		throw new Error('Invalid spec file');
	}
	spec.forEach(function(element){
		parseElement(element);
	});
	return spec;
};





module.exports.load = function(specPath){
	var ret = {},
			specs = glob.sync(specPath + "/**/*.tpl.js");

	specs.forEach(function (file) {
	  var name  = _.camelCase(path.basename(file).replace('.tpl.js',''));

	  ret[name] = loadSpec(file);
  });  
	return ret;
};