function processIndividualWords(somewords,func,settings){

  // TODO: UTF8 apostrophe plus other symbols to define words
  var processedwords = somewords.replace(/[\w\']+/g,function(oldword){
    var replacement = func(oldword);

    if(settings.layout=='db-GlossLayout'){
      //GLOSS IS ORIGINAL WORD
      replacement=newtext+"<span title=\""+oldword+"\">"+replacement+"</span>";
    } else if( settings.layout=='db-InverseGlossLayout'){
      //GLOSS IS AUGMENTED WORD
      replacement=newtext+"<span title=\""+replacement+"\">"+oldword+"</span>";
    }

    return replacement;
  });

  return processedwords;
}
