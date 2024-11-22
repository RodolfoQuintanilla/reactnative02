import { Text, View, TouchableOpacity, Alert, FlatList } from 'react-native'
import { homeStyles } from '../styles/homeStyle'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function Home({ navigation }) {
    const [note, setNote] = useState([]);

    //recuperar las notas de async 
    const loadNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notas')
            const paredNotes = storedNotes ? JSON.parse(storedNotes) : []
            setNote(paredNotes)
        } catch (error) {
            console.log('Error al acrgar notas', error);

        }

    }

    //cargar las notas en cuanto se cargue el componente 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadNotes)
        return unsubscribe;
    }, [navigation]);

    //cuerpo de flatlist
    const renderNote = ({ item }) => {
        return (
            <View style={homeStyles.noteCard}>
                <Text style={homeStyles.noteTitle}>{item.titulo}</Text>
                <Text style={homeStyles.nodeDate}>{item.fecha}</Text>
                <Text style={homeStyles.noteShortDesc}>{item.descorta}</Text>
            </View>
        );
    };

    return (
        <View style={homeStyles.main}>
            <Text style={homeStyles.title}>Mis Notas</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('CreateNote')}
                style={homeStyles.buttonAdd}>
                <Text style={homeStyles.textButtonAdd}>Agregar Nota</Text>
            </TouchableOpacity>
            <FlatList
                data={note}
                keyExtractor={item => item.id.toString()}
                renderItem={renderNote}
                contentContainerStyle={homeStyles.listContainer}
            />
        </View>
    );
}