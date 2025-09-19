import { useState, useEffect } from "react";
import "../App";
import "../Styles/Accueil.css";
import "../Styles/CreeUnCompte.css";
import heroImage from "../images/hero-image.jpg";
import Logo from "../images/LOGO_AGNIGBAN_GNA Trs Noir.png";
import { Link } from "react-router-dom";
import { supabase } from "../superbase/superbaseClient";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

function App() {
  // ---------- STATES ----------
  const [form, setForm] = useState({
    firstName: "", // prenom
    lastName: "", // nom
    phone: "", // telephone
    email: "",
    password: "",
    confirmPassword: "",
    channel: "email", // par défaut email pour l'OTP
  });

  const [otpStep, setOtpStep] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [verificationChannel, setVerificationChannel] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [lastAttemptTime, setLastAttemptTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Timer pour le délai entre les tentatives
  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // ---------- FONCTIONS ----------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Vérifier le délai entre les tentatives
    const currentTime = Date.now();
    const timeSinceLastAttempt = currentTime - lastAttemptTime;

    if (timeSinceLastAttempt < 60000) {
      setTimeRemaining(Math.ceil((60000 - timeSinceLastAttempt) / 1000));
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    setIsLoading(true);
    setLastAttemptTime(currentTime);

    try {
      // Inscription avec Supabase Auth

      const redirectUrl = window.location.hostname.includes("localhost")
        ? "http://localhost:3000"
        : "https://sandbox-anyigba-nya.onrender.com";

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        phone: form.phone,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
          },
          options: { emailRedirectTo: redirectUrl },
        },
      });

      if (error) throw error;

      if (data.user) {
        alert(
          "Inscription réussie ! Un email de confirmation vous a été envoyé."
        );
        setOtpStep(true);
      } else {
        throw new Error("L'inscription a échoué.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Vérification de l'OTP email
      const { error: emailError } = await supabase.auth.verifyOtp({
        email: form.email,
        token: emailOtp,
        type: "signup",
      });

      // Vérification de l'OTP téléphone
      const { error: phoneError } = await supabase.auth.verifyOtp({
        phone: form.phone,
        token: phoneOtp,
        type: "signup",
      });

      if (emailError) throw emailError;
      if (phoneError) throw phoneError;

      alert("Compte vérifié avec succès!");
      window.location.href = "/connexion";
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la vérification: " + err.message);
    }

    const [form, setForm] = useState({
      phone: "",
    });

    const handleChange = (value) => {
      setForm((prev) => ({
        ...prev,
        phone: value,
      }));
    };
  };

  // ---------- RENDER ----------
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Partie gauche */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-10">
        <div className="text-2xl md:text-3xl font-bold mb-9">
          <h1
            className="text-3xl font-bold mb-8 "
            style={{
              marginTop: "7rem",
              fontSize: "2.5rem",
            }}
          >
            S’inscrire
          </h1>
        </div>

        {/* NOM */}
        <div className="space-y-2 mb-5">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="ex: Adoboe"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* PRENOM */}
        <div className="space-y-2 mb-5">
          <label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-700"
          >
            Prénom
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="ex: Julien"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        {/* TELEPHONE */}
        <div className="space-y-2 mb-5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Numéro de téléphone
          </label>

          <div className="flex gap-2">
            {/* Sélecteur de pays avec drapeaux */}
            <PhoneInput
              country={"tg"} // 🇹🇬 Togo par défaut
              value={form.countryCode}
              onChange={(value, country) => {
                setForm((prev) => ({
                  ...prev,
                  countryCode: `+${country.dialCode}`, // ex: +228
                }));
              }}
              enableSearch={true} // permet de chercher un pays dans la liste
              inputClass="!hidden" // on cache le champ input auto-généré
              buttonClass="!border !border-gray-300 !rounded-md"
              dropdownClass="!text-sm"
            />

            {/* Champ numéro local */}
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="92 34 56 78"
              className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Pour afficher le numéro complet */}
          <p className="text-xs text-gray-500 mt-1">
            Numéro complet : {form.countryCode} {form.phone}
          </p>
        </div>

        {/* EMAIL */}
        <div className="space-y-2 mb-5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Entrez votre adresse mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-2 mb-6">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Entrez votre mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="eg: Pesn@s.p344"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-2 mb-6">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirmer votre mot de passe
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="eg: Pesn@s.p344"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Je dispose déjà d’un compte{" "}
          <Link to="/Connexion" className="text-blue-600 font-medium underline">
            Se connecter
          </Link>
        </p>

        {/* BOUTON ENVOYER */}
        {!otpStep && (
          <button
            className={`w-full py-2 rounded-md font-semibold transition duration-300 ${
              timeRemaining > 0
                ? "bg-gray-400 cursor-not-allowed"
                : isLoading
                ? "bg-yellow-500"
                : "bg-green-600 hover:bg-blue-700"
            } text-white`}
            onClick={handleRegister}
            disabled={isLoading || timeRemaining > 0}
          >
            {isLoading ? (
              "Inscription en cours..."
            ) : timeRemaining > 0 ? (
              <div className="flex flex-col W-full justify-center items-center">
                <span>Veuillez patienter</span>
                <span className="text-sm">
                  {timeRemaining} secondes restantes
                </span>
              </div>
            ) : (
              "Envoyer"
            )}
          </button>
        )}

        {/* Message de confirmation */}
        {otpStep && (
          <div className="mt-5 text-center">
            <h2 className="text-lg font-semibold mb-4">Vérifiez votre email</h2>
            <p className="text-gray-600 mb-4">
              Un lien de confirmation a été envoyé à votre adresse email.
              Veuillez cliquer sur le lien pour activer votre compte.
            </p>
            <p className="text-sm text-gray-500">
              Si vous ne recevez pas l'email, vérifiez votre dossier spam.
            </p>
          </div>
        )}
      </div>

      {/* Partie droite */}
      <div
        className="w-full md:w-1/2 relative bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div
          className="absolute top-90 inset-0 bg-black/50"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="relative z-10 p-8 text-white max-w-lg"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              marginTop: "10rem",
              background: "#F7FAFC",
              borderRadius: "1rem",
              color: "#000",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Découvrez nos meilleures offres
            </h2>
            <p className="text-sm md:text-base text-black-200 mb-6">
              Trouvez le terrain idéal, adapté à votre style de vie. En ville ou
              en périphérie, nous vous aidons à choisir le bon investissement.
            </p>
            <button
              className=" py-2 bg-green-500 text-white font-medium rounded shadow hover:bg-blue-500 transition"
              style={{
                color: "#ffffffff",
              }}
            >
              En savoir plus
            </button>
          </div>
          <div
            className="carre-price-standard absolute"
            style={{
              backgroundColor: "#FFF",
              borderRadius: "0.5rem",
              zIndex: "1000",
              marginTop: "24.5rem",
              marginLeft: "21.2rem",
              padding: "0.5rem",
            }}
          >
            <div className="mt-4 flex justify-between gap-2 items-center text-sm text-gray-600">
              <div>
                <span>📊 </span>
              </div>

              <div className="price-lot flex flex-col gap-1">
                <div>
                  <span>Prix standard de 1 lot</span>
                </div>

                <div>
                  <span className="font-bold text-black">1 000 000 Fcfa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            marginTop: "31rem",
            width: "70%",
            color: "#ffffffff",
            zIndex: "1000",
          }}
        >
          <h2
            className=""
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "left",
              marginBottom: "1rem",
            }}
          >
            Avec Anyigbã nya
          </h2>
          <p
            style={{
              color: "#ffffffff",
              textAlign: "left",
              marginBottom: "1rem",
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis odit
            illo doloremque voluptates commodi, animi atque. Veritatis, beatae
            fugiat illum obcaecati nihil nemo optio a dignissimos eos et non
            doloremque.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
