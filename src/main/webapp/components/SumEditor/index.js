import React, {Component} from 'react';

class SumEditor extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { onChange } = this.props;

		$('#summernote').summernote({
			height: 400,
			placeholder: '请输入内容',
			callbacks: {
				onKeydown: function(e) {
					onChange($('#summernote').summernote('code'));
				}
			}
		});
	}

	render() {
		const { value } = this.props;

		return (
			<div>
				<div id="summernote" dangerouslySetInnerHTML={{__html: value}}></div>
			</div>
		)
	}
}


export default SumEditor;