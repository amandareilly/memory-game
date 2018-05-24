Handlebars.registerPartial("card", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"card-container\">\r\n    <div class=\"card\" data-card=\""
    + alias2(alias1((depth0 != null ? depth0.cardIcon : depth0), depth0))
    + "\" data-clickable>\r\n        <div class=\"card-side card-back blue darken-3\">\r\n            <i class=\"material-icons\">help</i>\r\n        </div>\r\n        <div class=\"card-side card-front blue lighten-1\">\r\n            <i class=\"material-icons\">"
    + alias2(alias1((depth0 != null ? depth0.cardIcon : depth0), depth0))
    + "</i>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true}));
Handlebars.registerPartial("gameBoard", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.card,depth0,{"name":"card","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"game-board grid-size-"
    + container.escapeExpression(((helper = (helper = helpers.gridSize || (depth0 != null ? depth0.gridSize : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"gridSize","hash":{},"data":data}) : helper)))
    + "\" data-js-click-container=\"js-click-container\">\r\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.deck : depth0)) != null ? stack1.deck : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"found-card hidden\"></div>\r\n    <div class=\"win-modal hidden\">\r\n        <h2>Congratulations!</h2>\r\n        <div id=\"star-rating-final\">\r\n            <div class=\"filled-stars\"></div>\r\n            <div class=\"empty-stars\"></div>\r\n        </div>\r\n        <p class=\"stat\"><span class=\"stat-label\">Time: </span><span class=\"stat-data\" data-stat-time></span></p>\r\n        <p class=\"stat\">\r\n            <span class=\"stat-label\">Moves:</span>\r\n            <span class=\"stat-data\" data-stat-moves></span>\r\n        </p>\r\n        <div class=\"new-game\">\r\n            <h2>Start a New Game</h2>\r\n            <button type=\"submit\" data-clickable-difficulty=\"easy\" class=\"btn btn-large green\">Easy</button>\r\n            <button type=\"submit\" data-clickable-difficulty=\"medium\" class=\"btn btn-large yellow black-text\">Medium</button>\r\n            <button type=\"submit\" data-clickable-difficulty=\"hard\" class=\"btn btn-large red\">Hard</button>\r\n        </div>\r\n    </div>\r\n</div>";
},"usePartial":true,"useData":true}));