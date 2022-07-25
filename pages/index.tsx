import { Grid } from "@nextui-org/react";
import type { NextPage, GetStaticProps } from "next";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts";
import { PokemonCard } from "../components/pokemon";
import { PokemonListResponse, smallPokemon } from "../interfaces";

interface props {
  pokemons: smallPokemon[];
}

const HomePage: NextPage<props> = ({ pokemons }) => {
  return (
    <>
      <Layout>
        <Grid.Container gap={2} justify={"flex-start"}>
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name} />
          ))}
        </Grid.Container>
      </Layout>
    </>
  );
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=50");
  const { results } = data;
  const pokemons: smallPokemon[] = results.map((res, i) => ({
    ...res,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  //"
  return {
    props: {
      pokemons: pokemons,
    },
  };
};
export default HomePage;
