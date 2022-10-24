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
    <div className="APP bg-red-500">
     <input type="text"  ref={ref} />
     <button onClick={addhandler}>Add</button>
     {
      todos.map(todo=>
        <div key={todo.id}>
          {todo.text}
          <button onClick={()=>deletehandler(todo.id)}>Delete</button>
        </div>
        )
     }


    </div>
  )};


export default App;
