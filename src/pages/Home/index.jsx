import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from './Hero';
import Services from './Services';
import FeaturedProperties from './FeaturedProperties';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <FeaturedProperties />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Home;
