import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import css from './app.less';
function App(props) {
	return (
		<MuiThemeProvider>
			<RaisedButton label="Joker Play!" />
		</MuiThemeProvider>
	)
}

export default App;