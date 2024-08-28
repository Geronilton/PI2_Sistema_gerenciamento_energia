import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  ScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#353943',

  },
  container: {
    borderRadius: 15,
    width: '90%',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  botao: {
    padding:3,
    margin: 5,
    alignItems:'center',
    width: 150,
    backgroundColor:'#3b93aa',
    borderRadius:10,
  },
  textButton:{
    fontSize: 18,
    margin: 5,
    color: 'white'
  },

  formText: {
    fontSize: 20,
    margin: 5,
    color: 'white'
    
  },
  formTextInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor:'#C3C4C9',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    width:320,
    height: 40,
    padding:10,
    paddingLeft:20,
  },

  titleCadastro: {
    fontSize: 35,
    margin: 10,
    color: 'white'
  }

});



  export default styles;