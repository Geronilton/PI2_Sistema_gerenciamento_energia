import React from "react";
import { View, Button, Text, Image, } from "react-native";

import Styles from "./Style/MyStyles_tomadas";

export default function TelaTomadas( ) {
    return(
        <View style={Styles.container}>
                <View style={Styles.tomadaCadastrada}>
                    <View style={Styles.tomadaId}>
                    <Image
                        style={Styles.imagemTomada}
                        source={require('../../images/tomada.png')}
                    />
                        <Text>1</Text>
                    </View>
                    <View style={Styles.containerInfoTomada}>
                        <Text>TV DA SALA</Text>
                        <View style={Styles.tomadaCadastradaInfo}>
                            <Text>WATTS</Text>
                            <Text>KWH</Text>
                        </View>
                    </View>  
                    <View style={Styles.butaoTomada}>
                        <Button 
                            title="OK"
                        />
                        <Button style={Styles.botao}
                            title="excluir"
                        />
                    </View>
                 </View>
            </View>
    )
};

