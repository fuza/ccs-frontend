import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
    const [contacts, setContacts] = useState([]);

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        try {
            api.get('profile', {
                headers: {
                    Authorization: userId,
                }
            }).then( response => {
                setContacts(response.data);

            });

        } catch (err) {
            alert('Erro ao buscar contatos');
        }
    }, [userId]);

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

    function handleTempo(dtChegada) {
        const dtPartida = new Date();

        const date1 = new Date(dtPartida.getFullYear(), dtPartida.getMonth(),dtPartida.getDay(), dtPartida.getHours(), dtPartida.getMinutes()),
              date2 = new Date(dtChegada.slice(0,4), dtChegada.slice(5,7),dtChegada.slice(8,10), dtChegada.slice(11,13), dtChegada.slice(14,16));

        const diffMs = (date2 - date1);
        const diffDs = Math.floor(((diffMs % 86400000) / 3600000) / 24);
        const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        const diff = diffDs + 'd ' + diffHrs + 'h ' + diffMins + 'm';

        return diff;
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="CCS Contador de Contato Social" />
                <span>Bem Vindo, {userName}</span>

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
                        <td>{handleTempo(contact.quando)}</td>
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