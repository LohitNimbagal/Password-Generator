import { useCallback, useEffect, useState,useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
  let pass = ''
  let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  if (number===true) {
    string += '1234567890'
  }
  if (char===true) {
    string += '~!@#$%^&*()_+=-`{}[]'
  }

  for (let i = 1; i <= length; i++){
    let index = Math.floor(Math.random() * string.length)
    // console.log(index);
    pass += string.charAt(index)
    // console.log(pass);

  }
  setPassword(pass)
}, [length,number,char,setPassword])


const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

  useEffect(()=>{
    passwordGenerator()
  },[length,number,char,passwordGenerator])



  return (
    <>
    <div className='w-full h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center'>
      <div className='w-96 h-60 bg-white bg-opacity-20 backdrop-blur-xl rounded-xl drop-shadow-md flex flex-wrap items-center justify-center'>
        <h1 className=" text-black text-2xl font-bold  " onClick={passwordGenerator}>
        Password Generator 
        </h1>
        <div>
          <input type="text" readOnly value={password} ref={passwordRef} className=' decoration-non outline-none rounded p-1 m-1' />
          <button className='bg-purple-500 rounded-md p-1 text-md'
          onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className='flex flex-col text-center justify-center' >
          <label className='m-2'>
            <input 
            type="range"
            value={length}
            min={8}
            max={20}
            onChange={e => setLength(e.target.value)}/>
            <br />
            Length ({length})
          </label>

          <div>
            <label className='m-2'><input type="checkbox" name="Numbers" id="" onClick={()=> {setNumber(prev => !prev)}} />
            Numbers
            </label>
            <label className='m-2'><input type="checkbox" name="Character" id="" onClick={()=> {setChar(prev => !prev)}}/>
            Characters
            </label>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}


export default App
