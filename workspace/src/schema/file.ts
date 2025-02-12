import { z } from "zod";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

const DOCUMENT_SCHEMA = z.object({
  files: z
    .instanceof(FileList)
    .refine((list) => list.length > 0, "No Files Inputed.")
    .transform((list) => Array.from(list))
    .refine(
      (files) => {
        const DOC_TYPES: Record<string, boolean> = {
          "application/pdf": true,
        };
        return files.every((file) => DOC_TYPES[file.type]);
      },
      { message: "Invalid file type. Allow type PDF Only" },
    )
    .refine(
      (files) => {
        files.every((file) => file.size <= FILE_SIZE_LIMIT);
      },
      {
        message: "File Size Should Not Exceed 5MB",
      },
    ),
});

export default DOCUMENT_SCHEMA;
