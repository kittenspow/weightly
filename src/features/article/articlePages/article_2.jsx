import React from 'react';

const Article2 = () => {
  const articleContent = {
    title: "Maximize Your Sweat: Essential Tips for Effective Workouts",
    category: "Fitness",
    author: "Weightly Team",
    date: "June 2, 2024" // 
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
          Embarking on a fitness journey or looking to enhance your current routine? Working out is a powerful tool for improving physical health, boosting mental well-being, and achieving a wide range of personal goals, from building muscle and losing fat to increasing endurance and reducing stress. However, to truly reap the benefits and avoid common pitfalls, it's essential to approach your workouts strategically.
        </p>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          This article provides essential tips to help you maximize your sweat sessions, ensuring they are effective, safe, and enjoyable.
        </p>

        {/* Section: Before You Begin */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          Before You Begin: Preparation is Key
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          A successful workout starts long before you even step into the gym or hit the pavement.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Define Your Goals:</strong> What do you want to achieve? Whether it's running a 5k, lifting a certain weight, or simply improving overall fitness, clear, specific, measurable, achievable, relevant, and time-bound (SMART) goals will provide direction and motivation.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Plan Your Routine:</strong> Don't just wing it. A well-structured workout plan ensures you target different muscle groups, incorporate various types of exercise, and progress effectively. Consider a mix of strength training, cardiovascular exercise, and flexibility work.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Warm-Up Properly:</strong> Never skip your warm-up! 5-10 minutes of light cardio (like jogging or jumping jacks) followed by dynamic stretches (arm circles, leg swings) prepares your muscles and joints for activity, increasing blood flow and reducing the risk of injury.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Hydrate and Fuel:</strong> Drink plenty of water throughout the day, especially before your workout. For energy, consider a light snack containing carbohydrates and a bit of protein 30-60 minutes beforehand (e.g., a banana, a small handful of nuts, or a piece of toast).
          </li>
        </ul>

        {/* Section: During Your Workout */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          During Your Workout: Focus and Form
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          Once you're in motion, pay attention to how your body feels and how you're executing each movement.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Prioritize Proper Form Over Weight/Speed:</strong> This is arguably the most critical tip. Incorrect form can lead to injuries and negate the benefits of the exercise. Start with lighter weights or slower movements to master the technique. If unsure, watch instructional videos or consult a trainer.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Listen to Your Body:</strong> Distinguish between muscle fatigue and pain. Pushing yourself is good, but sharp, persistent pain is a warning sign. Don't be afraid to modify exercises, reduce intensity, or take a rest day if needed.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Implement Progressive Overload:</strong> To continue making progress, you need to gradually increase the demands on your body. This could mean lifting heavier weights, doing more repetitions, increasing workout duration, reducing rest times, or trying more challenging variations of exercises.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Vary Your Workouts:</strong> Your body adapts quickly. To avoid plateaus and keep things interesting, regularly change your exercises, sets, reps, intensity, or even the type of workout (e.g., switch from steady-state cardio to HIIT, or try a new strength routine).
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Stay Focused and Present:</strong> Avoid distractions like your phone. Focus on the muscles you're working, your breathing, and the movement itself. This mind-muscle connection can enhance effectiveness.
          </li>
        </ul>

        {/* Section: After Your Workout */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          After Your Workout: Recovery is Non-Negotiable
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
          The work doesn't stop when your workout ends. Recovery is where your body repairs, rebuilds, and gets stronger.
        </p>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Cool-Down and Stretch:</strong> Spend 5-10 minutes cooling down with light cardio, followed by static stretches (holding stretches for 20-30 seconds) for the muscles you've worked. This helps improve flexibility and reduce muscle soreness.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Refuel Your Body:</strong> Within 30-60 minutes after a workout, consume a meal or snack rich in protein and carbohydrates. Protein aids muscle repair and growth, while carbs replenish glycogen stores for energy.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Prioritize Rest and Sleep:</strong> Your muscles grow and repair when you rest. Aim for 7-9 hours of quality sleep per night. Incorporate rest days into your weekly schedule to allow your body to recover fully.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Stay Hydrated:</strong> Continue drinking water after your workout to replenish fluids lost through sweat.
          </li>
        </ul>

        {/* Section: General Tips for Long-Term Success */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          General Tips for Long-Term Success
        </h2>
        <ul className="list-disc list-inside text-base sm:text-lg text-gray-700 mb-6 space-y-2 pl-4">
          <li>
            <strong className="font-semibold text-blue-600">Consistency is King:</strong> Short, infrequent bursts of intense exercise are less effective than consistent, moderate activity. Find a routine you can stick to week after week.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Find What You Enjoy:</strong> If you dread your workouts, you're less likely to stick with them. Experiment with different activities – dancing, hiking, team sports, yoga – until you find something you genuinely love.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Track Your Progress:</strong> Keep a workout journal or use a fitness app to log your exercises, weights, reps, and how you felt. Seeing your improvements can be incredibly motivating and helps you adjust your plan.
          </li>
          <li>
            <strong className="font-semibold text-blue-600">Seek Professional Guidance:</strong> If you're new to working out, have specific health concerns, or want to take your fitness to the next level, consider working with a certified personal trainer or physical therapist. They can provide personalized advice and ensure you're training safely and effectively.
          </li>
        </ul>

        {/* Conclusion */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 mt-8">
          The Takeaway
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
          Working out is a powerful investment in your health and well-being. By focusing on smart preparation, mindful execution, and dedicated recovery, you can transform your fitness journey from a chore into an empowering and rewarding part of your life. Remember, every workout is a step forward, no matter how small. Stay consistent, listen to your body, and enjoy the process of becoming a stronger, healthier you.
        </p>
      </div>
    </div>
  );
};

export default Article2;
