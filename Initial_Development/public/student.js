(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['students'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class = \"container\">\n		<table>\n	   <tr>\n		  <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"studentID") || (depth0 != null ? lookupProperty(depth0,"studentID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"studentID","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":21}}}) : helper)))
    + "</td>\n		   <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"GPA") || (depth0 != null ? lookupProperty(depth0,"GPA") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"GPA","hash":{},"data":data,"loc":{"start":{"line":5,"column":9},"end":{"line":5,"column":16}}}) : helper)))
    + "</td>\n		  <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Name") || (depth0 != null ? lookupProperty(depth0,"Name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":16}}}) : helper)))
    + "</td>\n		  <td>"
    + alias4(((helper = (helper = lookupProperty(helpers,"Major") || (depth0 != null ? lookupProperty(depth0,"Major") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Major","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":17}}}) : helper)))
    + "</td>\n	   </tr>\n		</table>\n	</div>";
},"useData":true});
})();