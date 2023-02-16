import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { Detail, Pokemon } from './interface';
interface Pokemons {
  name: string;
  url:string;
}

const App:React.FC=()=> {
  const[pokemons, setPokemons] =useState<Pokemon[]>([]);// dinh nghia type cho useState
  const[nextUrl, setNextUrl] = useState<string>(""); // chứa link cho lần tiếp theo
  const [loading, setLoading] = useState<boolean>(true);
  const[viewDetail, setDetail]= useState<Detail>({
    id: 0,// cần có id để nhận dạng từng con 
    isOpened: false,// can 1 cai overlay 
  })
  useEffect(()=>{
    const getPokemon= async()=>{
      const res= await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20?offset=20");
        console.log(res.data)
      setNextUrl(res.data.next)// lữu trữ nexturl 
      
        res.data.results.forEach(async(pokemon:Pokemons)=>{// dinh nghia type cho pokemon
            const poke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            console.log(poke.data)
            // set pokemon vao 
            setPokemons(p=>[...p, poke.data]);
            // dung loading lai
            setLoading(false);
        });
    };

    getPokemon();

  },[])
// load pokemon moi 
  const nextPage=async() => {
      let res= await axios.get(nextUrl);// da la next url roi
      setNextUrl(res.data.next);// xet next tiep , update lại next
      console.log(res.data.next)
      setLoading(true);
      res.data.results.forEach(async(pokemon:Pokemons)=>{
        const poke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons(p=>[...p, poke.data])// loop qua nên cần dạng array 
        setLoading(false)
      })

  }
  return (
    <div className='App'>
      <div className="container">
        <header className="pokemon-header">
          Pokemon
        </header>
        <PokemonCollection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail}/>
        {!viewDetail.isOpened && (
             <div className="btn" >
              <button onClick={nextPage}>
                {loading? "Loading":"Load more"} 
                </button>
           </div>
        )}       
      </div>
    </div>
    
  );
}

export default App;
