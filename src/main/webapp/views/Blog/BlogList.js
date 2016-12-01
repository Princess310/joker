import React, {Component} from 'react';
import { fetchBlogs, fetchTags} from 'actions';

class BlogList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchBlogs())
		dispatch(fetchTags())
	}

	render() {
		return (
			<div>BlogList</div>
		)
	}
}


export default BlogList;