import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import IDCard from 'components/IDCard';
import AudioBar from 'components/AudioBar';
import date from 'utils/date';
import { fetchBlogInfo } from 'actions';

class BlogDetail extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch, id, location } = this.props;
		const query = location.query;
		query.id && dispatch(fetchBlogInfo(query.id));
	}

	render() {
		const { blog, tag } = this.props;
		return (
			<div className="blog-container">
				<Paper className="blog-panel">
					{ blog && (
						<div className="blog-detail">
							<Paper className="header-wrapepr">
								<header className="title">
									{ blog.title }
								</header>
								<section className="subinfo">
									<div className="time">
										{date.formatDateObj(blog.utime)}
									</div>
									<div className="tag">
										<span className="mdi mdi-tag-heart" style={{ "color": tag.color }}></span>
										<span>{tag.name}</span>
									</div>
								</section>
							</Paper>
							<Paper className="content-wrapper">
								<img src={ 'attachment?id=' + blog.picFileId } className="blog-pic" />
								<article className="content" dangerouslySetInnerHTML={{__html: blog.content}}></article>
							</Paper>
						</div>
					) }
				</Paper>
				<div className="action-panel">
					<IDCard />
					{ (blog && blog.audioFileId) && <AudioBar url={ 'attachment?id=' + blog.audioFileId } autoPlay={true} /> }
				</div>
			</div>
		)
	}
}


export default BlogDetail;