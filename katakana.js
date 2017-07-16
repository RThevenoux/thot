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

function kanasToIpa(kanas){
    return kanas.map(x=>kanaToIpa(x)).join('');
}

function kanaToIpa(kana){
    for(i=0;i<katakanas.length;i++){
        data = katakanas[i];
        if(data.kana==kana){
            return data.ipa;
        }
    }
    return null;
}

function mutateGenome(genome) {
  let mutated = [];

  for(i=0;i<genome.length;i++){
    if(Math.random() <= mutationRate) {
        // # Mutation
        let mutationType = Math.random();
        if(mutationType<0.2){
            // Duplication p=0.2
            mutated.push(genome[i]);
            mutated.push(genome[i]);
        }else if (mutationType>=0.2 && mutationType<0.4){
            // Deletion p=0.2
            // do not add kana
        }else{
            // mutation p=0.2
            mutated.push(getRandomKana());
        }
    }else{
        // # No mutation
        mutated.push(genome[i]);
    }    
  }
  return mutated;
}

function getRandomKana(){
    let index = Math.floor(Math.random()*katakanas.length);
    return katakanas[index].kana;
}