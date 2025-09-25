import React, { useState } from 'react';
import { InteractivePlan as InteractivePlanType, PlanChoice } from '../types';
import { CheckIcon } from './Icons';

interface InteractivePlanProps {
    plan: InteractivePlanType;
    onConfirm: (selections: Record<string, string | string[]>) => void;
}

type Selections = Record<string, string | string[]>;

const InteractivePlan: React.FC<InteractivePlanProps> = ({ plan, onConfirm }) => {
    const [selections, setSelections] = useState<Selections>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelectionChange = (choice: PlanChoice, value: string) => {
        if (isSubmitted) return;

        setSelections(prev => {
            const newSelections = { ...prev };
            if (choice.type === 'radio') {
                newSelections[choice.label] = value;
            } else { // checkbox
                const currentValues = (newSelections[choice.label] as string[] | undefined) || [];
                if (currentValues.includes(value)) {
                    newSelections[choice.label] = currentValues.filter(v => v !== value);
                } else {
                    newSelections[choice.label] = [...currentValues, value];
                }
            }
            return newSelections;
        });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitted) return;
        
        // Ensure all radio groups have a selection
        for (const choice of plan.choices) {
            if (choice.type === 'radio' && !selections[choice.label]) {
                alert(`Please make a selection for "${choice.label}".`);
                return;
            }
        }

        setIsSubmitted(true);
        onConfirm(selections);
    };

    return (
        <div className="bg-dark-card rounded-lg p-6 my-4 border border-border-dark shadow-lg shadow-cyan-accent/10 text-left animate-fade-in-up">
            <h3 className="text-xl font-bold text-text-primary mb-2">{plan.title}</h3>
            <p className="text-sm text-text-secondary mb-6">{plan.description}</p>
            
            <div className="mb-6">
                <h4 className="font-semibold text-text-primary mb-3">Plan Steps:</h4>
                <ul className="space-y-2 pl-1">
                    {plan.steps.map((step, index) => (
                        <li key={index} className="flex items-start text-sm">
                            <CheckIcon className="w-4 h-4 text-cyan-accent mr-3 mt-0.5 flex-shrink-0"/>
                            <span className="text-text-secondary">{step}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 border-t border-border-dark pt-6">
                {plan.choices.map(choice => (
                    <fieldset key={choice.id}>
                        <legend className="text-md font-semibold text-text-primary mb-3">
                            {choice.label}
                            {choice.type === 'radio' && <span className="text-red-400 text-xs ml-1 font-normal">*Required</span>}
                        </legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {Array.isArray(choice.options) && choice.options.map(option => (
                                <label key={option.value} className="relative block p-3 border border-border-dark rounded-md cursor-pointer transition-all duration-200 hover:bg-dark-bg hover:border-cyan-accent/70 peer-checked:border-cyan-accent peer-checked:bg-cyan-accent/10 has-[:checked]:border-cyan-accent has-[:checked]:bg-cyan-accent/10">
                                    <input
                                        type={choice.type}
                                        name={choice.id}
                                        value={option.value}
                                        checked={
                                            choice.type === 'radio'
                                                ? selections[choice.label] === option.value
                                                : (selections[choice.label] as string[] | undefined)?.includes(option.value) ?? false
                                        }
                                        onChange={() => handleSelectionChange(choice, option.value)}
                                        disabled={isSubmitted}
                                        className="sr-only peer"
                                    />
                                    <span className="font-medium text-text-primary">{option.label}</span>
                                    <CheckIcon className="w-5 h-5 text-cyan-accent absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </label>
                            ))}
                        </div>
                    </fieldset>
                ))}

                 <button 
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full mt-4 py-3 px-6 bg-dark-bg border border-border-dark text-text-primary font-bold rounded-lg transition-all transform hover:scale-[1.02] hover:bg-cyan-accent/10 hover:border-cyan-accent/50 hover:text-cyan-accent active:scale-95 disabled:bg-green-500/20 disabled:border-green-500/30 disabled:text-green-300 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isSubmitted ? 'Plan Confirmed. Generating Script...' : 'Confirm Selections & Generate Script'}
                </button>
            </form>
        </div>
    );
};

export default InteractivePlan;