import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  ScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',

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
    backgroundColor:'#6069B1',
    borderRadius:5,
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
    borderRadius: 5,
    borderColor: 'black',
    backgroundColor:'#C3C4C9',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
    width:320,
    height: 40,
    padding:10,
    paddingLeft:20,
  },

  titleCadastro: {
    fontSize: 35,
    margin: 10,
  },
  botaoSession:{
    marginTop:60,
    width:320,
  }
});



  export default styles;