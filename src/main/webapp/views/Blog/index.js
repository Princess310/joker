import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Blog extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div>Blog</div>
				<RaisedButton label="Add Blog" primary={true} style={{margin: 12}} onClick={(e) => this.props.onClickAddBlog(e)} />
			</div>
		)
	}
}


export default Blog;