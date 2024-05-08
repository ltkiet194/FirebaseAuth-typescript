import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Todo, { TodoProps } from './components/Todo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(''); // State for the todo input
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<TodoProps[]>([]); // State for storing todos

  const todosRef = firestore().collection('todos'); // Reference to the 'todos' collection in Firestore

  const addTodo = async () => {
    if (todo.trim() === '') {
      return;
    }
    try {
      await todosRef.add({
        title: todo,
        complete: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setTodo(''); // Clear todo input after adding
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  };

  const loadTodos = async () => {
    try {
      const querySnapshot = await todosRef.orderBy('createdAt', 'asc').get();
      const todosList: TodoProps[] = [];
      querySnapshot.forEach((doc) => {
        todosList.push({ ...doc.data(), id: doc.id } as TodoProps);
      });
      setTodos(todosList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos: ', error);
      setLoading(false);
    }
  };

  const handleDeleteTodo = () => {
    loadTodos(); // Reload todos list after a todo is deleted
  };

  useEffect(() => {
    const unsubscribe = todosRef.onSnapshot(() => {
      loadTodos();
    });
    return () => {
      unsubscribe(); 
    };
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Appbar.Header>
              <Appbar.Content title={'TODOs List'} />
            </Appbar.Header>
            <FlatList
              data={todos}
              renderItem={({ item }) => <Todo {...item} onDelete={handleDeleteTodo} />}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text>No todos found</Text>}
            />
            <TextInput
              label={'New todo'}
              value={todo}
              onChangeText={(text) => setTodo(text)}
            />
            <Button onPress={addTodo}>Add TODO</Button>
          </View>
        </SafeAreaView>
    </SafeAreaProvider>
  
  );
};

export default App;
