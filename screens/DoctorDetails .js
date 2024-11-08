

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Button, Image, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { db, auth } from '../firebaseConfig';
import { addDoc, doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { useAuth } from '../useAuth';

const DoctorDetails = ({ route, navigation }) => {
    const { doctor } = route.params;
    const { user, isLoggedIn } = useAuth();
    const [availableAppointments, setAvailableAppointments] = useState({});
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const getFormattedDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const docRef = doc(db, 'doctor', doctor.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const appointments = docSnap.data().availableAppointments || [];

                    const groupedAppointments = appointments.reduce((acc, timestamp) => {
                        const formattedDate = getFormattedDate(timestamp);
                        if (!acc[formattedDate]) {
                            acc[formattedDate] = [];
                        }
                        acc[formattedDate].push(formattedDate);
                        return acc;
                    }, {});
                    setAvailableAppointments(groupedAppointments);
                } else {
                    Alert.alert('Error', 'Doctor data not found.');
                }

                const bookedQuery = query(collection(db, "appointments"), where("doctorId", "==", doctor.id));
                const bookedSnapshot = await getDocs(bookedQuery);
                const bookedTimes = bookedSnapshot.docs.map(doc => ({
                    date: getFormattedDate(doc.data().date),
                    time: doc.data().time,
                }));
                setBookedAppointments(bookedTimes);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch appointments.');
            }
        };

        fetchDoctor();
    }, [doctor.id]);

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please select both date and time.');
            return;
        }

        const isBooked = bookedAppointments.some((appointment) =>
            appointment.date === selectedDate && appointment.time === selectedTime
        );
        if (isBooked) {
            Alert.alert('Error', 'This time is already booked.');
            return;
        }

        Alert.alert(
            'Confirm Booking',
            ` Do you want to book an appointment at ${selectedTime} on ${selectedDate} ?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            if (!isLoggedIn || !user) {
                                Alert.alert('Error', 'User not logged in');
                                navigation.navigate('Login')
                                return;
                            }

                            // Add to Firestore appointments collection
                            await addDoc(collection(db, 'appointments'), {
                                currentUserId: user.uid,
                                date: selectedDate,
                                doctorId: doctor.id,
                                doctorName: doctor.name,
                                time: selectedTime,
                                status: 'pending'
                            });

                            Alert.alert('Success', 'Appointment booked successfully!');
                            setBookedAppointments(prev => [...prev, { date: selectedDate, time: selectedTime }]);
                        } catch (error) {
                            Alert.alert('Error', 'Failed to book appointment. Please try again.');
                        }
                    }
                }
            ]
        );
    };

    const handleNext = () => {
        const dates = Object.keys(availableAppointments);
        if (currentIndex < dates.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const renderItem = ({ item }) => {
        const dayKey = Object.keys(availableAppointments)[currentIndex];
        const times = availableAppointments[dayKey] || [];

        return (
            <View style={styles.card}>
                <Text style={styles.cardHeader}>{dayKey}</Text>
                <View style={styles.cardBody}>
                    {times.map((time, index) => (
                        <TouchableOpacity key={index} onPress={() => {
                            setSelectedDate(dayKey);
                            setSelectedTime(time);
                        }}>
                            <Text style={styles.timeText}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.doctorcard}>
                <Image source={{ uri: doctor.imageUrl }} style={styles.image} />
                <View style={styles.doctext}>
                    <Text style={styles.name}>Doctor {doctor.name}</Text>
                    <Text style={styles.pref}>{doctor.pref}</Text>
                </View>
            </View>
            <View style={styles.fields}>
                <FontAwesome style={styles.icons} name="ticket" size={25} color="rgb(0,112,205)" />
                <Text style={styles.qualif}><Text style={{ color: "rgb(84,101,111)" }}>Consultation Fees:</Text> {doctor.Cost} EGP</Text>
            </View>
            <View style={styles.fields}>
                <Entypo style={styles.icons} name="time-slot" size={25} color="rgb(0,112,205)" />
                <Text style={styles.qualif}><Text style={{ color: "rgb(84,101,111)" }}>Waiting Time:</Text> {doctor.Wating} Minutes</Text>
            </View>
            <View style={styles.fields}>
                <SimpleLineIcons style={styles.icons} name="location-pin" size={25} color="rgb(0,112,205)" />
                <Text style={styles.qualif}><Text style={{ color: "rgb(84,101,111)" }}>Location:</Text> {doctor.clinicLocation} </Text>
            </View>
            <View style={styles.slidcontainer}>
                <Text style={styles.footerText}>Choose your Appointment</Text>
                <View style={styles.buttonContainer}>
                    <Button title="<" onPress={handlePrev} disabled={currentIndex === 0} />
                    <FlatList
                        data={[{ title: Object.keys(availableAppointments)[currentIndex], times: availableAppointments[Object.keys(availableAppointments)[currentIndex]] }]}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.cardBody}
                    />
                    <Button title=">" onPress={handleNext} disabled={currentIndex === Object.keys(availableAppointments).length - 1} />
                </View>
                <Button title="Book Appointment" onPress={handleBooking} disabled={!selectedDate || !selectedTime} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'rgb(221,221,221)' },
    doctorcard: { flexDirection: "row", backgroundColor: 'white', padding: 20, marginBottom: 3 },
    image: { width: 90, height: 90, borderRadius: 10, marginBottom: 20, marginRight: 5 },
    doctext: { width: "75%" },
    name: { fontSize: 18, fontWeight: 'bold', color: 'rgb(0,112,205)', },
    pref: { color: 'rgb(84,101,111)', marginBottom: 10 },
    fields: { backgroundColor: "white", padding: 20, flexDirection: "row", marginBottom: 1 },
    qualif: { color: 'black', width: "95%" },
    icons: { marginRight: 15 },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#f5f5f5',
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: 30
    },
    cardHeader: {
        backgroundColor: '#0070cd',
        color: '#fff',
        textAlign: 'center',
        padding: 8,
        fontWeight: 'bold',
    },
    cardBody: {
        padding: 10,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    footerText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    slidcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        marginBottom: 1
    }
});

export default DoctorDetails;
