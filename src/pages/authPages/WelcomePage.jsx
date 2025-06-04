import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card'; 
import Button from '../../components/Button'; 

const WelcomePage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="max-h-screen mt-10 bg-gray-50 flex items-center justify-center p-4 mb-10">
      <Card className="py-12 max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold font-lexend text-blue-text mb-4">Welcome to Weightly</h1>
        <p className="text-gray-600 font-poppins mb-6">
          Start your journey now!
        </p>
        <div className="space-y-3 font-poppins">
          <Button
            onClick={() => navigate('/login')} // Arahkan ke /login
            className="w-full"
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate('/signup')} // Arahkan ke /register
            variant="secondary"
            className="w-full"
          >
            Sign up
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomePage;
