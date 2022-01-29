import { useEffect, useState } from "react";
import appConfig from "../config.json";
import moment from "moment";

// Skynex UI
import { Box, Text, Image } from "@skynexui/components";
// Material UI
import CircularProgress from "@mui/material/CircularProgress";
import Popover from "@mui/material/Popover";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GitHubIcon from "@mui/icons-material/GitHub";
import { createTheme } from "@mui/material/styles";
import { Password } from "@mui/icons-material";

// MATERIAL UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#F89D24",
    },
  },
});

export function MessageList({ mensagens, setMensagens, loading }) {
  const [dadosGithub, setDadosGithub] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function handleApagaMensagem(ids) {
    const deletarMensagem = mensagens.filter((mensagem) => mensagem.id !== ids);
    setMensagens(deletarMensagem);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    fetch("https://api.github.com/users/EduardooPV")
      .then((response) => response.json())
      .then((result) => {
        setDadosGithub(result);
      })
      .catch((err) => {
        console.error("Failed retrieving information", err);
      });
  }, []);

  return (
    <Box
      tag="ul"
      className="scroll"
      styleSheet={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      <Box
        styleSheet={{
          position: "absolute",
          right: "50%",
          bottom: "50%",
        }}
      >
        {loading ? <CircularProgress theme={theme} /> : null}
      </Box>

      {mensagens.map((mensagem, index) => {
        return (
          <Text
            key={mensagem.id}
            className="message"
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              position: "relative",
              transition: "all 0.1s",

              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <DeleteForeverIcon
              className="delete-button"
              onClick={() => handleApagaMensagem(mensagem.id)}
              sx={{
                fontSize: "2.5rem",
                color: "rgba(220,0,0,0.8)",
                padding: "0.3rem",
                borderRadius: "50%",
                position: "absolute",
                right: "1rem",
                top: "-1rem",
                cursor: "pointer",
                display: "none",
                transition: "all 0.2s",
                "&:hover": {
                  background: appConfig.theme.colors.neutrals[800],
                  color: "rgba(220,0,0,1)",
                },
              }}
            />

            <Box
              styleSheet={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <Image
                styleSheet={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                  hover: {
                    cursor: "pointer",
                  },
                }}
                src={`https://github.com/${mensagem.de}.png`}
                //MATERIAL UI
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              />
              
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Box
                  styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(20,20,20,1)",
                    border: `1px solid ${appConfig.theme.colors.primary[500]}`,
                    padding: "1rem",
                    position: "relative",
                  }}
                >
                  <a href={dadosGithub.html_url}>
                    <GitHubIcon
                      sx={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        color: "#c3c3c3",
                        fontSize: "1.8rem",
                        cursor: "pointer",

                        "&:hover": {
                          color: "white",
                        },
                      }}
                    />
                  </a>

                  <Image
                    styleSheet={{
                      width: "120px",
                      height: "120px",

                      margin: "0 auto",
                      borderRadius: "50%",

                      lineHeight: "0",
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                  />
                  <Text
                    styleSheet={{
                      color: "white",
                      margin: "1rem 0.5rem 0 0.5rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    {mensagem.de}
                  </Text>

                  <Text
                    styleSheet={{
                      color: "#aaa",
                      margin: "0 0.5rem",
                      textAlign: "end",
                    }}
                  >
                    #{mensagem.id * 100}
                  </Text>

                  <Box
                    styleSheet={{
                      margin: "1rem 0.5rem 0 0.5rem",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      justifyContent: "space-between",
                      justifyItems: "stretch",
                    }}
                  >
                    <Box
                      styleSheet={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        styleSheet={{
                          color: "#c3c3c3",
                          fontSize: "0.8rem",
                        }}
                      >
                        Seguidores
                      </Text>
                      <Text
                        styleSheet={{
                          color: "white",
                          fontSize: "2rem",
                        }}
                      >
                        {dadosGithub.followers}
                      </Text>
                    </Box>

                    <Box
                      styleSheet={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        styleSheet={{
                          color: "#c3c3c3",
                          fontSize: "0.8rem",
                        }}
                      >
                        Seguindo
                      </Text>
                      <Text
                        styleSheet={{
                          color: "white",
                          fontSize: "2rem",
                        }}
                      >
                        {dadosGithub.following}
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    styleSheet={{
                      margin: "1rem 0.5rem 0 0.5rem",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      justifyContent: "space-between",
                      justifyItems: "stretch",
                    }}
                  >
                    <Box
                      styleSheet={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        styleSheet={{
                          color: "#c3c3c3",
                          fontSize: "0.8rem",
                        }}
                      >
                        Repos
                      </Text>
                      <Text
                        styleSheet={{
                          color: "white",
                          fontSize: "2rem",
                        }}
                      >
                        {dadosGithub.public_repos}
                      </Text>
                    </Box>

                    <Box
                      styleSheet={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        styleSheet={{
                          color: "#c3c3c3",
                          fontSize: "0.8rem",
                        }}
                      >
                        Gists
                      </Text>
                      <Text
                        styleSheet={{
                          color: "white",
                          fontSize: "2rem",
                        }}
                      >
                        {dadosGithub.public_gists}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Popover>
                          
              <Text
                styleSheet={{
                  lineHeight: "0",
                  hover: {
                    cursor: "pointer",
                  },
                }}
                tag="strong"
                //MATERIAL UI
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                {mensagem.de}
              </Text>

              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  lineHeight: "0",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {moment(mensagem.created_at).format("HH:mm:ss")},{" "}
                {moment(mensagem.created_at).format("DD/MM")}
              </Text>
            </Box>
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image
                styleSheet={{ maxWidth: "300px" }}
                src={mensagem.texto.replace(":sticker:", "")}
              />
            ) : (
              mensagem.texto
            )}

            <style>{`
              .message:hover > .delete-button {
                display: block;
              }
            `}</style>
          </Text>
        );
      })}
    </Box>
  );
}
