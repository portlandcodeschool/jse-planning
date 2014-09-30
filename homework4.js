function makeCard(id){

	
	var newCard = {id:id};
	newCard.rank = makeCard.rank;

	
	newCard.suit = makeCard.suit;
	//newCard.cardColor = makeCard.cardColor;
	//newCard.cardName =  makeCard.cardName;
	
return newCard;
	};

	makeCard.rank = function() {
		
           return Math.floor(this.id/4)+1;

	}


	

	makeCard.suit = function(){


			return Math.floor ( this.id % 4 ) + 1;

	}


	makeCard.cardColor = function(){

		var suit = makeCard.suit(id);
        return suit && ((suit<3)? "red": "black");
    }
		
    	rankNames: ['','Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                'Jack','Queen','King'];
    	suitNames: ['','Hearts','Diamonds','Spades','Clubs'];

	makeCard.cardName = function(){

		 name: function(id) { //--> string, NaN
        var rank = makeCard.rank();
        var suit = makeCard.suit();
        return rank && suit && (makeCard.rankNames[rank]+' of '+makeCard.suitNames[suit]);
    }
	


};

