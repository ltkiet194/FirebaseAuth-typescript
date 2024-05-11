import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import RowComponent from '../components/RowComponent'
import SectionComponent from '../components/SectionComponent'
import { TextInput } from 'react-native-paper'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Check, Element4, Heart, Logout, Notification, Trash } from 'iconsax-react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { SafeAreaView } from 'react-native'
import InputComponent from '../components/InputComponent'
interface Job {
    id: string;
    ownerId: string | undefined;
    jobContent: string;
    createdAt: any;
    checked: boolean;
}
const HomeScreen = ({ navigation }: any) => {
    const user = auth().currentUser;
    const [values, setValues] = useState({ job: '' });
    const [data, setData] = useState<Job[]>([]);

    const updateInputVal = (val: any, key: string) => {
        setValues(prevValues => ({
            ...prevValues,
            [key]: val
        }));
    };

    const addJob = async () => {
        if (!values.job.trim()) {
            return;
        }
        try {
            const jobData = {
                ownerId: user?.uid,
                jobContent: values.job.trim(),
                createdAt: firestore.FieldValue.serverTimestamp(),
                checked: false
            };
            const jobRef = await firestore().collection('jobs').add(jobData);
            setValues({ ...values, job: '' });
            console.log('Thêm công việc thành công!', jobData);
        } catch (error) {
            console.error('Lỗi khi thêm công việc:', error);
        }
    };

    const deleteJob = async (jobId: string) => {
        try {
            await firestore().collection('jobs').doc(jobId).delete();
            console.log('Đã xóa công việc thành công!');
        } catch (error) {
            console.error('Lỗi khi xóa công việc:', error);
        }
    };

    const toggleChecked = async (jobId: string, checked: boolean) => {
        try {
            await firestore().collection('jobs').doc(jobId).update({
                checked: !checked
            });
            console.log('Đã cập nhật trạng thái công việc!');
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái công việc:', error);
        }
    };
    useEffect(() => {
        const subscriber = firestore()
            .collection('jobs').where('ownerId', '==', user?.uid)
            .onSnapshot(querySnapshot => {
                const jobs: Job[] = [];
                querySnapshot.forEach(doc => {
                    const job = doc.data() as Job;
                    job.id = doc.id;
                    jobs.push(job);
                });
                setData(jobs);
                console.log('Cập nhật công việc mới!');
            });
        return () => subscriber();
    }, []);
    return (
        <SafeAreaView className='flex-1 bg-gray-700 item-center' >
            <View className='flex-row justify-between p-2 item-center'>
                <View className='flex justify-start mt-2'>
                    <Text className='text-xl font-bold text-white'>{user?.displayName}</Text>
                </View>
                <View className='flex justify-end mt-2'>
                    <Logout size={22} className='text-white' onPress={async () => await auth().signOut()} />
                </View>
            </View>
            <InputComponent
                placeholder='Jobs' name="job"
                value={values.job} updateInputval={updateInputVal}
                type='email' styled='m-2' right={<TextInput.Icon icon="plus" onPress={addJob} />} />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View className='flex-row p-2'>
                        <Heart size={22} className='text-white' variant={item.checked ? 'Bold' : undefined} />
                        <TouchableOpacity onPress={() => toggleChecked(item.id, item.checked)}>
                            <Text className={`ml-4 text-white w-[300px] ${item.checked ? 'line-through' : ''}`}>{item.jobContent}</Text>
                        </TouchableOpacity>
                        <Trash size={22} className='m-1 ml-auto text-white' onPress={() => deleteJob(item.id)} />
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    )
}

export default HomeScreen