import { Text, View, StyleSheet, Pressable, Image, TextInput } from "react-native";
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginHorizontal: 40, marginTop: 0, gap: 18, width: "24rem" }}>
                    <Image source={require('../../../assets/images/Logo.png')}
                        style={{ width: 420, height: 128, resizeMode: "contain", alignSelf: "center", marginBottom: 20 }} />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email Address"
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                    />


                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            // Add your register logic
                            navigation.replace('Survey');
                        }}
                    >
                        <Text style={{ color: "white" }}>Register</Text>
                    </Pressable>
                </View>
                <Text style={{ marginTop: "1rem", marginBottom: "1rem", color: "#666666" }}>Or Register Using</Text>

                <View style={{ flexDirection: "row", gap: 20, justifyContent: 'center' }}>
                    <Pressable onPress={() => { /* handle Google login */ }}>
                        <Image
                            source={require('../../../assets/images/AuthGoogle.png')}
                            style={{ width: 50, height: 50, resizeMode: "contain" }}
                        />
                    </Pressable>
                    <Pressable onPress={() => { /* handle Facebook login */ }}>
                        <Image
                            source={require('../../../assets/images/AuthFacebook.png')}
                            style={{ width: 50, height: 50, resizeMode: "contain" }}
                        />
                    </Pressable>

                </View>

                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'center' }}>
                    <Text style={{ color: "#666666" }}>Already have an account? </Text>
                    <Pressable onPress={() => navigation.navigate("Login")}>
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
    TextInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        color: "#666666",
        width: "100%",            // makes input stretch too
    },
});
