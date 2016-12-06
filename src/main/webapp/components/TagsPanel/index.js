import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import styles from './styles.less';

class TagsPanel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { tags } = this.props;

		let tagsList = tags.map((tag) => {
			return (
				<ListItem 
					primaryText={tag.name}
					key={tag.id}
					leftIcon={<span className="mdi mdi-tag-heart" style={{ "color": tag.color }}></span>}
				/>
			)
		});

		return (
			<Paper className="tags-panel">
				<Subheader>Tags list</Subheader>
				<List>
					{tagsList}
				</List>
			</Paper>
		)
	}
}


export default TagsPanel;