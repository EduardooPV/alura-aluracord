import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";

// Skynex UI
import { Box, TextField, Button } from "@skynexui/components";
import SendIcon from "@mui/icons-material/Send";

import { createClient } from "@supabase/supabase-js";

// Components
import { Header } from "./Header";
import { MessageList } from "./MessageList";
import { ButtonSendSticker } from "./ButtonSendSticker";

import bg from "../public/bg.svg";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4NDY1NywiZXhwIjoxOTU4ODYwNjU3fQ.W1hrGXZjO0u8fe78Vp-dTRSKG4fo9qNZXarxruf9FkM";
const SUPABASE__URL = "https://riigmytluvnruzrqhqir.supabase.co";
const supabaseClient = createClient(SUPABASE__URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export function Chat() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
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

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log("Nova mensagem:", novaMensagem);
      console.log("listaDeMensagens:", listaDeMensagens);
      // Quero reusar um valor de referencia (objeto/array)
      // Passar uma função pro setState

      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setListaDeMensagens((valorAtualDaLista) => {
        console.log("valorAtualDaLista:", valorAtualDaLista);
        return [novaMensagem, ...valorAtualDaLista];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([
        mensagem,
      ])
      .then(({ data }) => {
        console.log(`Mensagem criada: ${data}`)
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

            <Box
              styleSheet={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                gap: "0.5rem",
              }}
            >
              <Button
                onClick={() => handleNovaMensagem(mensagem)}
                variant="secondary"
                colorVariant="warning"
                label={
                  <SendIcon
                    sx={{
                      fontSize: "1.2rem",
                      color: `${appConfig.theme.colors.neutrals[200]}`,
                      padding: "0",
                      marginTop: "0.2rem",
                    }}
                  />
                }
                styleSheet={{
                  borderRadius: "50%",
                  padding: "0",
                  minWidth: "38px",
                  minHeight: "38px",
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[500],
                  },
                }}
              />
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  handleNovaMensagem(`:sticker:${sticker}`);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <style>{`
      .scroll::-webkit-scrollbar {
          width: 8px;
          background: ${appConfig.theme.colors.neutrals[500]}
      }
      
      .scroll::-webkit-scrollbar-thumb {
        background-color: ${appConfig.theme.colors.primary[500]};    
        border-radius: 10px;     
      }
    `}</style>
    </Box>
  );
}
