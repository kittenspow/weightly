export const calculateBodyFatNavy = (gender, waist, neck, hip, height) => {
    let bodyFatPercentage;
  
    if (gender === 'male') {
      // BFP (Male) =(495/(1.0324 - 0.19077×log10(waist-neck) + 0.15456×log10(height)))- 450
      bodyFatPercentage = (495 / (1.0324 - 0.19077 * Math.log10(waist-neck) + 0.15456 * Math.log10(height))) - 450;
    } else {
      // BFP (Female)  =(495/(1.29579 - 0.35004×log10(waist+hip-neck) + 0.22100×log10(height)))- 450
      bodyFatPercentage = (495 / (1.29579 - 0.35004 * Math.log10(waist+hip-neck) + 0.22100 * Math.log10(height))) - 450;
    }
  
    return bodyFatPercentage;
  };