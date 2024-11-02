import React from "react";
import '@testing-library/react-native/extend-expect'
import { fireEvent, render, screen } from "@testing-library/react-native";
import App from '../../../App'
import Home from "../../../src/screens/Home/TelaHome";
import Perfil from "../../../src/screens/Perfil/Perfil";
import TelaTomadas from "../../../src/screens/outlet/TelaTomadas";


describe("teste de renderização de componente", ()=>{
    test("teste do componente App", ()=>{
        render(<App/>)
    });

    test("teste do componente App", ()=>{
        render(<Perfil/>)
    });

    test("teste do componente App", ()=>{
        render(<Home/>)
    });

    test("teste do componente App", ()=>{
        render(<TelaTomadas/>)
    });
})

describe("teste de renderização de texto", ()=>{
    test("teste do texto de Home ", ()=>{
        render(<Home/>);
        expect(screen.getByText("Media de Custo")).toBeOnTheScreen();
    });    
    
    test("teste de dados exibidos em home", ()=>{
        render(<Home/>);
        expect(screen.getByTestId("dados")).toBeOnTheScreen();
    });


    test("teste de dados exibidos em perfil", ()=>{
        render(<Perfil/>);
        expect(screen.getByTestId("dadosname")).toBeOnTheScreen();
    });

    test("teste de dados exibidos em perfil", ()=>{
        render(<Perfil/>);
        expect(screen.getByTestId("dadosemail")).toBeOnTheScreen();
    });

})

describe("teste de funcionamento botão", ()=>{
    test("teste do botão cadastro de tomadas ", ()=>{
        render(<TelaTomadas/>);
        fireEvent.press(screen.getByTestId("cadastotomada"));
        expect(screen.getByText("CADASTRAR TOMADA")).toBeOnTheScreen();
    });    
    
    test("teste do botão cadastro de tomadas ", ()=>{
        render(<TelaTomadas/>);
        fireEvent.press(screen.getByTestId("cadastotomada"));
        fireEvent.press(screen.getByTestId("salvatomada"));
        expect(screen.getByTestId("listaTomada")).toBeOnTheScreen();
    });    
})