import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import { Calculator, Target, ChevronRight, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import weightlyVector from '../assets/image/weightly_vector.png';
import SquishyCard from '../components/SquishyCard';

const HomePage = () => {
  const featuresSectionRef = useRef(null);

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

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth', // Untuk animasi scroll yang mulus
        block: 'start',      // Menyelaraskan bagian atas elemen dengan bagian atas viewport
      });
    }
  };

  return (
    <div>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 py-14 px-6 max-w-6xl mx-auto text-primary-blue">
          <div className='flex-shrink-0 mb-8 md:mb-0 md:w-1/2 flex justify-center'>
            <img src={weightlyVector} alt='weightly'
              className='w-48 h-auto object-cover md:w-72 -rotate-[20deg] hover:rotate-[20deg] transition ease-in-out duration-1000'/>
          </div>
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-5xl text-blue-text font-bold font-lexend mb-6">Weightly</h1>
            <p className="text-s text-justify text-blue-text mb-8 font-medium font-poppins md:mr-5">Your journey to a healthier you starts with better tracking. Our platform helps you monitor your weight, calculate your BMI, and understand your body fat percentage, so you can set real goals and reach them confidently!</p>
            <button onClick={() => scrollToSection(featuresSectionRef)} className="font-poppins font-normal bg-primary-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Learn more
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" ref={featuresSectionRef} className="py-20">
          <div className="max-w-5xl mx-auto mb-12">
            <h2 className="text-3xl text-blue-text font-lexend font-bold text-center mb-12">Made to Help Your Health Journey</h2>
            <div className="grid md:grid-cols-3 gap-8 font-poppins">

              <SquishyCard title="Weight & Body Fat Tracking" icon={TrendingUp}>
                <p className="text-white">Monitor your progress with daily weight and body fat percentage tracking.</p>
              </SquishyCard>

              <SquishyCard title="Health Calculators" icon={Calculator}>
                <p className="text-white">Calculate BMI, body fat percentage, and TDEE with our calculators.</p>
              </SquishyCard>

              <SquishyCard title="Goal Setting" icon={Target}>
                <p className="text-white">Set and track your weight and body composition goals with visual progress indicators.</p>
              </SquishyCard>

            </div>
          </div>
        </section>
      </div>

      {/* Articles Section */}
      <div className='bg-primary-blue rounded-t-[2.5rem] mt-10'>
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Articles</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, index) => (
                <Link to={`/articles/${article.id}`} key={article.id || index}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center text-blue-600 font-medium mt-auto"> 
                      Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;