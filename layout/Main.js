import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Alert, Pressable, Modal } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import CheckBox from '@react-native-community/checkbox';
import { useLogin } from './LoginProvider';


const Main = () => {
    const [job, setJob] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [numberUpdate, setNumberUpdate] = useState();
    const[jobHT,setJobHT]=useState(0);
    const[jobHTF, setJobHTF]=useState(0);


    const { isLogIn } = useLogin();
    const btnAdd = useCallback(() => {

        if (title === '' || content === '') {
            Alert.alert("Thông báo", "Vui lòng nhập đủ thông tin");
            return;
        }
        let newObj = {
            'title': title,
            'content': content,
            'status': status
        }

        setJob([...job, newObj]);

    })

    const btnDelete = useCallback((index) => {
        const job2 = [...job];
        job2.splice(index, 1);
        setJob(job2);
    })

    const btnUpdate = useCallback(() => {
        const updateJob = [...job];
        updateJob[numberUpdate] = {
            'title': title,
            'content': content,
            'status': status
        }
        setJob(updateJob);
        setModalUpdate(false);
        Alert.alert("Thông báo", "Sửa thành công");
    })
    
    useEffect(() => {
        const numberJobHT = job.filter(item => item.status);
        setJobHT(numberJobHT.length);
        
        const numberJobHTF = job.filter(item => item.status==false);
        setJobHTF(numberJobHTF.length);
    }, [job]);

    return (
        <View style={styles.container}>
            <View>
                <View style={{width:'100%', alignItems:'flex-end'}}>
                    <Text>{isLogIn ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'black', fontWeight: '600' }}>Thêm công việc</Text>
                </View>
                <TextInput style={styles.input} placeholder='Tiêu đề' onChangeText={(txt) => setTitle(txt)} />
                <TextInput style={styles.input} placeholder='Nội dung' onChangeText={(txt) => setContent(txt)} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <CheckBox
                        value={status}
                        onValueChange={() => setStatus(!status)}
                        style={styles.checkbox}
                    />
                    <Text>Hoàn thành công việc</Text>
                </View>
                <TouchableOpacity style={[styles.btn, { marginBottom: 10 }]} onPress={() => btnAdd()}>
                    <Text style={styles.text_btn}>Thêm công việc</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15}}>
                <Text>Số công việc hoàn thành: {jobHT}</Text>
                <Text>Số công việc chưa hoàn thành:{jobHTF} </Text>
            </View>

            <FlatList
                data={job}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.khung} onPress={() => { setModalUpdate(true), setNumberUpdate(index) }}>
                            <View>
                                <Text>Tiêu đề: {item.title}</Text>
                                <Text>Nội dung: {item.content}</Text>
                                <Text>Trạng thái: {item.status ? 'Hoàn thành' : 'Chưa hoàn thành'}</Text>
                                
                            </View>
                            <Pressable style={styles.btn} onPress={() => btnDelete(index)}>
                                <Text style={styles.text_btn}>Xóa</Text>
                            </Pressable>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalUpdate}
                                onRequestClose={() => {

                                    setModalUpdate(!modalUpdate);
                                }}>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text>Sửa công việc</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Tiêu đề"
                                            value={title}
                                            onChangeText={(txt) => setTitle(txt)}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nội dung"
                                            value={content}
                                            onChangeText={(txt) => setContent(txt)}
                                        />
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={status}
                                                onValueChange={() => setStatus(!status)}
                                                style={styles.checkbox}
                                            />
                                            <Text>Hoàn thành công việc</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.btn, { marginTop: 10 }]}
                                            onPress={() => btnUpdate()}>
                                            <Text style={styles.text_btn}>Lưu</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    );
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 3,
        marginBottom: 6,
        borderRadius: 6,
        marginTop: 10
    },
    btn: {
        backgroundColor: '#4474EE',
        padding: 5,
        marginTop: 10,
        borderRadius: 9
    },

    container: {
        flex: 1,
        padding: 5,
        justifyContent: 'center',
        width: '100%'
    },
    text_btn: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
    },
    khung: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        margin: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(128, 128, 128, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
    },
})

export default Main