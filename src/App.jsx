import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import ProgressContainer from './ProgressContainer.jsx';

// for test
// const govermentTimeline = [
//   {
//     id:"1", content:"วันที่ 13 ก.ค.2566 วันสุดท้ายที่คณะกรรมการการเลือกตั้ง (กกต.) จะรับรองผลเลือกตั้ง", date:"วันที่ 13 ก.ค.2566"
//   },
//   {
//     id:"2", content:"วันที่ 20 ก.ค.2566 วันสุดท้ายที่ให้ ส.ส.รายงานตัว", date:"วันที่ 20 ก.ค.2566"
//   },
//   {
//     id:"3", content:"วันที่ 24 ก.ค.2566 พิธีเปิดประชุมรัฐสภา", date:"วันที่ 24 ก.ค.2566"
//   },
//   {
//     id:"4", content:"วันที่ 25 ก.ค.2566 เลือกประธานสภาผู้แทนราษฎร", date:"วันที่ 25 ก.ค.2566"
//   },
//   {
//     id:"5", content:"ก่อนที่วันที่ 3 ส.ค.2566 เลือกนายกรัฐมนตรี", date:"ก่อนวันที่ 3 ส.ค.2566"
//   },
//   {
//     id:"6", content:"วันที่ 10 ส.ค. 2566 แต่งตั้งคณะรัฐมนตรี", date:"วันที่ 10 ส.ค. 2566"
//   },
//   { 
//     id:"7", content:"วันที่ 11 ส.ค.2566 ถวายสัตย์ปฏิญาณฯ ซึ่งเป็นการทำงานวันสุดท้ายของคณะรัฐมนตรีรักษาการ", date:"วันที่ 10 ส.ค. 2566"
//   }
// ]

function App() {
  const [timelineList, setTimelineList] = useState([{id: "1234", content:"Hello React!!", date:"2023-07-10"}]);

  const Header = () => {
    return (
      <header className='header'>
        <p>This is the vertical timeline generator</p>
        <p>You can add new timeline in the bottom of the webpage!</p>
      </header >
    )
  }

  const ProgressContainer = ({id, content, date}) => {
    const [isVisible, setIsVisible] = useState(true);
    const handleButtonClick = (e) => {
      e.preventDefault();
      setIsVisible(!isVisible);
    };
    const handleDelete = (e) => {
      document.getElementById(id).remove();
      setTimelineList(prevList => prevList.filter(timeline => timeline.id !== id));
      // console.log(timelineList)
    };    
    return (
      <div className='progressContainer' id={id}>
      <button type='checkbox' className={`progressButton ${isVisible ? 'visible' : 'hidden'} `} onClick={handleButtonClick}></button>
      <div className={`progressBox ${isVisible ? 'visible' : 'hidden'}`}>
        <label className='checkBoxContainer'>
          <input type='checkbox' />
          <span className='checkmark'></span>
          <h3>{date}</h3><button onClick={e => handleDelete(e)}>delete</button>
        </label>
        <p>{content}</p>
      </div>
    </div>
    )
  }

  const Main = () => {
    const [newTimeline, setNewTimeline] = useState("")
    const [dueDate, setDueDate] = useState("")
    const handleContent = (e) => {
      setNewTimeline(e.target.value)
    }
    const handleDate = (e) => {
      setDueDate(e.target.value)
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(newTimeline)
      // console.log(dueDate)
      setTimelineList([...timelineList, {id: crypto.randomUUID(), content: newTimeline, date: dueDate}])
      setNewTimeline("")
      setDueDate("")
      // console.log(timelineList)
    };
    return (
    <main>
      <div className='line'>
        {timelineList.map((timeline) => 
          <ProgressContainer key={timeline.id} id={timeline.id} content={timeline.content} date={timeline.date}/>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='date'>Add Due Date</label>
        <input type="date"
          id="date" 
          value={dueDate}
          placeholder='Enter Date'
          onChange={handleDate}
        />
        <label htmlFor="content">Add new timeline</label>
        <input
          id='content'
          value={newTimeline}
          onChange={handleContent}
          placeholder='Enter Timeline Content'
        />
        <button>Add</button>
      </form>
    </main>
    
    )}
  return (
    <>
      <Header/>
      <Main/>
    </>
  )
}

export default App
