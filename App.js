import * as React from 'react';
import { Text, View, StyleSheet,ScrollView, Button, TouchableOpacity,TextInput} from 'react-native';
import Constants from 'expo-constants';
import {Student, ClassRoom, Teacher} from './Class'
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
const teacher = new Teacher(1, 'Teacher', 30, 'Ho Chi Minh', 'Math teacher')
const student1 = new Student(1, 'Student1', 18, 'Ho Chi Minh', 5, 2, 1);
const student2 = new Student(2, 'Student2', 18, 'Ho Chi Minh', 3, 7, 5);
const student3 = new Student(3, 'Student3', 19, 'Ho Chi Minh', 10, 9, 8);
const student4 = new Student(4, 'Student4', 20, 'Ha Noi', 10, 6, 7);
const student5 = new Student(5, 'Student5', 18, 'Da Nang', 5, 2, 5);

export default function App() {
  const [list, setList] = React.useState( new ClassRoom('RN - Training', teacher, [student1, student2, student3, student4, student5]))
  const [setForceUpdate] = React.useState(null);
  const [sortByName, setSortByName] = React.useState('');
  const [groupByAge, setGroupByAge] = React.useState(null);
  const [bestAndWorst, setBestAndWorst] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [bestStudent, setBestStudent] = React.useState();
  const refForm = React.useRef({name: '', address: '', age: null, score1: null, score2: null, score3: null});
  const onChangeFormValue = React.useCallback((field) => (value) => refForm.current[field] = value, []);
  const onSearchStudent = React.useCallback(() => {
  const result = list.getBestStudentWithProps({name: refForm.current.name, address: refForm.current.address, age: refForm.current.age, score1: refForm.current.score1, score2: refForm.current.score2, score3: refForm.current.score3});
    setBestStudent(result)
  }, [list])
  const onChangeAge = React.useCallback((value) => {
    setAge(value);
  }, [])
  const onSearchByAge = React.useCallback(() => {
    const result = list.bestAndWorstStudent(age);
    setBestAndWorst(result);
  }, [list, age])
  const onSort = React.useCallback(() => {
    if(!sortByName){
      list.sortStudentByName('asc');
      setSortByName('desc');
    }else{
      list.sortStudentByName(sortByName);
      sortByName === 'asc' ? setSortByName('desc') : setSortByName('asc')
    }
    setForceUpdate(new Date())
  }, [sortByName])

  const onGroupByAge = React.useCallback(() => {
    const result = list.groupStudentByAge();
    setGroupByAge(result);
  }, [list])
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>List student</Text>
        {list.students.map((item, index) => (
          <Text key={(item?.id || index).toString()}>{`Name: ${item.name} - AvgScore: ${item.averageScore}`}</Text>
        ))}
        <Text style={styles.title}>{`Average score of class: ${list.averageScoreClassroom()}`}</Text>
        <Text style={styles.title}>{`Top 3`}</Text>
        {list.getTop3Student().map((item, index) => (
          <Text>{`${item?.name}: ${item?.averageScore}`}</Text>
        ))}
        <Text style={styles.title}>Best and Worst</Text>
        {bestAndWorst && (
          <>
          <Text>{`Best: ${bestAndWorst?.maxScore?.name}`}</Text>
          <Text>{`Worst: ${bestAndWorst?.minScore?.name}`}</Text>
          </>
        )}
        <TextInput placeholder="Enter age" style={styles.txtInput} onChangeText={onChangeAge}/>
        <TouchableOpacity style={styles.searchBtn} onPress={onSearchByAge}>
          <Text>{`Search`}</Text>
        </TouchableOpacity>
         <Text style={styles.title}>Search student</Text>
         {bestStudent && (
           <Text>{`Name: ${bestStudent?.name} - AvgScore: ${bestStudent?.averageScore}`}</Text>
         )}
         <TextInput placeholder="Enter name" style={styles.txtInput} onChangeText={onChangeFormValue('name')}/>
         <TextInput placeholder="Enter address" style={styles.txtInput} onChangeText={onChangeFormValue('address')}/>
         <TextInput placeholder="Enter age" style={styles.txtInput} onChangeText={onChangeFormValue('age')}/>
         <TextInput placeholder="Enter score1" style={styles.txtInput} onChangeText={onChangeFormValue('score1')}/>
         <TextInput placeholder="Enter score2" style={styles.txtInput} onChangeText={onChangeFormValue('score2')}/>
         <TextInput placeholder="Enter score3" style={styles.txtInput} onChangeText={onChangeFormValue('score3')}/>
         <TouchableOpacity style={styles.searchBtn} onPress={onSearchStudent}>
          <Text>{`Search`}</Text>
        </TouchableOpacity>
        {groupByAge && (
          <View style={styles.groupByAge}>
          <Text style={styles.title}>Group students by age</Text>
          {groupByAge.map((item, index) => (
            <>
              <Text key={(item?.id || index).toString()}>{`${item.age}:`}</Text>
              {item.students.map((student, i) => (
                <Text>{`- ${student.name}`}</Text>
              ))}
            </>
          ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={onSort}>
        <Text>{`Sort by name (${sortByName ? sortByName : 'asc'})`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={onGroupByAge}>
        <Text>{`Show group age`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  btn: {
    marginTop: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  groupByAge: {
    marginTop: 20
  },
  title: {
    fontSize: 21
  },
  txtInput: {
    borderWidth: 1,
    height: 30,
    marginVertical: 5
  },
  searchBtn: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 60
  }
});
