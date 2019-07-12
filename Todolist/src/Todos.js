import React, { Component } from 'react'
import './Todos.css'

class Dialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    handleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    handleClick = () => {
        let obj = {
            id: this.props.num + 1,
            title: this.state.title,
            status: 0
        };

        this.setState({
            title: ''
        });

        this.props.addTask(obj);
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.title}
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.handleClick()} >保存任务</button>
            </div>
        );
    }

}

function TodoItem(props) {

    const checked = props.item.status;
    return (
        <li className="todo-item" >
            <input
                type="checkbox"
                checked={!!checked}
                onChange={() => props.finishChange(props.item)}
            />
            <span style={{ textDecoration: !!checked ? 'line-through' : '' }} >{props.item.title}</span>
            <button onClick={() => props.delTask(props.item)} >删除</button>
        </li>
    );
}

export default class Todos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                {
                    id: 1,
                    title: 'get up',
                    status: 0
                },
                {
                    id: 2,
                    title: 'washing',
                    status: 0
                }, {
                    id: 3,
                    title: 'have breakfast',
                    status: 0
                }
            ]
        }
    }

    addTask = item => {
        let list = this.state.list.slice();
        list.push(item);
        this.setState({
            list: list
        });
    }

    finishChange = item => {
        // if (item.status === 1) return;
        let list = this.state.list.slice();
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === item.id) {
                if (item.status === 0) {
                    list[i].status = 1;
                } else if (item.status === 1) {
                    list[i].status = 0;
                }
                break;
            }
        }
        this.setState({
            list: list
        });
    }

    delTask = item => {
        let list = this.state.list.slice();
        let index = list.findIndex(i => i.id === item.id);
        list.splice(index, 1);
        this.setState({
            list: list
        });
    }

    totalFinish = () => this.state.list.reduce((sum, item) => item.status ? sum + 1 : sum + 0, 0)

    render() {
        return (
            <div className="wrapper" >
                <h1>Todo List</h1>
                <ul>
                    {/* TodoItem  li */}
                    {this.state.list.map(item => (
                        <TodoItem
                            item={item}
                            finishChange={this.finishChange}
                            delTask={this.delTask}
                            key={item.id}
                        />
                    ))}
                    <li>{this.totalFinish()} 已完成 / {this.state.list.length} 总数</li>
                </ul>
                <Dialog
                    addTask={this.addTask}
                    num={this.state.list.length}
                />
            </div>
        );
    }
}