import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import styles from './styles.less';

class IDCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Paper className="id-card">
				<List>
					<ListItem
						primaryText="Prince"
						secondaryText="Stay hungry,stay foolish."
						leftAvatar={<Avatar src="images/blog-avatar.jpg" />}
					/>
				</List>
			</Paper>
		)
	}
}


export default IDCard;