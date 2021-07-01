import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {api} from '../services/api';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : ''
        }
    }

    realizarLogin = async () => {
        console.warn( this.state.email + ' ' + this.state.senha );

        const resposta = await api.post('/Login', {
            email : this.state.email,
            senha : this.state.senha
        });

        const token = resposta.data.token;
        console.warn(token);

        await AsyncStorage.setItem('userToken', token);

        this.props.navigation.navigate('Listagem');
    };

    render(){
        return (
            <View>
                <View style={styles.parteSuperior}>
                    <Image style={styles.imgLogo} source={require('../../assets/logo_spmedgroup_v2 1.png')}/>
                    <Image style={styles.imgTexto} source={require('../../assets/SP Medical Group.png')}/>
                </View>
                <View>
                    <View style={styles.medico}>
                        <ImageBackground style={StyleSheet.absoluteFillObject} source={require('../../assets/doctor.png')}/>
                        <View style={styles.blocoLogin}>
                            <View style={styles.form}>
                                <View style={styles.posicaoLogin}>
                                    <Image style={styles.usuario} source={require('../../assets/sombra-de-usuario-masculino 1.png')}/>
                                    <Text style={styles.textoLogin}>Login</Text>
                                </View>
                                <View>
                                    <Text style={styles.textoDoLogin}>Email</Text>
                                    <TextInput style={styles.input} keyboardType='email-address' onChangeText={email => this.setState({ email })}/>
                                </View>
                                <View>
                                    <View style={styles.posicaoSenha}>
                                        <Text style={styles.textoDoLogin}>Senha</Text>
                                        <TouchableOpacity style={styles.esqueceu} onPress={() => this.login()}>Esqueceu?</TouchableOpacity>
                                    </View>
                                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={senha => this.setState({ senha })}/>
                                </View>
                                <View style={styles.posicaoBotao}>
                                    <TouchableOpacity style={styles.botao} onPress={() => this.realizarLogin()}>Entrar</TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parteSuperior: {
        width: 414,
        height: 137,
        backgroundColor: '#1BE0B6',
        flexDirection: 'row',
        alignItems: 'center'
    },

    imgLogo: {
        width: 67,
        height: 67,
        marginLeft: 15
    },

    imgTexto: {
        width: 245,
        height: 32,
        marginLeft: 10
    },

    medico: {
        width: 414,
        height: 759,
        justifyContent: 'center',
        alignItems: 'center'
    },

    blocoLogin: {
        width: 341,
        height: 438,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    form: {
        backgroundColor: '#FFFFFF'
    },
    
    textoDoLogin: {
        fontSize: 18,
        paddingTop: 10
    },

    usuario: {
        width: 48,
        height: 48
    },
    
    input: {
        width: 274,
        height: 45,
        borderWidth: 2,
        borderColor: '#000000'
    },
    
    posicaoLogin: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    
    textoLogin: {
        fontSize: 36,
        paddingBottom: 20,
        alignItems: 'center'
    },
    
    posicaoSenha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    esqueceu: {
        fontSize: 18,
        paddingTop: 10,
        color: '#3582FF'
    },
    
    posicaoBotao:{
        paddingTop: 20
    },

    botao: {
        width: 274,
        height: 45,
        backgroundColor: '#3582FF',
        color: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
})