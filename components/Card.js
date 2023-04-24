import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

function Card(props) {

    return (
        <TouchableOpacity onPress={props.displayModal.bind(this, props.id)}>
            <View style={styles.cardContainer}>
                <Text style={styles.cardHeader}>{props.title}</Text>
                <Image style={styles.titleImage} source={props.image ? { uri: props.image } : require('../assets/images/noimg.png')} />
            </View>
        </TouchableOpacity>
    );
}

export default Card;

/*onPress={props.displayModal.bind(this, props.id)}*/

const styles = StyleSheet.create({
    cardContainer: {
        width: 150,
        height: 250,
        borderRadius: 6,
        borderWidth: 2,
        margin: 8,
        borderColor: '#000',
        backgroundColor: '#5e0acc',
        color: '#fff',
        alignItems: 'center',
    },
    pressedItem: {
        opacity: 0.5,
    },
    titleImage: {
        width: '80%',
        height: 180,
        resizeMode: 'cover',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 6,
    },
    cardHeader: {
        padding: 8,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        textDecorationLine: 'underline',
        textTransform: 'uppercase',
    }
});