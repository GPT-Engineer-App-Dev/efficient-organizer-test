import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast, IconButton } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const saveTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={4} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box as="section" mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={handleInputChange} />
        <Button onClick={addTask} colorScheme="blue" ml={2}>Add Task</Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center" justifyContent="space-between">
            {task.isEditing ? (
              <Input defaultValue={task.text} onChange={(e) => saveTask(task.id, e.target.value)} />
            ) : (
              <Text fontSize="lg">{task.text}</Text>
            )}
            <Box>
              {task.isEditing ? (
                <IconButton icon={<FaSave />} onClick={() => saveTask(task.id, task.text)} aria-label="Save task" />
              ) : (
                <IconButton icon={<FaEdit />} onClick={() => editTask(task.id)} aria-label="Edit task" />
              )}
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} aria-label="Delete task" ml={2} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;