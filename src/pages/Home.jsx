import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import { Calculator, Target, ChevronRight, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import weightlyVector from '../assets/image/weightly_vector.png';
import SquishyCard from '../components/SquishyCard';

const HomePage = () => {
  const featuresSectionRef = useRef(null);

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

      {/* Articles Section (Dummy) */}
      <div className='bg-primary-blue rounded-t-[2.5rem] mt-10'>
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Articles</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Link to='/article001'>
                <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                        Health Basics
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      Understanding BMI and Its Limitations
                    </h3>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                      Learn why BMI is a useful starting point but not the complete picture of your health.
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium mt-auto">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link to='/article001'>
                <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                        Health Basics
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      Shedding Pounds Sustainably: Practical Tips for Effective Weight Loss
                    </h3>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                    If you're looking to embark on a successful weight loss journey, here are practical tips to guide you towards your goals in a healthy way.
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium mt-auto">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link to='/article001'>
                <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                        Fitness
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      Sculpt Your Physique: A Comprehensive Guide to Lowering Body Fat Percentage
                    </h3>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                      While weight loss is a common goal, focusing specifically on body fat can lead to a more defined and resilient body.
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium mt-auto">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

              <Link to='/article001'>
                <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                        Fitness
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      Maximize Your Sweat: Essential Tips for Effective Workouts
                    </h3>
                    <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                    This article provides essential tips to help you maximize your sweat sessions, ensuring they are effective, safe, and enjoyable.
                    </p>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium mt-auto">
                    Read More <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </Link>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;