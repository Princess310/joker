import React, {Component} from 'react';
import styles from './styles.less';

class Clock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			FONT_HEIGHT: 12,
			MARGIN: 2,
			NUMBERAL_SPACING: 2,
			HAND_TRUNCATION: 64/25,
			HOUR_HAND_TRUNCATION: 64/10,
			RADIUS: 24,
			HNAD_RADIUS: 18,
			context: null
		};
	}

	componentDidMount() {
		this.state.context = this.canvas.getContext("2d");
		this.state.context.fillStyle = "#fff";
		this.state.context.strokeStyle = "#fff";
		this.state.context.font = this.state.FONT_HEIGHT + "px Arial";

		this.drawClock();
	}

	componentWillUpdate() {
		clearInterval(this.timer);
		
		this.drawClock();
	}

	drawCircle() {
		this.state.context.beginPath();

		this.state.context.arc(this.canvas.width/2, this.canvas.height/2,
					this.state.RADIUS, 0, Math.PI*2, true);
		this.state.context.stroke();
	}

	drawCenter() {
		this.state.context.beginPath();
		this.state.context.arc(this.canvas.width/2, this.canvas.height/2, 2, 0, Math.PI*2, true);
		this.state.context.fill();
	}

	drawNumberals() {
		let numerals = [1, 2 , 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			  angle = 0,
			  numberalWidth = 0;

		const self = this;

		numerals.forEach(function(numberal){
			if(numberal % 3 === 0){
				angle = Math.PI/6 * (numberal - 3);
				numberalWidth = self.state.context.measureText(numberal).width;
				self.state.context.fillText(numberal,
					self.canvas.width/2 + Math.cos(angle) * (self.state.HNAD_RADIUS) - numberalWidth/2,
					self.canvas.height/2 + Math.sin(angle) * (self.state.HNAD_RADIUS + self.state.FONT_HEIGHT/3) + 4);
			}
		});
	}

	drawHand(loc, isHour) {
		let angle = (Math.PI*2) * (loc/60) - Math.PI/2,
			handleRadius = isHour ? this.state.RADIUS - this.state.HAND_TRUNCATION - this.state.HOUR_HAND_TRUNCATION
								: this.state.RADIUS - this.state.HAND_TRUNCATION;

		this.state.context.moveTo(this.canvas.width/2, this.canvas.height/2);
		this.state.context.lineTo(this.canvas.width/2 + Math.cos(angle)*handleRadius, 
						this.canvas.height/2 + Math.sin(angle)*handleRadius);
		this.state.context.stroke();
	}

	drawHands() {
		let date = new Date,
			hour = date.getHours();

		hour = hour > 12 ? hour - 12 : hour;

		this.drawHand(hour*5 + (date.getMinutes()/60)*5, true, 0.5);
		this.drawHand(date.getMinutes(), false, 0.5);
		this.drawHand(date.getSeconds(), false, 0.2);
	}

	drawClock() {
		const self = this;

		this.timer = setInterval(() => {
			self.state.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			//self.drawCircle();
			self.drawCenter();
			self.drawHands();
			self.drawNumberals();
		}, 100);
	}

	render() {
		return (
			<canvas className="joker-clock" width="64" height="64" ref={r => this.canvas = r}/>
		)
	}
}


export default Clock;