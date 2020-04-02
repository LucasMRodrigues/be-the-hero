import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [ incidentList, setIncidentList ] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setIncidentList(res.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id, title) {
        if (window.confirm(`Confirma a exclusão do caso ${id} - ${title}?`)) {
            try {
                await api.delete(`incidents/${id}`, {
                    headers: {
                        Authorization: ongId
                    }
                });

                setIncidentList(incidentList.filter((i) => i.id !== id));
            } catch(err) {
                alert('Erro ao deletar o caso, tente novamente.');
            }
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-vinda, {ongName}!</span>
                <Link className="button" to="/incident/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color='#E02041'/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidentList.map(
                    (i) => (
                    <li key={i.id}>
                        <strong>CASO:</strong>
                        <p>{i.id} - {i.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{i.description}</p>
                        
                        <strong>VALOR:</strong>
                        <p>
                            {Intl
                            .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                            .format(i.value)}
                        </p>

                        <button type="button" onClick={() => handleDeleteIncident(i.id, i.title)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}