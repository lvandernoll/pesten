class Computer extends Player {

	/**
	 * @param {Controller} controller - The game's controller
	 * @param {String} name - The computer's username
	 * @param {Array} cards - An array containing the computer's cards
	 */
	constructor(controller, name, cards) {
		super(cards);
		console.log(this);

		this.CONTROLLER = controller;
		this.NAME = name;
	}

	/**
	 * Returns the computer's playername
	 * @returns {String} - The computer's playername
	 */
	getName() {
		return this.NAME;
	}
	
	/**
	 * Checks which cards can be played and picks one. If none can be played it draws one and continues to the next turn
	 */
	play() {
		// Plays 2 or Joker when 2 or Joker has been played to this player
		let playedDrawCard = false;
		if( this.CONTROLLER.continuousDrawCards().length > 0 ) {
			for( let i = 0; i < this.hand.length; i++ ) {
				if( this.hand[i].code === 2 || this.hand[i].code === 'J' ) {
					playedDrawCard = true;
					this.CONTROLLER.playCard(this.CONTROLLER.currentPlayerId(), i);
					break;
				}
			}
		}

		if( !playedDrawCard ) {
			let checkedHand = this.CONTROLLER.checkHand(this.hand);
			let validCardIds = [];
			checkedHand.forEach( (card, i) => {
				if( checkedHand[i] ) {
					validCardIds.push(i);
				}
			});

			let randomCardId = validCardIds[Math.floor(Math.random() * validCardIds.length)];
			if( typeof randomCardId == 'undefined' ) {
				this.CONTROLLER.drawCard(this.CONTROLLER.currentPlayerId(), 1);
				this.CONTROLLER.nextTurn();
			} else {
				this.CONTROLLER.playCard(this.CONTROLLER.currentPlayerId(), randomCardId);
			}
		}
	}
}
