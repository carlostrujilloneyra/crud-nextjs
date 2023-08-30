import Link from "next/link";

export default function NotFound() {
	return (
    <>
      <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl m-3 font-bold">Not Found</h1>
          <Link href="/" className="text-slate-400 text-2xl">
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
