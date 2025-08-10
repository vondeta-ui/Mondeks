import React, { useState } from 'react';

export default function App() {
  const [ime, setIme] = useState('');
  const [info, setInfo] = useState(null);

  const pretrazi = async () => {
    if (!ime) return;
    const url = `https://pokeapi.co/api/v2/pokemon/${ime.toLowerCase()}`;
    const res = await fetch(url);
    if (!res.ok) {
      setInfo({ greska: 'Pokemon nije pronađen' });
      return;
    }
    const data = await res.json();
    setInfo(data);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pokedex (Srpski)</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Unesi ime pokemona"
        value={ime}
        onChange={(e) => setIme(e.target.value)}
      />
      <button
        onClick={pretrazi}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Pretraži
      </button>

      {info && !info.greska && (
        <div className="mt-4 p-4 border rounded bg-white">
          <h2 className="text-xl font-semibold capitalize">{info.name}</h2>
          <img src={info.sprites.front_default} alt={info.name} />
          <p>Visina: {info.height}</p>
          <p>Težina: {info.weight}</p>
        </div>
      )}

      {info && info.greska && (
        <p className="text-red-500 mt-4">{info.greska}</p>
      )}
    </div>
  );
}
