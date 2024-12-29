import Image from "next/image";

export default function Banner() {
  return (
    <header className=" relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
      <div className="absolute bottom-0 left-0">
        <Image
          src={"/wave.svg"}
          width={1920}
          height={320}
          alt="Imagen del banner, un efecto de ola"
        />
      </div>
      <div className="relative flex justify-center py-20 z-50">
        <div className="flex flex-col gap-y-14">
          <div className="flex flex-col items-center gap-y-6">
            <h1 className="text-7xl font-bold">Paleta de Colores</h1>
            <h3 className="text-3xl font-normal">
              Explora, crea y personaliza tus paletas de colores perfectas.
            </h3>
          </div>
          <div className="flex flex-col items-center gap-y-6">
            <div className="flex items-center gap-x-4">
              <div className="outline outline-3 rounded-full w-10 h-10 bg-red-500"></div>
              <div className="outline outline-3 rounded-full w-10 h-10 bg-blue-500"></div>
              <div className="outline outline-3 rounded-full w-10 h-10 bg-green-500"></div>
              <div className="outline outline-3 rounded-full w-10 h-10 bg-yellow-500"></div>
              <div className="outline outline-3 rounded-full w-10 h-10 bg-gray-500"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
