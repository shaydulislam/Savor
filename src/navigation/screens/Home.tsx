import React, { useState } from 'react';
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

function Selectable({ item, index }: { item: string; index: number }){
    const [Selectable, setSelectable] = useState<number | null>(null);

    return (
        <Pressable
            onPress={() => setSelectable(Selectable === index ? null : index)}
            style={({ pressed }) => [
                styles.chip,
                pressed && { backgroundColor: '#e6f881' }
            ]}
        >
            <Text style={styles.chipText}>{item}</Text>
        </Pressable>
    );
}
export default function Home() {
    const [priceRange, setPriceRange] = useState(0); // Initial value for slider

    // Mock data for chips and trending, instead pull from database/api
    const ingredients = ['Chicken', 'Tofu', 'Eggs', 'Spinach'];
    const restrictions = ['Halal', 'Nuts'];
    const cuisines = ['Italian', 'Chinese'];
    const trendingIngredients = [
        { name: 'Eggs', source: require('../../../assets/images/Ingredient/eggsIngredient.jpg') },
        { name: 'Bokchoy', source: require('../../../assets/images/Ingredient/bokchoy.jpg') },
        { name: 'Tomato', source: require('../../../assets/images/Ingredient/tomatoes.jpg') },
        { name: 'Chicken', source: require('../../../assets/images/Ingredient/chicken.jpg') },
        { name: 'Beef', source: require('../../../assets/images/Ingredient/beefroast.jpg') } 
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Sustainability Bubble */}
            <View style={styles.bubbleContainer}>
                <Image
                    source={require('../../../assets/images/Icon4.png')} // Add your character asset
                    style={styles.characterImage}
                />
                <View style={styles.bubbleTextContainer}>
                    <Text style={styles.bubbleTitle}>Planning meals ahead and avoid buying more than you need. Reduces food waste and saves money!</Text>
                    <Pressable>
                        <Text style={styles.bubbleLink}>Click to see more personalized sustainability tips & tricks.</Text>
                    </Pressable>
                </View>
            </View>

            {/* Search & Generate Recipes Section */}
            <Text style={styles.sectionTitle}>Search & Generate Recipes</Text>

            {/* Ingredients */}
            <View style={styles.subSection}>
                <View style={styles.subSectionHeader}>
                    <Text style={styles.subSectionLabel}>Ingredients</Text>
                    <Pressable>
                        <Text style={styles.addMore}>Add more -</Text>
                    </Pressable>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                    {ingredients.map((item, index) => (
                            <Selectable key={index} item={item} index={index}/>
                    ))}
                </ScrollView>
            </View>

            {/* Restrictions */}
            <View style={styles.subSection}>
                <View style={styles.subSectionHeader}>
                    <Text style={styles.subSectionLabel}>Restrictions</Text>
                    <Pressable>
                        <Text style={styles.addMore}>Add more -</Text>
                    </Pressable>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                    {restrictions.map((item, index) => (
                        <Selectable key={index} item={item} index={index} />
                    ))}
                </ScrollView>
            </View>

            {/* Cuisines */}
            <View style={styles.subSection}>
                <View style={styles.subSectionHeader}>
                    <Text style={styles.subSectionLabel}>Cuisines</Text>
                    <Pressable>
                        <Text style={styles.addMore}>Add more -</Text>
                    </Pressable>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                    {cuisines.map((item, index) => (
                        <Selectable key={index} item={item} index={index} />
                    ))}
                </ScrollView>
            </View>

            {/* Price Range */}
            <View style={styles.subSection}>
                <Text style={styles.subSectionLabel}>Price Range (per person)</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={50}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    minimumTrackTintColor="#d94a08"
                    maximumTrackTintColor="#ddd"
                    thumbTintColor="#d94a08"
                />
                
                <View style={styles.sliderLabels}>
                    <Text style={styles.sliderLabel}>$0</Text>
                    <Text style={styles.sliderLabel}>$25</Text>
                    <Text style={styles.sliderLabel}>$50+</Text>
                </View>
            </View>

            {/* Search Button */}
            <Pressable style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search & Generate</Text>
            </Pressable>

            {/* Recommended & Trending Ingredients */}
            <Text style={styles.sectionTitle}>Recommended & Trending Ingredients</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: '100%' }} style={styles.trendingContainer}>
                {trendingIngredients.map((item, index) => (
                    <View key={index} style={styles.trendingItem}>
                        <Image source={item.source} style={styles.trendingImage} />
                        <Text style={styles.trendingText}>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    bubbleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e6f881',
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
    },
    characterImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    bubbleTextContainer: {
        flex: 1,
    },
    bubbleTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    bubbleLink: {
        fontSize: 12,
        color: '#d94a08',
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    subSection: {
        marginBottom: 20,
    },
    subSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    subSectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    addMore: {
        fontSize: 14,
        color: '#d94a08',
    },
    chipsContainer: {
        flexDirection: 'row',
    },
    chip: {
        backgroundColor: '#ECF6B6',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    chipText: {
        color: '#333',
        fontSize: 14,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -10,
    },
    sliderLabel: {
        fontSize: 14,
        color: '#666',
    },
    searchButton: {
        backgroundColor: '#d94a08',
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 30,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    trendingContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    trendingItem: {
        flex: 1, 
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    trendingImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    trendingText: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
});