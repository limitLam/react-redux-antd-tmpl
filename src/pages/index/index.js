/**
 * 首页
 */

import React from 'react';

import {
    Input,
    Checkbox,
    Button,
    Icon,
    Row,
    Col,
    Message,
    Modal,
} from 'antd';

import classnames from 'classnames';

import './style.less';

export default class Index extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.itemOnChange = this.itemOnChange.bind(this);
        this.todoOnEnter = this.todoOnEnter.bind(this);
        this.todoDelete = this.todoDelete.bind(this);
        this.deleteComfirm = this.deleteComfirm.bind(this);
        this.deleteFinish = this.deleteFinish.bind(this);
        this.allCheckedOnChange = this.allCheckedOnChange.bind(this);

        this.state = {
            list: [{
                id: new Date().getTime(),
                content: 'TODO1',
                checked: false,
            }, ],
        }

    }

    //  checkBox改变时改变对应item的checked
    itemOnChange(e, id) {
        let list = this.state.list;

        const checked = e.target.checked;

        let index = this._getItemIndex(id);

        if (typeof index == 'number') {
            list[index] = Object.assign({}, list[index], {
                checked: checked,
            });

            this.setState({
                list
            });
        }

    }

    //  根据id获取item在list中的index
    _getItemIndex(id) {
        let list = this.state.list;
        let index;
        list.map((item, i) => {
            if (item.id == id) {
                index = i;
                return false;
            }
        });

        return index;
    }

    //  input输入后,Enter时
    todoOnEnter(e) {
        let value = e.target.value;
        if (!value) {
            //  空值退出报错提示
            Message.error(`TodoContent must not be null.`);
            return false;
        }
        let list = this.state.list;

        let existing = !!list.find((item) => {
            return item.content == value;
        });

        if (existing) {
            //  已有相同TODO退出报错提示
            Message.error(`This todo has existed.`);
            return false;
        }

        let item = {
            id: new Date().getTime(),
            content: value,
            checked: false,
        }

        list.push(item);

        this.setState({
            list
        });

        //  重置value为空值
        e.target.value = '';

    }

    //  todoDelete
    todoDelete(id) {
        let list = this.state.list;
        let index = this._getItemIndex(id);

        list.splice(index, 1);

        this.setState({
            list
        });
    }

    //  deleteComfirm
    deleteComfirm(id) {
        let list = this.state.list;
        let index = this._getItemIndex(id);

        const item = list[index];

        const content = item.checked ? `Delete '${item.content}' ?` : `'${item.content}' is not finished, do you want to delete it?`;

        let me = this;
        Modal.confirm({
            title: 'Confirm',
            content: content,
            okText: 'OK',
            cancelText: 'Cancel',
            onOk() {
                me.todoDelete(id);
            }
        });
    }

    getCheckedNum() {
        let num = 0;
        this.state.list.map((item, index) => {
            item.checked && num++;
        });
        return num;
    }

    deleteFinish() {
        let me = this;
        if (me.getCheckedNum() < 1) {
            Message.error(`No finished to be deleted.`)
            return false;
        }
        Modal.confirm({
            title: 'Confirm',
            content: `Delete finished ?`,
            okText: 'OK',
            cancelText: 'Cancel',
            onOk() {
                let list = me.state.list;
                list = list.filter((item, index) => {
                    return !item.checked;
                });

                me.setState({
                    list
                });
            }
        });

    }

    //  全选
    allCheckedOnChange(e) {
        let allChecked = e.target.checked;
        let list = this.state.list;
        list.map((item, index) => {
            item.checked = allChecked;
        });
        this.setState({
            list
        });
    }


    render() {

        let contentClassName = (checked) => {
            return classnames({
                'line-through': checked,
            });
        }

        const checkedNum = this.getCheckedNum();

        return (
            <div styleName="todoBox">
                <div styleName="title">
                    <h1>React Todos</h1>
                </div>
                <div styleName="body">
                    <div styleName="header" className="todoHeader">
                        <Input prefix={<Icon type="user" />} size="large" placeholder="TODOS" onPressEnter={ this.todoOnEnter }/>
                    </div>
                    <div styleName="content">
                        {
                            this.state.list.length > 0 ?
                            <ul styleName="todoList">
                                {
                                    this.state.list.map( (item,index) => {
                                        return (
                                            <li styleName="todoItem" key={index}>
                                                <Row gutter={16}>
                                                    <Col span={19} styleName="checkBoxCol">
                                                        <Checkbox checked={ item.checked } onChange={ (e) => this.itemOnChange(e,item.id) }>
                                                            <span className={ contentClassName(item.checked) }>{ item.content }</span>
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={5} styleName="textAlignCenter">
                                                        <Button type="danger" onClick={ () => this.deleteComfirm(item.id) }>delete</Button>
                                                    </Col>
                                                </Row>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div styleName="emptyData">
                                no Data
                            </div>
                        }
                    </div>
                    <div styleName="footer">
                        {
                            this.state.list.length > 0 ?
                            <Row>
                                <Col span={16}>
                                    <Checkbox checked={ checkedNum == this.state.list.length } onClick={ this.allCheckedOnChange }>
                                        {`${checkedNum} finished : ${this.state.list.length} total`}
                                    </Checkbox>
                                </Col>
                                <Col span={8} styleName="textAlignCenter">
                                    <Button onClick={ this.deleteFinish }>delete finished</Button>
                                </Col>
                            </Row>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}