'use strict';

class Renderer {
    render(selector, name, data = {}) {
        const template = Handlebars.partials[name];
        $(selector).html(template(data)).attr('class', 'container');
    }
}