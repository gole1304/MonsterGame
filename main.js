const random = function(min,max){
    const res = Math.floor(Math.random()*(max-min)+min);
    return res;
}
const app = Vue.createApp({
    data(){
        return{
            monsterHealt : 100,
            playerHealt : 100,
            winner : '',
            healts : false,
            logMsg : []
        }
    },
    methods:{
        playerAttack(){
            const damage = random(7,13);
            this.monsterHealt -= damage;
            this.monsterAttack();
            this.logMessage('Player','Attack', damage);
        },
        monsterAttack(){
            const damagePlayer = random(7,14);
            this.playerHealt -= damagePlayer;
            this.logMessage('Monster','Attack', damagePlayer);
        },
        specialAttack(){
            const specialDamage = random(10,20);
            this.monsterHealt -= specialDamage;
            this.logMessage('Player','Special Attack', specialDamage);
            this.monsterAttack();
        },
        Healting(){
            const healt = random(14,22);
            this.playerHealt += healt;
            this.logMessage('Player','Healting', healt);
            this.monsterAttack();
            this.healts = true;
        },
        Surrender(){
            this.playerHealt = 0;
            this.logMessage('Player','Surrender', 0);
        },
        startGame(){
            this.playerHealt = 100;
            this.monsterHealt = 100;
            this.winner = '';
            this.healts = false;
            this.logMsg = [];
            this.logMessage('Player-Monster','Start New Game', 100);
        },
        logMessage(who,what,value){
            const logObject = {
                'who' : who,
                'what' : what,
                'value' : value,
                'when' : new Date().toLocaleString()
            }
            this.logMsg.unshift(logObject);
        }
    },
    computed:{
        pHealt(){
            return { width : this.playerHealt + '%' };
        },
        mHealt(){
            return {width : this.monsterHealt + '%'};
        }
    },
    watch:{
        playerHealt(value){
            if(value<=0 && this.monsterHealt <= 0){
                this.playerHealt = 0;
                this.monsterHealt = 0;
                this.winner = 'draw';

            }
            else if(value<=0){
                this.playerHealt = 0;
                this.winner = 'monster'
            }
        },
        monsterHealt(value){
            if(value<=0 && this.playerHealt <= 0){
                this.playerHealt = 0;
                this.monsterHealt = 0;
                this.winner = 'draw';
            }
            else if(value <= 0){
                this.monsterHealt = 0;
                this.winner = 'player';
            }
        }
    }
})

app.mount('#app')