featureSchema = {
  name:"POC",
  features:[
    {
      "name":"height",
      "type":"number",
      "min":0,
      "max":6,
      "weight":1
    },
    {
      "name":"backness",
      "type":"number",
      "min":0,
      "max":2,
      "weight":0.5
    },
    {
      "name":"roundedness",
      "type":"number",
      "min":0,
      "max":2,
      "weight":1
    },
    {
      "name":"nasal",
      "type":"number",
      "min":0,
      "max":1,
      "weight":0.5
    }
  ]
};

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
            "backness":1,
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
    },
    'ɯ':{
            "height":6,
            "backness":2,
            "roundedness":1
    }
};

function phonemesToFeatures(phonemes){
        return phonemes.map(x=>phonemeToFeatures(x));
}

function phonemeToFeatures(phoneme){
        let feature = vowels[phoneme.base];
        feature.nasal = (phoneme.nasal?1:0);
        return feature;
}