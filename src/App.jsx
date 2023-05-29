import React, { useState, useEffect } from 'react';
import './app.css'

function App() {
  const [myCep, setMyCep] = useState('');
  const [dados, setDados] = useState('');
  const [isTrue, setIsTrue] = useState(false);

  const handleChang = ({ target }) => { setMyCep(target.value.replaceAll('-', '')) }

  useEffect(() => {
    if (myCep.length >= 8 && isTrue === true) {
      let url = `https://viacep.com.br/ws/${myCep}/json/`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          setDados(data)
        }).catch(err => {
          console.log('Ocorreu um erro')
        })
    }

  }, [isTrue, myCep])




  return (
    <>
      <div className='container'>
        <div className='result'>
          {isTrue === true && myCep >=8 ?
            <ul>
              <li>
                <p>localidade: {dados.localidade}</p>
              </li>
              <li>
                <p>UF: {dados.uf}</p>
              </li>
              <li>
                <p>Logradouro: {dados.logradouro}</p>
              </li>
              <li>
                <p>Complemento: {dados.complemento}</p>
              </li>
              <li>
                <p>Bairro: {dados.bairro}</p>
              </li>
              <li>
                <p>DDD: {dados.ddd}</p>
              </li>
            </ul>
          : false } 
        </div>
        <label htmlFor="cep">Digite seu Cep</label>
        <input onChange={handleChang} id='cep' type="text" />
        <button onClick={() => { setIsTrue(true) }} >Enviar</button>
      </div>
    </>
  );
}

export default App;
