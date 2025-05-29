import React, { useState } from 'react';
import Card from '../components/Card'; // Card masih digunakan untuk bagian "Information Section"
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary-blue">Calculators</h1>

      <div className="flex gap-2 mb-6">
        <TabButton id="bmi" active={activeCalculator === 'bmi'}>BMI Calculator</TabButton>
        <TabButton id="bodyfat" active={activeCalculator === 'bodyfat'}>Body Fat Calculator</TabButton>
        <TabButton id="tdee" active={activeCalculator === 'tdee'}>TDEE Calculator</TabButton>
      </div>

      {/* render the active calculator component */}
      {renderActiveCalculator()}

      {/* Information Section (Still common for all calculators) */}
      <Card className="mt-8">
        <h3 className="text-xl font-semibold mb-4">How These Calculations Work</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold mb-2">BMI Formula</h4>
            <p className="text-gray-600">
              BMI = weight (kg) / height (m)²
            </p>
            <p className="mt-2 text-gray-600">
              Simple but doesn't distinguish between muscle and fat mass.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">US Navy Body Fat Formula</h4>
            <p className="text-gray-600 mb-2"><strong>Men:</strong></p>
            <p className="text-xs text-gray-500">%BF = 86.010×log₁₀(waist - neck) - 70.041×log₁₀(height) + 36.76</p>
            <p className="text-gray-600 mb-2 mt-2"><strong>Women:</strong></p>
            <p className="text-xs text-gray-500">%BF = 163.205×log₁₀(waist + hip - neck) - 97.684×log₁₀(height) - 78.387</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Harris-Benedict BMR</h4>
            <p className="text-gray-600 mb-2"><strong>Men:</strong></p>
            <p className="text-xs text-gray-500">BMR = 88.362 + (13.397×weight) + (4.799×height) - (5.677×age)</p>
            <p className="text-gray-600 mb-2 mt-2"><strong>Women:</strong></p>
            <p className="text-xs text-gray-500">BMR = 447.593 + (9.247×weight) + (3.098×height) - (4.330×age)</p>
            <p className="text-gray-600 mt-2">TDEE = BMR × Activity Factor</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalculatorPage;
