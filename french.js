vowels={
    'i':{
            "height":6,
            "backness":0,
            "roundedness":0
    },
    'y':{
            "height":6,
            "backness":0,
            "roundedness":2
    },
    'u':{
            "height":6,
            "backness":2,
            "roundedness":2
    },
    'e':{
            "height":4,
            "backness":0,
            "roundedness":0
    },
    'ø':{
            "height":4,
            "backness":0,
            "roundedness":2
    },
    'o':{
            "height":4,
            "backness":2,
            "roundedness":2
    },
    'ə':{
            "height":3,
            "backness":2,
            "roundedness":0
    },
    'ɛ':{
            "height":2,
            "backness":0,
            "roundedness":0
    },
    'œ':{
            "height":2,
            "backness":0,
            "roundedness":2
    },
    'ɔ':{
            "height":2,
            "backness":2,
            "roundedness":2
    },
    'a':{
            "height":0,
            "backness":0,
            "roundedness":0
    },
    'ɑ':{
            "height":0,
            "backness":2,
            "roundedness":0
    }
};

function frenchIpaToPhonoVectors(string){
  return string.match(/([^\u0303](?!\u0303)|[^\u0303][\u0303])/g).map(phoneme=>phonemeToVector(phoneme));
}

function phonemeToVector(phoneme){
    let base = phoneme[0];
    let vector = vowels[base];
    vector.nasal = /\u0303/.test(phoneme);
    return vector;
}