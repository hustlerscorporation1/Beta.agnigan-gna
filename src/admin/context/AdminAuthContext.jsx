import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../superbase/superbaseClient';

const AdminAuthContext = createContext(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth doit être utilisé dans AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    // Vérifier la session au chargement
    checkAdmin();

    // Écouter les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await checkAdmin();
        } else {
          setAdmin(null);
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkAdmin = async () => {
    try {
      // Vérification rapide de la session depuis le cache
      const cachedSession = localStorage.getItem('admin_session');
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Si on a un cache valide, l'utiliser temporairement
        if (cachedSession && !sessionChecked) {
          try {
            const cached = JSON.parse(cachedSession);
            if (cached.id === user.id && cached.role === 'admin') {
              setAdmin({ ...user, profile: cached });
              setSessionChecked(true);
            }
          } catch (e) {
            // Ignorer les erreurs de parsing
          }
        }
        
        // Vérifier dans la base (en arrière-plan si cache existant)
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, email, full_name, phone, role, permissions')
          .eq('id', user.id)
          .eq('role', 'admin')
          .single();

        if (error) throw error;

        if (profile) {
          setAdmin({ ...user, profile });
          // Mettre en cache la session
          localStorage.setItem('admin_session', JSON.stringify(profile));
        } else {
          setAdmin(null);
          localStorage.removeItem('admin_session');
        }
      } else {
        setAdmin(null);
        localStorage.removeItem('admin_session');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification admin:', error);
      setAdmin(null);
      localStorage.removeItem('admin_session');
    } finally {
      setLoading(false);
      setSessionChecked(true);
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Vérifier si l'utilisateur est admin avec requête optimisée
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, full_name, phone, role, permissions')
        .eq('id', data.user.id)
        .eq('role', 'admin')
        .single();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        throw new Error('Accès non autorisé - Seuls les administrateurs peuvent se connecter');
      }

      setAdmin({ ...data.user, profile });
      // Mettre en cache pour accès rapide
      localStorage.setItem('admin_session', JSON.stringify(profile));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setAdmin(null);
      // Nettoyer le cache
      localStorage.removeItem('admin_session');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    isAuthenticated: !!admin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
