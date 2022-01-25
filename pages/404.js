import notfound from "../public/notfound.gif";
import appConfig from "../config.json";
import { Box, Text, Image } from "@skynexui/components";

export default function PaginaDoChat() {
  
  return (
    <Box
      styleSheet={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
        backgroundColor: appConfig.theme.colors.neutrals["050"],
      }}
    > 
      <Text
        variant="heading1"
        styleSheet={{
          marginBottom: "20px",
          color: appConfig.theme.colors.neutrals[500],
        }}  
      >
        ERROR 404.
      </Text>
      
      <Box
        styleSheet={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
          maxWidth: "400px",
        }}
      >
        <Image src={notfound.src} alt="Página não encontrada" />
      </Box>

      <Text
        variant="heading4"
        styleSheet={{
          marginBottom: "20px",
          color: appConfig.theme.colors.neutrals[300],
        }}  
      >
        Infelizmente você caiu em uma página que não existe
      </Text>
      <Text
        tag="a"
        href="/"
        styleSheet={{
          marginBottom: "20px",
          color: appConfig.theme.colors.neutrals[400],
        }}  
      >
        Voltar para o ínicio
      </Text>
    </Box>
  );
}
