import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import '../App.css';
import './Mainpage.css';

export class Mainpage extends Component {
    constructor(props){
    super(props);
    this.state = ({
        newTitle: '',
        edit: false,
        updateIndex: '',
        todos: [
            {
                id: uuid(),
                title: 'Sample',
                completed: false
            }
        ]})
    }

    deleteTodo = (index) => {
        const todos = [...this.state.todos];
        todos.splice(index,1);
        this.setState({todos});
    }

    markComplete = (index) => {
        const todos = [...this.state.todos];
        todos[index].completed = !todos[index].completed;
        this.setState({todos});
    }

    handleChange = (e) => {
        this.setState({
            newTitle: e.target.value,
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const todos = [...this.state.todos];
        todos.push({
            id: uuid(),
            title: this.state.newTitle,
            completed: false,
            edit: false
        })
        this.setState({
            todos,
            newTitle: ''
        })
    }

    editTodo = (index) => {
        const todos = [...this.state.todos];
        const todoToBeEdited = todos[index].title;
        this.setState({
            newTitle: todoToBeEdited,
            edit: true,
            updateIndex: index
        })
    }

    onSave = (e) => {
        e.preventDefault();
        const todos = [...this.state.todos]
        todos[this.state.updateIndex].title = this.state.newTitle;
        this.setState({
            todos,
            newTitle: '',
            updateIndex: '',
            edit: !this.state.edit,
         })
    }

    render(){
        const {newTitle, edit, todos} = this.state;
        return(
        <div className="main">
            <form  
                onSubmit={edit ? this.onSave : this.onSubmit}
                className="form">
                <i className="fa fa-pencil fa-2x" style={{color: '#ededed'}}/>
                <input 
                    type="text"
                    value={newTitle} 
                    onChange={this.handleChange} 
                    id="title"
                    autoComplete="off"
                    required={true}
                    placeholder="Write your Tasks..."
                    />
                <button 
                    type="submit"
                    id="show"
                    className="btn btn-primary">
                    <i className={edit ? 'fa fa-save' : 'fa fa-plus'} />
                </button>
            </form>
            {todos.map((todo, index) => {
                const {id, title, completed} = todo;
                return (
                <div key={id} id="todos">
                    <input 
                        type="checkbox" 
                        onChange={() => this.markComplete(index)} 
                        checked={completed} 
                        disabled={!!edit}
                        id="checkbox"
                        />
                    <span className={completed ? 'completed' : 'none'} id="todo">
                        {title}
                    </span>
                    <button 
                        onClick={() => this.editTodo(index)} 
                        disabled={!!completed}
                        className="btn btn-primary"
                        id="edit">
                        <i className="fa fa-edit" />
                    </button>
                    <button 
                        onClick={() => this.deleteTodo(index)}
                        className="btn btn-primary"
                        id="delete">
                        <i className="fa fa-trash" />
                    </button>
                </div>)
            })}
        </div>
        )
    }
}

export default Mainpage
