import React, { useRef } from 'react';
import { Calculator, Target, ChevronRight, TrendingUp } from 'lucide-react';
import weightlyVector from '../assets/image/weightly_vector.png';
import SquishyCard from '../components/SquishyCard';
import ArticleWrapper from '../features/article/ArticleWrapper';

const HomePage = () => {
  const featuresSectionRef = useRef(null);

  // scroll to start
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'start',  
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
            <h2 className="px-5 md:px-0 text-3xl text-blue-text font-lexend font-bold text-center mb-12">Made to Help Your Health Journey</h2>
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
        <ArticleWrapper/>
      </div>
    </div>
  );
};

export default HomePage;