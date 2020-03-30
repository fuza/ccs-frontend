import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
    const [contacts, setContacts] = useState([]);
    const [welcome, setWelcome] = useState('');

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userGender = localStorage.getItem('userGender');

    useEffect(() => {
        if (userGender === 'Male') {
            setWelcome('Bem Vindo');
        } else {
            setWelcome('Bem Vinda');
        }

        lista();
        //getContacts(userId);

    }, [userId, userGender]);

    async function getContacts(userId) {
        try {
            await api.get('profile', {
                headers: {
                    Authorization: userId,
                }
            }).then( response => {
                setContacts(response.data);

            });

        } catch (err) {
            alert('Erro ao buscar contatos');
        }
    }

    async function handleDeleteContact(id) {
        try {
            await api.delete(`contacts/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

            setContacts(contacts.filter(contact => contact.id !== id));
        } catch(err) {
            alert('Erro ao deletar contato, tente novamente.')
        }
    }

    function handleLogoout() {
        localStorage.clear();
        history.push('/');
    }

    function handleTempo(dt) {
        const quando = new Date(dt).toISOString().substr(0, 19).replace('T', ' ');
        const dtAgora = new Date().toISOString().substr(0, 19).replace('T', ' ');

        const date1 = new Date(dtAgora.slice(0,4), dtAgora.slice(5,7),dtAgora.slice(8,10), dtAgora.slice(11,13), dtAgora.slice(14,16)),
              date2 = new Date(quando.slice(0,4), quando.slice(5,7),quando.slice(8,10), quando.slice(11,13), quando.slice(14,16));

        const diffMs = (date1 - date2);
        
        const diffDs = Math.abs(Math.round( diffMs / (1000 * 3600 * 24) ));

        //const diffHrs = Math.round( (diffMs / (1000 * 3600)) );

        var diffHrs = Math.round( (diffMs / (1000 * 3600)) );

        if (diffHrs > 59) {
            diffHrs = diffHrs - 60;
        }

        const diffMins = Math.round( ((diffMs % 86400000) % 3600000) / 60000 );

        if (diffDs > 0) {
            return diffDs + 'd ' + diffHrs + 'h ' + diffMins + 'm';
        } else {
            return diffHrs + 'h ' + diffMins + 'm';
        }
    }

    function lista() {
        setTimeout( function() {
            console.log("Atualizando lista");
            lista();
          }, 60000 );
        getContacts(userId);
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="CCS Contador de Contato Social" />
                <span>{welcome}, {userName}</span>

                <Link className="button" to="/contacts/new">
                    Cadastrar novo contato
                </Link>
                <button onClick={handleLogoout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Contatos cadastrados</h1>

            <table>
                <thead>
                    <tr>
                        <th width="15%">QUANDO?</th>
                        <th width="35%">ONDE?</th>
                        <th width="35%">COMO?</th>
                        <th width="100px">TEMPO</th>
                        <th width="1px"> </th>
                    </tr>
                </thead>
                <tbody>
                {contacts.map(contact => (                    
                    <tr key={contact.id}>
                        <td>{new Intl.DateTimeFormat("pt-BR", {year: "numeric",month: "2-digit",day: "2-digit", hour: 'numeric', minute: 'numeric', hour12: false,}).format(new Date(contact.quando))}</td>
                        <td>{contact.onde}</td>
                        <td>{contact.como}</td>
                        <td><label>{handleTempo(contact.quando)}</label></td>
                        <td>
                            <button onClick={() => handleDeleteContact(contact.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

       </div>
    )
}