"use client";
import { useAtom } from "jotai";
import { useState } from "react";
import isMouseOver from "~/jotai/isMouseOver";

export default function InputModal() {
  const [file, setFile] = useState<File | null>(null);
  const [isOver, setIsOver] = useAtom(isMouseOver);
  return (
    <dialog
      open
      onMouseOver={() => {
        setIsOver(true);
      }}
      onMouseLeave={() => {
        setIsOver(false);
      }}
      className={`rounded-lg border ${isOver ? "bg-white/60" : "bg-slate-400/40"} p-32 backdrop-blur-2xl`}
    >
      <form className="text-align mx-auto flex items-center justify-center">
        <input
          type="file"
          onChange={async (event) => {
            const files = event.target.files;
            if (files) {
              const DOCUMENT_SCHEMA = (await import("~/schema/file")).default;
              const isValid = DOCUMENT_SCHEMA.safeParse({
                files,
              });
              if (isValid.success) {
                setFile(files.item(0));
                event.target.form?.submit();
              }
            }
          }}
          onSubmit={(event) => {
            event.preventDefault();
            event.currentTarget.form?.reset();
          }}
          className="file-input file-input-bordered"
          alt="ファイルを入れてください"
        />
      </form>
    </dialog>
  );
}
