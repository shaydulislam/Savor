import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';

export default function Survey() {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({
        budget: '',
        restrictions: '',
        hasRestrictions: false,
        numPeople: '',
        goal: '', // Add for new goal question
    });

    const updateAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Survey complete, navigate to HomeTabs
            navigation.replace('HomeTabs');
        }
    };

    const previousStep = () => {
        setCurrentStep(prev => Math.max(0, prev - 1));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>What is your daily budget for each person?</Text>
                        <View style={styles.buttonContainer}>
                            {['$5-10', '$10-20', '$20-$30', '$30+'].map(option => (
                                <Pressable
                                    key={option}
                                    style={[styles.optionButton, answers.budget === option && styles.selectedButton ] }
                                    onPress={() => {
                                        updateAnswer('budget', option);
                                        nextStep();
                                    }}
                                >
                                    <Text style={[styles.buttonText, answers.budget === option && styles.selectedText]}>
                                        {option}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable style={styles.backButton} onPress={previousStep}>
                            <Text style={styles.backText}>Back</Text>
                        </Pressable>
                    </View>
                );

            case 1:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>Do you have any dietary restrictions?</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.optionButton, styles.yesNoButton, answers.hasRestrictions && styles.selectedButton]}
                                onPress={() => {
                                    updateAnswer('hasRestrictions', true);
                                }}
                            >
                                <Text style={[styles.buttonText, answers.hasRestrictions && styles.selectedText]}>Yes</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.optionButton, styles.yesNoButton, !answers.hasRestrictions && styles.selectedButton]}
                                onPress={() => {
                                    updateAnswer('hasRestrictions', false);
                                    updateAnswer('restrictions', '');
                                    nextStep();
                                }}
                            >
                                <Text style={[styles.buttonText, !answers.hasRestrictions && styles.selectedText]}>No</Text>
                            </Pressable>
                        </View>
                        {answers.hasRestrictions && (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter your dietary restrictions here..."
                                    value={answers.restrictions}
                                    onChangeText={text => updateAnswer('restrictions', text)}
                                    multiline
                                    numberOfLines={3}
                                />
                                <Pressable
                                    style={styles.continueButton}
                                    onPress={() => {
                                        if (answers.restrictions.trim()) {
                                            nextStep();
                                        } else {
                                            alert('Please enter your restrictions.');
                                        }
                                    }}
                                    disabled={!answers.restrictions.trim()}
                                >
                                    <Text style={styles.continueButtonText}>Continue</Text>
                                </Pressable>
                            </View>
                        )}
                        <Pressable style={styles.backButton} onPress={previousStep}>
                            <Text style={styles.backText}>Back</Text>
                        </Pressable>
                    </View>
                );

            case 2:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>How many people are you cooking for?</Text>
                        <View style={styles.buttonContainer}>
                            {['1', '2-3', '4-5', '6+'].map(option => (
                                <Pressable
                                    key={option}
                                    style={[styles.optionButton, answers.numPeople === option && styles.selectedButton]}
                                    onPress={() => {
                                        updateAnswer('numPeople', option);
                                        nextStep();
                                    }}
                                >
                                    <Text style={[styles.buttonText, answers.numPeople === option && styles.selectedText]}>
                                        {option}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable style={styles.backButton} onPress={previousStep}>
                            <Text style={styles.backText}>Back</Text>
                        </Pressable>
                    </View>
                );

            case 3: // New: Goal question (case 4 in user terms)
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>What is your biggest goal of using this recipe app?</Text>
                        <View style={styles.buttonContainer}>
                            {['Find more recipes', 'Save money in cooking', 'Eat more healthy', 'Not sure :3'].map(option => (
                                <Pressable
                                    key={option}
                                    style={[styles.optionButton, answers.goal === option && styles.selectedButton]}
                                    onPress={() => {
                                        updateAnswer('goal', option);
                                        nextStep();
                                    }}
                                >
                                    <Text style={[styles.buttonText, answers.goal === option && styles.selectedText]}>
                                        {option}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                        <Pressable style={styles.backButton} onPress={previousStep}>
                            <Text style={styles.backText}>Back</Text>
                        </Pressable>
                    </View>
                );

            case 4: // New: Confirmation (case 5 in user terms)
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>Thanks for filling out the survey! Please confirm the following information, and start your Savor Journey!</Text>
                        <View style={styles.summaryContainer}>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Daily Budget per Person:</Text>
                                <Pressable style={styles.summaryButton}>
                                    <Text style={styles.summaryText}>{answers.budget}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Dietary Restrictions:</Text>
                                <Pressable style={styles.summaryButton}>
                                    <Text style={styles.summaryText}>
                                        {answers.hasRestrictions ? answers.restrictions : 'No restrictions'}
                                    </Text>
                                </Pressable>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Number of People:</Text>
                                <Pressable style={styles.summaryButton}>
                                    <Text style={styles.summaryText}>{answers.numPeople}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Biggest Goal:</Text>
                                <Pressable style={styles.summaryButton}>
                                    <Text style={styles.summaryText}>{answers.goal}</Text>
                                </Pressable>
                            </View>
                        </View>
                        <Pressable style={styles.startButton} onPress={nextStep}>
                            <Text style={styles.startButtonText}>Start Savor Journey!</Text>
                        </Pressable>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {renderStep()}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFEF3",
        width: "100%",          // fill full width of viewport
    },
    content: {
        flex: 1,
        justifyContent: "center", // center vertically
        alignItems: "center",     // center horizontally
        marginLeft: 20,
        marginRight: 20,
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
    questionContainer: {
        alignItems: 'center',
        width: '100%',
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,        
    },
    optionButton: {
        backgroundColor: '#e6f881',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8,
        minWidth: 120,
        alignItems: 'center',
    },
    yesNoButton: {
        minWidth: 100,
    },
    selectedButton: {
        backgroundColor: '#d94a08',
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    selectedText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        width: '100%',
        maxWidth: 300,
        textAlign: 'center',
        marginBottom: 15,
    },
    continueButton: {
        backgroundColor: '#d94a08',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    summaryContainer: {
        width: '100%',
        marginBottom: 30,
        gap: 15,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        minHeight: 50,
    },
    summaryLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryButton: {
        backgroundColor: '#e0e0e0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        minWidth: 100,
        alignItems: 'center',
    },
    summaryText: {
        color: '#d94a08',
        fontWeight: 'bold',
        fontSize: 14,
    },
    backButton: {
        marginTop: 20,
        padding: 10,
    },
    backText: {
        color: '#666',
        fontSize: 16,
    },
    startButton: {
        backgroundColor: '#d94a08',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 8,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});