import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../res/themes/useTheme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TextField from "../common/textfield";
import AuthButton from "../common/authbutton";
import GoogleAuth from "../common/googleAuthButton";
import { ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { forgotThunk, loginThunk, signupThunk } from "../../redux/thunk/AuthThunk";
import { RootParamList } from "../navigation/types/RootStackParamList";
import { sessionUseCases } from "../../core/session/sessionModule";



const AuthScreen = () => {
    const { status, error } = useAppSelector((state) => state.auth);

    const isLoading = status === "loading";

    type AuthNavigationProp = NativeStackNavigationProp<
        RootParamList,
        "AuthScreen"
    >;

    const navigation = useNavigation<AuthNavigationProp>();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isauthChange, setAuthChange] = useState(false)
    const bottomtext = !isauthChange ? "Sign Up for free" : "Sign In"
    const accountnameChange = !isauthChange ? "Don't have an account?" : "Already have an account?"
    const [isRecovery, setRecovery] = useState(false)
    const title = !isauthChange ? "Hello Again!" : "Create Account"
    const description = !isauthChange
        ? "Welcome back. You've been missed!"
        : "Please enter your email address to receive a verification code."
    const forgotTitle = !isRecovery ? title : "Recovery Password"
    const forgotDescription = !isRecovery ? description : "Please Enter Your Email Address To Recieve a Verification Code"
    const authText = !isauthChange ? "Sign In" : "Sign Up"
    const authText2 = !isRecovery ? authText : "Continue"

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleAuth = async () => {
        try {
            if (isRecovery) {
                await dispatch(forgotThunk({ email })).unwrap();
                return;
            }

            const didAuthSucceed = isauthChange
                ? await dispatch(signupThunk({ email, password })).unwrap()
                : await dispatch(loginThunk({ email, password })).unwrap();

            if (didAuthSucceed) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "HomeScreen" as never }],
                });
            }
        } catch (_error) {
            // errors are surfaced via redux state; no-op here
        }
    }

    const handleGoBack = () => {
        if (isRecovery) {
            setRecovery(false);
            return;
        }

        if (isauthChange) {
            setAuthChange(false);
            return;
        }

        navigation.reset({
            index: 0,
            routes: [{ name: "OnBoarding" as never }],
        });
    };



    return (
        <ScrollView>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={[styles.arrowBackIcon, { backgroundColor: theme.icon }]}>
                    <Pressable onPress={handleGoBack}
                        hitSlop={10}// increase touchable area
                    >
                        <Ionicons name="arrow-back" size={moderateScale(18)} color={theme.text} />
                    </Pressable>
                </View>

                <Text style={[styles.hello, { color: theme.text }]}>
                    {forgotTitle}
                </Text>
                <Text style={[styles.welcomeback, { color: theme.borderColor }]}>
                    {forgotDescription}

                </Text>
                {isauthChange &&
                    <TextField heading="Your Name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize='none'
                        keyboardType='default'
                        placeholder="Ex-Shashank"
                    />
                }
                <TextField
                    heading="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Enter your email"
                />

                {!isRecovery &&
                    <TextField
                        heading="Password"
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                        autoCapitalize="none"
                        placeholder="Enter your password"
                    />
                }

                {!isauthChange && !isRecovery &&

                    <TouchableOpacity
                        onPress={() => {
                            resetInputs();
                            setRecovery((it) => !it);
                        }}
                        style={[styles.recovery]}>
                        <Text style={{ color: theme.borderColor }}>
                            Recovery Password
                        </Text>
                    </TouchableOpacity>
                }

                {error ? <Text style={{ color: "#fa0b33" }}>{error}</Text> : null}

                <AuthButton authState={authText2} onPress={handleAuth}
                    disabled={isLoading}
                    loading={isLoading}
                />

                {!isRecovery &&
                    <GoogleAuth />
                }

                {!isRecovery &&

                    <View style={styles.bottomContainer}>
                        <View style={styles.haveAnAccount}>
                            <Text style={[{ color: theme.borderColor },
                            { marginEnd: moderateScale(4) }]}>
                                {accountnameChange}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                resetInputs();
                                setAuthChange((it) => !it);
                            }}>
                                <Text style={[styles.signUpText, { color: theme.text }]}>
                                    {bottomtext}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

            </View>
        </ScrollView>
    )



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(16)
    },
    arrowBackIcon: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(50),

        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: moderateScale(50),
        shadowColor: '#686262',
        elevation: moderateScale(5),
        marginBottom: moderateScale(32),
        marginTop: moderateScale(16)
    },
    hello: {
        fontSize: moderateScale(28),
        fontWeight: "600",
        alignSelf: 'center'

    },
    welcomeback: {
        fontSize: moderateScale(16),
        alignSelf: 'center',
        textAlign: 'center',
        lineHeight: moderateScale(22),
        marginBottom: moderateScale(50)
    },
    recovery: {
        flexDirection: 'row-reverse',
        marginTop: moderateScale(12),
        fontSize: moderateScale(13),
        marginEnd: moderateScale(4)
    },
    haveAnAccount: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    bottomContainer: {
        marginTop: 'auto',
        paddingBottom: moderateScale(16),
    },
    signUpText: {
        fontWeight: "700",
    },

})

export default AuthScreen;
