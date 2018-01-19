import React from 'react'
import { Bar, Foo, Notes } from '../components'
import {
  compose,
  lifecycle,
  withState,
  withHandlers
} from 'recompose'

const App = ({ div, handleClick, getComponent, notes, onNoteChange }) => (
  <div>
    <Bar message={ div.toString() }/>
    { getComponent() }
    <button type='button' onClick={ () => handleClick() }>Click</button>
    <Notes notes={ notes } onNoteChange={ onNoteChange }/>
  </div>
);

export default compose(
  withState('div', 'setDiv', true),
  withState('notes', 'setNotes', [
    'Note#1',
    'Note#2',
    'Note#3',
  ]),
  withHandlers({
    handleClick: ({ div, setDiv }) => () => {
      setDiv(!div);
    },
    getComponent: ({ div }) => () => {
      const foo = <Foo message={ div.toString() }/>;
      if (div) {
        return (
          <div>{ foo }</div>
        )
      }
      return (
        <span>{ foo }</span>
      )
    },
    onNoteChange: ({ notes, setNotes }) => (note, index) => {
      setNotes([
        ...notes.slice(0, index),
        note,
        ...notes.slice(index + 1)
      ])
    }
  }),
  lifecycle({
    componentWillMount() {
      console.log(
        'คุณสมบัติของ componentWillMount ไม่มีอะไรเกี่ยวกับการใช้งาน component เพราะยังไม่มีการ mount อะไรขึ้นมา ' +
        'เลยไม่สามารถทำอะไรกับ DOM ได้ โดยหน้าที่ที่คนใช้กันคือการกำหนดค่าเริ่มต้นสำหรับการใช้งาน แต่ปกติเราจะใช้ components ' +
        'constructor เพื่อไว้กำหนดค่าเริ่มต้นกำหนด default state' +
        'Most Common Use Case: กำหนดค่าเริ่มต้นของ root component' +
        'Can call setState: ไม่ควรใช้ setState(), ใช้สำหรับ default state');
    },
    componentDidMount() {
      console.log(
        'ปกติจะใช้ในการกำหนดค่าทุกๆอย่างที่ต้องใช้ DOM และรับข้อมูลที่ต้องการมาแสดงผล' +
        'ComponentDidMount ปกติจะใช้ในการกำหนดค่าทุกๆอย่างที่ต้องใช้ DOM และรับข้อมูลที่ต้องการมาแสดงผล' +
        'Most Common Use Case: เรียก AJAX เพื่อทำการโหลดข้อมูลสำหรับ component' +
        'Can call setState: สามารถใช้งาน setState() ได้');
    },
    componentWillReceiveProps(nextProps) {
      console.log(
        'เมื่อ Component ของเราทำงานได้ จนกระทั้งมี props ใหม่เข้ามา เพื่อทำการเปลี่ยนแปลงอะไรบ้างอย่าง ' +
        'โดยที่ข้อมูลแรกถูกโหลดเรียบร้อยแล้วโดย component ลูก componentDidMount() ได้ทำเสร็จแล้ว ' +
        'ก่อนที่ component จะได้รับ props ใหม่ componentWillReceiveProps จะถูกเรียก โดยมี nextProps เป็นตัวแปรที่ถูกส่งเข้ามา' +
        'Most Common Use Case: ใช้สำหรับตรวจสอบว่า ถ้า props มีการเปลี่ยนแปลงจะไปทำการกำหนดค่า state ต่อไป' +
        'Can call setState: สามารถใช้งาน setState() ได้');
    },
    /*shouldComponentUpdate: (nextProps, nextState) => {
      console.log(
        'shouldComponentUpdate จะถูกเรียกเมื่อ componet มีการเปลี่ยนแปลงด้วย nextProps (ตัวแรก) กับ nextState (ตัวสอง)และควร return ค่า boolean(true, false) ออกไป' +
        'มันคือ คำตอบของคำถาม ทำการ re-render ไหม' +
        'โดยค่าเริ่มต้น จะทำการ return true เสมอ แต่เมื่อเราทำการเขียน shouldComponentUpdate เข้าไป จะสามารถอัพเดทเฉพาะ props ที่เราสนใจได้' +
        'แต่ข้อควรระวัง ถ้าเราไปตั้งค่าไว้และลืม จะทำให้ component ไม่อัพเดทแบบปกติ');
      return true or false;
    },*/
    componentWillUpdate(nextProps, nextState) {
      console.log('จะถูกเรียกก่อนที่จะ render หลังจากได้รับค่าใหม่ของ props หรือ state' +
        'ประมาณว่า ต้องการทำอะไรก่อนที่จะทำการ re-render ไหม ? ' +
        'คุณสมบัติของมันจะคล้ายๆกับ componentWillReveiveProps ยกเว้นมันจะไม่ยอมเราให้เรียก this.setState()' +
        'Most Common Use Case: ใช้แทน componentWillReceiveProps ถ้า component นั้นไม่ต้องการเรียกใช้งาน props ก่อนหน้านั้น' +
        'Can call setState: ไม่');
    },
    componentDidUpdate(prevProps, prevState) {
      console.log(
        'จะถูกเรียกทันที่หลังจากเกิดการเปลี่ยนแปลงของ component แต่จะไม่ถูกเรียกตอนครั้งแรกที่ render โดยที่ componentDidUpdate สามารถใช้งานได้เหมือน componentDidMount' +
        'Most Common Use Case: อัพเดท DOM เมื่อมี props หรือ state มีการเปลี่ยนแปลง' +
        'Can call setState: ได้');
    },
    componentWillUnmount() {
      console.log(
        'จะถูกเรียกก่อนที่ component จะทำการ unmount และ destroy โดยปกติแล้วจะใช้เพื่อทำการรีเซ็ตค่าต่างๆ (network request, listener, DOM)' +
        'Most Common Use Case: ทำการรีเซ็ตค่าต่างๆ ของ component' +
        'Can call setState: ไม่');
    }
  })
)(App);
