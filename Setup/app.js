new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        superSlap: 3,
        omppu: 2,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.superSlap = 3;
            this.omppu = 2;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDmg(6, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Läimäsit mörköä ja teit ' + damage + ' damagea.'
            });

            if (this.checkWin()) {
                return;
            };

            this.monsterAttacks();
        },
        specialAttack: function() {
            if (this.superSlap > 0) {
                this.superSlap -= 1;
                var damage = this.calculateDmg(13, 20);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'SLÄP!! Läpsäisit mörköä kriittisesti ja teit ' + damage + ' damagea.'
                });
                if (this.checkWin()) {
                    return;
                };

                this.monsterAttacks();
            } else {
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Supervoimasi on loppu, etkä enää jaksa tehä superläpsyjä :('
                });
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Mörkö rankaisee sinua SuperSläppien tuhlailusta'
                });
                this.monsterAttacks();
            }
        },
        heal: function() {
            if (this.omppu > 0) {
                this.omppu -= 1;
                if (this.playerHealth <= 85) {
                    this.playerHealth +=15;
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Söit ompun ja sait +15hp.'
                    });
                } else {
                    this.playerHealth = 100;
                    this.turns.unshift({
                        isPlayer: true,
                        text: 'Söit ompun ja Healthisi tuli täyteen.'
                    });
                }
                if (this.monsterHealth <= 99) {
                    this.monsterHealth +=1;
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Mörkö katseli sinua syömässä omppua ja sai +1hp.'
                    });
                } else {
                    this.monsterHealth = 100;
                    this.turns.unshift({
                        isPlayer: false,
                        text: 'Mörkö katseli sinua syömässä omppua ja sai Healthinsa täyteen.'
                    });
                }
                this.monsterAttacks();
            } else {
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Söit jo kaikki omput :('
                });
                this.turns.unshift({
                    isPlayer: false,
                    text: 'Mörkö rankaisee sinua omppujen tuhlailusta'
                });
                this.monsterAttacks();
            }
        },
        giveUp: function(){
            if(confirm('Oletko mies vai hiiri?')) {
                this.gameRunning = false;
            }
        },
        monsterAttacks: function() {
            var damage = this.calculateDmg(0, 20);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Mörkö mukiloi sinua ja teki ' + damage + ' damagea.'
            });
            this.checkWin();
        },
        calculateDmg: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('Mörkö häs been defeated! Congrätylatsions. Uus peli?')) {
                    this.startGame();
                } else {
                    this.gameRunning = false;
                    this.resetGame();
                }
                return true;
            } else if (this.playerHealth <= 0){
                if (confirm('Mörkö voitti ja vei sun rahat. Otetaanko uusiks?')) {
                    this.startGame();
                } else {
                    this.gameRunning = false;
                    this.resetGame();
                }
                return false;
            }
        }
    }
});