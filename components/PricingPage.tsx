import React, { useState, useEffect } from 'react';
import { CloseIcon, CheckIcon, CrownIcon } from './Icons';
import { User } from '../types';

interface PricingPageProps {
  user: User | null;
  onClose: () => void;
  onSubscribe: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ user, onClose, onSubscribe }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = {
    monthly: {
      price: 4.99,
      amountInCents: 499, // For INR, assuming ~₹499
      name: "Monthly",
      billingText: "/month"
    },
    annually: {
      price: 49.99,
      amountInCents: 4999, // For INR, assuming ~₹4999
      name: "Annually",
      billingText: "/year",
      discount: "Save 16%"
    }
  };

  const selectedPlan = plans[billingCycle];

  const handlePayment = () => {
    // User-provided test key
    const razorpayKeyId = 'rzp_test_R7agmXiZNDS0Dh';

    if (!razorpayKeyId) {
      alert("Payment gateway is not configured. Please contact support.");
      return;
    }

    const options = {
      key: razorpayKeyId,
      amount: selectedPlan.amountInCents * 100, // Amount in paise
      currency: "INR",
      name: "AgentBash Subscription",
      description: `AgentBash - ${selectedPlan.name} Plan`,
      handler: function (response: any) {
        console.log(response);
        onSubscribe();
      },
      prefill: {
        name: user?.name || "Valued Developer",
        email: user?.email || "dev@example.com",
        contact: "" // Contact is not available in user profile
      },
      notes: {
        plan: selectedPlan.name
      },
      theme: {
        color: "#22d3ee" // cyan-accent
      }
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        console.error(response.error);
      });
      rzp1.open();
    } catch (error) {
      alert("An error occurred while initiating payment.");
      console.error("Razorpay Error:", error);
    }
  };

  const features = [
    "Access to all current & future agents",
    "Cross-platform script generation",
    "Upload & analyze project .zip files",
    "Save unlimited scripts to Script Book",
    "Priority support",
    "Early access to new features"
  ];

  return (
    <div className="absolute inset-0 bg-dark-bg flex flex-col z-20 animate-fade-in-up overflow-y-auto">
      <header className="flex items-center justify-between p-4 bg-dark-card border-b border-border-dark flex-shrink-0 sticky top-0">
        <div className="flex items-center space-x-3">
          <CrownIcon className="w-8 h-8 text-yellow-400" />
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">Subscribe to AgentBash Pro</h1>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-text-secondary rounded-full hover:bg-dark-bg hover:text-cyan-accent transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-accent"
          aria-label="Close Pricing Page"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 p-4 sm:p-12 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">Unlock Your Full Potential</h2>
            <p className="text-md sm:text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
                Subscribe to unlock all professional features and continue building with the most advanced AI automation tool for developers.
            </p>

            <div className="flex justify-center items-center space-x-4 mb-10">
                <span className={`font-medium ${billingCycle === 'monthly' ? 'text-cyan-accent' : 'text-text-secondary'}`}>Monthly</span>
                <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={billingCycle === 'annually'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')} className="sr-only peer" />
                <div className="w-14 h-8 bg-border-dark rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-accent"></div>
                </label>
                <span className={`font-medium ${billingCycle === 'annually' ? 'text-cyan-accent' : 'text-text-secondary'}`}>Annually</span>
                {plans.annually.discount && (
                    <span className="bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full">{plans.annually.discount}</span>
                )}
            </div>

            <div className="bg-dark-card border-2 border-cyan-accent rounded-lg p-8 text-left flex flex-col relative overflow-hidden shadow-2xl shadow-cyan-accent/10 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-cyan-accent mb-2">AgentBash Pro</h3>
                <p className="text-text-secondary mb-6">All features. All agents. No limits.</p>
                <div className="mb-8">
                <span className="text-5xl font-bold text-text-primary">${selectedPlan.price}</span>
                <span className="text-text-secondary">{selectedPlan.billingText}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                {features.map(feature => (
                    <li key={feature} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-cyan-accent mr-3 mt-1 flex-shrink-0" />
                    <span className="text-text-primary font-medium">{feature}</span>
                    </li>
                ))}
                </ul>
                <button onClick={handlePayment} className="w-full mt-auto py-3 px-6 bg-cyan-accent text-dark-bg font-bold rounded-lg hover:bg-cyan-accent-hover transition-all transform hover:scale-105">
                Subscribe Now
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;