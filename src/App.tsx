import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { toUnicode } from 'punycode';
import { isTemplateSpan } from 'typescript';


interface Todo{
  id: number;
  text: string;

}

type ActionType = {type:'ADD'; text:string} | {type:'REMOVE'; id:number }


function App() {
  const [todos, dispatch]=useReducer(reducer, []);
 const [items, setitems] =useState<Todo | any>();
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


/* const item1 = localStorage.getItem('items')
//const item2 = JSON.parse(item1)
console.log(item1);
 */
  const addhandler=useCallback(()=>{
     
    if (ref.current) {
      dispatch({
        type: 'ADD',
        text: ref.current.value,
        
        })
        //console.log(ref.current.value);
       /*  var todos=[]
        localStorage.setItem('todo', JSON.stringify(ref.current.value))
       */
        
                
      if(todos){
        localStorage.setItem('items', JSON.stringify(todos));
      }
        
         ref.current.value=''
    }
      
    },[todos]);



  const getItems= ()=>{

    const stroedItems = localStorage.getItem('items')
    if(stroedItems){
    let items = JSON.parse(stroedItems)
    //console.log(items);
/* 
    for( let item of item2){
      console.log(item.name)
    } */

    return items;
    
  }
  }
    
  
  useEffect(() => {
    const items = getItems()

    const savedItems = []
     
    for(const item of items){
      console.log(item.text) 

      savedItems.push(item)
    }

    //console.log("hi",savedItems);
    setitems(savedItems)
    
    console.log("hello",items)
    
  }, [todos]); 
       

  
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

         
           items?.map((item: any)=>{
            return <div className='ml-2' key={item.id}>
            {item.text}
            <button className='bg-red-500 mt-2 ml-2 text-white' onClick={()=>deletehandler(item.id)}>Delete</button>
          </div>
           } ) 
 

/*         
        todos.map((item: any)=>
          <div className='ml-2' key={item.id}>
            {item.text}
            <button className='bg-red-500 mt-2 ml-2 text-white' onClick={()=>deletehandler(item.id)}>Delete</button>
          </div>
          )*/
        } 
      </div>
    </div>
  )};


export default App;
