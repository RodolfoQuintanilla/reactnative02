import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { detailnoteStyle } from '../styles/DetailNote';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';

export function DetailNote() {
    const route = useRoute();
    const navigation = useNavigation();
    const { note } = route.params;

    const deleteNote = async () => {
        Alert.alert(
            'IMPORTANTE',
            '¿Estas seguro que deseas eliminar',
            [
                {
                    text: 'center',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            // Obtiene las notas guardadas
                            const storedNotes = await AsyncStorage.getItem('notas');
                            const notes = storedNotes ? JSON.parse(storedNotes) : [];

                            // Filtra para eliminar la nota con el ID coincidente
                            const updatedNotes = notes.filter(n => n.id !== note.id);

                            // Guarda La lista actualizada en AsyncStorage
                            await AsyncStorage.setItem('notas', JSON.stringify(updatedNotes));

                            Alert.alert('Nota eliminada', 'La nota ha sido eliminada con éxito. ');
                            navigation.navigate('Home'); // Regresa a La pantalla de inicio o lista
                        } catch (error) {
                            console.error('Error al eliminar la nota:', error);
                            Alert.alert('Error', 'No se pudo eliminar la nota. ');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScrollView contentContainerStyle={detailnoteStyle.scrollContainer}>
            <View style={detailnoteStyle.card}>
                <Text style={detailnoteStyle.title}>Nota</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={detailnoteStyle.titulo}>{note.titulo}</Text>

                    <TouchableOpacity style={{ marginTop: 25 }} onPress={deleteNote}>
                        <Icon name='trash' type='ionicon' color='#FB4E4E' />
                    </TouchableOpacity>
                </View>
                <Text style={detailnoteStyle.fecha}>{note.fecha}</Text>
                <Text style={detailnoteStyle.descripcion}>{note.descripcion}</Text>
            </View>
        </ScrollView>
    )
}

export default DetailNote
