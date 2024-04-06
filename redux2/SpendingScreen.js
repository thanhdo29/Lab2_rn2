import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addSpendingApi, deleteSpendingApi, fetchSpendings, updateSpendingApi } from './actions'
import { useEffect, useState } from "react";
import RadioGroup from 'react-native-radio-buttons-group';



const SpendingScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const listSpending = useSelector(state => state.spending.items);
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState();
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [search1, setSearch] = useState('');


    const tongThu = () => {
        let thu = 0;
        listSpending.forEach(item => {
            if (item.typeSpending == 1) {
                thu += parseFloat(item.amount);
            }
        });
        return thu;
    };

    const tongChi = () => {
        let chi = 0;
        listSpending.forEach(item => {
            if (item.typeSpending == 2) {
                chi += parseFloat(item.amount);
            }
        });
        return chi;
    };

    const radioButtons = useMemo(() => ([
        {
            id: '1', 
            label: 'Thu',
            value: 'option1'
        },
        {
            id: '2',
            label: 'Chi',
            value: 'option2'
        }
    ]), []);

    useEffect(() => {
        dispatch(fetchSpendings());
        console.log(listSpending);
    }, [dispatch])

    const handleDeleteSpending = (id) => {
        dispatch(deleteSpendingApi(id))
            .then((result) => {
                console.log('Thành công');

            })
            .catch((error) => {
                console.log(error);
            })


    }
    const doUpdate = (row) => {
        setSelectedItem(row);
        setTitle(row.title);
        setDes(row.des);
        setDate(row.date);
        setSelectedId(row.typeSpending);
        setAmount(row.amount);
        setModalVisible(true);
    }

    const handleAddSpending = () => {
        dispatch(addSpendingApi({ id: Math.random().toString(), title: title, des: des, date: date, typeSpending: selectedId, amount: amount }))
    }

    const handleUpdateSpending = () => {
        dispatch(updateSpendingApi({ id: selectedItem.id, title: title, des: des, date: date, typeSpending: selectedId, amount: amount }));
        setModalVisible(false);
    };


    const handleSearch1 = () => {
        if (search1.trim() === '') {
            alert("Vui lòng nhập từ khóa tìm kiếm.");
            return;
        }

        const seenTitles = {};

        const filteredStores = listSpending.filter(store => {
            if (store.title.toLowerCase().includes(search1.toLowerCase())) {
                if (!seenTitles[store.title]) {

                    seenTitles[store.title] = true;
                    return true;
                }
            }

            return false;
        });


        if (filteredStores.length === 0) {
            alert("Không tìm thấy cửa hàng phù hợp.");
        } else {
            const result = filteredStores.map(store => {
                let totalThu = 0;
                let totalChi = 0;
                listSpending.forEach(item => {
                    if (item.typeSpending == 1 && item.title === store.title) {
                        totalThu += parseFloat(item.amount);
                    } else if (item.typeSpending == 2 && item.title === store.title) {
                        totalChi += parseFloat(item.amount);
                    }
                });
                return `${store.title}: Số tiền thu : ${totalThu} - Số tiền chi : ${totalChi}`;
            });
            alert(result);
        }
    }
    return (
        <View>
            <Text>Tiền thu: {tongThu()}</Text>
            <Text>Tiền chi: {tongChi()}</Text>
            <TextInput style={styles.input} placeholder="Tiêu đề" onChangeText={(txt) => setTitle(txt)} />
            <TextInput style={styles.input} placeholder="Mô tả" onChangeText={(txt) => setDes(txt)} />
            <TextInput style={styles.input} placeholder="Ngày thu chi" onChangeText={(txt) => setDate(txt)} />
            <View style={{ marginTop: 12, marginBottom: 10 }}>
                <Text>Loại thu chi</Text>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    layout='row'
                />
            </View>
            <TextInput style={styles.input} placeholder="Tổng tiền" onChangeText={(txt) => setAmount(txt)} />

            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <TextInput style={styles.inputSearch} placeholder='Tìm kiếm' onChangeText={(txt) => setSearch(txt)} />
                <TouchableOpacity style={{ padding: 7, backgroundColor: 'blue', borderRadius: 4 }} onPress={() => handleSearch1()}>
                    <Text style={{ color: 'white' }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
            <Button title="Thêm" onPress={() => handleAddSpending()} />
            {
                listSpending.map(row => (
                    <View key={row.id} style={{ margin: 10, padding: 10, borderColor: 'blue', borderWidth: 1 }}>
                        <Text>Tiêu đề: {row.title}</Text>
                        <Text>Mô tả: {row.des}</Text>
                        <Text>Ngày: {row.date}</Text>
                        <Text>Loại: {row.typeSpending == 1 ? 'Thu' : 'Chi'}</Text>
                        <Text>Tổng tiền: {row.amount}</Text>
                        <Button title='Xóa' onPress={() => handleDeleteSpending(row.id)} />

                        <Button title='Sửa' onPress={() => doUpdate(row)} />
                        {/* <TouchableOpacity>
                    <Text>Xóa</Text>
                </TouchableOpacity> */}
                    </View>

                ))
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Sửa thông tin</Text>
                        <TextInput style={styles.input} value={title} onChangeText={(txt) => setTitle(txt)} placeholder="Tiêu đề" />
                        <TextInput style={styles.input} value={des} onChangeText={(txt) => setDes(txt)} placeholder="Mô tả" />
                        <TextInput style={styles.input} value={date} onChangeText={(txt) => setDate(txt)} placeholder="Ngày thu chi" />
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            layout='row'
                        />
                        <TextInput style={styles.input} value={amount} onChangeText={(txt) => setAmount(txt)} placeholder="Giá tiền" />
                        <Button title="Sửa" onPress={() => handleUpdateSpending()} />

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SpendingScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 7,
        margin: 8,

    },
    inputSearch: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 7,
        margin: 8,
        width: '80%'
    }
});
