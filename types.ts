import React from 'react';

// This is required for TypeScript to recognize the Razorpay object loaded from their script
declare global {
  interface Window {
    Razorpay: any;
    AGENTBASH_API_KEY?: string;
    google: any;
  }
}

export interface User {
  name: string;
  email: string;
  picture: string;
}

export enum OperatingSystem {
  Windows = 'Windows',
  Linux = 'Linux',
}

export enum Agent {
  AutoEngine = 'Auto Engine',
  CPPAutomator = 'C++ Automator',
  SaaSStarterAutomator = 'SaaS Starter Automator',
  LangFlowAutomator = 'LangFlow Automator',
  ReactAutomator = 'React Automator',
  VueAutomator = 'Vue Automator',
  MobileDevAutomator = 'Mobile Dev Automator',
  NodeAutomator = 'Node.js Automator',
  APIAutomator = 'API Automator',
  DatabaseAutomator = 'Database Automator',
  DeployAutomator = 'Deploy Automator',
  CICDAutomator = 'CI/CD Automator',
  DockerAutomator = 'Docker Automator',
  SQL = 'SQL-GPT',
  // New Agents
  NextJSAutomator = 'Next.js Automator',
  AngularAutomator = 'Angular Automator',
  SvelteAutomator = 'SvelteKit Automator',
  TerraformAutomator = 'Terraform Automator',
  AWSAutomator = 'AWS CLI Automator',
  GCPAutomator = 'GCP CLI Automator',
  AnsibleAutomator = 'Ansible Automator',
  TestingAutomator = 'Testing Automator',
  GitAutomator = 'Git Automator',
  PythonScriptAutomator = 'Python Scripter',
  GoAutomator = 'Go Automator',
  RustAutomator = 'Rust Automator',
  ZenityAutomator = 'Zenity Automator',
  YadAutomator = 'YAD Automator',
  HTMLAutomator = 'HTML Automator',
  CSSAutomator = 'CSS Automator',
  JSAutomator = 'JS Automator',
  TauriAutomator = 'Tauri Automator',
}

export enum MessageSender {
  User = 'User',
  AI = 'AI',
}

export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  sources?: GroundingChunk[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  os: OperatingSystem;
  agents: Agent[];
  template: ProjectTemplate | null;
  createdAt: string;
}

export interface OnboardingChatMessage {
    id: number | string;
    sender: MessageSender;
    content: string;
}

export interface ProjectTemplate {
  name: string;
  description: string;
  initialPrompt: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SavedScript {
  id: string;
  name: string;
  code: string;
  language: string;
  agents: Agent[];
  os: OperatingSystem;
  createdAt: string;
}

export type SubscriptionStatus = 'trial' | 'subscribed' | 'expired' | 'none';

// Production-ready Enhancements: Toast Notifications
export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

// Types for Interactive Plan Card
export interface PlanOption {
  value: string;
  label: string;
}

export interface PlanChoice {
  id: string;
  label: string;
  type: 'radio' | 'checkbox';
  options: PlanOption[];
}

export interface InteractivePlan {
  title: string;
  description: string;
  steps: string[];
  choices: PlanChoice[];
}