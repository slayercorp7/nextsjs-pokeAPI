import { Grid, Card } from "@nextui-org/react"
import { useRouter } from "next/router";
import { FC } from 'react';

interface props {
    id: number
}
export const FavoriteCardPokemon: FC<props> = ({id}) => {
    const { push} = useRouter();
    const onFavoriteClicked = () => {
        push(`/pokemon/${id}`)
    }
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id} onClick={onFavoriteClicked}>
          <Card isHoverable isPressable css={{ padding: 10 }}>
            <Card.Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              width={"100%"}
              height={140}
            />
          </Card>
        </Grid>
  )
}
