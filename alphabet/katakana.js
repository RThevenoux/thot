function KatakanaAlphabet(){
    this.mutateGenome = _mutateGenome;
    this.generateRandomGenome = _generateRandomGenome;
    this.generatePhenotype = _generatePhenotype;
}

function _generatePhenotype(genome){

    let ipa = genome.map(x=>_kanaToIpa(x)).join('');
    let display = String.prototype.concat(...genome);

    return {
        ipa:ipa,
        display:display
    };
}

function _generateRandomGenome(ipaPhonemes) {
  let length = ipaPhonemes.length*(1+(Math.random()-.5));
  let kanas = [];
  for(let i=0;i<length;i++){
    kanas.push(_getRandomKana());
  }
  return kanas;
}

function _mutateGenome(genome, mutationRate) {
  let mutated = [];

  for(i=0; i<genome.length; i++){
    let kana = genome[i];
    if(Math.random() <= mutationRate) {
        // # Mutation
        let mutationType = Math.random();
        if(mutationType<0.2){
            // Duplication p=0.2
            mutated.push(kana);
            mutated.push(kana);
        }else if (mutationType>=0.2 && mutationType<0.4){
            // Deletion p=0.2
            // do not add kana
        }else{
            // mutation p=0.2
            mutated.push(_getRandomKana());
        }
    }else{
        // # No mutation
        mutated.push(kana);
    }    
  }
  return mutated;
}

function _kanaToIpa(kana){
    for(i=0;i<katakanas.length;i++){
        data = katakanas[i];
        if(data.kana==kana){
            return data.ipa;
        }
    }
    return null;
}

function _getRandomKana(){
    let index = Math.floor(Math.random()*katakanas.length);
    return katakanas[index].kana;
}

let katakanas = [
    {
        "kana":'ア',
        "romaji":"a",
        "ipa":"a"
    },
    {
        "kana":'イ',
        "romaji":"i",
        "ipa":"i"
    },
    {
        "kana":'ウ',
        "romaji":"u",
        "ipa":"ɯ"
    },
    {
        "kana":'エ',
        "romaji":"e",
        "ipa":"e"
    },
    {
        "kana":'オ',
        "romaji":"o",
        "ipa":"o"
    }
];