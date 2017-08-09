new Vue({
	el: '#game',
	data: {
		start: false,
		hasWinner: false,
		isPlayerTurn: true,
		announcement: '',
		logs: [],
		p1: {
			name: 'Player',
			logClass: 'plyr',
			maxHealth: 100,
			health: 100,
			attackMin: 10,
			attackMax: 20,
			healMin: 10,
			healMax: 20,
			spcAttackMin: 20,
			spcAttackMax: 25,
		},
		p2: {
			name: 'Monster',
			logClass: 'mnstr',
			maxHealth: 100,
			health: 100,
			attackMin: 12,
			attackMax: 25,
			healMin: 12,
			healMax: 25,
			spcAttackMin: 24,
			spcAttackMax: 30,
		}
	},
	methods: {
		reset: function(text){		
			if (typeof text !== 'undefined') {
				if (confirm(text) == false) {
					return;
				}
			}

			this.p1.health = this.p1.maxHealth
		    this.p2.health = this.p2.maxHealth
		    this.logs = []
		    this.hasWinner = false
		    this.isPlayerTurn = true
		    this.start = false
		},
		playerTurn: function(event) {				
			if (event == 'attack') {				
				this.attack(this.p1, this.p2)
			} else if (event == 'heal') {
				this.heal(this.p1)				
			} else {				
				this.specialAttack(this.p1, this.p2)
			}
			this.checkWinner();								
			this.isPlayerTurn = false;
			setTimeout(this.monsterTurn, 1000);			
		},		
		monsterTurn: function() {
			if (this.hasWinner == false) {
				var events = ['attack', 'attack', 'attack', 'heal', 'heal', 'special attack'];
				var event = events[Math.floor(Math.random()*events.length)];			
				
				if (event == 'special attack') {									
					this.specialAttack(this.p2, this.p1)
				} else if (event == 'heal' && (this.p2.health < this.p2.healMin)) {
					this.heal(this.p2)				
				} else {
					this.attack(this.p2, this.p1)
				}
				this.checkWinner();
				this.isPlayerTurn = true
			}								
		},
		attack: function(player, target) {
			AttackPoint = this.generateRandomNumber(player.attackMin,player.attackMax)

			var sound = document.getElementById("attack");
			sound.play();

			if ( (target.health - AttackPoint) < 0) {
				target.health = 0											
			} else {
				target.health -= AttackPoint	

				this.logs.push({
					class: player.logClass,
					message: player.name+' attack '+target.name+' for '+AttackPoint
				});
			}			
		},
		specialAttack: function(player, target) {
			specialAttackPoint = this.generateRandomNumber(player.spcAttackMin,player.spcAttackMax)

			var sound = document.getElementById("special");
			sound.play();

			if ( (target.health - specialAttackPoint) < 0) {
				target.health = 0				
			} else {
				target.health -= specialAttackPoint	

				this.logs.push({
					class: player.logClass,
					message: player.name+' special attack '+target.name+' for '+specialAttackPoint
				});
			}			
		},
		checkWinner: function() {
			
			if (this.p1.health == 0) {
				this.announcement = this.p2.name+' wins!'	
				var sound = document.getElementById("lost");          		
			}

			if (this.p2.health == 0) {
				this.announcement = this.p1.name+' wins!'
				var sound = document.getElementById("win");          		
			}

			if (this.p1.health == 0 || this.p2.health == 0) {
				this.hasWinner = true	
				sound.play();
			}		

			return;				
		},
		heal: function(player) {
			if (player.health != 0) {
				healPoint = this.generateRandomNumber(player.healMin, player.healMax)
				var sound = document.getElementById("heal");
				
				if ( (player.health + healPoint) > player.maxHealth) {
					player.health == player.maxHealth
				} else {
					player.health += healPoint	
				}

				sound.play();

				this.logs.push({
					class: player.logClass,
					message: player.name+' heal for '+healPoint
				});
			}							
		},		
		generateRandomNumber: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}			
	}	
})