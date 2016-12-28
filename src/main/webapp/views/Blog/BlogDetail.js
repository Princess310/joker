import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import IDCard from 'components/IDCard';
import AudioBar from 'components/AudioBar';
import Message from 'containers/Message';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { WindowResizeListener } from 'react-window-resize-listener';
import date from 'utils/date';
import { fetchBlogInfo } from 'actions';

class BlogDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blogWidth: 800,
			actionWidth: 280,
			totalWidth: 1080,
			showFloatBtn: false,
			showAction: false
		}
	}

	componentDidMount() {
		const { dispatch, id, location } = this.props;
		const query = location.query;
		query.id && dispatch(fetchBlogInfo(query.id));
	}

	handleControlView = (event, value) => {
		if(value && !isNaN(value)){
			let newBlogWidth = value * this.state.totalWidth;
			let newActionWidth = this.state.totalWidth - newBlogWidth;

			this.setState({
				blogWidth: newBlogWidth,
				actionWidth: newActionWidth
			});
		}
	}

	handleToggleAction = () => {
		this.setState({
			showAction: !this.state.showAction
		});
	}

	render() {
		const { blog, tag, location } = this.props;
		const id = location.query.id;

		return (
			<div className={this.state.showAction ? "blog-container show-action" : "blog-container"}>
				<Paper className="blog-panel" style={{ width: this.state.blogWidth }}>
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
									<article className="article" dangerouslySetInnerHTML={{__html: blog.content}}></article>
								</section>
							</Paper>
						</div>
					) }
				</Paper>
				<div className="action-panel" style={{ width: this.state.actionWidth }}>
					<IDCard />
					{ (blog && blog.audioFileId > 0) && <AudioBar url={ 'attachment?id=' + blog.audioFileId } autoPlay={true} /> }
					<Message id={id} />
					<Slider defaultValue={this.state.blogWidth / this.state.totalWidth} max={0.8} min={0.4} onChange={this.handleControlView}/>
				</div>

				{ this.state.showFloatBtn &&
						<FloatingActionButton className="blog-fl-btn" onTouchTap={this.handleToggleAction}>
							<ContentAdd />
						</FloatingActionButton>
					}
					<WindowResizeListener onResize={windowSize => {
						if(windowSize.windowWidth <= 1080){
							this.setState({
								showFloatBtn: true
							});
						}else {
							this.setState({
								showFloatBtn: false
							});
						}
					}}/>
			</div>
		)
	}
}


export default BlogDetail;