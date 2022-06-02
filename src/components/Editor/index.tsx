import React, { FC } from "react";

import MonacoEditor from "@monaco-editor/react";
import { Control, Controller, FieldValues } from "react-hook-form";

interface EditorProps {
  name: string;
  control: Control<FieldValues, any>;
}

export const Editor: FC<EditorProps> = ({ name, control }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MonacoEditor
            theme="vs-dark"
            height="100%"
            defaultValue="// some comment"
            {...field}
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
          />
        )}
      />
    </>
  );
};
