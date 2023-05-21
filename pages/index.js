import { useEffect, useState } from "react" 
import Image from "next/image"

export default function IndexPage() {
  const [inputValue, setinputValue] = useState('')
  const [name ,setname] = useState('')
  const [list,setList] = useState([])

  useEffect(() => {
    loadList()
  },[])

  const loadList = () => {
    fetch('https://api.zenon.si/post')
    .then(response => response.json())
    .then(data => setList(data))
  }

  const tweet = () =>{
    if(inputValue !== '' && name !== ''){
      setinputValue('')
      fetch('https://api.zenon.si/post', {
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name,content: inputValue,}),
      })
      .then(() => loadList())
    }
    }

  return (
    <div className="min-h-full bg-gray-300 flex flex-col items-center ">
      <form 
      className=" w-1/2 flex flex-col items-end"
      onSubmit={(event) =>{
        event.preventDefault()
        tweet()
      }}
      >
        <div className=" w-full mt-32 rounded-lg shadow bg-white p-6 ">
          <div className=" w-full bg-black p-4 rounded-lg shadow-lg">
          <input type="text" 
            onChange={({target: {value}}) => setname(value)} 
            value={name}>
          </input>
          </div>
              <textarea 
              rows={8} 
              className=" outline-none w-full resize-none"
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value
                setinputValue(value)
              }}
            ></textarea>
            {/*
              <input
            type="text"
            className=" bg-blue-500"
            value={inputValue}
            onChange={(event) => {
              const value = event.target.value
              setinputValue(value)
            }}
            >
            </input>*/}
        </div>
        <button 
            className=" bg-gray-800 text-white font-bold px-6 py-4 mt-6 rounded-lg shadow-lg"
            type="submit"
        
            >
          tweet {inputValue}
        </button>
          <button className=" bg-gray-600 text-white font-bold px-6 py-4 rounded-lg shadow-md"
          type="button"
          onClick={loadList}
          >
            refresh
          </button>
      </form>
      <div className=" w-1/2 mt-8">
        {list.map((data) => {
          return (
            <div key={data.id} className=" mt-4 bg-white rounded-lg shadow-lg p-6">
            <h1 className=" text-xl font-bold">{data.name}</h1>
            <div className=" mt-2 text-gray-600">
              {data.content}
             </div>
          </div>
          )
        })}

      </div>
    </div>
  )
}