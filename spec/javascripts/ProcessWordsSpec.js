describe("ProcessWords", function() {

  var func;

  beforeEach(function() {
    func = function(word){
      return word.toUpperCase();
    };
  });

  describe("#parseTextNodes", function(){

    it("should be able to a process a HTML fragment", function(){
      var fragment = HTML("<p>He was the evil man</p>");

      var expected = HTML("<p><span>HE WAS THE EVIL MAN</span></p>");

      var result = parseTextNodes(fragment,func,1);

      expect(result).beEquivalentTo(expected,{element_order: true});
    });


  });

  describe("#processIndividualWords", function(){

    it("should pass only words to the function", function(){
      var fragment = "\"Hello\" he said, while; they laughed!";

      var expected = ['Hello', 'he', 'said', 'while', 'they', 'laughed'];

      var result = [];
      var func = function(word){
        result.push(word);
        return word;
      };

      processIndividualWords(fragment,func,{layout: 'db-NormalLayout'});

      expect(result).toEqual(expected);
    });

    it("should return processed text", function(){
      var fragment = "\"Hello\" he said, while; they laughed!";

      var expected = "\"HELLO\" HE SAID, WHILE; THEY LAUGHED!";

      var func = function(word){
        return word.toUpperCase();
      };

      var result = processIndividualWords(fragment,func,{layout: 'db-NormalLayout'});

      expect(result).toEqual(expected);
    });

  });

});
