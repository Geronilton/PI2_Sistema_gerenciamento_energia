import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353943',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50,
    },
    tomadaCadastrada: {
        backgroundColor:'#5f6ab0' ,
        width: 350,
        padding: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 25,
        flexDirection: 'row', 
    },
    tomadaCadastradaInfo: {
        backgroundColor: '#c6c6c6',
        width: 200,
        padding: 10,
        alignItems: 'center',
        margin: 10,
        borderRadius: 20,
    },
    containerInfoTomada: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    imagemTomada: {
        width: 15,
        padding: 15,
    },
    tomadaId: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    butaoTomada: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    botao: {
        margin: 10,
    },
});