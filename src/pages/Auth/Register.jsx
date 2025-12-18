import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../superbase/superbaseClient';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.register.error_password_match'));
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(t('auth.register.error_password_length'));
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone
          }
        }
      });

      if (error) throw error;

      setSuccess(true);
      // Redirect after 5 seconds to give user time to read the message
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 5000);
    } catch (error) {
      setError(error.message || t('auth.register.general_error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
    } catch (error) {
      setError(t('auth.register.google_error'));
    }
  };

  return (
    <Layout>
      <section className="section-padding gradient-bg min-h-screen flex items-center">
        <Container>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>{t('auth.register.title')}</CardTitle>
                  <CardDescription>
                    {t('auth.register.subtitle')}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-8">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-green-50 border-2 border-green-400 rounded-lg shadow-md"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-green-900 mb-2">
                            🎉 {t('auth.register.success_title')}
                          </h3>
                          <div className="text-green-800 space-y-2">
                            <p className="font-medium">
                              {t('auth.register.welcome')}
                            </p>
                            <p className="text-sm">
                              📧 <strong>{t('auth.register.important_step')}</strong> {t('auth.register.verification_sent')} <strong>{formData.email}</strong>
                            </p>
                            <p className="text-sm">
                              ✅ {t('auth.register.verification_instruction')}
                            </p>
                            <p className="text-xs text-green-700 mt-3 italic">
                              💡 {t('auth.register.spam_hint')}
                            </p>
                            <p className="text-xs text-green-600 mt-2">
                              {t('auth.register.redirecting')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {!success && (
                  <>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label={t('auth.register.first_name')}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.register.first_name_placeholder')}
                        icon={UserIcon}
                      />

                      <Input
                        label={t('auth.register.last_name')}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.register.last_name_placeholder')}
                        icon={UserIcon}
                      />
                    </div>

                    <Input
                      label={t('auth.register.email_label')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t('auth.register.email_placeholder')}
                      icon={EnvelopeIcon}
                    />

                    <Input
                      label={t('auth.register.phone_label')}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder={t('auth.register.phone_placeholder')}
                      icon={PhoneIcon}
                    />

                    <div className="relative">
                      <Input
                        label={t('auth.register.password_label')}
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.register.password_placeholder')}
                        icon={LockClosedIcon}
                        helperText={t('auth.register.password_helper')}
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

                    <div className="relative">
                      <Input
                        label={t('auth.register.confirm_password_label')}
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder={t('auth.register.confirm_password_placeholder')}
                        icon={LockClosedIcon}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="text-sm">
                      <label className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-2 rounded" required />
                        <span className="text-gray-600">
                          {t('auth.register.accept_terms')}{' '}
                          <Link to="/conditions" className="text-blue-600 hover:text-blue-700">
                            {t('auth.register.terms_link')}
                          </Link>
                          {' '}{t('auth.register.and')}{' '}
                          <Link to="/confidentialite" className="text-blue-600 hover:text-blue-700">
                            {t('auth.register.privacy_link')}
                          </Link>
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      loading={isLoading}
                      disabled={isLoading || success}
                    >
                      {t('auth.register.submit')}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">{t('auth.register.or_signup_with')}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={handleGoogleSignup}
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
                    {t('auth.register.already_have_account')}{' '}
                    <Link
                      to={ROUTES.LOGIN}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      {t('auth.register.login')}
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

export default Register;
