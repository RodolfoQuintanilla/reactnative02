import { StyleSheet } from "react-native";

export const detailnoteStyle = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center'
    },
    card: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8, // Para Android, proporciona una sombra elegante
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
        fontStyle: 'italic'
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    fetch: {
        fontWeight: '400',
        fontSize: 18,
        marginTop: 30,

    },
    descripcion: {
        fontSize: 16,
        letterSpacing: 1
    }
});