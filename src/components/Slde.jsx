import React, { useEffect, useRef, useState } from "react";
import "../Styles/slide.css";
import satisfaction from "../images/satisfaction.jpg";

export default function ClientSlider({
  clients = [
    {
      name: "AGBOSSOU Anani",
      role: "claud",
      text: "Arcu laoreet malesuada nunc eget. Fermentum et dui enim aliquam habitant elit euismod erat praesent. Tincidunt semper interdum faucibus cras",
      image: `url(${satisfaction})`,
    },
    {
      name: "KOFFI Marie",
      role: "Designer",
      text: "Suspendisse potenti. Vivamus non eros vel lacus tempor pretium vitae id est. Donec vehicula quam vel ligula facilisis posuere.",
      image: `url(${satisfaction})`,
    },
    {
      name: "AMENOU Kodjo",
      role: "Développeur",
      text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer quis ipsum in augue fermentum.",
      image: `url(${satisfaction})`,
    },
  ],
  interval = 2000,
  showDots = true,
}) {
  const [index, setIndex] = useState(0);
  const length = clients.length;
  const timerRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [index]);

  function startAutoPlay() {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      if (!isHovering.current) {
        setIndex((prev) => (prev + 1) % length);
      }
    }, interval);
  }

  function stopAutoPlay() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function goTo(i) {
    setIndex(((i % length) + length) % length);
  }

  return (
    <section className="py-16 px-4 bg-gray-100 text-center section-client">
      <div
        className="relative w-full max-w-3xl mx-auto"
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${length * 100}%`,
              transform: `translateX(-${index * (100 / length)}%)`,
            }}
          >
            {clients.map((client, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 flex flex-col items-center p-6"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ce que nos clients disent de nous
                </h3>
                <p className="text-gray-500 max-w-xl mx-auto mb-8">
                  “{client.text}”
                </p>
                <div className="text-center mb-4">
                  <p className="font-semibold text-gray-700">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.role}</p>
                </div>
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-28 h-28 rounded-full object-cover mb-4"
                />
              </div>
            ))}
          </div>
        </div>

        {showDots && (
          <div className="flex justify-center gap-2 mt-4">
            {clients.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Aller au témoignage ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-transform ${
                  i === index
                    ? "scale-110 bg-gray-800"
                    : "bg-gray-400 opacity-60"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
