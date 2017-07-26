class KatakanaAlphabet {

  constructor(data) {
    this.katakanas = data;
    this.name = "Katakana"
  }

  mutateGenome(genome, mutationRate) {
    let mutated = [];

    for (let i = 0; i < genome.length; i++) {
      let kana = genome[i];
      if (Math.random() <= mutationRate) {
        // # Mutation
        let mutationType = Math.random();
        if (mutationType < 0.2) {
          // Duplication p=0.2
          mutated.push(kana);
          mutated.push(kana);
        } else if (mutationType >= 0.2 && mutationType < 0.4) {
          // Deletion p=0.2
          // do not add kana
        } else {
          // mutation p=0.2
          mutated.push(this._getRandomKana());
        }
      } else {
        // # No mutation
        mutated.push(kana);
      }
    }
    return mutated;
  }

  generateRandomGenome(ipaPhonemes) {
    let length = ipaPhonemes.length * (1 + (Math.random() - .5));
    let kanas = [];
    for (let i = 0; i < length; i++) {
      kanas.push(this._getRandomKana());
    }
    return kanas;
  };

  generatePhenotype(genome) {
    let ipa = genome.map(x => this._kanaToIpa(x)).join('');
    let display = String.prototype.concat(...genome);
    return {
      ipa: ipa,
      display: display
    };
  };

  _kanaToIpa(kana) {
    for (let i = 0; i < this.katakanas.length; i++) {
      let data = this.katakanas[i];
      if (data.kana == kana) {
        return data.ipa;
      }
    }
    return null;
  }

  _getRandomKana() {
    let index = Math.floor(Math.random() * this.katakanas.length);
    return this.katakanas[index].kana;
  };
}
