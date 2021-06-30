import React, { Component } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { api } from '../services/api';

export default class Listagem extends Component {
    constructor(props){
        super(props);
        this.state = {
            consulta : []
        }
    }

    buscarConsulta = async () => {
        const resposta = await api.get('/consultums');
        this.setState({ consulta : resposta.data })
        console.log(this.state.consulta)
    }

    sair = () => {
        localStorage.removeItem('usuario-login');
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        this.buscarConsulta();
      }

    render(){
        return (
            <View>
                <View style={styles.parteSuperiorListagem}>
                    <View style={styles.ajuste}>
                        <Image style={styles.imgLogo} source={require('../../assets/logo_spmedgroup_v2 1.png')}/>
                        <Image style={styles.imgTexto} source={require('../../assets/SP Medical Group.png')}/>
                    </View>
                    <View>
                        <View style={styles.parteSuperiorDireita}>
                            <TouchableOpacity>
                                <Text style={styles.edicaoLink} onPress={() => this.sair()}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.medicoListagem}>
                    <ImageBackground style={StyleSheet.absoluteFillObject} source={require('../../assets/doctor2.png')}/>
                    <View style={styles.blocoListagem}>
                        <View style={styles.tamanhoBloco}>
                            <View style={styles.posicaoListagem}>
                                <Text style={styles.textoListagem}>Listagem de consultas</Text>
                            </View>
                            <View style={styles.mainBody}>
                                <FlatList 
                                    contentContainerStyle={styles.mainBodyContent}
                                    data={ this.state.consulta }
                                    keyExtractor={ item => item.IdConsulta }
                                    renderItem={this.renderItem}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    renderItem = ({ item }) => (
    
        <View style={styles.flatItemRow}>
          <View style={styles.flatItemContainer}>
            <Text style={styles.flatItemTitle}>{item.IdConsulta}</Text>
            <Text style={styles.flatItemInfo}>{item.IdPaciente}</Text>
            <Text style={styles.flatItemInfo}>{item.IdMedico}</Text>
            <Text style={styles.flatItemInfo}>{Intl.DateTimeFormat('pt-BR').format(new Date(item.DataAgendamento))}</Text>
            <Text style={styles.flatItemInfo}>{item.Situacao}</Text>
          </View>
        </View>
      )
}

const styles = StyleSheet.create({
    parteSuperiorListagem: {
        width: 414,
        height: 137,
        backgroundColor: '#1BE0B6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    
    ajuste: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    parteSuperiorEsquerda: {
        alignItems: 'center'
    },
    
    parteSuperiorDireita: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    
    edicaoLink: {
        fontSize: 18,
        fontFamily: 'Times New Roman',
        color: '#3582FF',
        textDecoration: 'none'
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
    
    medicoListagem: {
        width: 414,
        height: 759,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainBody: {
        flex: 4,
        // backgroundColor: 'red'
    },

    mainBodyContent: {
        paddingTop: 30,
        paddingRight: 50,
        paddingLeft: 50
    },
    
    blocoListagem: {
        width: 341,
        height: 'auto'
    },
    
    tamanhoBloco: {
        backgroundColor: '#FFFFFF',
    },
    
    posicaoListagem: {
        justifyContent: 'center'
    },
    
    textoListagem: {
        fontSize: 18,
        paddingLeft: 80
    }
});