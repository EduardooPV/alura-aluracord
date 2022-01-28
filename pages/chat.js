import Head from 'next/head'
import { Chat } from "../components/Chat";

export default function ChatPage() {
  return (
    <>
      <Head>
        <title>
          Bate papo | AluraCord
        </title>
      </Head>
      
      <Chat />
    </>
  );
}
