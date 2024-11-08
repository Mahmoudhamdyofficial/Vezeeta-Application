
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Entypo from '@expo/vector-icons/Entypo';


const Search = ({ navigation }) => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const doctorsCollection = collection(db, 'doctor');
            const doctorSnapshot = await getDocs(doctorsCollection);
            const doctorList = doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDoctors(doctorList);
            setFilteredDoctors(doctorList);
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDoctors(filtered);
    }, [searchQuery, doctors]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for specialty, doctor, or hospital"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredDoctors}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('details', { doctor: item })}
                    >
                        <View style={styles.doctorBox}>
                            <View style={styles.doctorInfo}>
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    style={styles.doctorImage}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.docword}>Doctor</Text>
                                        <Text style={styles.doctorName}>{item.name}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.pref}>{item.pref}</Text>
                                    </View>
                                </View>

                            </View>
                            <View style={styles.doctorDetails}>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialCommunityIcons style={styles.icons} name="medical-bag" size={18} color="rgb(0,112,205)" />
                                    <Text style={styles.qulaif} numberOfLines={1} ellipsizeMode="tail">{item.qualifications}</Text>

                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                                    <SimpleLineIcons style={styles.icons} name="location-pin" size={18} color="rgb(0,112,205)" />
                                    <Text style={styles.qulaif} numberOfLines={1} ellipsizeMode="tail">{item.clinicLocation}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                                    <FontAwesome style={styles.icons} name="ticket" size={18} color="rgb(0,112,205)" />
                                    <Text style={styles.qulaif} numberOfLines={1} ellipsizeMode="tail">Fees:{item.Cost} EGP</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Entypo style={styles.timeicon} name="time-slot" size={18} color="green" />
                                    <Text style={styles.greentext} numberOfLines={1} ellipsizeMode="tail">Waiting Time:{item.Wating} Minutes </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        margin: 20
    },
    doctorBox: {
        marginVertical: 5,
        borderBottomColor: 'rgb(230, 230, 230)',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: "rgb(230, 230, 230)"
    },
    doctorImage: {
        width: 65,
        height: 65,
        borderRadius: 32,
        marginHorizontal: 15,
        marginVertical: 15
    },
    doctorInfo: {
        backgroundColor: "rgb(246,246,246)",
        flexDirection: 'row'
    },
    doctorDetails: {
        backgroundColor: "rgb(255,255,255)",
        padding: 10
    },
    docword: {
        color: "rgb(0,112,205)",
        marginTop: 18,
        marginRight: 5
    },
    doctorName: {
        fontSize: 18,
        color: "rgb(0,112,205)",
        fontWeight: 'bold'
        , marginTop: 15

    },
    pref: {
        color: 'rgb(84,101,111)',
        marginTop: 9,
        width: 250
    },
    icons: {
        borderBottomWidth: 2,
        borderColor: "red",
        width: 18, marginRight: 9, paddingBottom: 2
    },
    timeicon: {
        borderBottomWidth: 2,
        borderColor: "green",
        width: 18, marginRight: 9, paddingBottom: 2
    },
    qulaif: {
        fontSize: 14,
        color: 'rgb(84,101,111)',
    },
    greentext: {
        fontSize: 14,
        color: 'green',
    }
});

export default Search;
