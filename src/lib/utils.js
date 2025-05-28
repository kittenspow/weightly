// For calculator (BMI, BodyFat, and TDEE)

export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // convert cm to meter
    return weight / (heightInMeters * heightInMeters);
};

export const calculateBodyFatNavy = (gender, waist, neck, hip, height) => {
if (gender === 'male') {
    // Men: %BF = 86.010×log10(waist - neck) - 70.041×log10(height) + 36.76
    return 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
} else {
    // Women: %BF = 163.205×log10(waist + hip - neck) - 97.684×log10(height) - 78.387
    return 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
}
};

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