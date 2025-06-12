import React from 'react';

const Article6 = () => {
  const articleContent = {
    title: "Why Walking is Good for Weight and Fat Loss",
    category: "Fitness",
    author: "Weightly Team",
    date: "May 20, 2024" 
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
          In the vast landscape of fitness and weight management, walking often gets overlooked in favor of high-intensity workouts and complex gym routines. However, this simple, accessible activity holds immense power when it comes to sustainable weight and fat loss. It's not just about burning calories; walking offers a myriad of benefits that contribute to a healthier, leaner body.
        </p>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          Let's explore why incorporating regular walking into your routine can be one of the most effective and enjoyable strategies for shedding pounds and improving body composition.
        </p>

        {/* Section: Calorie Burn and Energy Expenditure */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          1. Calorie Burn and Energy Expenditure
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          While walking may not burn as many calories per minute as running or HIIT, its accessibility and low impact mean you can do it for longer durations and more frequently, leading to a significant cumulative calorie expenditure.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Consistent Calorie Deficit:</strong> The cornerstone of weight loss is a calorie deficit. Regular walking helps you contribute to this deficit without excessive stress on your body, making it easier to sustain over time.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Boosts NEAT:</strong> Walking is a primary component of Non-Exercise Activity Thermogenesis (NEAT), which includes all calories burned from non-structured movement. Increasing your daily steps significantly boosts your overall daily energy expenditure.
          </li>
        </ul>

        {/* Section: Low Impact, High Consistency */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          2. Low Impact, High Consistency
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          One of walking's greatest advantages is its low-impact nature, making it suitable for almost everyone, regardless of fitness level or age.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Reduced Injury Risk:</strong> Unlike high-impact exercises, walking places minimal stress on joints, reducing the risk of injuries and allowing for more consistent training.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Easy to Integrate:</strong> It's simple to incorporate walking into daily life – walk to work, take the stairs, walk during lunch breaks, or enjoy an evening stroll. This ease of integration makes it highly sustainable.
          </li>
        </ul>

        {/* Section: Stress Reduction and Mood Improvement */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          3. Stress Reduction and Mood Improvement
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          Beyond physical benefits, walking profoundly impacts mental well-being, which is crucial for sustainable weight loss.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Lowers Cortisol:</strong> Regular walking helps reduce stress hormones like cortisol, which are linked to increased abdominal fat storage.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Boosts Endorphins:</strong> Physical activity releases endorphins, natural mood elevators that can help combat emotional eating and improve adherence to a healthy lifestyle.
          </li>
        </ul>

        {/* Section: Improves Metabolism and Body Composition */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          4. Improves Metabolism and Body Composition
        </h2>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Fat Oxidation:</strong> Walking, particularly at a moderate pace, encourages your body to use stored fat for fuel, making it an excellent exercise for direct fat loss.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Supports Muscle Maintenance:</strong> While not a primary muscle builder, combining walking with a protein-rich diet and occasional strength training can help maintain lean muscle mass during weight loss, which is vital for a healthy metabolism.
          </li>
        </ul>

        {/* Section: Simple Strategies to Maximize Your Walks */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          Simple Strategies to Maximize Your Walks
        </h2>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Increase Intensity:</strong> Walk faster, incorporate inclines (hills or treadmill incline), or add light weights (e.g., a weighted vest).
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Increase Duration:</strong> Aim for longer walks. Even 30-60 minutes daily can make a significant difference.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Break It Up:</strong> If long walks aren't feasible, break your activity into shorter 10-15 minute segments throughout the day.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Walk with Purpose:</strong> Make it an active activity, not just a casual stroll. Engage your core and swing your arms.
          </li>
        </ul>

        {/* Conclusion */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          The Takeaway
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          Walking is a powerful, yet often underestimated, tool for effective weight and fat loss. Its accessibility, low impact, and numerous physical and mental health benefits make it an ideal choice for anyone looking to improve their body composition sustainably. By consistently lacing up your shoes and hitting the pavement, you're not just burning calories; you're building a foundation for a healthier, more active life.
        </p>
      </div>
    </div>
  );
};

export default Article6;
