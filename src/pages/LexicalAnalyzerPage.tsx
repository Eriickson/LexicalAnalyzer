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
      let row = null;
      if (isVariableRegex.test(line.content)) {
        row = detectedtype(line.content, line.lineNumber);
      }

      console.log(isFuncRegex);

      if (isFuncRegex.test(line.content)) {
        console.log("Hola");
      }

      return row;
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

const detectedtype = (row: string, lineNumber: number) => {
  let type = null;
  let lexema: string | number = row.split(":=")[1].trim();
  const token = row.split(" ")[1].trim();

  if (keyWords.includes(token)) {
    console.log("La variable " + token + " es una palabra reservada");

    return;
  }

  if (/^string/.test(row)) {
    if (!/^'.*'$/.test(lexema)) {
      console.log("Error: El valor ingresado no es un string");
    }
    type = "string";
    lexema = lexema.replace(/'/g, "");
  } else if (/^number/.test(row)) {
    Number.isNaN(Number(lexema)) &&
      console.log("Error: El valor ingresado no es un numero");
    type = "number";
    lexema = Number(lexema);
  } else if (/^date/.test(row)) {
    type = "date";
  } else if (/^bool/.test(row)) {
    type = "bool";
    if (!["y", "n"].includes(lexema)) {
      console.log("Error: El valor ingresado no es un booleano");
      return;
    }
    type = "bool";
  }

  return {
    type,
    row,
    value: lexema,
    lineNumber,
    token,
  };
};

enum variablesType {
  "string",
  "number",
  "date",
  "bool",
}

const types = "(string|number|date|bool)";

const isVariableRegex = new RegExp(`\b${types}\b ([^\s]+) := .*`);

const isFuncRegex = new RegExp(
  `^func?<\b${types}\b>\s.*\(.*\s\b${types}\b\)\s{`
);

const keyWords = [
  "string",
  "number",
  "date",
  "bool",
  "if",
  "else",
  "while",
  "for",
  "in",
  "do",
  "end",
  "and",
  "or",
  "not",
  "true",
  "false",
  "null",
  "nil",
  "func",
  "return",
];
