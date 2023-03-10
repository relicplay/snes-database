import { StyleSheet, Text, View, ScrollView } from 'react-native';

function NavBar(props) {
    return (
        //add scrollview with preset buttons for cetgories, etc:
        <View style={styles.navContainer}>
            <Text>Navbar here:</Text>
        </View>
    );
}

export default NavBar;

const styles = StyleSheet.create({
    navContainer: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
        color: '#fff',
    },
    pressedItem: {
        opacity: 0.5,
    },
    goalText: {
        padding: 8,
        color: '#fff',
    }
});