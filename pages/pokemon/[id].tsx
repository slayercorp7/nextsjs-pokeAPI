import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from "canvas-confetti";

interface props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<props> = ({ pokemon }) => {
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

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemonNumber = [...Array(50)].map((value, index) => `${index + 1}`);
  return {
    paths: pokemonNumber.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};

export default PokemonPage;
