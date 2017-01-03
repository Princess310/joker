import React, {Component} from 'react';
import { Link } from 'react-router';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class BlogCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { id, title, pic, breif, tagName, tagColor } = this.props;

		return (
			<Link to={{ pathname: "/app/blogDetail", query: { id: id } }}>
				<Card className="blog-card">
					{pic !== "" && (
						<CardMedia>
							<img src={pic} />
						</CardMedia>
					)}
					<CardTitle title={title} subtitle={breif} />
					<div className="tag" style={{"color": tagColor}}>
						<span className="mdi mdi-tag-heart" style={{"color": tagColor}}></span>{tagName}
					</div>
				</Card>
			</Link>
		)
	}
}


export default BlogCard;