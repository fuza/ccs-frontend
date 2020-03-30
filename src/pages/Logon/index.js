import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import ccvirImg from '../../assets/ccs.png';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', {email,password});

            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('userName', res.data.name);
            localStorage.setItem('userGender', res.data.gender);

            history.push('/profile');
        } catch (err) {
            alert('Erro no logon, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="CCS Contador de Contato Social" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Seu E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="Sua Senha"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041" />
                        Não tenho cadastro
                    </Link>

                </form>

            </section>

            <img src={ccvirImg} alt="CCVIR" />
        </div>
    )
}