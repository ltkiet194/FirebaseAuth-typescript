import React from 'react';
import { List, IconButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

interface TodoProps {
    id: string;
    title: string;
    complete: boolean;
    createdAt: any; 
    onDelete: () => void;
}

const Todo: React.FC<TodoProps> = ({ id, title, complete }) => {
    const toggleComplete = async () => {
        try {
        await firestore()
            .collection('todos')
            .doc(id)
            .update({
            complete: !complete,
            });
        } catch (error) {
            console.error('Error toggling todo complete status:', error);
        }
    };
    const handleDelete = async () => {
        try {
            await firestore().collection('todos').doc(id).delete();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    
    return (
        <List.Item
            title={title}
            onPress={toggleComplete}
            left={(props) => (
            <IconButton
                {...props}
                icon={complete ? 'check' : 'cancel'}
                className={`text-base ${complete ? 'text-green-500' : 'text-red-500'}`}
            />
            )}
            right={(props) => (
            <IconButton
                {...props}
                icon="delete"
                className='text-red-400'
                onPress={handleDelete} // Trigger handleDelete function when pressed
            />
            )}
        />
    );
};
    
export default Todo;
export type { TodoProps };