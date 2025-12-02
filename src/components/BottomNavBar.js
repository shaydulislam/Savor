import React from 'react';
import { View, Text, Pressable, Image, StyleSheet, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BottomNavBar() {
    const navigation = useNavigation();
    const route = useRoute();
    const active = route.name;

    const icons = {
        Home: require('../../assets/Button/Home.png'),
        Discover: require('../../assets/Button/Discover.png'),
        Saved: require('../../assets/Button/Saved.png'),
        Community: require('../../assets/Button/Community.png'),
        Profile: require('../../assets/Button/Profile.png'),
    };

    const items = [
        { key: 'Home', label: 'Home' },
        { key: 'Discover', label: 'Discover' },
        { key: 'Saved', label: 'Saved' },
        { key: 'Community', label: 'Community' },
        { key: 'Profile', label: 'Profile' },
    ];

    return (
        <View style={styles.container} pointerEvents="box-none">
            <View style={styles.inner}>
                {items.map((it) => {
                    const isActive = active === it.key;
                    return (
                        <Pressable
                            key={it.key}
                            onPress={() => navigation.navigate(it.key)}
                            style={({ pressed }) => [
                                styles.button,
                                isActive && styles.buttonActive,
                                pressed && styles.buttonPressed,
                            ]}
                            accessibilityLabel={it.label}
                        >
                            <Image
                                source={icons[it.key]}
                                style={[styles.icon, isActive && styles.iconActive]}
                                resizeMode="contain"
                            />
                            <Text style={[styles.label, isActive && styles.labelActive]}>
                                {it.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const barHeight = Platform.OS === 'ios' ? 84 : 64;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: barHeight,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    },
    inner: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '96%',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 6,
        elevation: 6,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    buttonPressed: {
        opacity: 0.7,
    },
    buttonActive: {},
    icon: {
        width: 22,
        height: 22,
        marginBottom: 4,
        tintColor: '#666',
    },
    iconActive: {
        tintColor: '#d94a08', // active color
    },
    label: {
        fontSize: 11,
        color: '#666',
    },
    labelActive: {
        color: '#d94a08',
        fontWeight: '600',
    },
});