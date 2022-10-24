import React, { useCallback, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { toUnicode } from 'punycode';


interface Todo{
  id: number;
  text: string;

}

type ActionType = {type:'ADD'; text:string} | {type:'REMOVE'; id:number }


function App() {
  const [todos, dispatch]=useReducer(reducer, []);
  const ref = React.useRef<HTMLInputElement>(null);


  function reducer(state:Todo[], action:ActionType){
    switch(action.type){
      case 'ADD':
        return[
          
            ...state,
           {
            id: state.length,
            text: action.text
           }
          
    
  ];
      case 'REMOVE':
          return  state.filter(({id})=>id !==action.id)
        
}
}

  const addhandler=useCallback(()=>{

    if (ref.current) {
      dispatch({
        type: 'ADD',
        text: ref.current.value,
        
        })
        console.log(ref.current.value);
        
         ref.current.value=''
    }
      
    },[]);
  
    const deletehandler=(id:number)=>{
    
      dispatch({
        type: 'REMOVE',
        id: id
      })
    }
  
  return (
    <div className="m-auto container w-1/4 bg-cyan-300 my-5">

     <div className="shadow-lg container">
      <input className=' bg-white border border-slate-300 rounded-md py-2 my-2 ml-2 pl-9 pr-3 shadow-sm placeholder="Search for anything...'  ref={ref} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2" onClick={addhandler}>Add</button>
      {
        todos.map(todo=>
          <div className='ml-2' key={todo.id}>
            {todo.text}
            <button className='bg-red-500 mt-2 ml-2 text-white' onClick={()=>deletehandler(todo.id)}>Delete</button>
          </div>
          )
      }
      </div>


    </div>
  )};


export default App;
