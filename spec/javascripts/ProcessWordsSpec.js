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

      var expected = HTML("<p><span>HE WAS THE EVIL MAN </span></p>");

      var result = parseTextNodes(fragment,func,1);

      expect(result).beEquivalentTo(expected,{element_order: true});
    });


  });


});
