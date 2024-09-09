import React from 'react'
// import '../css/Board.css'
import SecToDoComponent from './SecToDoComponent'
import SecDoingComponent from './SecDoingComponent'
import SecDoneComponent from './SecDoneComponent'

export default function BoardComponent() {
  return (
    <div className="grid grid-cols-3 mt-12 w-11/12 min-h-[550px] bg-gray-200 border border-black text-center place-items-center mx-auto">
        <SecToDoComponent />
        <SecDoingComponent />
        <SecDoneComponent />
    </div>
  )
}
