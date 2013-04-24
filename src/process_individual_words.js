function processIndividualWords(somewords,func,settings){

//wrap any punctuation like ->PNCC"PNCC
  somewords=somewords.replace(/([^a-zA-Z\s0][^a-zA-Z\s0]*)/g," PNCCC$1PNCCC ");

//split the somewords string into words and punctuation and put each word or punc. into wordArray
  var wordArray=somewords.split(/\s/);

//newtext will be the result of processing the string  somewords
  var newtext="";

//  alert("hi from process individual words\nLAYOUT is: " + layout );

//LOOP THROUGH WORDS (AND PUNCTUATION)
  for(var i=0;i<wordArray.length;i++){

    var word=wordArray[i];
    var oldword=word;
    var replacement=word; // DEFAULT THE REPLACEMENT = WORD, MAY BE MISSING


    //NOT SURE WHY IM REMOVING '/WORD' FROM PROCESS HERE
    if(word.match(/\//)){

      var cleanWord=word.replace(/\//,""); // REMOVE '/'

      replacement=revertToOriginalCase(word,wordCase(word));
     } else replacement=revertToOriginalCase(func(word),wordCase(word)); // LOOKUP MUST BE L.CASE

    // ADDING MOUSE OVER (TITLE ATTRIBUTE)  GLOSSES
    if((settings.layout=='db-GlossLayout') && !word.match(/PNCCC/)){
        newtext=newtext+"<span title=\""+oldword+"\">"+replacement+"</span>" }else //GLOSS IS AUGMENTED WORD
        if((settings.layout=='db-InverseGlossLayout') && !word.match(/PNCCC/)){
        newtext=newtext+"<span title=\""+replacement+"\">"+oldword+"</span> " }else //GLOSS IS ORIGINAL WORD
           {newtext=newtext + replacement+" ";} // NO GLOSS
//        alert(oldword + "\n" + replacement + "\n" +newtext);
       }
//LOOP-END

  // THINK THE PUNCC STUFF ENSURES NO EXTRA SPACES ARE ADDED BETWEEN PUNCTUATION AND
  // WORDS WHEN THE NODE IS RECONSTITUTED

  newtext=newtext.replace(/ PNCCC/g,"");
  newtext=newtext.replace(/PNCCC /g,"");
  newtext=newtext.replace(/PNCCC/g,"");
  newtext=newtext.replace(/\>\</g,"> <");
  return newtext;
}
