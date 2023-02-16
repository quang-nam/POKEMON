import React from 'react'
import { Detail, Pokemon, PokemonDetail } from '../interface';
import PokemonList from './PokemonList';
interface Props{
    pokemons: PokemonDetail[];// prop luôn được nhận là pokemon để biết props được truyền luôn là prop ji
    viewDetail: Detail;
    setDetail: React.Dispatch<React.SetStateAction<Detail>>;// hover setDetail in App.tsx
   
}// phải định nghĩa cho cả type pokemons để đồng bộ
// wrap <Props> được nhận vào </Props>
// phím tắt rafce: react arrow function component export 
const PokemonCollection:React.FC <Props>= (props) => {
    const {pokemons, viewDetail, setDetail}= props;
    const selectPokemon=(id: number)=>{
        if(!viewDetail.isOpened)
            setDetail({
                id: id,
                isOpened: true
            })};
          //  console.log(viewDetail.isOpened)

  return (
    <>
        <section className={viewDetail.isOpened?" collection-container-active":
                    "collection-container"}>
            {viewDetail.isOpened ?
            (<div className="overlay">

            </div>)
            :(
                <div className="">

                </div>
            )}
        
            {pokemons.map(pokemon=>{
                return(
                    <div onClick={()=> selectPokemon(pokemon.id)}>
                        <PokemonList
                        viewDetail={viewDetail}
                        setDetail={setDetail}
                        key={pokemon.id}
                        name={pokemon.name}
                        id={pokemon.id}
                        abilities={pokemon.abilities}
                        image={pokemon.sprites.front_default}/>
                    </div>
                )
            })}
        </section>

    </>
  )
}

export default PokemonCollection