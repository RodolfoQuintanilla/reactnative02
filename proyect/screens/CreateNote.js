import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createNoteStyle } from '../styles/createNoteStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function CreateNote({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [descorta, setDescorta] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const saveNote = async () => {
        try {
            const newNote = {
                id: Date.now().toString(),
                titulo: titulo,
                descorta: descorta,
                fecha: fecha,
                descripcion: descripcion
            }
            const estoreNote = await AsyncStorage.getItem('notas')
            const notes = estoreNote ? JSON.parse(estoreNote) : []
            notes.push(newNote)
            await AsyncStorage.setItem('notas', JSON.stringify(notes))
            //limpiar los campos despues q se fuarde 
            setTitulo('')
            setDescorta('')
            setFecha('')
            setDescorta('')
            setDescripcion('')
            Alert.alert('Nota guardada', 'Tu nota se ha guardado exitosamente.')
            navigation.navigate('Home')
        } catch (error) {
            console.log('Error al guardar la nota:', error);
            Alert.alert('Error', 'No se puedo guardar la nota. ')
        }
    }
    return (
        <ScrollView contentContainerStyle={createNoteStyle.scrollContainer}>
            <View style={createNoteStyle.main}>
                <Text style={createNoteStyle.title}>CREAR NOTA</Text>
                <View style={createNoteStyle.card}>
                    <TextInput
                        placeholder='Titulo'
                        placeholderTextColor="slategray"
                        value={titulo}
                        onChangeText={setTitulo}
                        style={createNoteStyle.input}
                    />
                    <TextInput
                        placeholder='Descripcion Corta'
                        placeholderTextColor="slategray"
                        value={descorta}
                        onChangeText={setDescorta}
                        style={createNoteStyle.input}
                    />
                    <TextInput
                        placeholder='Fecha'
                        placeholderTextColor="slategray"
                        value={fecha}
                        onChangeText={setFecha}
                        style={createNoteStyle.input}
                    />
                    <TextInput
                        placeholder='Descripcion'
                        placeholderTextColor="slategray"
                        value={descripcion}
                        onChangeText={setDescripcion}
                        style={createNoteStyle.input}
                    />
                    <TouchableOpacity style={createNoteStyle.button} onPress={saveNote}>
                        <Text style={createNoteStyle.buttonText}>Registrar Nota</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
