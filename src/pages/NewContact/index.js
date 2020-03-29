import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewContact() {
    const [quando, setQuando] = useState('');
    const [onde, setOnde] = useState('');
    const [como, setComo] = useState('');

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    
    async function handleNewcontact(e) {
        e.preventDefault();

        const data = {
            quando,
            onde,
            como
        };

        try {
            await api.post('contacts', data, {
                headers: {
                    Authorization: userId,
                }
            });

            history.push('/profile');
        } catch (err) {
            alert('Erro no cadastro contato, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="CCS Contador de Contato Social" />
                    <h1>Cadastrar novo contato</h1>
                    <p>Preencha os detalhes do contato.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewcontact}>
                    <input
                        placeholder="Quando?"
                        value={quando}
                        onChange={e => setQuando(e.target.value)}
                    />

                    <textarea
                        placeholder="Onde?"
                        value={onde}
                        onChange={e => setOnde(e.target.value)}
                    />
                    
                    <input 
                        placeholder="Como?"
                        value={como}
                        onChange={e => setComo(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}