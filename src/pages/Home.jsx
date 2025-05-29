import React from 'react';
import { Scale, Calculator, Target, ChevronRight, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import weightlyVector from '../assets/weightly_vector.png';

const HomePage = () => {
// mock articles (nanti article nya dibikin beneran)
  const articles = [
    {
      title: "Understanding BMI and Its Limitations",
      excerpt: "Learn why BMI is a useful starting point but not the complete picture of your health.",
      category: "Health Basics"
    },
    {
      title: "The Science Behind Body Fat Percentage",
      excerpt: "Discover why body fat percentage is often more important than weight alone.",
      category: "Fitness"
    },
    {
      title: "Creating a Sustainable Weight Loss Plan",
      excerpt: "Tips for setting realistic goals and maintaining long-term success.",
      category: "Weight Loss"
    },
    {
      title: "Nutrition Basics for Body Composition",
      excerpt: "How to fuel your body for optimal performance and health.",
      category: "Nutrition"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-20 px-6 max-w-6xl mx-auto text-primary-blue">
        <div className='flex-shrink-0 mb-8 md:mb-0 md:w-1/2 flex justify-center'>
          <img src={weightlyVector} alt='weightly'
            className='w-40 h-auto object-cover md:w-72 -rotate-[20deg] hover:rotate-[20deg] transition ease-in-out duration-500'/>
        </div>
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl font-bold mb-6">Weightly</h1>
          <p className="text-s mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          <button className="bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
            Learn more
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Made to Help Your Health Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Weight & Body Fat Tracking</h3>
              <p className="text-gray-600">Monitor your progress with daily weight and body fat percentage tracking using the US Navy method.</p>
            </Card>
            <Card className="text-center">
              <Calculator className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Health Calculators</h3>
              <p className="text-gray-600">Calculate BMI, body fat percentage, and TDEE with our accurate, science-based calculators.</p>
            </Card>
            <Card className="text-center">
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Goal Setting</h3>
              <p className="text-gray-600">Set and track your weight and body composition goals with visual progress indicators.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-gray-50 rounded-lg">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  Read More <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;