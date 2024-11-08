

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, ScrollView, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const currentDate = selectedDate;
            setBirthDate(currentDate.toLocaleDateString());
        }
    };


    const handleSignUp = async () => {
        let isValid = true;
        if (!name || !phone || !email || !gender || !birthDate || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }
        if (!isValid) return;

        try {

            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const uid = userCredential.user.uid;  // Get the UID of the registered user

            // Use setDoc instead of addDoc to set the document with the UID as the document ID
            await setDoc(doc(db, 'User', uid), {
                name,
                phone,
                email,
                gender,
                birthDate,
                password,
                uid
            });

            Alert.alert('Success', 'User registered successfully');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during registration: ', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headtext}>Create an account</Text>

                    <Text style={styles.label}>Name *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Full Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Mobile Number *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Your Phone"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    <Text style={styles.label}>Email Address *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@domain.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <Text style={styles.label}>Gender *</Text>
                    <View style={styles.radioGroup}>
                        <RadioButton
                            value="Female"
                            status={gender === 'Female' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('Female')}
                        />
                        <Text style={styles.radioText}>Female</Text>
                        <RadioButton
                            value="Male"
                            status={gender === 'Male' ? 'checked' : 'unchecked'}
                            onPress={() => setGender('Male')}
                        />
                        <Text style={styles.radioText}>Male</Text>
                    </View>

                    <Text style={styles.label}>Birth Date *</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                        <Text style={{ color: birthDate ? 'black' : '#aaa' }}>
                            {birthDate || "Select Date"}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={handleDateChange}
                        />
                    )}

                    <Text style={styles.label}>Password *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up now</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        By signing up you agree to our <Text style={styles.link}>Terms Of Use</Text>
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerText}>
                            Already have an account? <Text style={styles.link}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    label: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioText: {
        marginRight: 20,
    },
    button: {
        backgroundColor: "rgb(0,112,205)",
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 15,
        color: '#888',
    },
    link: {
        color: 'blue',
    },
    headtext: {
        textAlign: 'center',
        color: '#888',
        fontSize: 20,
        fontWeight: 'bold',
    }
});


