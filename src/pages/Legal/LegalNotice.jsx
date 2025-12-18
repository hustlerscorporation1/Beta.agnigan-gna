import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';

const LegalNotice = () => {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('legal.notice.title')}</h1>

            <div className="prose prose-blue max-w-none">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('legal.notice.section_title')}</h2>
                  <p className="text-gray-600">{t('legal.notice.company_name')}</p>
                  <p className="text-gray-600">{t('legal.notice.headquarters')}</p>
                  <p className="text-gray-600">{t('legal.notice.phone')}</p>
                  <p className="text-gray-600">{t('legal.notice.email')}</p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">&nbsp;</h2>
                  <p className="text-gray-600">{t('legal.notice.director')}</p>
                  <p className="text-gray-600">{t('legal.notice.hosting')}</p>
                </div>
              </div>

              <section className="pt-8 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed italic">
                  {t('legal.notice.section_content')}
                </p>
              </section>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
};

export default LegalNotice;
