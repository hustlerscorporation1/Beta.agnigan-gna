import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../superbase/superbaseClient";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const { hash } = window.location;
      if (hash && hash.includes("access_token")) {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Erreur de vérification:", error.message);
          alert(
            "Erreur lors de la vérification de l'email. Veuillez réessayer."
          );
          navigate("/CreeUnCompte");
          return;
        }

        if (session?.user) {
          alert(
            "Email vérifié avec succès! Vous pouvez maintenant vous connecter."
          );
          navigate("/profil");
        }
      } else {
        navigate("/Connexion");
      }
    };

    handleEmailConfirmation();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Vérification en cours...</h2>
        <p className="text-gray-600">
          Veuillez patienter pendant la vérification de votre email.
        </p>
      </div>
    </div>
  );
}

export default AuthCallback;
