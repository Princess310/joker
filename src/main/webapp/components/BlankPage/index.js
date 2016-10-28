import React, {Component} from 'react';
import styles from './styles.less';

class BlankPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="BlankPageView">
				<span>未找到相关应用</span>
			</div>
		)
	}
}


export default BlankPage;