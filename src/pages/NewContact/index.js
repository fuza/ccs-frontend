import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/material_red.css";

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewContact() {
    const [quando, setQuando] = useState(new Date());
    const [onde, setOnde] = useState('');
    const [como, setComo] = useState('');

    const history = useHistory();

    const userId = localStorage.getItem('userId');
    
    async function handleNewcontact(e) {
        e.preventDefault();

        const y = new Intl.DateTimeFormat("en-US",  {year: "numeric"}).format(new Date(quando)).toString();
        const m = new Intl.DateTimeFormat("en-US",  {month: "2-digit"}).format(new Date(quando)).toString();
        const d = new Intl.DateTimeFormat("en-US",  {day: "2-digit"}).format(new Date(quando)).toString();
        const h = new Intl.DateTimeFormat("en-US",  {hour: "numeric", hour12: false}).format(new Date(quando)).toString();
        const mi = new Intl.DateTimeFormat("en-US",  {minute: "numeric", hour12: false}).format(new Date(quando)).toString();

        const dt = `${y}-${m}-${d} ${h}:${mi}:00`;

        const data = {
            quando: dt,
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
                    <Flatpickr
                        placeholder="Quando?"
                        data-enable-time
                        value={quando}
                        onChange={e => setQuando(e)}
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