import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: addNewTask } = useHttp();
  
  const enterTaskHandler = async (taskText) => {

    addNewTask({
      url:'https://react-udemy-course-custom-hook-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body:{ text: taskText },
      headers:{
        'Content-Type': 'application/json',
      }
    }, (responseData)=>{
      const generatedId = responseData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    })
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
