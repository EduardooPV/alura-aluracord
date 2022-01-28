import { Box, Text, Button } from "@skynexui/components";

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