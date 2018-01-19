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
        '�س���ѵԢͧ componentWillMount �������������ǡѺ�����ҹ component �����ѧ����ա�� mount ���â���� ' +
        '����������ö�����áѺ DOM �� ��˹�ҷ���褹��ѹ��͡�á�˹���������������Ѻ�����ҹ �軡����Ҩ��� components ' +
        'constructor ��������˹����������鹡�˹� default state' +
        'Most Common Use Case: ��˹����������鹢ͧ root component' +
        'Can call setState: ������� setState(), ������Ѻ default state');
    },
    componentDidMount() {
      console.log(
        '���Ԩ���㹡�á�˹���ҷء����ҧ����ͧ�� DOM ����Ѻ�����ŷ���ͧ������ʴ���' +
        'ComponentDidMount ���Ԩ���㹡�á�˹���ҷء����ҧ����ͧ�� DOM ����Ѻ�����ŷ���ͧ������ʴ���' +
        'Most Common Use Case: ���¡ AJAX ���ͷӡ����Ŵ����������Ѻ component' +
        'Can call setState: ����ö��ҹ setState() ��');
    },
    componentWillReceiveProps(nextProps) {
      console.log(
        '����� Component �ͧ��ҷӧҹ�� ����з���� props ��������� ���ͷӡ������¹�ŧ���ú�ҧ���ҧ ' +
        '�·��������á�١��Ŵ���º���������� component �١ componentDidMount() ����������� ' +
        '��͹��� component �����Ѻ props ���� componentWillReceiveProps �ж١���¡ ���� nextProps �繵���÷��١�������' +
        'Most Common Use Case: ������Ѻ��Ǩ�ͺ��� ��� props �ա������¹�ŧ��价ӡ�á�˹���� state ����' +
        'Can call setState: ����ö��ҹ setState() ��');
    },
    /*shouldComponentUpdate: (nextProps, nextState) => {
      console.log(
        'shouldComponentUpdate �ж١���¡����� componet �ա������¹�ŧ���� nextProps (����á) �Ѻ nextState (����ͧ)��Ф�� return ��� boolean(true, false) �͡�' +
        '�ѹ��� �ӵͺ�ͧ�Ӷ�� �ӡ�� re-render ���' +
        '�¤��������� �зӡ�� return true ���� ���������ҷӡ����¹ shouldComponentUpdate ���� ������ö�Ѿഷ੾�� props ������ʹ���' +
        '���ͤ�����ѧ ������仵�駤����������� �з���� component ����ѾഷẺ����');
      return true or false;
    },*/
    componentWillUpdate(nextProps, nextState) {
      console.log('�ж١���¡��͹���� render ��ѧ�ҡ���Ѻ�������ͧ props ���� state' +
        '����ҳ��� ��ͧ��÷����á�͹���зӡ�� re-render ��� ? ' +
        '�س���ѵԢͧ�ѹ�Ф�����Ѻ componentWillReveiveProps ¡����ѹ�����������������¡ this.setState()' +
        'Most Common Use Case: ��᷹ componentWillReceiveProps ��� component �������ͧ������¡��ҹ props ��͹˹�ҹ��' +
        'Can call setState: ���');
    },
    componentDidUpdate(prevProps, prevState) {
      console.log(
        '�ж١���¡�ѹ�����ѧ�ҡ�Դ�������¹�ŧ�ͧ component ������١���¡�͹�����á��� render �·�� componentDidUpdate ����ö��ҹ������͹ componentDidMount' +
        'Most Common Use Case: �Ѿഷ DOM ������� props ���� state �ա������¹�ŧ' +
        'Can call setState: ��');
    },
    componentWillUnmount() {
      console.log(
        '�ж١���¡��͹��� component �зӡ�� unmount ��� destroy �»������Ǩ������ͷӡ�����絤�ҵ�ҧ� (network request, listener, DOM)' +
        'Most Common Use Case: �ӡ�����絤�ҵ�ҧ� �ͧ component' +
        'Can call setState: ���');
    }
  })
)(App);
