import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#353943',
      alignItems: 'center',
      justifyContent: 'flex-start',
      
    },
    info:{
        flexDirection: 'row',
        gap: 10,
        padding:20,
    },
    perfil:{
        flexDirection: 'row',
        gap: 50,
        padding:10,
    },
    nome:{
        alignItems:"center",
        justifyContent:"center",
    },
    logo: {
        backgroundColor: '#5f6ab0',
        borderRadius: 20,
        padding: 10,
    },
    dados: {
        color: '#fff',
        fontWeight:'bold',
        gap: 1,
    },
    text: {
        color: '#fff'
    },
    image:{
        width:30,
        height:30,
        padding:40,
        borderColor: '#fff',
        borderRadius: 90,
        borderWidth: 5,
    },
    tabela:{
        backgroundColor:'#c8c8c8',
        padding: 20,
        borderRadius:10,
    }
})