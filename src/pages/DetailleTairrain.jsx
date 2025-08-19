import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function ProprieteDetail() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
        >
          Acheter
        </button>
        <div className="text-right">
          <h2 className="text-2xl font-bold">250 000 000 Fcfa</h2>
          <p className="text-gray-500 text-sm">100 000 Fcfa / m²</p>
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-2">
        Terrain à Agoè – 400 m², Titre Foncier
      </h1>
      <p className="text-gray-500 mb-4">ID : 123423EDDT34TRY</p>

      {/* Image principale et carte */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <img
          src="/images/terrain-agoe.jpg"
          alt="Terrain"
          className="col-span-2 rounded-2xl object-cover w-full h-80"
        />
        <div className="flex flex-col gap-4">
          <img
            src="/images/terrain-2.jpg"
            alt="Photos"
            className="rounded-2xl object-cover h-40 w-full"
          />
          <div className="bg-gray-200 rounded-2xl flex-1 flex items-center justify-center">
            <p className="text-gray-600">📍 Carte ici</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Lorem ipsum dolor sit amet consectetur. Morbi quis habitant donec
        aliquet interdum. Massa bibendum tellus sed ultricies. Fermentum
        pharetra in lorem eget. Et imperdiet sed ultrices pulvinar ultrices
        enim...
      </p>

      {/* Titres formels */}
      <h2 className="text-xl font-semibold mb-4">
        Titres formels pour documents officiels
      </h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
          <span className="text-red-500">📄</span>
          <div>
            <h3 className="font-semibold">
              Fiche d’Identification du Terrain à Vendre
            </h3>
            <p className="text-sm text-gray-600">
              Terrain de 400 m² situé à Agoè, zone calme et accessible.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
          <span className="text-red-500">📄</span>
          <div>
            <h3 className="font-semibold">
              Note d’Information Foncière – Parcelle N° [2345]
            </h3>
            <p className="text-sm text-gray-600">
              La parcelle référencée sous le numéro 2345/AC, d’une superficie de
              400 m²...
            </p>
          </div>
        </div>
      </div>

      {/* -------- Modal -------- */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-bold">
                Formulaire de demande d’achat
              </Dialog.Title>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-green-300"
              />
              <input
                type="text"
                placeholder="Prénom"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-green-300"
              />
              <input
                type="text"
                placeholder="N° Carte d’Identité"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-green-300"
              />
              <input
                type="tel"
                placeholder="Téléphone"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-green-300"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-green-300"
              />
              <textarea
                placeholder="Votre message"
                className="w-full border rounded-lg p-3 focus:ring focus:ring-green-300"
                rows="3"
              ></textarea>

              {/* Pièce jointe */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pièce jointe (CNI, Document foncier…)
                </label>
                <input
                  type="file"
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-green-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Envoyer la demande
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
