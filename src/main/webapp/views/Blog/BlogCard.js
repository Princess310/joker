import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class BlogCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		const { id, title, content } = this.props;

		return (
			<Card className="blog-card">
				<CardMedia>
					<img src="images/test.png" />
				</CardMedia>
				<CardTitle title={title} subtitle="brief" />
			</Card>
		)
	}
}


export default BlogCard;