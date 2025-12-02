import { Text, View, StyleSheet, Pressable, Image, TextInput, ActivityIndicator } from "react-native";
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const navigation = useNavigation();
    const { register, error: authError, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');

        // Basic validation
        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        if (!password.trim()) {
            setError('Password is required');
            return;
        }

        if (!confirmPassword.trim()) {
            setError('Please confirm your password');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!agreeToTerms) {
            setError('Please agree to the terms and conditions');
            return;
        }

        try {
            await register(email, password, confirmPassword);
            // Navigation will be handled by the navigation logic based on auth state
            navigation.replace('Survey');
        } catch (err) {
            setError(authError || 'Registration failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginHorizontal: 40, marginTop: 0, gap: 18, width: "24rem" }}>
                    <Image source={require('../../../assets/images/Logo.png')}
                        style={{ width: 420, height: 128, resizeMode: "contain", alignSelf: "center", marginBottom: 20 }} />
                    
                    {(error || authError) && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error || authError}</Text>
                        </View>
                    )}

                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        editable={!isLoading}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#999999"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        editable={!isLoading}
                        secureTextEntry={true}
                        placeholderTextColor="#999999"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        editable={!isLoading}
                        secureTextEntry={true}
                        placeholderTextColor="#999999"
                    />

                    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
                        <Checkbox
                            value={agreeToTerms}
                            onValueChange={setAgreeToTerms}
                            disabled={isLoading}
                            style={{ marginTop: 4 }}
                        />
                        <Text style={{ color: "#666666", flex: 1, paddingTop: 2 }}>
                            I agree to the Terms and Conditions
                        </Text>
                    </View>

                    <Pressable
                        style={[styles.button, isLoading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
                        )}
                    </Pressable>
                </View>
                <Text style={{ marginTop: "1rem", marginBottom: "1rem", color: "#666666" }}>Or Register Using</Text>

                <View style={{ flexDirection: "row", gap: 20, justifyContent: 'center' }}>
                    <Pressable onPress={() => { /* handle Google login */ }} disabled={isLoading}>
                        <Image
                            source={require('../../../assets/images/AuthGoogle.png')}
                            style={{ width: 50, height: 50, resizeMode: "contain" }}
                        />
                    </Pressable>
                    <Pressable onPress={() => { /* handle Facebook login */ }} disabled={isLoading}>
                        <Image
                            source={require('../../../assets/images/AuthFacebook.png')}
                            style={{ width: 50, height: 50, resizeMode: "contain" }}
                        />
                    </Pressable>

                </View>

                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'center' }}>
                    <Text style={{ color: "#666666" }}>Already have an account? </Text>
                    <Pressable onPress={() => navigation.navigate("Login")} disabled={isLoading}>
                        <Text style={{ color: "#d94a08", fontStyle: "underline" }}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6f881",
        width: "100%",          // fill full width of viewport
    },
    content: {
        flex: 1,
        justifyContent: "center", // center vertically
        alignItems: "center",     // center horizontally
        backgroundColor: "white",
        borderRadius: 500,
        marginVertical: 30,
        shapeOutside: 'circle()',
        marginHorizontal: -80,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "#d94a08",
        borderRadius: 5,
        width: "100%",            // full width of parent
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
    },
    buttonDisabled: {
        backgroundColor: "#b83a06",
        opacity: 0.6,
    },
    TextInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        color: "#666666",
        width: "100%",            // makes input stretch too
    },
    errorContainer: {
        backgroundColor: '#fee',
        borderColor: '#c33',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    errorText: {
        color: '#c33',
        fontSize: 14,
        fontWeight: '500',
    },
});
