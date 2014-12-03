(function() {
  var pattern = /\blang(?:uage)?-(\w+)/;

  $.each($('pre'), function(i, el) {
    var $el = $(el);
    if (!$el.hasClass('rainbow-code')) {
      var $code = $($el.find('code'));
      var klass = $code.attr('class');
      if (klass && klass.match(pattern)) {
        var match = $code.attr('class').match(pattern);
        $code.removeClass('language-' + match[1]);
        $code.removeClass('lang-' + match[1]);
        $el.addClass("rainbow-code");
        $code.attr('data-language', match[1]);
      }
    }
  });

  $('.widget_search .typeahead').typeahead({
    name: 'article',
    valueKey: 'title',
    prefetch: {
      filter: function(data) {
        data = $.grep(data, function(value) {
          return value != false;
        });
        return data;
      },
      url: '/search.json',
    },
    template: [
      '<p class="result-type">{{type}}</p>',
      '<p class="result-name">{{title}}</p>',
      '<p class="result-description">{{description}}</p>'
    ].join(''),
    engine: Hogan
  });

  $('.widget_search .typeahead').bind('typeahead:selected', function(obj, datum) {
    window.location = datum.url;
  });
  $('.widget_search .typeahead').bind('typeahead:autocompleted', function(obj, datum) {
    window.location = datum.url;
  });

})(jQuery);
