import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'Views/AppBar';
import SiteRecord from 'Views/SiteRecord';
import Grid from 'components/Grid';
import css from './app.less';

injectTapEventPlugin();
class App extends React.Component {
	getChildContext(){
		return {user: user};
	}

	render() {
		const { page } = this.props.params;

		return (
			<MuiThemeProvider>
				<div>
					<AppBar/>
					{this.props.children}
					<SiteRecord />
					<Grid />
				</div>
			</MuiThemeProvider>
		)
	}
}

App.childContextTypes = {
	user: React.PropTypes.object
};

export default App;