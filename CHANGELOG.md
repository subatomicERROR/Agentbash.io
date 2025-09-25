# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2024-08-01

### Changed
- **Upgraded 'Edit & Resubmit' UX**: Replaced the message bubble with a wide, focused editing panel upon clicking the edit icon, inspired by modern AI chat interfaces. This provides a significantly larger and more comfortable text area for revising prompts.

## [0.9.0] - 2024-07-31

### Changed
- **Mobile Navigation Overhaul**: Redesigned the mobile header for a world-class user experience. Replaced the static icon with a fluidly animated toggle, and ensured the menu's theme, styling, and hover effects are now perfectly consistent with the sophisticated desktop version.

## [0.8.0] - 2024-07-30

### Added
- **In-Chat ZIP Downloads**: The AI can now generate a special, clickable download link directly in its response when asked to "zip" or "package" a project. This creates a seamless, powerful user experience where the AI delivers files directly to the user.

### Changed
- **Upgraded AI Download Skill**: The AI's core instructions have been updated to use the new `[Download...](download_zip:...)` markdown format instead of referring to UI elements.

### Removed
- **Redundant UI Button**: The "Download ZIP" button has been removed from the application sidebar to declutter the interface and streamline the new in-chat download workflow.

## [0.7.0] - 2024-07-29

### Changed
- **Streamlined Onboarding**: Overhauled the onboarding sync process into a single, seamless page. OS selection now immediately proceeds to the sync steps, removing extra button clicks.
- **Enhanced AI Context**: Drastically improved the AI's conversational memory. It no longer repeats initial greetings and correctly maintains context throughout a session.
- **Robust Session Isolation**: Re-architected chat session management to ensure that `New Chat` creates a completely clean slate, preventing any context from leaking between conversations.

### Added
- **One-Click Copy Commands**: Added always-visible, cyan-colored copy icons for terminal commands in the onboarding flow for a faster, more user-friendly setup.

### Fixed
- **Responsive Onboarding UI**: Corrected multiple layout issues in the onboarding wizard, ensuring the entire UI is fully responsive and prevents any horizontal scrolling on all devices.
- **UI Consistency**: Aligned the styling of buttons and icons in the onboarding process with the app's primary cyan theme.
- **Interactive Plan Stability**: Added defensive code to the Interactive Plan component to prevent crashes if the AI generates a malformed plan, making the UI more robust.

## [0.6.0] - 2024-07-28

### Changed
- **Onboarding Overhaul**: Redesigned the onboarding flow for a more professional and intuitive user experience. The process is now a single, seamless guide without extra clicks.
- **AI Context Awareness**: Significantly improved the AI's contextual understanding. It no longer repeats greetings on follow-up questions and correctly processes conversational turns.
- **Session Isolation**: Re-architected chat session management to ensure complete isolation. Creating a `New Chat` now starts a truly independent session, preventing context leakage.

### Added
- **Web Search Toggle**: Added a web search toggle button directly in the chat input area for easy access.
- Added convenient copy-to-clipboard icons for commands in the onboarding process to streamline setup.

### Fixed
- Resolved multiple mobile layout issues in the onboarding screen, eliminating horizontal scrolling and ensuring all content is perfectly visible.
- Corrected UI styling for buttons and icons during onboarding to align with the app's primary color scheme.

## [0.5.0] - 2024-07-27

### Added
- **New Web Development Agents**: Introduced three specialized agents for core web tasks: `HTML Automator`, `CSS Automator`, and `JS Automator`.
- **New LLM Agent**: Added `LangFlow Automator` to generate scripts for setting up and managing LangFlow projects.
- **New Agent Categories**: Created "Web Development Utilities" and "Gaming" categories to improve agent organization.

### Changed
- **Agent Rebranding**: Renamed `Game GPT C++` to `C++ Automator` and `Docker-GPT` to `Docker Automator` for better clarity and professionalism.
- **Hero Section Animation**: Updated the homepage's animated terminal to feature a `LangFlow Automator` example first, showcasing the new capability.

## [0.4.0] - 2024-07-26

### Added
- Created `CHANGELOG.md` to track project development and updates professionally.

## [0.3.0] - 2024-07-25

### Changed
- **Upgraded AI Core Directives**: Significantly enhanced the AI's core instructions to operate as a world-class development partner.
  - Introduced a **Script Perfection Mandate** for zero-error, production-ready code.
  - Implemented an **Automated Dependency Checking Protocol** for all generated scripts.
  - Revamped the **Debugging Protocol** for root cause analysis and to prevent repetitive failed solutions.
  - Elevated all agent personas to operate as "world-class" experts in their respective fields.

## [0.2.0] - 2024-07-25

### Changed
- **Redesigned Chat Input**: Replaced the basic chat input and send button with a modern, sleek component inspired by leading AI interfaces like ChatGPT.
- **New Icons**: Added an `ArrowUpIcon` for the new send button.

### Fixed
- Addressed potential `500` level HTTP errors during message sending by improving frontend stability and API interaction logic.

## [0.1.0] - 2024-07-25

### Added
- **UI/UX Design Mandate**: Established a core directive for the AI to produce interfaces with a premium, "$300M startup" look and feel. This mandates all generated UIs to be aesthetically beautiful, professional, and intuitive.