import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-soft"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('legal.terms.title')}</h1>
            <p className="text-gray-500 mb-8">{t('legal.terms.last_update')}</p>

            <div className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t('legal.terms.intro')}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('legal.terms.section1_title')}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('legal.terms.section1_content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('legal.terms.section2_title')}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('legal.terms.section2_content')}
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('legal.terms.section3_title')}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {t('legal.terms.section3_content')}
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
};

export default TermsOfUse;
