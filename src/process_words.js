var FirefoxExtension = {

  init: function(){
    //allows users to gradually add or remove transformed words based on
    //a window of word frequencies
    window.opener.document.getElementById('statusbar-display').label='modifying notation...'; //THIS DOESNT WORK RIGHT
    lowercutoff= document.getElementById("db-LowerCutOff");
    uppercutoff= document.getElementById("db-UpperCutOff");
    lowercutofftext=lowercutoff.label;
    uppercutofftext=uppercutoff.label;
    layout= document.getElementById("db-Layout");
    layout=layout.selectedItem.id;
    //   alert(layout);
    lowercutoffno=lowercutofftext.replace(/[a-z :]/g,"")*1; //USING UI LABEL TO STORE FREQUENCY-WINDOW VALUES
    uppercutoffno=uppercutofftext.replace(/[a-z :]/g,"")*1; //SO NEEDS [A-Z] TRIMMED TO GET TO NUMERIC VALUE
    // texttransformed=texttransformed*-1;
    //alert(texttransformed);
  }

};

function parseTextNodes(page,func,processAtWordLevel,settings)
{

  // TODO: Implement merge of defaults with settings
  var defaultSettings = {
    layout:  'db-NormalLayout',
    options: 'db-LowerCutOff',
    scheme:  'db-Augment'
  };

  settings         = settings || {};
  settings.layout  = settings.layout  || defaultSettings.layout;
  settings.options = settings.options || defaultSettings.options;
  settings.scheme  = settings.scheme  || defaultSettings.scheme;


//THE NUTS AND BOLTS OF THE ####WHOLE PROCESS#####
//SELECTING THE TEXTUAL NODES IN THE DOCUMENT BODY
   var tNodes=document.evaluate(
    "*//text()",
    page,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
        );

  var str="";

  // LOOP  THROUGH DOCUMENT TEXTUAL CONTENT
  for(var i=0;i<tNodes.snapshotLength;i++){
    var node=tNodes.snapshotItem(i);

    //EXCLUDING THE TEXTUAL CONTENT INSIDE SCRIPT TAGS AND STYLE TAGS
    //AND AVOIDING UNECESSARY PROCESSING OF EMPTY NODES
    if(node.parentNode.nodeName != "SCRIPT" && node.parentNode.nodeName != "STYLE" && node.data !="" && node.parentNode.length!=0){
     var oldText=node.nodeValue;
   //alert(oldText);
    if(oldText.match(/[a-z]/gi))                          //MAYBE EXISTING FILTERING OF EMPTY NODES?
     {
      if(processAtWordLevel==1){
        var newText=processIndividualWords(oldText,func,settings)  //SCHEMES THAT NEED TO USE LOOKUP TABLE
     }
     else {var newText=func(oldText)}                     //WORD-BLIND SCHEMES E.G. BLOCKS-NO-VOWELS

     //alert("oldText;=" + oldText + "---newtext:=" + newText + "parentNode.nodeName;=" + node.parentNode.nodeName);
      // alert(document.body.innerHTML);
      var newnode=document.createElement("span");             //WRAPPING IN SPANS SO THAT INNERHTML DOESN'T
                                                          //ALLOWS ME TO ACCESS PARENTNODE IN SENSIBLE FASHION
      if(settings.layout=="db-ColumnsLayout"){                     //ADDS COLUMNS LAYOUT IF CHOSEN
            var newnode=page.createElement("span");
           newnode.innerHTML="<TABLE ALIGN='CENTER' RULES='COLS' CELLSPACING='0' ><TR><TD>"+newText+"</TD><TD>"+oldText+"</TD></TR></TABLE>";} else
      {newnode.innerHTML=newText;}                       // IS THIS FREAKING THE REVIEWERS, ALLOWING INJECTION/
                                                         // CORRUPTION. AN (UN?)ESCAPED MARKUP INTERFERENCE THREAT?
                                                         // CAUSE OF ALLEGEDED UN-NECESSARY REPAINT - OR WAS
                                                         // REPAINT JUST DUE TO THE <HEAD> MODIFICATION

      //best
      // {newnode.textContent=newText;} //grey letters surrounded with tag text
       //{newnode=document.createTextNode(newText);}
      //{newnode.nodeValue=newText;}
     // var pnode=node.parentNode;
     // pnode.insertBefore(newnode,node);
    //pnode.removeChild(node);
     var pnode=node.parentNode;
      pnode.replaceChild(newnode,node); // THIS MAYBE ENOUGH TO PLACATE REVIEWERS? THOUGH NO SPEED GAINS
//comment out last bit once it works
      str=str+newText+"\n";             // REDUNDANT LEGACY CODE?
    }
  }
}
//comment out last bit once it works                      // THINK BELOW WAS TO DISABLE PROCESSING ONCE A SCHEME IS APPLIED
                                      // PERHAPS TO FORCE A PAGE REFRESH - NOT WORKING i THINK, HENCE
                                      // THE FORCED REFRESH ON INSANTIATION OF DIALOG BOX.
                                      // WE DONT WANT AUGMENTED-TWICE TEXT OR AUGMENTED-TEXT WITH NO VOWELS!!
 // schememenu= document.getElementById("db-Scheme");
 // schememenu.setAttribute("disabled","true");
 // document.getElementById("db-Augment").setAttribute("disabled","true");
//db-IPAdb-NoVowelsdb-NoVowelsdb-Blocksdb-Tobs

 return page;

}
