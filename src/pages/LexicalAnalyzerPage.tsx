import React from "react";

import { Box, Button, Divider, chakra, HStack, Stack } from "@chakra-ui/react";
import { Editor } from "../components/Editor";
import { useForm } from "react-hook-form";

type OnSubmit = {
  LexicalAnalyzerEditor: string;
};

export const LexicalAnalyzerPage = () => {
  const { control, handleSubmit } = useForm<OnSubmit>();

  function onSubmit(values: OnSubmit) {
    const code = values.LexicalAnalyzerEditor.split("\r\n").map((line, i) => ({
      lineNumber: i + 1,
      content: line,
    }));

    const result = code.map((line) => {
      let token = null;
      if (isVariableRegex.test(line.content)) {
        token = detectedVariableType(line.content, line.lineNumber);
      }
      return token;
    });

    if (result.includes(null)) {
      console.log("Hay un error en la línea " + (result.indexOf(null) + 1));
      return;
    }

    console.table(result);
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
        <Editor name="LexicalAnalyzerEditor" control={control as any} />
      </chakra.form>
    </Stack>
  );
};

const detectedVariableType = (token: string, lineNumber: number) => {
  let variableType = null;
  let value: string | number = token.split(":=")[1].trim();

  if (/^string/.test(token)) {
    if (!/^'.*'$/.test(value)) {
      console.log("Error: El valor ingresado no es un string");
    }
    variableType = "string";
    value = value.replace(/'/g, "");
  } else if (/^number/.test(token)) {
    Number.isNaN(Number(value)) &&
      console.log("Error: El valor ingresado no es un numero");
    variableType = "number";
    value = Number(value);
  } else if (/^date/.test(token)) {
    variableType = "date";
  } else if (/^bool/.test(token)) {
    variableType = "bool";
    if (!["y", "n"].includes(value)) {
      console.log("Error: El valor ingresado no es un booleano");
      return;
    }
    variableType = "bool";
  }

  return {
    variableType,
    token,
    value,
    lineNumber,
    identifier: token.split(" ")[1].trim(),
  };
};

enum variablesType {
  "string",
  "number",
  "date",
  "bool",
}

const isVariableRegex = /\b(string|number|date|bool)\b ([^\s]+) := .*/;
