import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import '../App.css'
import './Mainpage.css'

export class Mainpage extends Component {
    constructor(props){
    super(props);
    this.state = ({
        title : '',
        edit : false,
        updateIndex : '',
        todos : [
            {
                id : uuid(),
                title : 'Sample',
                completed :false,
            }
        ]})
    }

    deleteTodo = (index) =>{
        const todos = [].concat(this.state.todos);
        todos.splice(index,1);
        this.setState({
            todos : todos
    })
    
    }

    markComplete = (index) =>{
        const todos = [].concat(this.state.todos);
        todos[index].completed = !todos[index].completed
        this.setState({
            todos : todos,
        })
    }

    handleChange = (e) => {
        this.setState({
            title : e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const todos = [].concat(this.state.todos);
        todos.push({
            id : uuid(),
            title : this.state.title,
            completed: false,
            edit : false
        })
        this.setState({
            todos:todos,
            title : '',
        })
    
    }

    editTodo = (index) =>{
        const todos = [].concat(this.state.todos);
        const todoToBeEdited = todos[index].title;
        this.setState({
            title : todoToBeEdited,
            edit : true,
            updateIndex : index
        })
    }

    onSave = (e) =>{
        e.preventDefault();
        const todos = [].concat(this.state.todos)
        todos[this.state.updateIndex].title = this.state.title;
        this.setState({
            todos : todos,
            title : '',
            updateIndex : '',
            edit : !this.state.edit,
         })
    }

    render() {
        return (
        <div className = "main">
            <form  
                onSubmit={this.state.edit ? this.onSave : this.onSubmit}
                className = "form">
                <i className = "fa fa-pencil fa-2x" style = {{color : '#ededed'}}/>
                <input 
                    type = "text"
                    value = {this.state.title} 
                    onChange = {this.handleChange} 
                    id="title"
                    autoComplete = "off"
                    required = {true}
                    placeholder = "Write your Tasks..."
                    />
                <button 
                    type="submit"
                    id = {this.state.edit ? 'hide' : 'show'}
                    className = "btn btn-primary">
                    <i className = "fa fa-plus" />
                </button>
                <button 
                    type="submit"
                    id = {this.state.edit ? 'show' : 'hide'}
                    className = "btn btn-primary">
                    <i className = "fa fa-save" />
                </button>
            </form>
            {this.state.todos.map((todo, index)=>(
                <div key = {todo.id} id="todos" >
                    <input 
                        type = "checkbox" 
                        onChange = {()=> this.markComplete(index)} 
                        checked ={todo.completed} 
                        disabled = {this.state.edit ? true : false}
                        id="checkbox"
                        />
                    <span className={todo.completed ? 'completed' : 'none'} id="todo" >{todo.title}</span>
                    <button 
                        onClick = {()=> this.editTodo(index)} 
                        disabled = {todo.completed ? true : false}
                        className = "btn btn-primary"
                        id= "edit">
                        <i className = "fa fa-edit" />
                    </button>
                    <button 
                        onClick = {()=>this.deleteTodo(index)}
                        className = "btn btn-primary"
                        id= "delete">
                        <i className = "fa fa-trash" />
                    </button>
                </div>
            ))}
        </div>
        )
    }
}

export default Mainpage
