import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import fetch from 'utils/fetch';
import styles from './styles.less';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appList: []
		};
	}

	componentDidMount() {
		const self = this;

		fetch.doGet("getAppList").then(function(data){
			self.setState({
				appList: data.result
			});
		});
	}

	render() {
		let appList = this.state.appList.map((app, index) => {
			return (
				<div className="item" key={index}>
					<Link to={app.path}>
						<Card>
							<CardHeader
								title={app.name}
							/>
							<CardMedia
								overlay={<CardTitle title={app.title} />}
							>
								<img src={app.photoUrl} />
							</CardMedia>
							<CardText>
								{app.describe}
								<div className="t-r">---{app.describeUser}</div>
							</CardText>
						</Card>
					</Link>
				</div>
			);
		});
		return (
			<div className="DashboardView">
				<ReactCSSTransitionGroup
					transitionName="waterfall"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					<div className="app-list">
						{appList}
					</div>
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}


export default Dashboard;