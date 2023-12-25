import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useLike } from '../LikeContext';

export default function InvoiceItem({ data, onPress, isLike }) {
    // const { showLike, setShowLike } = useLike();
    const { likeStates, handleLikeToggle } = useLike();
    const showLike = likeStates[data.id];
    const newStyleInvoice = { ...styles.invoice, ...(data.id == 2 ? { marginTop: 20 } : {}) };

    const isStyleContainer = isLike ? { ...styles.container } : {};
    const handleLikeToggleLocal = () => {
        handleLikeToggle(data.id);
    };

    return (
        <TouchableOpacity
            style={isLike ? { ...newStyleInvoice, marginBottom: 15, borderRadius: 15 } : newStyleInvoice}
            onPress={onPress}
        >
            <View style={isStyleContainer}>
                {isLike && (
                    <TouchableOpacity style={styles.like_btn} onPress={handleLikeToggleLocal}>
                        {showLike ? (
                            <AntDesign name="heart" size={25} color="red" />
                        ) : (
                            <Feather name="heart" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                )}
                <Image style={styles.img} source={data.image} />
                {isLike || (
                    <View style={styles.mode}>
                        <Text style={styles.text}>...</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    invoice: {
        alignItems: 'flex-end',
        marginHorizontal: 6,
    },
    container: {
        flex: 1,
    },
    like_btn: {
        padding: 7,
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    img: {
        width: 180,
        height: 210,
        resizeMode: 'stretch',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    mode: {
        alignItems: 'flex-end',
        marginBottom: 15,
        marginTop: -20,
    },
    text: {
        fontSize: 30,
    },
});
