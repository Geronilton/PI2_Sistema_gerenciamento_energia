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
        borderBottomWidth:1,
        paddingBottom:30,
        borderBottomColor:'#5f6ab0',
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
    },
    perfil:{
        flexDirection: 'row',
        gap: 10,
        padding:30,
    },
    nome:{
        alignItems:"center",
        justifyContent:"center",
    },
    logo: {
        backgroundColor: '#5f6ab0',
        borderRadius: 20,
        padding: 10,
        right:25,
    },
    historico:{
        color:'#fff',
        padding:30,
        fontWeight:'bold',
        fontSize:20,
    },
    dados: {
        color: '#fff',
        fontWeight:'bold',
        fontSize:20,
        justifyContent:'center',
    },
    titlename: {
        color: '#fff',
        fontSize:30,
    },
    text: {
        color: '#fff',
        fontSize:20,
        
    },
    image:{
        width:40,
        height:40,
        padding:50,
        borderColor: '#fff',
        borderRadius: 90,
        borderWidth: 5,
    },
    tabela:{
        backgroundColor:'#c8c8c8',
        padding: 10,
        borderRadius:10,
        flexDirection: 'row',
        width:'70%',
        justifyContent:'space-between'
    },
    tabdados: {
        color: '#fff',
        fontWeight:'bold',
        fontSize:20,
        padding:10,
    },
})