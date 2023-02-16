

// dam bao tat ca du lieu tra ve deu o dang nhu vay
 export interface Pokemon{
    id: number;
    name: string;
    sprites: {
      front_default: string;
    }
  }
  export interface Detail{
    id: number;// dựa vào id để render các con pokemon 
    isOpened: boolean;
  }
  export interface PokemonDetail extends Pokemon{// selected pokemon
    abilities?:{
      ability: string;
      name: string;
    }[]
  }
  