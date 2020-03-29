import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            age,
            gender,
            password
        };

        try {
            const res = await api.post('users', data);

            if (res.data.id > 0) {
                alert('Cadastro realizado com sucesso!');
            }

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="CCS Contador de Contato Social" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataform e controle o tempo de cada de contato social.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        autoComplete="name"
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Idade"
                        value={age}
                        autoComplete="age"
                        onChange={e => setAge(e.target.value)}
                    />

                    <select
                        placeholder="Sexo"
                        value={gender}
                        autoComplete="new-gender"
                        onChange={e => setGender(e.target.value)}>
                        <option value="" selected disabled hidden>Sexo</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                    </select>

                    <input
                        placeholder="Senha"
                        type="password"
                        value={password}
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}
                    />


                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>

    );
}