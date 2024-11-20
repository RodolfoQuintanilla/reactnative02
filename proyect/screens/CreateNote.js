import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createNoteStyle } from '../styles/createNoteStyle';

export function CreateNote() {
    const [titulo, setTitulo] = useState('');
    const [descorta, setDescorta] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const saveNote =()=>{
        console.log(titulo,descorta,fecha,descripcion);
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
