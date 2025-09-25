import { Agent } from '../types';
import { 
    AIIcon, ReactIcon, NodeJSIcon, RocketIcon, DockerIcon, SqlIcon, 
    VueIcon, GitHubActionsIcon, PostgresqlIcon, MobileIcon, SaaSIcon,
    APIIcon, NextJSIcon, AngularIcon, SvelteIcon, TerraformIcon,
    AWSIcon, GCPIcon, AnsibleIcon, TestingIcon, GitIcon, PythonIcon,
    GoIcon, RustIcon, TerminalIcon, CrownIcon, SparklesIcon,
    HTMLIcon, CSSIcon, JSIcon, TauriIcon, LangFlowIcon
} from '../components/Icons';

// This is the single source of truth for agent definitions.
export const AGENT_CATEGORIES = [
  {
    title: "Recommended",
    agents: [
       {
        agent: Agent.AutoEngine,
        Icon: SparklesIcon,
        description: "The master agent. Describe your goal, and AgentBash will create a plan and use other agents to build it.",
      },
    ]
  },
  {
    title: "Full-Stack & Specialized",
    agents: [
      {
        agent: Agent.SaaSStarterAutomator,
        Icon: SaaSIcon,
        description: "Generates a script to build a complete SaaS boilerplate with auth, payments, and a database.",
        pro: true,
      },
      {
        agent: Agent.LangFlowAutomator,
        Icon: LangFlowIcon,
        description: "Generates scripts to set up and manage LangFlow projects for building LLM applications.",
        pro: true,
      },
      {
        agent: Agent.NextJSAutomator,
        Icon: NextJSIcon,
        description: "Generates scripts that build complete, functional Next.js applications.",
        pro: true,
      },
    ]
  },
  {
    title: "Gaming",
    agents: [
       { 
        agent: Agent.CPPAutomator, 
        Icon: AIIcon,
        description: "Generates a script that builds and runs a complete, playable C++ game from scratch."
      },
    ]
  },
  {
    title: "Frontend Frameworks",
    agents: [
      { 
        agent: Agent.ReactAutomator,
        Icon: ReactIcon,
        description: "Generates scripts that build complete, functional React web applications."
      },
      { 
        agent: Agent.VueAutomator,
        Icon: VueIcon,
        description: "Builds functional Vue.js applications, including Pinia and Vue Router."
      },
       { 
        agent: Agent.AngularAutomator,
        Icon: AngularIcon,
        description: "Generates scripts to build and serve enterprise-ready Angular applications."
      },
      { 
        agent: Agent.SvelteAutomator,
        Icon: SvelteIcon,
        description: "Creates scripts that build high-performance, functional SvelteKit applications."
      },
      { 
        agent: Agent.MobileDevAutomator,
        Icon: MobileIcon,
        description: "Builds functional React Native/Expo starter apps for mobile."
      },
    ]
  },
  {
    title: "Backend & Languages",
    agents: [
       { 
        agent: Agent.APIAutomator,
        Icon: APIIcon,
        description: "Generates a script to build a complete Node.js/Express REST API with CRUD routes."
      },
      { 
        agent: Agent.NodeAutomator,
        Icon: NodeJSIcon,
        description: "Generates a script to build and run a simple Node.js backend server."
      },
      { 
        agent: Agent.PythonScriptAutomator,
        Icon: PythonIcon,
        description: "Generates scripts that create standalone, functional Python scripts for any task."
      },
       { 
        agent: Agent.GoAutomator,
        Icon: GoIcon,
        description: "Generates scripts to build and run Go applications and microservices."
      },
      { 
        agent: Agent.RustAutomator,
        Icon: RustIcon,
        description: "Generates scripts to build and run high-performance Rust applications with Cargo."
      },
    ]
  },
  {
      title: "DevOps & Cloud",
      agents: [
           { 
            agent: Agent.DockerAutomator,
            Icon: DockerIcon,
            description: "Crafts scripts to generate optimized Dockerfiles and docker-compose configs."
          },
          { 
            agent: Agent.CICDAutomator,
            Icon: GitHubActionsIcon,
            description: "Generates scripts to create complete GitHub Actions workflows for CI/CD.",
            pro: true,
          },
          { 
            agent: Agent.DeployAutomator,
            Icon: RocketIcon,
            description: "Generates complete deployment scripts for Vercel, VPS via SSH, and more.",
            pro: true,
          },
          {
            agent: Agent.TerraformAutomator,
            Icon: TerraformIcon,
            description: "Generates scripts to create ready-to-apply Terraform (IaC) files.",
            pro: true,
          },
          {
            agent: Agent.AnsibleAutomator,
            Icon: AnsibleIcon,
            description: "Generates scripts to create functional Ansible playbooks for server config.",
            pro: true,
          }
      ]
  },
  {
    title: "Database & Cloud CLI",
    agents: [
       { 
        agent: Agent.DatabaseAutomator,
        Icon: PostgresqlIcon,
        description: "Generates a script to create a local PostgreSQL Docker environment."
      },
      { 
        agent: Agent.SQL,
        Icon: SqlIcon,
        description: "Generates scripts that create .sql files for queries and migrations."
      },
      {
        agent: Agent.AWSAutomator,
        Icon: AWSIcon,
        description: "Generates functional AWS CLI scripts for managing cloud resources.",
        pro: true,
      },
      {
        agent: Agent.GCPAutomator,
        Icon: GCPIcon,
        description: "Generates functional gcloud CLI scripts for Google Cloud resources.",
        pro: true,
      },
    ]
  },
    {
    title: "Web Development Utilities",
    agents: [
      {
        agent: Agent.HTMLAutomator,
        Icon: HTMLIcon,
        description: "Generates scripts to create structured, semantic HTML5 files."
      },
      {
        agent: Agent.CSSAutomator,
        Icon: CSSIcon,
        description: "Generates scripts to create CSS files for styling web pages."
      },
      {
        agent: Agent.JSAutomator,
        Icon: JSIcon,
        description: "Generates scripts to create functional JavaScript files for client-side logic."
      },
    ]
  },
  {
    title: "Testing & Utilities",
    agents: [
       {
        agent: Agent.TestingAutomator,
        Icon: TestingIcon,
        description: "Generates scripts to set up and run tests with Cypress or Playwright.",
        pro: true,
       },
       {
        agent: Agent.GitAutomator,
        Icon: GitIcon,
        description: "Generates scripts to automate complex or repetitive Git commands."
       }
    ]
  },
  {
    title: "Desktop & GUI Automation",
    agents: [
      {
        agent: Agent.ZenityAutomator,
        Icon: TerminalIcon,
        description: "Create user-friendly GUI scripts for Linux with zenity dialogs."
      },
      {
        agent: Agent.YadAutomator,
        Icon: TerminalIcon,
        description: "Build advanced GUI applications with YAD (Yet Another Dialog)."
      },
      {
        agent: Agent.TauriAutomator,
        Icon: TauriIcon,
        description: "Generates scripts to build secure, cross-platform desktop apps with Tauri.",
        pro: true
      },
    ]
  }
];