import React, { useEffect, useState } from "react";
import appConfig from "../config.json";

// Skynex UI
import { Box, TextField, Button } from "@skynexui/components";

import { createClient } from "@supabase/supabase-js";

// Components
import { Header } from "./Header";
import { MessageList } from "./MessageList";

import bg from "../public/bg.svg";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NDY1NywiZXhwIjoxOTU4ODYwNjU3fQ.W1hrGXZjO0u8fe78Vp-dTRSKG4fo9qNZXarxruf9FkM";
const SUPABASE__URL = "https://riigmytluvnruzrqhqir.supabase.co";
const supabaseClient = createClient(SUPABASE__URL, SUPABASE_ANON_KEY);

export function Chat() {
  const [mensagem, setMensagem] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaDeMensagens(data);
      });

    setLoading(false);
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: "EduardooPV",
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([mensagem])
      .then(({ data }) => {
        setListaDeMensagens([data[0], ...listaDeMensagens]);
      });

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
            loading={loading}
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
              label="ENVIAR"
              styleSheet={{
                position: "absolute",
                right: "2rem",
                marginBottom: "8px;",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
