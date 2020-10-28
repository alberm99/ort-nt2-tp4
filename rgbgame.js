Vue.component('header-color', {
    data() {
        return {
            
        }
    },
    props: ['color','colorDisplay'],
    methods: {
        
    },
	template: `
		<div id="header" :style="{backgroundColor: color}">
		<h1>The Great <br>
			<span id="colorDisplay">{{colorDisplay}}</span>
			<br>
			Guessing Game</h1>
		</div>
	`

})

Vue.component('navigator', {
    data() {
        return {
            
        }
    },
    props: ['reset','easy','hard','msgButton','messageDisplay','isHard'],
    methods: {
        
    },
	template: 	`
		<div id="navigator">
		<button id="reset" @click="reset()"> {{msgButton}}</button>
		<span id="message"> {{messageDisplay}} </span>

		<button id="easy" @click="easy()" :class="{'selected': !isHard}">easy</button>
		<button id="hard" @click="hard()" :class="{'selected': isHard}">hard</button>
		</div>
	`

})

Vue.component('container', {
    data() {
        return {
            
        }
    },
    props: ['mensajes','setAllColorsTo','pickedColor','squares'],
    methods: {
        
    },
	template: `
		<div id="container">
			<square 
				class="square" 
				:mensajes="mensajes"
				:square="square"
				:set-all-colors-to="setAllColorsTo"
				:picked-color="pickedColor"
				v-for="(square,index) in squares"
				:key="index"
			></square>
		</div>
	`

})

Vue.component('square', {
    data() {
        return {
            
        }
    },
    props: ['square', 'mensajes' , 'pickedColor' , 'setAllColorsTo'],
    methods: {
        click(){
			if (this.square.backgroundColor === this.pickedColor) {
				this.mensajes.messageDisplay = "You Picked Right!";
				this.setAllColorsTo(this.pickedColor);
				this.mensajes.restartButton= "Play Again!";
				this.mensajes.headerColor = this.pickedColor;
			}
			else {
				this.square.backgroundColor = "#232323";
				this.mensajes.messageDisplay = "Try Again!";
			}
		}
	},
	template: `<div :style="square" @click="click()"></div>`

})


const vue = new Vue({
	el: '#app'
	,mounted(){
		this.init()
	}
	,data:{
		colorCount : 6
		,isHard: true
		,colors: []
		,squares : []
		,mensajes: {
			messageDisplay:''
			,restartButton:''
			,headerColor:''
		}
		,pickedColor : 'RBG'
		,colorDisplay:''
		
	},
	

	methods:{

		restart(){
			this.colors = this.createNewColors(this.colorCount);
			this.pickedColor = this.colors[this.PickColor()];
			this.colorDisplay = this.pickedColor;
			this.mensajes.headerColor = "steelblue";
			this.mensajes.messageDisplay = "";
			this.mensajes.restartButton = "New Colors!";
			for (var i = 0; i <this.squares.length; i++) {
				this.squares[i].backgroundColor = this.colors[i];
			}

		},


		restartButton(){
			this.restart()
		},
		
		init(){
			for (var i = 0; i < 6; i++) {
				this.squares.push({
					display: 'block',
					backgroundColor: ''
				})
			}
			this.restart()
		},
		
		easy(){
			if(this.isHard){
				this.isHard = false
				this.colorCount = 3
				for(var i =0; i < this.colorCount; i++){
					this.squares[(i+3)].display = 'none'
				}
				this.restart()
			}
		},
		

		hard(){
			if(!this.isHard){
				this.isHard = true
				this.colorCount = 6
				this.restart()
				for(var i =0; i < this.colorCount; i++){
					this.squares[i].display = 'block'
				}

			}
		}

		
		,setAllColorsTo(color) {
			this.squares.forEach((square) => {
				square.backgroundColor = color;
			})
		},
		
		PickColor(){
			var quantity;
			if (this.isHard) {
				quantity = 6;
			} else {
				quantity = 3;
			}
			return Math.floor(Math.random() * quantity );
		},
		createNewColors(numbers){
			var arr = [];
			for (var i = 0; i < numbers; i++) {
				arr.push(this.createRandomStringColor());
			}
			return arr;
		},
		
		createRandomStringColor(){
			var newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")" ;
		//	console.log(newColor);
		return newColor;
	},
		randomInt(){
			return Math.floor(Math.random() * 256);
		}
	}
	,computed: {
		
	}
})






