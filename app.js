new Vue({
	el: '#game',
	data: {
		start: false,
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
		giveUp: function() {
			if (confirm('Give up already?') == true) {
				this.reset();
			}
		},
		reset: function(){			
			this.p1.health = this.p1.maxHealth
		    this.p2.health = this.p2.maxHealth
		    this.logs = []
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
			this.monsterTurn();			
		},		
		monsterTurn: function() {
			if (this.start == true) {
				var events = ['attack', 'attack', 'attack', 'heal', 'heal', 'special attack'];
				var event = events[Math.floor(Math.random()*events.length)];			
				if (event == 'attack') {				
					this.attack(this.p2, this.p1)
				} else if (event == 'heal') {
					this.heal(this.p2)				
				} else {
					this.specialAttack(this.p2, this.p1)
				}
			}								
		},
		attack: function(player, target) {
			AttackPoint = this.generateRandomNumber(player.attackMin,player.attackMax)

			if ( (target.health - AttackPoint) < 0) {
				alert(player.name+' wins!')
				this.reset()							
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

			if ( (target.health - specialAttackPoint) < 0) {
				alert(player.name+' wins!')
				this.reset()						
			} else {
				target.health -= specialAttackPoint	

				this.logs.push({
					class: player.logClass,
					message: player.name+' special attack '+target.name+' for '+specialAttackPoint
				});
			}			
		},
		heal: function(player) {
			healPoint = this.generateRandomNumber(player.healMin, player.healMax)
			if ( (player.health + healPoint) > player.maxHealth) {
				player.health == player.maxHealth
			} else {
				player.health += healPoint	
			}

			this.logs.push({
				class: player.logClass,
				message: player.name+' heal for '+healPoint
			});					
		},		
		generateRandomNumber: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}			
	}	
})