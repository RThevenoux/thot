class IpaDataCommented {
  constructor() {
    
    this.normalization = {
      '\u0067': '\u0261', // LATIN SMALL LETTER G > LATIN SMALL LETTER SCRIPT G
      "\u02A6": "t͡s", // LATIN SMALL LETTER TS DIGRAPH
      "\u02A3": "d͡z", // LATIN SMALL LETTER DZ DIGRAPH
      "\u02A7": "t͡ʃ", // LATIN SMALL LETTER TESH DIGRAPH
      "\u02A4": "d͡ʒ", // LATIN SMALL LETTER DEZH DIGRAPH
      "\u02A8": "t͡ɕ", // LATIN SMALL LETTER TC DIGRAPH WITH CURL
      "\u02A5": "d͡ʑ", // LATIN SMALL LETTER DZ DIGRAPH WITH CURL
      "\u025A": "\u0259\u02DE", // LATIN SMALL LETTER SCHWA WITH HOOK
      "\u025D": "\u025C\u02DE", // LATIN SMALL LETTER REVERSED OPEN E WITH HOOK
      "\u035C": "\u0361", // COMBINING DOUBLE BREVE BELOW > COMBINING DOUBLE INVERTED BREVE
      "\u030D": "\u0329", // COMBINING VERTICAL LINE ABOVE > COMBINING VERTICAL LINE BELOW
      "\u0311": "\u032F", // COMBINING INVERTED BREVE > COMBINING INVERTED BREVE BELOW
      "\u030A": "\u0325", // COMBINING RING ABOVE > COMBINING RING BELOW
      "\u003A": "\u02D0", // COLON > MODIFIER LETTER TRIANGULAR COLON
      "\u02D7": "\u0320", // MODIFIER LETTER MINUS SIGN > COMBINING MINUS SIGN BELOW
      "\u02D6": "\u031F", // MODIFIER LETTER PLUS SIGN > COMBINING PLUS SIGN BELOW
      "\u02D4": "\u031D", // MODIFIER LETTER UP TACK > COMBINING UP TACK BELOW
      "\u02D5": "\u031E", // MODIFIER LETTER DOWN TACK > COMBINING DOWN TACK BELOW
    };

    this.diacritics = [
      // Syllabicity diacritics
      '\u0329', // COMBINING VERTICAL LINE BELOW : Syllabic consonnant
      '\u032F', // COMBINING INVERTED BREVE BELOW : Non-syllabic vowel
      // Consonant-release diacritics
      '\u02B0', // MODIFIER LETTER SMALL H : Aspirated consonant
      '\u207F', // SUPERSCRIPT LATIN SMALL LETTER N : Nasal release consonant
      '\u1DBF', // MODIFIER LETTER SMALL THETA : Voiceless dental fricative release consonant
      '\u1D4A', // MODIFIER LETTER SMALL SCHWA : Mid central vowel release consonant
      '\u031A', // COMBINING LEFT ANGLE ABOVE : Unreleased stop consonant
      '\u02E1', // MODIFIER LETTER SMALL L : Lateral release consonant
      '\u02E3', // MODIFIER LETTER SMALL X : Voiceless velar fricative release consonant
      // Phonation diacritics
      '\u0325', // COMBINING RING BELOW : Voiceless
      '\u032C', // COMBINING CARON BELOW : Voiced
      '\u0324', // COMBINING DIAERESIS BELOW : Murmured
      '\u0330', // COMBINING TILDE BELOW : Creaky voice
      '\u032A', // COMBINING BRIDGE BELOW : Dental consonant
      // Articulation diacritics
      '\u033A', // COMBINING INVERTED BRIDGE BELOW : Apical consonant
      '\u033C', // COMBINING SEAGULL BELOW : Linguolabial consonant
      '\u033B', // COMBINING SQUARE BELOW : Laminal consonant
      '\u031F', // COMBINING PLUS SIGN BELOW : Advanced
      '\u0320', // COMBINING MINUS SIGN BELOW : Retracted
      '\u0308', // COMBINING DIAERESIS : Centralized vowel / semi-vowel
      '\u033D', // COMBINING X ABOVE : Mid-centralized vowel
      '\u031D', // COMBINING UP TACK BELOW : Raised
      '\u031E', // COMBINING DOWN TACK BELOW : Lowered
      // Co-articulation diacritics
      '\u0339', // COMBINING RIGHT HALF RING BELOW : More rounded
      '\u031C', // COMBINING LEFT HALF RING BELOW : Less rounded
      '\u02B7', // MODIFIER LETTER SMALL W : Labialized
      '\u02B2', // MODIFIER LETTER SMALL J : Palatalized
      '\u1DA3', // MODIFIER LETTER SMALL TURNED H : Labio-palatalized
      '\u1DB9', // MODIFIER LETTER SMALL V WITH HOOK : Labialized without protrusion of the lips or velarization
      '\u02E0', // MODIFIER LETTER SMALL GAMMA : Velarized
      '\u02E4', // MODIFIER LETTER SMALL REVERSED GLOTTAL STOP : Pharyngealized
      '\u0334', // COMBINING TILDE OVERLAY : /!\ Not recommended /!\ Velarized, uvularized or pharyngealized
      '\u0318', // COMBINING LEFT TACK BELOW : Advanced tongue root
      '\u0319', // COMBINING RIGHT TACK BELOW : Retracted tongue root
      '\u02DE', // MODIFIER LETTER RHOTIC HOOK : Rhotacized
      '\u0303',  // COMBINING TILDE : Nasalized
      // Length, stress, and rhythm
      '\u02C8', // MODIFIER LETTER VERTICAL LINE : Primary stress
      '\u02CC', // MODIFIER LETTER LOW VERTICAL LINE : Secondary stress
      '\u02D0', // MODIFIER LETTER TRIANGULAR COLON : Long
      '\u02D1', // MODIFIER LETTER HALF TRIANGULAR COLON : Half-long
      '\u0306', // COMBINING BREVE : Extra-short
      '\u002E', // FULL STOP : Syllable break
      '\u203F', // UNDERTIE : Linking
      // Intonation
      '\u007C', // VERTICAL LINE : Minor (foot) break
      '\u2016', // DOUBLE VERTICAL LINE : Major (intonation) break
      // Tone
      // -- TODO --

      // == EXTENSION ==
      '\u034D', // COMBINING LEFT RIGHT ARROW BELOW : labial spreading
    ];
  }
}