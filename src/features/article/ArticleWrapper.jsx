import React from 'react';
import { Link } from 'react-router-dom'
import Card from '../../components/Card';
import {  ChevronRight } from 'lucide-react';


const ArticleWrapper = () => {


    return (
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

                <Link to='/article002'>
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

                <Link to='/article003'>
                    <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                        <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                            Health
                        </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                        Sculpting Your Body: Effective Strategies for Sustainable Fat Loss
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

                <Link to='/article004'>
                    <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                        <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                            Health
                        </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                        Shedding Pounds Sustainably: Practical Tips for Effective Weight Loss
                        </h3>
                        <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                        you can achieve your weight loss goals and enjoy the numerous health benefits that come with a healthier weight.
                        </p>
                    </div>
                    <div className="flex items-center text-blue-600 font-medium mt-auto">
                        Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                    </Card>
                </Link>

                <Link to='/article005'>
                    <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                        <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                            Nutrition
                        </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                        Calorie Deficit: The Foundation of Weight Loss
                        </h3>
                        <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                        The calorie deficit is the scientific backbone of weight loss. What is calorie deficit? How can you be in a calorie deficit? 
                        </p>
                    </div>
                    <div className="flex items-center text-blue-600 font-medium mt-auto">
                        Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                    </Card>
                </Link>

                <Link to='/article006'>
                    <Card className="hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-3">
                        <span className="text-m font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
                            Fitness
                        </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                        Why Walking is Good for Fat Loss
                        </h3>
                        <p className="text-gray-600 text-base mb-4 line-clamp-3"> {/* line-clamp for consistent excerpt height */}
                        Most people think that running is the most effective workout for fat loss. However, walking is the best choice to help you lose fat and more powerful than you think. Here's why
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
    )
}

export default ArticleWrapper