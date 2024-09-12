import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4F4F4',
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
        shadowRadius:10,
    },
    historico:{
        color:'black',
        padding:25,
        fontWeight:'bold',
        fontSize:20,
    },
    dados: {
        color: '#black',
        fontWeight:'bold',
        fontSize:20,
        justifyContent:'center',
    },
    titlename: {
        color: '#black',
        fontSize:25,
    },
    text: {
        color: '#black',
        fontSize:20,
        
    },
    image:{
        width:100,
        height:100,
        padding:90,
    },
    tabela:{
        backgroundColor:'#c8c8c8',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius:10,
        flexDirection: 'column',
        width:'100%',
        shadowRadius:2,
    },
    tabelaid:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingRight:12,
        paddingLeft:12,
        flex:1,
        width:'100%'
    },
    tabdados: {
        color: '#fff',
        fontWeight:'bold',
        fontSize:20,
        padding:6,
    },
    botaoSession:{
        backgroundColor: '#5f6ab0',
        borderRadius: 5,
        left:'40%',
        padding:6,
        top: 8,
        shadowRadius:2,
    }
})