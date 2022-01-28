import { Box, Text, Button } from "@skynexui/components";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import appConfig from "../config.json";

export function Header() {
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
        <Text variant="heading4">Seja bem vindo | Aluracord</Text>
        <Button
          variant="secondary"
          colorVariant="warning"
          label={
            <ExitToAppIcon
              sx={{
                fontSize: "1.2rem",
                color: `${appConfig.theme.colors.neutrals[200]}`,
                padding: "0",
                marginTop: "0.2rem",
              }}
            />
          }
          styleSheet={{
            borderRadius: "5px",
            padding: "0",
            minWidth: "40px",
            minHeight: "40px",
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[500],
            },
          }}
          href="/"
        />
      </Box>
    </>
  );
}
