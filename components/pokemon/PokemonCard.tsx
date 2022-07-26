import { smallPokemon } from "../../interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  pokemon: smallPokemon;
}
export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const { id, img, name } = pokemon;

  const router = useRouter();

  const Onclick = () => {
    router.push(`/name/${name}`);
  };
  return (
    <Grid xs={6} sm={3} md={2} xl={10} key={id}>
      <Card isHoverable isPressable onPress={Onclick}>
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width={"100%"} height={140} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
