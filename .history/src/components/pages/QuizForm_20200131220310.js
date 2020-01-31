import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useForm } from 'react-hook-form';

const QuizForm = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, errors } = useForm();

    const categories =  [{"id":1,"name":"All Categories"},{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},
    {"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},
    {"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},
    {"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},
    {"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},
    {"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},
    {"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},
    {"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},
    {"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},
    {"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}];
    
    const addOptions = () => {
        const categoryDom = document.getElementById('categories')
        categories.map(category => {
            categoryDom.innerHTML += `<option value=${category.id}>${category.name}</option>`
        })
    }

    const onSubmit = (data) => {
    
        let myForm = document.getElementById('myForm');
        const formData = new FormData(myForm); 
        console.log('FORM DATA category', formData.get('category'));
        console.log('FORM DATA difficulty', formData.get('difficulty'));
        
        // dispatch(addForm(
        //   formData
        // ))
    }

    useEffect(() =>{
     addOptions()   
    })

    return(
        <div className= "container">
            <div>
                <h3>Select quiz category and difficult level</h3>
                <form  onSubmit={handleSubmit(onSubmit)} id= {'myForm'} name= {'myForm'} encType='multipart/form-data'>
                    <label>1- Please select a category</label> <br></br>
                    <select id={'categories'} name="category" ref={register({ required: true })}>
                    </select> <br></br>
                    <label>2- Please select a difficulty level</label> <br></br>
                    <select id={'categories'} name="difficulty" ref={register({ required: true })}>
                        <option value='any'>Any Level</option>
                        <option value='easy'>Easy</option>
                        <option value='easy'>Medium</option>
                        <option value='easy'>Hard</option>
                    </select><br></br>
                    <input className='form-control' type="number" placeholder="NUmber of questions" name="reporting" ref={register({ required: true })} /><br />
                    <button className='btn btn-primary' type="submit" > Submit </button>
                </form>
            </div>
        </div>
    );
}
export default QuizForm;