import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import '../App.css'


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
                // edit : false,
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

    // editTodo = (index) =>{
    //     const todos = [].concat(this.state.todos);
    //     todos[index].edit = !todos[index].edit;
    //     this.setState({
    //         todos : todos,
    //     })
    // }

    // editedTodo = (e) =>{
    //     this.setState({
    //         [e.target.id] : e.target.value,
    //         edited : e.target.value
    //     })
    // }

    // saveTodo = (index) =>{
    //     const todos = [].concat(this.state.todos);
    //     todos[index].edit = !todos[index].edit;
    //     todos[index].title = this.state.edited
    //     this.setState({
    //         todos : todos,
    //     })
    // }

    render() {
        return (
        <div>
            <form  
                onSubmit={this.state.edit ? this.onSave : this.onSubmit}>
                <input 
                    type = "text"
                    value = {this.state.title} 
                    onChange = {this.handleChange} 
                    id="title"
                    autoComplete = "off"
                    required = {true}
                    />
                <button 
                    type="submit"
                    className = {this.state.edit ? 'hide' : 'show'}>
                    Add
                </button>
                <button 
                    type="submit"
                    className = {this.state.edit ? 'show' : 'hide'}>
                    Save
                </button>
            </form>
            {this.state.todos.map((todo, index)=>(
                <div key = {todo.id} className={todo.completed ? 'completed' : 'none'}  >
                    <input 
                        type = "checkbox" 
                        onChange = {()=> this.markComplete(index)} 
                        checked ={todo.completed} 
                        disabled = {todo.edit ? true :false}/>
                    {todo.title}
                    <button 
                        onClick = {()=> this.editTodo(index)} 
                        disabled = {todo.completed ? true : false}>Edit
                    </button>
                    <button 
                        onClick = {()=>this.deleteTodo(index)}>Delete
                    </button>
                    {/* <input 
                        type = "text"
                        className = {todo.edit ? 'show' : 'hide'}
                        onChange = {this.editedTodo}
                        id = "newTitle"
                        autoComplete = "off"
                        /> */}
                    {/* <button 
                        className = {todo.edit ? 'show' : 'hide'} 
                        onClick = {()=>this.saveTodo(index)}>Save
                    </button> */}
                </div>
            ))}
        </div>
        )
    }
}

export default Mainpage
