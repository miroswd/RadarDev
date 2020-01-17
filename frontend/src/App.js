import React, {useState, useEffect} from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

function App(){
  const [devs, setDevs] = useState([])


  useEffect(() => {
    // Renderizando os devs
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {

    const response = await api.post('/devs', data)

    // Atualizando lista de devs
    setDevs([...devs,response.data]);

  }
  
  // useEffect recebe 2 parâmetros, função e quando será executada 
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong> 
        <DevForm onSubmit={handleAddDev} /> 
       
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>

      </main>
    </div>
  );
}

export default App;