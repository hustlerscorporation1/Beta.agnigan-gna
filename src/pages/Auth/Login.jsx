import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { supabase } from '../../superbase/superbaseClient';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error on input change
    setShowResendButton(false); // Hide resend button when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      // Vérifier si l'email est confirmé
      if (data.user && !data.user.email_confirmed_at) {
        setError(t('auth.login.error_verification'));
        setShowResendButton(true);
        // Déconnecter l'utilisateur
        await supabase.auth.signOut();
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate(ROUTES.PROFILE);
      }, 2000);
    } catch (error) {
      setError(error.message || t('auth.login.general_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      setError(t('auth.login.google_error'));
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email
      });
      
      if (error) throw error;
      
      setError('');
      setSuccess(true);
      setShowResendButton(false);
      
      // Afficher un message de succès temporaire
      setTimeout(() => {
        setSuccess(false);
        setError(t('auth.login.resend_success'));
      }, 100);
    } catch (error) {
      setError(t('auth.login.resend_error'));
    } finally {
      setResendLoading(false);
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
                  <CardTitle>{t('auth.login.title')}</CardTitle>
                  <CardDescription>
                    {t('auth.login.subtitle')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm mb-3">{error}</p>
                      {showResendButton && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleResendVerification}
                          loading={resendLoading}
                          disabled={resendLoading}
                          className="bg-white"
                        >
                          {t('auth.login.resend_verification')}
                        </Button>
                      )}
                    </div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-green-50 border-2 border-green-400 rounded-lg shadow-md mb-6"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-green-900 mb-2">
                            🎉 {t('auth.login.success_title')}
                          </h3>
                          <p className="text-green-800 text-sm">
                            {t('auth.login.success_desc')}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {!success && (
                  <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label={t('auth.login.email_label')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('auth.login.email_placeholder')}
                      icon={EnvelopeIcon}
                    />

                    <div className="relative">
                      <Input
                        label={t('auth.login.password_label')}
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.login.password_placeholder')}
                        icon={LockClosedIcon}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded" />
                        <span className="text-gray-600">{t('auth.login.remember_me')}</span>
                      </label>
                      <Link
                        to={ROUTES.FORGOT_PASSWORD}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {t('auth.login.forgot_password')}
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isLoading}
                      disabled={isLoading || success}
                    >
                      {t('auth.login.submit')}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t('auth.login.or_continue_with')}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={handleGoogleLogin}
                        disabled={success}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 text-center text-sm text-gray-600">
                    {t('auth.login.no_account')}{' '}
                    <Link
                      to={ROUTES.REGISTER}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t('auth.login.create_account')}
                    </Link>
                  </div>
                  </>
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

export default Login;
