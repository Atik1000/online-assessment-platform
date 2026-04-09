"use client";

import { useCallback, useMemo, useState } from "react";

export function useStepperForm(totalSteps: number) {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1 < totalSteps ? prev + 1 : prev));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setActiveStep((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;
      setActiveStep(step);
    },
    [totalSteps],
  );

  return useMemo(
    () => ({
      activeStep,
      isFirstStep: activeStep === 0,
      isLastStep: activeStep === totalSteps - 1,
      nextStep,
      prevStep,
      goToStep,
    }),
    [activeStep, totalSteps, nextStep, prevStep, goToStep],
  );
}
