import React from 'react';

const Article5 = () => {
  const articleContent = {
    title: "Calorie Deficit: The Foundation of Weight Loss",
    category: "Nutrition",
    author: "Weightly Team",
    date: "May 25, 2024" 
  };

  return (
    <div className="space-y-6 font-poppins px-4 sm:px-10 md:px-20 pt-3 pb-16 max-w-6xl mx-auto">
      {/* Article Header */}
      <div>
        <span className="text-sm sm:text-base font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
          {articleContent.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 mt-2 leading-tight">
          {articleContent.title}
        </h1>
        <div className="text-sm font-semibold text-gray-600 mb-10">
          <p>By {articleContent.author} on {articleContent.date}</p>
        </div>
      </div>

      {/* Article Body */}
      <div className=''>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          When it comes to losing weight, one fundamental principle stands above all others: the <strong className="font-semibold text-blue-600">calorie deficit</strong>. Simply put, a calorie deficit occurs when you consistently consume fewer calories than your body burns over a period of time. This forces your body to tap into its stored energy reserves, primarily fat, leading to weight loss.
        </p>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          While the concept is straightforward, implementing a calorie deficit effectively requires understanding your body's needs and making strategic choices. Here's a comprehensive guide to understanding and achieving a sustainable calorie deficit for effective weight loss.
        </p>

        {/* Section: Understanding Calories */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          1. Understanding Calories: The Basics
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          A calorie is a unit of energy. Your body needs calories to perform all its functions, from breathing and thinking to exercising and digesting food.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Total Daily Energy Expenditure (TDEE):</strong> This is the total number of calories your body burns in a day. It includes:
            <ul className="list-circle list-inside ml-4 mt-1 space-y-1">
                <li><strong className="font-semibold text-blue-600">Basal Metabolic Rate (BMR):</strong> Calories burned at rest for basic bodily functions.</li>
                <li><strong className="font-semibold text-blue-600">Thermic Effect of Food (TEF):</strong> Calories burned digesting food.</li>
                <li><strong className="font-semibold text-blue-600">Non-Exercise Activity Thermogenesis (NEAT):</strong> Calories burned through daily activities outside structured exercise.</li>
                <li><strong className="font-semibold text-blue-600">Exercise Activity Thermogenesis (EAT):</strong> Calories burned during planned physical activity.</li>
            </ul>
          </li>
          <li>
            To create a deficit, you need to consume less than your TDEE. Online calculators can provide an estimate, but consistent tracking and adjustment are key.
          </li>
        </ul>

        {/* Section: How to Create a Calorie Deficit */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          2. How to Create a Calorie Deficit Effectively
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          There are two primary ways to create a calorie deficit: by reducing calorie intake, increasing calorie expenditure, or a combination of both.
        </p>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 mt-6">
          Reducing Calorie Intake (Dietary Changes):
        </h3>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Focus on Nutrient-Dense Foods:</strong> Prioritize whole, unprocessed foods like lean proteins, fruits, vegetables, and whole grains. These are typically lower in calories but high in nutrients, keeping you full and satisfied.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Control Portion Sizes:</strong> Even healthy foods can contribute to a calorie surplus if consumed in large quantities. Use measuring cups, food scales, or visual cues to manage portions.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Limit Sugary Drinks and Processed Snacks:</strong> These are often "empty calories" that provide little satiety and contribute significantly to your daily calorie count.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Increase Protein and Fiber:</strong> Both macronutrients are highly satiating. Protein helps preserve muscle mass, and fiber adds bulk to your meals, making you feel fuller for longer.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Mindful Eating:</strong> Eat slowly, chew thoroughly, and pay attention to your hunger and fullness cues. This helps prevent overeating.
          </li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 mt-6">
          Increasing Calorie Expenditure (Physical Activity):
        </h3>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Incorporate Regular Exercise:</strong> Combine strength training (to build muscle and boost RMR) with cardiovascular exercise (to burn calories directly during activity).
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Boost NEAT:</strong> Increase your non-exercise activity. Take the stairs, walk more, stand up frequently, or fidget. Small increases in daily movement add up.
          </li>
        </ul>

        {/* Section: Setting a Sustainable Deficit */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          3. Setting a Sustainable Deficit
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          The goal is a moderate, sustainable deficit.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Aim for 500-750 Calorie Deficit:</strong> This typically leads to a weight loss of 1-1.5 pounds per week, which is considered healthy and sustainable. A larger deficit can lead to muscle loss, nutrient deficiencies, and metabolic slowdown.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Track Your Intake:</strong> Use a food diary or a calorie-tracking app for a few weeks to get an accurate understanding of your current eating habits and identify areas for reduction.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Monitor Progress and Adjust:</strong> Your TDEE changes as you lose weight. If progress stalls, slightly adjust your calorie intake or increase activity.
          </li>
        </ul>

        {/* Section: Common Pitfalls and How to Avoid Them */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          4. Common Pitfalls and How to Avoid Them
        </h2>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Too Extreme a Deficit:</strong> Can lead to fatigue, nutrient deficiencies, muscle loss, and metabolic adaptation that makes future weight loss harder.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Ignoring Liquid Calories:</strong> Sugary drinks, specialty coffees, and alcohol can add hundreds of hidden calories daily.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Underestimating Portion Sizes:</strong> It's easy to eat more than you think, even with healthy foods.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Lack of Consistency:</strong> Occasional "cheat days" can easily erase a week's worth of deficit. Consistency is key.
          </li>
        </ul>

        {/* Conclusion */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          The Takeaway
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          The calorie deficit is the scientific backbone of weight loss. By understanding how calories work and implementing sustainable strategies to consume fewer calories than you burn, you can effectively and safely reach your weight management goals. Remember, it's not about drastic restrictions, but about making informed, consistent choices that lead to long-term success and improved health.
        </p>
      </div>
    </div>
  );
};

export default Article5;
