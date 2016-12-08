import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles.less';

class AudioBar extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { autoPlay } = this.props;

		if(autoPlay){
			this.audio.play();
		}
	}

	render() {
		const { url } = this.props;
		return (
			<Paper className="audio-bar">
				<audio src={url} controls="controls" ref={r => this.audio = r} />
			</Paper>
		)
	}
}


export default AudioBar;