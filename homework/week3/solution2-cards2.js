// Error-detecting version

var cardReader = {

    isValid: function(num,low,high) { // Returns--> NaN, true
        if ((typeof num)!="number") //wrong type
            return NaN;
        if (num%1 !== 0) //non-integer
            return NaN;
        if (num<low || num>high) //out of range
            return NaN;
        return true;
    },

    rank: function(card) { // --> 1..13, NaN
        return this.isValid(card,0,51) &&
            Math.floor(card/4)+1;
    },

    suit: function(card) { // --> 1..4, NaN
        return this.isValid(card,0,51) &&
            (card%4)+1;
    },

    cardID: function(rank,suit) { // --> 0..51, NaN
        return this.isValid(rank,1,13) &&
                this.isValid(suit,1,4) &&
                ((rank-1)*4 + (suit-1));
    },
    
    color: function(card) { // -->"red,"black",NaN
        var suit=this.suit(card);
        return suit && ((suit<3)? "red": "black");
    },

    rankNames: ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'],
    suitNames: ['','Hearts','Diamonds','Spades','Clubs'],

    name: function(card) { //--> string, NaN
        var rank = this.rank(card);
        var suit = this.suit(card);
        return rank && suit && (this.rankNames[rank]+' of '+this.suitNames[suit]);
    }
};

module.exports = cardReader;
