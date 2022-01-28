import Head from "next/head";

import { MenuInicial } from "../components/MenuInicial";

export default function PaginaInicial() {
  return (
    <>
      <Head>
        <title>Inicio | AluraCord</title>
      </Head>
      
      <MenuInicial />
    </>
  );
}
