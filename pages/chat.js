import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";

import bg from "../public/bg.svg";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NDY1NywiZXhwIjoxOTU4ODYwNjU3fQ.W1hrGXZjO0u8fe78Vp-dTRSKG4fo9qNZXarxruf9FkM";
const SUPABASE__URL = "https://riigmytluvnruzrqhqir.supabase.co";
const supabaseClient = createClient(SUPABASE__URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  // Fazer um loading enquanto as mensagens não carregam 
  // Mouseover na imagem da pessoa e abrir um profile
  // Adicionar novas funções / botões

  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order('id', { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data)
      });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: "EduardooPV",
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        setListaDeMensagens([data[0], ...listaDeMensagens]);
      })

    setMensagem("");
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.neutrals[999],
        backgroundImage: `url(${bg.src})`,
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          border: `1px solid ${appConfig.theme.colors.primary[600]}`,
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            mensagens={listaDeMensagens}
            setMensagens={setListaDeMensagens}
          />

          <Box
            as="form"
            name="digitarMensagem"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={() => handleNovaMensagem(mensagem)}
              variant="secondary"
              colorVariant="warning"
              iconName="arrowRight"
              styleSheet={{
                marginBottom: "8px;",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="secondary"
          colorVariant="warning"
          label="Sair"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList({ mensagens, setMensagens }) {
  function handleApagaMensagem(ids) {
    const deletarMensagem = mensagens.filter((mensagem) => mensagem.id !== ids);
    setMensagens(deletarMensagem);
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              position: "relative",

              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Button
              onClick={() => handleApagaMensagem(mensagem.id)}
              variant="secondary"
              colorVariant="warning"
              iconName="arrowRight"
              styleSheet={{
                position: "absolute",
                right: "0",
                top: "0",
              }}
            />

            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
