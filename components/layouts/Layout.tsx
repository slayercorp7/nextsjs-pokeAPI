import Head from "next/head";
import { FC } from "react";
import { NavBar } from "../ui";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
}
const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<LayoutProps> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{!title && "pokemon app"}</title>
        <meta name="author" content="slayercorp7" />
        <meta name="description" content={`información sobre ${title}`} />
        <meta name="keywords" content={`${title}, pokemon , pokedex`} />
        <meta
          property="og:title"
          content={`informacion sobre ${title}`}
        />
        <meta
          property="og:description"
          content={`esta es la pagina sobre ${title}`}
        />
        <meta
          property="og:image"
          content={`${origin}/img/banner.png`}
        />
      </Head>
      <NavBar />
      <main style={{ padding: "0px 20px" }}>{children}</main>
    </>
  );
};
