/**
 * Normalize IPA string :
 *  - 
 * @param {String} string the input string
 * @returns {String} the normalized string
 */
function normalizeIPA(string){
  return string.normalize("NFD");
}

function parsePhonemes(ipaString){
   if(!ipaString || ipaString.length === 0){
       return [];
   }

   let normalized = normalizeIPA(ipaString);

   let phonemes = [];
   let lastPhoneme = {};

   for(let i=0 ; i<normalized.length ; i++){
        let char = normalized[i];
        if(char==="\u0303"){
            if(lastPhoneme==null){
                throw new Exception("Unexpected '~' without base");
            }
            lastPhoneme.nasal = true;
        }else{
           if(i!=0){
                phonemes.push(lastPhoneme);
            }
            lastPhoneme = {
                'base':char
            };
        }
   }

   phonemes.push(lastPhoneme);
   return phonemes;
}