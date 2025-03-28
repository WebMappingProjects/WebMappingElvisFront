import React, { useState } from 'react';

function App() {
  // Déclaration d'un état local
  const [count, setCount] = useState(0);

  // Fonction pour gérer le clic sur le bouton
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenue dans mon application React!</h1>
      <p>Compteur : {count}</p>
      <button onClick={handleClick}>Incrémenter</button>
      {count > 0 && <p>Vous avez cliqué {count} fois!</p>}
    </div>
  );
}

export default App;
