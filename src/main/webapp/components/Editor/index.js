import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

class Editor extends Component {
	constructor(props) {
		super(props);
		let { value } = this.props;

		if(value.trim() === ""){
			value = RichTextEditor.createEmptyValue();
		}else {
			value = RichTextEditor.createValueFromString(value, 'html')
		}

		this.state = {
			value: value
		}
	}

	static propTypes = {
		onChange: PropTypes.func
	};

	onChange = (value) => {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(
				value.toString('html')
			);
		}
	};

	render () {
		return (
			<RichTextEditor
				value={this.state.value}
				onChange={this.onChange}
			/>
		);
	}
}

export default Editor;