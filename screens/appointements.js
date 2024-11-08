
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../useAuth';

const Appointments = () => {
    const { user } = useAuth(); // Get user data from the AuthContext
    const [appointments, setAppointments] = useState([]);

    // Fetch appointments for the current user
    const fetchAppointments = async () => {
        try {
            if (user && user.uid) {
                const appointmentsQuery = query(
                    collection(db, 'appointments'),
                    where('currentUserId', '==', user.uid)
                );
                const querySnapshot = await getDocs(appointmentsQuery);

                const userAppointments = [];
                querySnapshot.forEach((doc) => {
                    userAppointments.push({ id: doc.id, ...doc.data() });
                });
                setAppointments(userAppointments);
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user]); // Fetch appointments when user changes

    const renderItem = ({ item }) => (
        <View style={styles.appointmentCard}>
            <Text style={styles.title}>Doctor: {item.doctorName}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Time: {item.time}</Text>
            <Text>Status: {item.status || "Pending"}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Appointments</Text>
            {appointments.length > 0 ? (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.noAppointments}>No appointments booked yet.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    appointmentCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    noAppointments: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 50 },
});

export default Appointments;
