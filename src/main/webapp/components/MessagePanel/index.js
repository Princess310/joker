import React, {Component} from 'react';
import {emojify} from 'react-emojione';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { fetchMessage, createMessage } from 'actions';

import styles from './styles.less';

class MessagePanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: {
				convertShortnames: true,
				convertUnicode: true,
				convertAscii: true,
				styles: {
					backgroundImage: 'url(images/emojione.sprites.png)',
					width: '15px',
					height: '15px',
					margin: '2px'
				},
				// this click handler will be set on every emoji
				handleClick: event => {
					this.setState({
						value: (this.state.value + event.target.title)
					});
				}
			},
			value: ""
		};
	}

	componentDidMount() {
		const { id, dispatch } = this.props;
		dispatch(fetchMessage(id));
	}

	handleValueChange = (event) => {
		this.setState({
			value: event.target.value
		});
	}

	handleSubmit = () => {
		let value = this.state.value;
		const self = this;
		const { id, dispatch } = this.props;

		dispatch(createMessage(id, value)).then(() => {
			self.setState({
				value: ""
			});
		});
	}

	render() {
		const { message } = this.props;

		let messageList = message.map((m, index) => {
			let avatar = "images/joker.jpg";

			if(m.avatar){
				avatar = m.avatar;
			}

			return (
				<ListItem
					leftAvatar={<Avatar src={avatar} backgroundColor={"#f0f0f0"}/>}
					primaryText={m.username ? m.username : ("visitor")}
					secondaryText={
						<p>
							{emojify(m.content, this.state.options)}
						</p>
					}
				  secondaryTextLines={2}
				  key={ index }
				/>
			);
		});

		return (
			<Paper className="message-panel">
				<div className="message-list">
					<List>
						<Subheader>Message List</Subheader>
						{ messageList }
					</List>
				</div>
				<div className="message-actions">
					<TextField
						hintText="Leaving a message what you want to say.:)"
						multiLine={true}
						rows={2}
						rowsMax={4}
						fullWidth={true}
						value={this.state.value}
						onChange={this.handleValueChange}
					/>
					<div className="emoji-container">
						{ emojify(' 😍😎😏:smile_cat::family:\n'
							+ ":) :P ;P :d T____T ':( -_- -__-u\n"
							+ "xD X'D </3 <3 <\\3", this.state.options)}
					</div>
					<div className="action-wrapper">
						<RaisedButton label="Send" primary={true} onTouchTap={this.handleSubmit}/>
					</div>
				</div>
			</Paper>
		)
	}
}


export default MessagePanel;