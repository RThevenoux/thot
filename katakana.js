let katakanas = [
    {
        "kana":'ア',
        "romaji":"a",
        "phonology":{
            "height":0,
            "backness":1,
            "roundedness":0,
            "nasal":0
        }
    },
    {
        "kana":'イ',
        "romaji":"i",
        "phonology":{
            "height":6,
            "backness":0,
            "roundedness":0,
            "nasal":0
        }
    },
    {
        "kana":'ウ',
        "romaji":"u",
        "phonology":{
            "height":6,
            "backness":2,
            "roundedness":1,
            "nasal":0
        }
    },
    {
        "kana":'エ',
        "romaji":"e",
        "phonology":{
            "height":3,
            "backness":0,
            "roundedness":0,
            "nasal":0
        }
    },
    {
        "kana":'オ',
        "romaji":"o",
        "phonology":{
            "height":3,
            "backness":2,
            "roundedness":2,
            "nasal":0
        }
    }
];

function kanasToPhonoVectors(kanas){
    return kanas.map(x=>getPhonemeForKana(x));
}

function getPhonemeForKana(kana){
    for(i=0;i<katakanas.length;i++){
        data = katakanas[i];
        if(data.kana==kana){
            return data.phonology;
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