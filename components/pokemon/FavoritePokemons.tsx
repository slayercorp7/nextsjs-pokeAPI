import { Grid } from "@nextui-org/react";
import { FC } from 'react';
import { FavoriteCardPokemon } from "./";

interface props {
  favoritePokemons: number[];
}
export const FavoritePokemons:FC<props> = ({ favoritePokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favoritePokemons.map((id) => (
        <FavoriteCardPokemon id={id} key={id}/>
      ))}
    </Grid.Container>
  );
};
