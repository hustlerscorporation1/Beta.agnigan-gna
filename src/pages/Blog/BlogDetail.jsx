import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../config/constants';
import { blogPosts } from '../../data/blogPosts';

const BlogDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Trouver l'article
  const post = blogPosts.find(p => p.slug === slug);

  // Articles recommandés (3 articles aléatoires excluant l'article actuel)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post?.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const locale = i18n.language === 'en' ? 'en-US' : i18n.language === 'de' ? 'de-DE' : 'fr-FR';
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  // Si l'article n'existe pas
  if (!post) {
    return (
      <Layout>
        <section className="section-padding min-h-screen flex items-center justify-center">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('blog_detail.not_found')}
              </h1>
              <p className="text-gray-600 mb-8">
                {t('blog_detail.not_found_desc')}
              </p>
              <Button
                variant="primary"
                icon={ArrowLeftIcon}
                onClick={() => navigate(ROUTES.BLOG)}
              >
                {t('blog_detail.back_to_blog')}
              </Button>
            </div>
          </Container>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gray-50 pt-24 pb-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <button
              onClick={() => navigate(ROUTES.BLOG)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              {t('blog_detail.back_to_blog')}
            </button>

            {/* Category Badge */}
            <div className="mb-4">
              <Badge variant="success">{post.category}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium">{post.author.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {formatDate(post.publishedAt)}
              </div>
              
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                {t('blog.read_time', { count: parseInt(post.readTime) })}
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm" icon={ShareIcon}>
                {t('blog_detail.share')}
              </Button>
              <Button variant="outline" size="sm" icon={BookmarkIcon}>
                {t('blog_detail.save')}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Image */}
      <section>
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl -mt-8"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="section-padding">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="prose prose-lg max-w-none">
                  {/* Excerpt */}
                  <p className="text-xl text-gray-600 font-medium mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Content (HTML) */}
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <TagIcon className="h-5 w-5" />
                      {t('blog_detail.tags')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24 space-y-6">
                  {/* Author Card */}
                  <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {t('blog_detail.about_author')}
                            </h3>
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {post.author.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {t('blog_detail.contributor')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                  </Card>

                  {/* Newsletter Card */}
                  <Card className="bg-primary-50 border-primary-200">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        📬 {t('blog_detail.newsletter.title')}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {t('blog_detail.newsletter.desc')}
                      </p>
                      <Button variant="primary" fullWidth size="sm">
                        {t('blog_detail.newsletter.subscribe')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      <section className="section-padding bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('blog_detail.recommended')}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    hover
                    className="h-full overflow-hidden group cursor-pointer"
                    onClick={() => {
                      navigate(`${ROUTES.BLOG_DETAIL}/${relatedPost.slug}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="success">{relatedPost.category}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {relatedPost.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {t('blog.read_time', { count: parseInt(relatedPost.readTime) })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
};

export default BlogDetail;
