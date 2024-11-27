import { useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { createNoteStyle } from '../styles/createNoteStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';


export function CreateNote({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [descorta, setDescorta] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showDatePiker, setShowDatePiker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const showDatePickerHandler = () => {
        setShowDatePiker(true);
    };

    const onDateChange = (event, date) => {
        if (Platform.OS === 'android') {
            setShowDatePiker(false); // Cierra el picker en Android
        }
        if (event.type !== 'dismissed' && date) {
            setSelectedDate(date);
            setFecha(date.toLocaleDateString('es-ES'));
        }
    };

    const saveNote = async () => {

        if (!titulo || !descorta || !fecha || !descripcion) {
            Alert.alert('Error', 'Debes llenar todos los campos')
            return;
        }

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

                    <TouchableOpacity style={createNoteStyle.input} onPress={showDatePickerHandler}>
                        <TextInput
                            style={{ marginTop: 10 }}
                            placeholder='Fecha'
                            placeholderTextColor="slategray"
                            value={fecha}
                            editable={false} // Esto evita editar directamente
                        />
                    </TouchableOpacity>
                    {
                        showDatePiker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                minimumDate={new Date()} // Fija un mínimo en la fecha
                            />
                        )
                    }

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
