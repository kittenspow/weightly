export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // convert cm to meter
    return weight / (heightInMeters * heightInMeters);
};