import React, {Component} from 'react';
import BlankPage from 'components/BlankPage';
import BlogList from 'containers/BlogList';
import Chat from 'views/Chat';
import Gallery from 'views/Gallery';
import Game from 'views/Game';
import Media from 'views/Media';
import styles from './styles.less';

class AppContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className="AppContainerdView">
				{this.props.children}
			</div>
		)
	}
}


export default AppContainer;