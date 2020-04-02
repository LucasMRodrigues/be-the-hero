import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Incidents() {

    const [ incidentList, setIncidentList ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    function navigateToDetails(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidentList() {

        if (loading) {
            return;
        }

        if (total > 0 && incidentList.length === total) {
            return;
        }

        setLoading(true);

        axios.get('http://192.168.15.6:3333/incidents', {
            params: { page }
        })
        .then((res) => {
            setIncidentList([ ...incidentList, ...res.data ]);
            setTotal(res.headers['x-total-count']);
            setPage(page + 1);
            setLoading(false);
        });
    }

    useEffect(() => {
        loadIncidentList();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.textBold}>{total} casos.</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia!
            </Text>

            <FlatList 
                data={incidentList}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidentList}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentAttribute}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>
                        
                        <Text style={styles.incidentAttribute}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        
                        <Text style={styles.incidentAttribute}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                            .format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsLink} 
                            onPress={() => navigateToDetails(incident)}>
                            <Text style={styles.detailsLinkText}>
                                Ver mais detalhes
                            </Text>
                            <Feather name="arrow-right" size={17} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}/>
        </View>
    );
}
