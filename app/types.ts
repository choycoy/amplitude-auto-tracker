export interface AmplitudeEvent {
  id: number;
  name: string;
  displayName: string;
  location: string;
  time: string;
}

export interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  buttonText: string;
  buttonStyle: "primary" | "secondary";
  featured?: boolean;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}
