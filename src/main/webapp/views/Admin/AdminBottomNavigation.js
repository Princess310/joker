import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import { history } from 'routes';

const userIcon = <FontIcon className="mdi mdi-user"></FontIcon>;
const blogIcon = <FontIcon className="mdi mdi-blogger"></FontIcon>;
const tagIcon = <FontIcon className="mdi mdi-tag"></FontIcon>;

const indexMap = {
	'/admin/user': 0,
	'/admin/blog': 1,
	'/admin/tag': 2
}

class AdminBottomNavigation extends Component {
	constructor(props) {
		super(props);
		const { path } = this.props;
		this.state = {
			selectedIndex: indexMap[path]
		}
	}

	select = (index) => this.setState({selectedIndex: index});

	render() {
		return (
			<Paper className="AdminBottomNavigation" zDepth={1}>
				<BottomNavigation selectedIndex={this.state.selectedIndex}>
					<BottomNavigationItem
						label="Users"
						icon={userIcon}
						onTouchTap={() => this.select(0)}
						onClick={(e) =>  history.push("/user") }
					/>
					<BottomNavigationItem
						label="Blogs"
						icon={blogIcon}
						onTouchTap={() => this.select(1)}
						onClick={(e) =>  history.push("/blog") }
					/>
					<BottomNavigationItem
						label="Tags"
						icon={tagIcon}
						onTouchTap={() => this.select(2)}
						onClick={(e) =>  history.push("/tag") }
					/>
				</BottomNavigation>
			</Paper>
		);
}
}

export default AdminBottomNavigation;