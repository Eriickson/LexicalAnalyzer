import React from "react";

import { Box, Button, Divider, chakra, HStack, Stack } from "@chakra-ui/react";
import { Editor } from "../components/Editor";
import { useForm } from "react-hook-form";

export const LexicalAnalyzerPage = () => {
  const { control, handleSubmit } = useForm();

  function onSubmit(values: any) {
    console.log(values.LexicalAnalyzerEditor.split("\r\n"));
  }

  return (
    <Stack bgColor="#1e1e1e" border="1px solid" height="100vh">
      <HStack p="10" justifyContent="flex-end">
        <Button
          type="submit"
          form="lexical-analyzer-form"
          colorScheme="green"
          rounded="none"
        >
          Analizar
        </Button>
      </HStack>
      <Divider borderColor="white" />
      <chakra.form
        flex="1"
        p="10"
        id="lexical-analyzer-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Editor name="LexicalAnalyzerEditor" control={control} />
      </chakra.form>
    </Stack>
  );
};
