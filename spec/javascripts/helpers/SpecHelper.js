beforeEach(function() {
  this.addMatchers({
    beEquivalentTo: function(expected, options){
      var actual = this.actual;

      var toString = function(object){
        if(object === null){
          return "";
        }else if(object instanceof Element || object instanceof DocumentFragment){
          return new XMLSerializer().serializeToString(object);
        }
        else{
          return object.toString();
        }
      };

      this.message = function () {
        return "Expected " + toString(actual) + " to be equivalent to " + toString(expected);
      };

      return EquivalentXml.isEquivalent(actual,expected,options);
    }
  });
});

var HTML = function(html_string){
  var element = document.createElement("div");
  var fragment = document.createDocumentFragment();

  element.innerHTML = html_string;

  return element;
};

var TextNode = function(text){
  return document.createTextNode(text);
};
