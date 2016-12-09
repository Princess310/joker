import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import makeSelectable from 'material-ui/List/makeSelectable';
import styles from './styles.less';

let SelectableList = makeSelectable(List);

class TagsPanel extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setState({
			selectedIndex: this.props.defaultValue,
		});
	}

	handleRequestChange = (event, index) => {
		const { onSelectItem } = this.props;
		this.setState({
			selectedIndex: index,
		});

		onSelectItem(index);
	}

	handleClearTag = (e) => {
		const { onSelectItem } = this.props;
		this.setState({
			selectedIndex: -1
		});

		onSelectItem(0);
	}

	render() {
		const { tags, onSelectItem } = this.props;

		let tagsList = tags.map((tag) => {
			return (
				<ListItem 
					primaryText={tag.name}
					key={tag.id}
					value={tag.id}
					leftIcon={<span className="mdi mdi-tag-heart" style={{ "color": tag.color }}></span>}
					onKeyboardFocus={this.handleFocus}
				/>
			)
		});

		return (
			<Paper className="tags-panel">
				<Subheader>Tags list</Subheader>
				<span className="clear-tag" onTouchTap={this.handleClearTag}>clear</span>
				<SelectableList value={this.state.selectedIndex}
					onChange={this.handleRequestChange}>
					{tagsList}
				</SelectableList>
			</Paper>
		)
	}
}


export default TagsPanel;