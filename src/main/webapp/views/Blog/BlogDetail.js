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
										<span className="view-count">
											<i className="mdi mdi-fire"></i>
											{blog.viewCount}
										</span>
									</div>
								</section>
							</Paper>
							<Paper className="content-wrapper">
								<img src={ 'attachment?id=' + blog.picFileId } className="blog-pic" />
								<section className="content">
									<article className="breif">{blog.breif}</article>
									<article dangerouslySetInnerHTML={{__html: blog.content}}></article>
								</section>
							</Paper>
						</div>
					) }
				</Paper>
				<div className="action-panel">
					<IDCard />
					{ (blog && blog.audioFileId > 0) && <AudioBar url={ 'attachment?id=' + blog.audioFileId } autoPlay={true} /> }
				</div>
			</div>
		)
	}
}


export default BlogDetail;