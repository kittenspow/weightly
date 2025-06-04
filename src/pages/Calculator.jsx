import React, { useState } from 'react';
import Card from '../components/Card'; 
import BMICalculator from '../features/calculator/BMICalculator';
import BodyFatCalculator from '../features/calculator/BodyFatCalculator';
import TDEECalculator from '../features/calculator/TDEECalculator';

// calculator page component
const CalculatorPage = () => {
  const [activeCalculator, setActiveCalculator] = useState('bmi');

  const TabButton = ({ id, children, active }) => (
    <button
      onClick={() => setActiveCalculator(id)}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        active ? 'bg-primary-blue text-white' : 'text-gray-600 hover:text-primary-blue'
      }`}
    >
      {children}
    </button>
  );

  // function to render the active calculator component
  const renderActiveCalculator = () => {
    switch (activeCalculator) {
      case 'bmi':
        return <BMICalculator />;
      case 'bodyfat':
        return <BodyFatCalculator />;
      case 'tdee':
        return <TDEECalculator />;
      default:
        return <BMICalculator />; // default to BMI calculator
    }
  };

  return (
    <div className="space-y-6 font-poppins">
      <div className='px-4 sm:px-6 lg:px-8 pb-10'>
        <div className='flex justify-between items-center grid grid-row-2 sm:grid-cols-2 mb-3'>
          <h1 className="text-3xl font-bold font-lexend text-blue-text">Calculators</h1>
          <div className="flex gap-2 justify-end mt-3 sm:mt-0">
            <TabButton id="bmi" active={activeCalculator === 'bmi'}>BMI Calculator</TabButton>
            <TabButton id="bodyfat" active={activeCalculator === 'bodyfat'}>Body Fat Calculator</TabButton>
            <TabButton id="tdee" active={activeCalculator === 'tdee'}>TDEE Calculator</TabButton>
          </div>
        </div>

        {/* render the active calculator component */}
        {renderActiveCalculator()}
      </div>

      {/* Information Section */}
      <div className="bg-primary-blue rounded-t-[2.5rem]">
        <div className='mt-10 py-10 px-4 sm:px-6 lg:px-8'>
          <h3 className="text-3xl text-white text-center font-bold mb-20">How These Calculations Work</h3>
          <div className="grid md:grid-cols-3 gap-10 text-sm">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">BMI Formula</h4>
              <p className="text-s text-gray-200">
                BMI = weight (kg) / height (m)²
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">US Navy Body Fat Formula</h4>
              <p className="text-gray-200 mb-2"><strong>Men:</strong></p>
              <p className="text-s text-gray-200">%BF = (495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height))) - 450</p>
              <p className="text-gray-200 mb-2 mt-2"><strong>Women:</strong></p>
              <p className="text-s text-gray-200">%BF = (495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.22100 × log10(height))) - 450</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Harris-Benedict BMR</h4>
              <p className="text-gray-200 mb-2"><strong>Men:</strong></p>
              <p className="text-s text-gray-200">BMR = 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)</p>
              <p className="text-gray-200 mb-2 mt-2"><strong>Women:</strong></p>
              <p className="text-s text-gray-200">BMR = 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)</p>
              <p className="text-gray-200 mt-2">TDEE = BMR × Activity Factor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
