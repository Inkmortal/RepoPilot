# Project Brief: RepoPilot

This document outlines the core requirements, goals, and scope for the RepoPilot project. It serves as the foundational document for the Memory Bank.

## 1. Project Name

RepoPilot (working title)

## 2. Elevator Pitch

RepoPilot is a native Windows tool that empowers developers to precisely craft intelligent, minimal prompts from large codebases for any LLM — all while retaining full local control and privacy.

## 3. Core Goal

To provide developers with a powerful, local-first tool on Windows for generating highly relevant and concise prompts for Large Language Models (LLMs) by intelligently selecting and structuring code fragments from large repositories.

## 4. Key Problems Addressed

-   **Information Overload:** LLMs struggle with overly large contexts from entire codebases.
-   **Prompt Noise:** Including irrelevant code reduces prompt effectiveness and increases cost/token usage.
-   **Privacy Concerns:** Sending proprietary or sensitive code to third-party LLM services.
-   **Hallucination:** LLMs generating incorrect or nonsensical code/suggestions due to lack of precise context.
-   **Workflow Integration:** Lack of seamless integration between code analysis, prompt generation, and local development workflows on Windows.

## 5. High-Level Requirements & Features

-   **Granular File Selection:** Allow users to filter files based on type, size, custom rules, and manual selection.
-   **Token Estimation:** Provide real-time feedback on the estimated token count of selected code.
-   **Windows-Native UI:** Develop a user-friendly interface using Electron and React, integrating with Windows features (context menus, file explorer).
-   **Optimized Prompt Structuring:** Generate prompts in structured formats (XML, JSON) including relevant metadata (file paths, class/function names).
-   **Intelligent CodeMap Extraction:** Parse and index code structures (classes, functions, types, references) to provide better context to the LLM.
-   **Structured Diffing:** Enable the application of LLM-generated changes (provided in a structured format like XML diffs) safely and precisely back to the local codebase.
-   **Clipboard & Workflow Ready:** Ensure generated prompts can be easily copied and used in various LLM interfaces or scripts.
-   **Local-First & Privacy-Focused:** All core processing and analysis must happen locally on the user's machine. No code should be sent externally unless explicitly initiated by the user (e.g., copying the prompt).
-   **Model Agnostic:** The generated prompts should be usable with various LLMs.

## 6. Out of Scope (Initial Version)

-   Direct integration with specific LLM APIs.
-   Cloud-based storage or synchronization.
-   Support for operating systems other than Windows.
-   Advanced AI-driven code analysis beyond structural parsing (e.g., semantic understanding).

## 7. Success Metrics (Potential)

-   User adoption rate.
-   Reduction in time spent manually crafting prompts.
-   User satisfaction with prompt quality and relevance.
-   Successful application of LLM-generated diffs.