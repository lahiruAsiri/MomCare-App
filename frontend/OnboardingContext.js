// OnboardingContext.js
import React from 'react';

export const OnboardingContext = React.createContext();

export const OnboardingProvider = ({ children }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState(false);

  return (
    <OnboardingContext.Provider value={{ hasCompletedOnboarding, setHasCompletedOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};