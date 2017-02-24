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

import store from 'store';

import './style.less';

import TodoItem from './components/todoItem';


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

        const initList = [{
            id: new Date().getTime(),
            content: 'TODO1',
            checked: false,
        }, ];

        let list = store.get('limit_todoList') ? store.get('limit_todoList') : initList;

        this.state = {
            list
        }

    }

    //  本地存储list
    storeList(list) {
        store.set('limit_todoList', list);
        return this;
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

            this.storeList(list).setState({
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

        this.storeList(list).setState({
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

        this.storeList(list).setState({
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

                me.storeList(list).setState({
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
        this.storeList(list).setState({
            list
        });
    }


    render() {
        let me = this;

        const checkedNum = me.getCheckedNum();

        return (
            <div styleName="todoBox">
                <div styleName="title">
                    <h1>React Todos</h1>
                </div>
                <div styleName="body">
                    <div styleName="header" className="todoHeader">
                        <Input prefix={<Icon type="user" />} size="large" placeholder="TODOS" onPressEnter={ me.todoOnEnter }/>
                    </div>
                    <div styleName="content">
                        {
                            me.state.list.length > 0 ?
                            <ul styleName="todoList">
                                {
                                    me.state.list.map( (item,index) => {
                                        const itemProp = {
                                            ...item,
                                            itemOnChange : me.itemOnChange,
                                            deleteComfirm : me.deleteComfirm,
                                            key: index,
                                        }

                                        return (
                                            <TodoItem {...itemProp} />
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div styleName="emptyData">
                                nothing todo
                            </div>
                        }
                    </div>
                    <div styleName="footer">
                        {
                            me.state.list.length > 0 ?
                            <Row>
                                <Col span={16}>
                                    <Checkbox checked={ checkedNum == me.state.list.length } onClick={ me.allCheckedOnChange }>
                                        {`${checkedNum} finished : ${me.state.list.length} total`}
                                    </Checkbox>
                                </Col>
                                <Col span={8} styleName="textAlignCenter">
                                    <Button onClick={ me.deleteFinish }>delete finished</Button>
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