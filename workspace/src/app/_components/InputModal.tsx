export default function InputModal() {
  return (
    <dialog open className="h-full w-full bg-white/50 backdrop-blur-xl">
      <form className="fixed left-[6rem] top-[12rem] bg-slate-200/40 p-12 backdrop-blur-xl">
        <input
          type="file"
          className="file-input file-input-bordered"
          alt="ファイルを入れてください"
        />
      </form>
    </dialog>
  );
}
