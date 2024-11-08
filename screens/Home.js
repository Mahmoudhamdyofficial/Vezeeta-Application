import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Swiper from 'react-native-swiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';



const { width } = Dimensions.get('window');

const slides = [
    {
        title: 'Save up to 80% on all medical services with Shamel. ',
        title2: '(Available in Cairo and Giza for now)',
        source: require('../assets/shamel logo.png'),
    },
    {
        title: 'Licensed & Personalized Therapists.',
        title2: 'Save up to 35% on online sessions.',
        title3: ' Exclusive On-Demand Support.',
        source: require('../assets/north.png'),
    }
];

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.logobox}>
                        <Image style={styles.img} resizeMode='contain' source={require('../assets/vezeelogo.png')} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <Image style={styles.imgstick} resizeMode='contain' source={require('../assets/clinicvisit.png')} />
                            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                                <Text style={styles.icontext}>Clinic Visit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                            <Image style={styles.imgstick} resizeMode='contain' source={require('../assets/pharmasy.png')} />
                            <Text style={styles.icontext}>Pharmacy</Text>
                        </View>
                        <View style={styles.box}>
                            <Image style={styles.imgstick} resizeMode='contain' source={require('../assets/doctorcall.png')} />
                            <Text style={styles.icontext}>Doctor Call</Text>
                        </View>
                    </View>
                    {/* Second Row of Icons */}
                    <View style={styles.row}>
                        <View style={styles.box}>
                            <Image style={styles.imgstick} resizeMode='contain' source={require('../assets/homevisit.png')} />
                            <Text style={styles.icontext}>Home Visit</Text>
                        </View>
                        <View style={styles.box}>
                            <Image style={styles.imgstick} resizeMode='contain' source={require('../assets/doctor.png')} />
                            <Text style={styles.icontext}>Procedures</Text>
                        </View>
                        <View style={styles.box}>
                            <Image style={styles.imgstick} resizeMode='contain' source={require('../assets/labs.png')} />
                            <Text style={styles.icontext}>Labs & Scans</Text>
                        </View>
                    </View>

                    <View style={styles.swiperContainer}>
                        <Swiper
                            autoplay
                            loop
                            showsPagination
                            dotStyle={styles.dot}
                            activeDotStyle={styles.activeDot}
                            style={styles.wrapper}
                        >
                            {slides.map((slide, index) => (
                                <View style={styles.slide} key={index}>
                                    <Image source={slide.source} style={styles.image} />
                                    <Text style={styles.title}>{slide.title}</Text>
                                    <Text style={styles.title2}>{slide.title2}</Text>
                                    <Text style={styles.title2}>{slide.title3}</Text>

                                    <TouchableOpacity style={styles.button} onPress={() => alert('Button Pressed')}>
                                        <Text style={styles.buttonText}>See Details</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </Swiper>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <View style={styles.book}>
                            <Text style={styles.booktext}>Book Clinic Appointment</Text>
                            <TextInput
                                placeholder="  Search For specialty ,doctor ,or hospital"
                                style={styles.input}
                                onFocus={() => navigation.navigate('Search')} ></TextInput>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.insurance}>
                        <View style={styles.insuricon}><AntDesign name="Safety" size={34} color='rgb(0,112,205)' /></View>
                        <View style={styles.insurtext}>
                            <Text style={styles.insurhead}>My Insurance</Text>
                            <Text style={styles.insurtitle}>Book a doctor or buy medicine with insurance</Text>
                        </View>
                        <View><AntDesign name="right" size={24} color="grey" /></View>
                    </View>
                    <View style={styles.win10}>
                        <View style={styles.startwin}>
                            <Text style={styles.wintext}>Hit your daily steps target and win 10 EGP every day</Text>
                            <TouchableOpacity style={styles.winbtn} onPress={() => alert('Button Pressed')}>
                                <Text style={styles.getstart}>Get Started</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <Image style={styles.winimg} resizeMode='contain' source={require('../assets/win.png')} />
                        </View>
                    </View>
                    <View style={styles.insurance}>
                        <View style={styles.insuricon}><Entypo name="chat" size={34} color='rgb(0,112,205)' /></View>
                        <View style={styles.questext}>
                            <Text style={styles.insurhead}>Have a Medical Question?</Text>
                            <Text style={styles.insurtitle}>Ask a doctor for free and get a response in 24 hours</Text>
                        </View>
                        <TouchableOpacity style={styles.quesbtn} onPress={() => alert('Button Pressed')}>
                            <Text style={styles.btntxt}>Ask Now</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.medicalbox}>
                        <View style={styles.medbox}>
                            <Text style={styles.insurhead}>Home Visit</Text>
                            <Text style={styles.insurtitle}>Choose the speciality ,and the doctor will visit you at home</Text>
                            <TouchableOpacity style={styles.quesbtn} onPress={() => alert('Button Pressed')}>
                                <Text style={styles.btntxt}>Book Visit</Text>
                            </TouchableOpacity>
                        </View>
                        <View ><Image style={styles.callhomeimg} resizeMode='contain' source={require('../assets/girl.jpeg')} /></View>


                    </View>
                    <View style={styles.medicalbox}>
                        <View style={styles.medbox}>
                            <Text style={styles.insurhead}>Doctor Call</Text>
                            <Text style={styles.insurtitle}>Schedule a voice or video call with a specialized doctor</Text>
                            <TouchableOpacity style={styles.quesbtn} onPress={() => alert('Button Pressed')}>
                                <Text style={styles.btntxt}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View><Image style={styles.callimg} resizeMode='contain' source={require('../assets/Consult.png')} /></View>


                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgb(221,221,221)',
        flex: 1,
    },
    img: {
        height: 30,
        alignSelf: 'flex-start',
        width: '40%',
    },
    logobox: {
        width: '100%',
        paddingVertical: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    imgstick: {
        height: 70,
        width: '70%',
    },
    box: {
        width: '30%',
        backgroundColor: 'white',
        padding: 7,
        borderRadius: 10,
        alignItems: 'center',
    },
    icontext: {
        color: 'rgb(15,14,14)',
        textAlign: 'center',
    },
    swiperContainer: {
        marginTop: 15,
        height: 260,
        backgroundColor: 'rgb(0,112,205)',
        margin: 15,
        borderRadius: 15,
        paddingTop: 10
    },
    wrapper: {
        height: 260,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: width * 0.9,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 7,
        color: 'white',
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    title2: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',

    },
    buttonText: {
        color: 'rgb(0,112,205)',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    dot: {
        backgroundColor: '#ddd',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#00aaff',
    },
    book: {
        borderRadius: 5,
        backgroundColor: 'white',
        paddingVertical: 22,
        paddingHorizontal: 15,
        margin: 10
    },
    booktext: {
        fontWeight: 'bold',
        paddingBottom: 10,
        color: 'rgb(53,59,69)'
    },
    input: {
        height: 40,
        borderColor: 'rgb(238,238,238)',
        borderWidth: 1,
        padding: 12,
        borderRadius: 5,
    }
    ,
    insurance: {
        borderRadius: 5,
        backgroundColor: 'white',
        paddingVertical: 22,
        paddingHorizontal: 15,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    insurtext: {
        width: '78%',
    },
    insurhead: {
        fontWeight: 'bold',
        color: 'rgb(53,59,69)'
    },
    insurtitle: {
        color: 'rgb(53,59,69)',
        marginTop: 6
    },
    win10: {
        borderRadius: 5,
        backgroundColor: 'rgb(0,112,205)',
        paddingVertical: 12,
        paddingHorizontal: 15,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    startwin: {
        width: '60%'
    }
    , winimg: {
        height: 150,
        width: 120
    },
    wintext: {
        color: "white"
    },
    winbtn: {
        backgroundColor: 'white',
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
    },
    getstart: { color: 'rgb(0,112,205)', fontWeight: 'bold', alignSelf: 'center' },
    questext: { width: '52%' },
    quesbtn: {
        backgroundColor: 'rgb(229,241,255)',
        paddingVertical: 13,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginTop: 10,
    }
    , btntxt: {
        alignSelf: 'center',
        color: 'rgb(0,112,205)'
    },
    callhomeimg: {
        height: 140,
        width: 140,
        transform: [{ scaleX: -1 }],
        marginTop: 'auto'

    },
    callimg: {
        height: 140,
        width: 140,
        marginTop: 'auto'
    },
    medicalbox: {
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    medbox: {
        width: '60%',
        padding: 17
    },


});
