import { StyleSheet, Text, View, SafeAreaView, Image, Linking, ScrollView, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faShieldAlt, faCreditCard, faQuestionCircle, faHeart, faCoins } from '@fortawesome/free-solid-svg-icons'; // Importing icons from FontAwesome
import { StatusBar } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function Profile({ navigation }) {

    const { isLoggedIn, logout } = useContext(AuthContext);
    const dataArray = [
        { id: '1', title: 'My Account', icon: faUser },
        { id: '2', title: 'My Questions', icon: faQuestionCircle },
        { id: '3', title: 'Vezeeta Points', icon: faCoins },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {isLoggedIn ? <>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.head1}>Welcome to Vezeeta!</Text>
                        <Text style={styles.num}>Vezeeta is best for your healthcare </Text>
                    </View>
                    <View>
                        <View style={styles.sectionaccount}>
                            <TouchableOpacity onPress={() => navigation.navigate('appoint')}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <MaterialIcons name="date-range" size={26} color="rgb(0,110,209)" style={styles.icons} />
                                    <Text
                                        style={styles.account}

                                    >My appointments</Text>
                                </View>
                            </TouchableOpacity>
                            <Feather name="arrow-right" size={26} color="rgb(145,144,146)" />

                        </View>
                        <View style={styles.dividerThin} />
                    </View>
                    <View style={styles.divider} />


                    {dataArray.map(item => (
                        <View key={item.id}>
                            <View style={styles.sectionaccount}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <FontAwesomeIcon icon={item.icon} size={26} color="rgb(0,110,209)" style={styles.icons} />
                                    <Text
                                        style={styles.account}

                                    >
                                        {item.title}
                                    </Text>
                                </View>
                                <Feather name="arrow-right" size={26} color="rgb(145,144,146)" />
                            </View>
                            <View style={styles.dividerThin} />
                        </View>
                    ))}



                    <View style={styles.dividerThin2} />
                    <View style={styles.sectionshamelsupp}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="help-circle" size={28} color="rgb(0,110,209)" />
                            <Text
                                style={styles.linkText}

                            >
                                Support
                            </Text>
                        </View>
                        <Feather name="arrow-right" size={30} color="rgb(145,144,146)" />
                    </View>
                    <View style={styles.dividerThin} />


                    <View style={styles.sectionshamelsupp}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Feather name="settings" size={28} color="rgb(0,110,209)" />
                            <Text
                                style={styles.linkText}

                            >
                                Settings
                            </Text>
                        </View>
                        <Feather name="arrow-right" size={30} color="rgb(145,144,146)" />
                    </View>
                    <View style={styles.dividerThin} />
                    <View style={styles.dividerThin2} />
                    <TouchableOpacity onPress={() => {
                        logout();
                        navigation.navigate('Login');
                    }}>
                        <View style={styles.sectionshamelsupp}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="log-out" size={26} color="grey" />
                                <Text
                                    style={styles.linkText}

                                >
                                    Logout
                                </Text>
                            </View>
                            <Feather name="arrow-right" size={26} color="rgb(145,144,146)" />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.dividerThin} />




                    <View style={styles.footer}>
                        <Text style={styles.footertxt}> <Feather name="facebook" size={30} color="rgb(145,144,146)" />           <Feather name="linkedin" size={30} color="rgb(145,144,146)" />        <Feather name="instagram" size={30} color="rgb(145,144,146)" />
                        </Text>
                        <Text style={styles.footertxt1}>Terms of use   -      Privacy policy</Text>
                        <Text style={styles.footertxt1}>Version 12.4.6</Text>
                    </View>
                </ScrollView>
            </>
                : <>
                    {/* swapping when login */}
                    <View style={styles.boxx}>
                        <View>
                            <Text style={styles.head1}>Welcome to Vezeeta!</Text>
                            <Text style={styles.num}>Log in and enjoy the best healthcare experience</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signup')}
                        >
                            <Text style={styles.buttonText}>SignUp / Login</Text>
                        </TouchableOpacity>
                        <View style={styles.footer2}>
                            <Text style={styles.footertxt}> <Feather name="facebook" size={30} color="rgb(145,144,146)" />           <Feather name="linkedin" size={30} color="rgb(145,144,146)" />        <Feather name="instagram" size={30} color="rgb(145,144,146)" />
                            </Text>
                            <Text style={styles.footertxt1}>Terms of use   -      Privacy policy</Text>
                            <Text style={styles.footertxt1}>Version 12.4.6</Text>
                        </View>
                    </View>
                </>}


            <StatusBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 18,
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(242,243,244)',
    },

    head1: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    num: {
        color: 'grey',
        fontSize: 15,
        padding: 4,
    },
    sectionshamel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    sectionshamelsupp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
    },
    sectionaccount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    account: {
        padding: 6,
        fontSize: 19,
        fontWeight: '300',
    },
    linkText: {
        color: 'black',
        padding: 5,
        fontSize: 20,
        fontWeight: '300',
    },
    divider: {
        borderBottomColor: 'rgb(237,240,245)',
        borderBottomWidth: 3,
    },
    dividerThin: {
        borderBottomColor: 'rgb(237,240,245)',
        borderBottomWidth: 1,
    },


    dividerThin2: {
        borderBottomColor: 'rgb(237,240,245)',
        borderBottomWidth: 5,
        backgroundColor: 'rgb( 243,243,246)',
    },
    footer: {
        padding: 25,
        backgroundColor: 'rgb(240,240,240)',
        alignItems: 'center',
    },
    footer2: {
        padding: 25,
        backgroundColor: 'rgb(240,240,240)',
        alignItems: 'center',
        marginTop: 'auto',
    },
    footertxt: {
        padding: 5,
    },
    footertxt1: {
        margin: 3,
        color: 'grey',
    },
    button: {
        backgroundColor: "rgb(0,112,205)",
        paddingVertical: 18,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    boxx: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        height: '100%'
    }
});

