import React from 'react';

import {
	Checkbox,
	Button,
	Row,
	Col,
} from 'antd';

import classnames from 'classnames';

import './style.less';

export default class TodoItem extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

		this.state = {
			hover: false
		}
	}

	onMouseEnter(e) {
		this.setState({
			hover: true
		});
	}

	onMouseLeave(e) {
		this.setState({
			hover: false
		});
	}

	render() {
		let contentClassName = classnames({
			'line-through': this.props.checked,
		});

		let delBtnClassName = classnames({
			'display-none': !this.state.hover,
		});

		return (
			<li styleName="todoItem" onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }>
                <Row gutter={16}>
                    <Col span={19} styleName="checkBoxCol">
                        <Checkbox checked={ this.props.checked } onChange={ (e) => this.props.itemOnChange(e,this.props.id) }>
                            <span className={ contentClassName }>{ this.props.content }</span>
                        </Checkbox>
                    </Col>
                    <Col span={5} styleName="textAlignCenter">
                        <Button type="danger" className={ delBtnClassName } onClick={ () => this.props.deleteComfirm(this.props.id) }>delete</Button>
                    </Col>
                </Row>
            </li>
		);
	}
}