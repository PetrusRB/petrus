import { TextInput, Text, TouchableOpacity, View, Animated, Easing } from "react-native";
import Card from "../card";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeSlash } from "@nandorojo/heroicons/24/solid";

type AuthFormProps = {
    isLoginIn: 'login' | 'register';
};

const AuthInput = ({ isLoginIn }: AuthFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <>
            {isLoginIn === 'register' && (
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#888"
                    style={{ marginBottom: 15, padding: 10, backgroundColor: 'white', borderRadius: 8, elevation: 2 }}
                />
            )}
            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                style={{ marginBottom: 15, padding: 10, backgroundColor: 'white', borderRadius: 8, elevation: 2 }}
                keyboardType="email-address"
            />
            <View style={{ position: 'relative', marginBottom: 15 }}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!showPassword}
                    style={{ padding: 10, backgroundColor: 'white', borderRadius: 8, elevation: 2 }}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 10, top: '30%' }}
                >
                    {showPassword ? (
                        <EyeSlash color="#888" />
                    ) : (
                        <Eye color="#888" />
                    )}
                </TouchableOpacity>
            </View>
        </>
    )
}

const AuthForm = () => {
    const [isLogin, setIsLoginIn] = useState<'login' | 'register'>('register');
    const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity animation
    const translateYAnim = useRef(new Animated.Value(0)).current; // Vertical translation animation

    const toggleMode = () => {
        // Animate fade out and slide up
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: -20,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Toggle login/register state
            setIsLoginIn(isLogin === 'login' ? 'register' : 'login');

            // Reset animations and animate fade in and slide down
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    return (
        <>
            <Card style={{ width: '90%', maxWidth: 400, alignSelf: 'center', borderRadius: 10, overflow: 'hidden', elevation: 5 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'linear-gradient(to bottom right, #4A90E2, #9013FE)', padding: 20 }}>
                    <Animated.Text
                        style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'black',
                            marginBottom: 20,
                            opacity: fadeAnim,
                            transform: [{ translateY: translateYAnim }],
                        }}
                    >
                        {isLogin === "login" ? "Bem vindo(a) de volta!" : "Seja bem vindo(a) ao Petrus!"}
                    </Animated.Text>
                    <Animated.View
                        style={{
                            width: '100%',
                            opacity: fadeAnim,
                            transform: [{ translateY: translateYAnim }],
                        }}
                    >
                        <AuthInput isLoginIn={isLogin} />
                        <TouchableOpacity
                            style={{ padding: 15, backgroundColor: '#fdc719', borderRadius: 8, alignItems: 'center', elevation: 3 }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Text style={{ marginTop: 20, fontSize: 14, color: 'black' }}>
                        <Text>
                            {isLogin === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <Text
                                style={{ color: '#000', textDecorationLine: 'underline' }}
                                onPress={toggleMode}
                            >
                                {isLogin === 'login' ? 'Sign Up' : 'Sign In'}
                            </Text>
                        </Text>
                    </Text>
                </View>
            </Card>
        </>
    )
}

export { AuthForm }