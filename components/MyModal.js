import { StyleSheet, Button, View, Modal, Image, Text } from 'react-native';
import theme from '../styles/theme.style.js';

function MyModal(props) {

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Text style={styles.header}>Title is set to:</Text>
                <Image source={require('../assets/images/noimg.png')} style={styles.image} />
                <Text style={styles.bodytext}>This is just regular text meant to show</Text>
                <View style={styles.button}>
                    <Button title="Close" onPress={props.closeModal.bind(this, -1)} color="#f31282" />
                </View>
            </View>
        </Modal>
    );
}

export default MyModal;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        backgroundColor: theme.BACKGROUND_COLOR_MODAL,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: theme.FONT_SIZE_LARGE,
        fontFamily: 'Oswald',
    },
    bodytext: {
        fontSize: theme.FONT_SIZE_SMALL,
        fontFamily: 'Roboto',
    },
    button: {
        width: '30%',
        marginHorizontal: 8
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    }
});