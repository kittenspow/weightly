export const calculateTDEE = (weight, height, age, gender, activityLevel) => {
    let bmr;
    // Harris-Benedict BMR Formula
    if (gender === 'male') {
      // Men: BMR = 88.362 + (13.397×weight) + (4.799×height) - (5.677×age)
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      // Women: BMR = 447.593 + (9.247×weight) + (3.098×height) - (4.330×age)
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  
    // Activity Multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extra: 1.9
    };
  
    return bmr * activityMultipliers[activityLevel];
};