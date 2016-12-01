import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import styles from './styles.less';

class SiteRecord extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Paper className="site-record-bar">
				<div className="content">
					Copyright © 2016 Princess310. All Rights Reserved.蜀ICP备16032532号
				</div>
			</Paper>
		)
	}
}


export default SiteRecord;