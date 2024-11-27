import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { detailnoteStyle } from '../styles/DetailNote';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export function DetailNote() {
    const route = useRoute();
    const navigation = useNavigation();
    const { note } = route.params;
    console.log(note);

    return (
        <ScrollView contentContainerStyle={detailnoteStyle.scrollContainer}>
            <View style={detailnoteStyle.card}>
                <Text style={detailnoteStyle.title}>Nota</Text>
                <Text style={detailnoteStyle.titulo}>{note.titulo}</Text>
                <Text style={detailnoteStyle.fecha}>{note.fecha}</Text>
                <Text style={detailnoteStyle.descripcion}>{note.descripcion}</Text>
            </View>
        </ScrollView>
    )
}

export default DetailNote
