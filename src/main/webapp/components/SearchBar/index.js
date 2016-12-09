import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './styles.less';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ""
		}
	}

	handleValueChange = (event) => {
		this.setState({
			value: event.target.value
		})
	}

	handleSearch = () => {
		const { onSearch } =  this.props;

		onSearch && onSearch(this.state.value);
	}

	render() {
		return (
			<Paper zDepth={1} className="search-bar">
				<TextField
					hintText="Search here~"
					fullWidth={true}
					value={this.state.value}
					onChange={this.handleValueChange}
					onKeyUp={(e) => { e.which === 13 && this.handleSearch(e)}}
				/>
				<RaisedButton className="search-btn" label="Search" primary={true} onTouchTap={this.handleSearch}/>
			</Paper>
		)
	}
}


export default SearchBar;