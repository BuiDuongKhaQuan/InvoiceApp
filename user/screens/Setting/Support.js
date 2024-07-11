import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/SettingItem/header';
import { fontSizeMenuTitle } from '../../constant/fontSize';
import Input from '../../components/Input';
import BackgroundImage from '../../layouts/DefaultLayout/BackgroundImage';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Support() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const { t } = useTranslation();

    const questions = [
        {
            question: t('common:ques1'),
            answer: t('common:ans1'),
        },
        {
            question: t('common:ques2'),
            answer: t('common:ans2'),
        },
        {
            question: t('common:ques3'),
            answer: t('common:ans3'),
        },
        {
            question: t('common:ques4'),
            answer: t('common:ans4'),
        },
    ];

    const handleQuestionPress = (question) => {
        const selectedAnswer = questions.find((q) => q.question === question)?.answer;
        if (selectedAnswer) {
            Alert.alert(question, selectedAnswer, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
        }
    };

    return (
        <BackgroundImage>
            <Header title={t('common:support')} />
            <ScrollView style={styles.content_center}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10, marginVertical: 10 }}>
                    {t('common:frequentlyQuestions')}
                </Text>
                {/* Map through questions and attach onPress handlers */}
                {questions.map(({ question }) => (
                    <Text key={question} style={styles.content_title} onPress={() => handleQuestionPress(question)}>
                        {question}
                    </Text>
                ))}
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginHorizontal: 10, marginVertical: 10 }}>
                    {t('common:typeSupport')}
                </Text>
                <Text style={styles.content_title}>
                    <Icon name="envelope" size={16} color="#000" /> {t('common:email')}: buiduongkhaquan@gmail.com
                </Text>
                <Text style={styles.content_title}>
                    <Icon name="phone" size={16} color="#000" /> {t('common:phone')}: 05261811991
                </Text>
                <Text style={styles.content_title}>
                    <Icon name="headphones" size={16} color="#000" />
                    {t('common:switchboard')}: 19001991
                </Text>
            </ScrollView>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content_center: {
        flex: 4,
    },
    content_botom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_title: {
        paddingVertical: 10,
        fontSize: fontSizeMenuTitle,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
});
