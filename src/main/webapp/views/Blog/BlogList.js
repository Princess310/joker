import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import IDCard from 'components/IDCard';
import ContactPanel from 'components/IDCard/ContactPanel.js';
import { fetchBlogs, fetchTags} from 'actions';
import styles from './styles.less';

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
			<div className="blog-list-container">
				<Paper className="blog-list">

				</Paper>
				<div className="action-panel">
					<IDCard />
					<ContactPanel />
				</div>
			</div>
		)
	}
}


export default BlogList;