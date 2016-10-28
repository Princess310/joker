import React, {Component} from 'react';
import BlankPage from 'components/BlankPage';
import Blog from 'views/Blog';
import Chat from 'views/Chat';
import Gallery from 'views/Gallery';
import Game from 'views/Game';
import Media from 'views/Media';
import styles from './styles.less';

class AppContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appMap: {
				blog: <Blog />,
				chat: <Chat />,
				gallery: <Gallery />,
				game: <Game />,
				media: <Media />
			}
		};
	}

	render() {
		const { page } = this.props.params;
		let App = <BlankPage />;

		if(page && this.state.appMap[page]){
			App = this.state.appMap[page];
		}

		return (
			<div className="AppContainerdView">
				{App}
			</div>
		)
	}
}


export default AppContainer;