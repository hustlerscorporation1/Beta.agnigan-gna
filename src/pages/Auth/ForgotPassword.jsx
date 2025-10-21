import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../superbase/superbaseClient';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../config/constants';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding gradient-bg min-h-screen flex items-center">
        <Container>
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Mot de passe oublié ?</CardTitle>
                  <CardDescription>
                    Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  {success ? (
                    <div className="text-center">
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 text-sm">
                          ✓ Un email de réinitialisation a été envoyé à <strong>{email}</strong>.
                          Veuillez vérifier votre boîte de réception.
                        </p>
                      </div>
                      <Link to={ROUTES.LOGIN}>
                        <Button variant="primary" fullWidth>
                          Retour à la connexion
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <Input
                        label="Adresse email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="votre@email.com"
                        icon={EnvelopeIcon}
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        Envoyer le lien de réinitialisation
                      </Button>

                      <Link to={ROUTES.LOGIN}>
                        <Button variant="ghost" fullWidth icon={ArrowLeftIcon}>
                          Retour à la connexion
                        </Button>
                      </Link>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
