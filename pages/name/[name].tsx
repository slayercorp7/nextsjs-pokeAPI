import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { Pokemon } from "../../interfaces/pokemon-full";
import { pokeApi } from "../../api";
import { PokemonListResponse } from "../../interfaces";
import { useRouter } from "next/router";
import { useState } from "react";
import { localFavorites } from "../../utils";
import confetti from "canvas-confetti";
import { Grid, Card, Button, Container, Text, Image } from "@nextui-org/react";
import { Layout } from "../../components/layouts";
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface props {
  pokemon: Pokemon;
}

const PokemonByName: NextPage<props> = ({ pokemon }) => {
 
  const router = useRouter();

  const { id } = pokemon;

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.isFavorite(id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0.1,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color={"gradient"}
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? "en favoritos" : "guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>sprites</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=50");
  const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

  return {
    paths: pokemonNames.map((name) => {
      return {
        params: { name },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    },
  };
};
export default PokemonByName;
