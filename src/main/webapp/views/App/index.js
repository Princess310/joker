import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'Views/AppBar';
import Grid from 'components/Grid';
import css from './app.less';

injectTapEventPlugin();
function App(props) {
	return (
		<MuiThemeProvider>
			<div>
				<AppBar/>
				<div className="cord-fabric">Joker Play</div>
				<Grid />
			</div>
		</MuiThemeProvider>
	)
}

export default App;