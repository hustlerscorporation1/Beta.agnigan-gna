import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { ROUTES } from '../../config/constants';
import { blogPosts, blogCategories } from '../../data/blogPosts';

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtrer les articles
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Article en vedette (le plus récent)
  const featuredPost = blogPosts[0];

  // Articles récents (sans le featured)
  const recentPosts = blogPosts.slice(1, 4);

  // Formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Blog Agnigban Gna
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Conseils, guides et actualités sur l'immobilier au Togo
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <Input
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={MagnifyingGlassIcon}
                className="bg-white"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <Container>
          <div className="py-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.slug
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      {!searchQuery && selectedCategory === 'all' && (
        <section className="section-padding bg-gray-50">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Article en vedette</h2>
              <Card hover className="overflow-hidden group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-80 md:h-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="success">{featuredPost.category}</Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(featuredPost.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {featuredPost.author.name}
                      </span>
                    </div>

                    <Button
                      variant="primary"
                      icon={ArrowRightIcon}
                      iconPosition="right"
                      onClick={() => navigate(`${ROUTES.BLOG_DETAIL}/${featuredPost.slug}`)}
                    >
                      Lire l'article
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Articles Grid */}
      <section className="section-padding">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery || selectedCategory !== 'all' 
                ? `Résultats (${filteredPosts.length})`
                : 'Derniers articles'
              }
            </h2>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    hover
                    className="h-full overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`${ROUTES.BLOG_DETAIL}/${post.slug}`)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="success">{post.category}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm text-gray-700">
                          {post.author.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Restez informé
            </h2>
            <p className="text-primary-100 mb-8">
              Recevez nos derniers articles et conseils directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="bg-white flex-1"
              />
              <Button variant="secondary" size="lg">
                S'abonner
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
};

export default Blog;
