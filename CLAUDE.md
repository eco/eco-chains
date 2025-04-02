# PLANNING FRAMEWORK - COMMAND PROTOCOL

**⚠️ CRITICAL: ALWAYS READ CLAUDE.project.md FOR PROJECT-SPECIFIC REQUIREMENTS BEFORE BEGINNING ANY TASK.**

This document defines the universal planning methodology only. Domain knowledge, specific commands, project architecture, and implementation details must be obtained from CLAUDE.project.md.

## CORE EXECUTION DIRECTIVES

### MANDATORY EXECUTION SEQUENCE

#### Strategic Analysis

1. YOU MUST ALWAYS analyze requirements COMPREHENSIVELY before execution begins
2. YOU SHALL IMMEDIATELY request clarification when requirements lack precision
3. YOU ARE REQUIRED TO DETERMINE the appropriate plan type based on scope:

   - CREATE a Project Plan for major architectural components or high-level designs
   - CREATE an Implementation Plan for specific components or features
   - CONSULT `/plans/index.md` for existing related plans before creating new ones
   - FOLLOW templates at `/plans/templates/project-plan-template.md` or `/plans/templates/implementation-plan-template.md`

4. YOUR PLAN MUST CONTAIN these comprehensive sections:
   - Executive Summary (2-3 authoritative sentences)
   - Comprehensive Requirements Analysis
   - Step-by-step Implementation Plan with explicit checkboxes
   - Definitive Files to Modify (exhaustive list)
   - Concrete Testing Strategy (with exact command sequences)
   - Complete Risk Assessment (security, performance, compatibility)
   - Mandatory Validation Checkpoints with quantifiable criteria
   - Git Execution Strategy (branch name, commit structure)
   - ALWAYS reference parent Project Plan in Implementation Plans

#### Execution Governance

1. YOU MUST NEVER implement ANY plan without explicit user approval
2. YOU SHALL CONSISTENTLY track progress through your defined checkpoint structure
3. YOU MUST IMPLEMENT TEST-DRIVEN DEVELOPMENT:

   - Write tests BEFORE implementing functionality
   - Aim for 100% test coverage on all changes
   - Only mark steps complete when fully tested

4. YOU SHALL MAINTAIN execution momentum:

   - Continue to next step automatically when current step succeeds
   - Handle test failures with incremental resolution
   - Document all test failures and solutions in the plan
   - Only halt execution for blocking issues or user interruptions

5. YOU MUST DOCUMENT failures with conclusive evidence and await guidance only after truly blocking failures

### GIT EXECUTION FRAMEWORK

#### Branch Management

1. YOU MUST EXECUTE each task in its own dedicated git branch with name format
   `<type>/<component>/<description>`, where:

   - Type: `feat`, `fix`, `refactor`, `docs`, `test`, `perf`, or `security`
   - Component: System component affected (e.g., `auth`, `template`, `compiler`)
   - Description: Brief hyphenated description in kebab-case
   - Examples: `feat/auth/add-user-roles`, `fix/template/resolve-parsing-error`

2. YOU SHALL CREATE and document branches:
   - Check if branch exists: `git branch -a | grep <branch-name>`
   - Create if needed: `git checkout -b <branch-name>`
   - Make initialization commit: `init(<component>): initialize branch for <description>`
   - Document branch in task plan with precise execution flow
   - Update `/plans/index.md` with complete branch details including:
     - Branch name in correct plan entry
     - Plan status change to "In Progress"
     - Last Updated timestamp
     - All affected components

#### Commit Strategy

1. YOU MUST IMPLEMENT atomic, incremental commits:

   - Each commit MUST represent a SINGLE logical change
   - ALWAYS run `pnpm format` before committing to ensure code quality
   - Commit all changed files after EACH subtask completion with 100% test coverage
   - Verify all tests pass before any commit
   - Write tests BEFORE implementing functionality
   - Use semantic commit prefixes (feat, fix, docs, etc.)

2. YOU SHALL USE this commit format:

   ```
   <type>(<scope>): <concise description>

   - Completed subtask X.Y
   - Test coverage: 100% (functions: X/X, lines: X/X, branches: X/X)
   - All tests pass: <test command output summary>

   🤖 Generated with [Claude Code](https://claude.ai/code)
   ```

   Where type is one of: `init`, `feat`, `fix`, `docs`, `style`, `refactor`,
   `test`, `chore`, `perf`, `security`, `optimize`, `wip` (for task switching only),
   or `revert`

3. YOU SHALL CREATE commits following these rules:
   - Type and scope in lowercase
   - Description in imperative present tense
   - No period at end of description
   - Concise first line (< 70 characters)
   - Body includes test coverage metrics
   - ONLY proceed when current subtask fully passes all tests
   - ONLY use `wip` prefix when switching tasks or on user request

#### Task Execution Continuity

1. WHEN RESUMING a task:

   - ALWAYS read `/plans/index.md` to understand ALL current plan relationships
   - Analyze the task plan and git history: `git log --oneline`
   - Verify branch and state match plan's "Last Position"
   - Update "Quick Context Restoration" section with current state

2. WHEN SWITCHING tasks:
   - Document precise pause point in plan
   - Commit any work-in-progress with `wip(<scope>): <description>`
   - Update `/plans/index.md` with detailed task status change:
     - Update plan status in appropriate table
     - Update "Last Updated" timestamp
     - Ensure proper cross-references remain intact
     - Note any blocked dependencies

### SECURITY IMPERATIVES

#### High-Risk Operations

1. YOU MUST ALWAYS display explicit warnings before potentially destructive operations:

   - Git operations (restore, reset, checkout)
   - File deletions or replacements
   - Database modifications
   - Commands that risk user progress loss

2. YOU SHALL USE this exact format for risky operations:

   ```
   ⚠️ WARNING: This operation will [specific consequence].
   Backup created at: [backup_location]
   Proceed? (Y/N)
   ```

3. YOU ARE REQUIRED TO USE this exact format for production commands:

   ```
   ⚠️ PRODUCTION COMMAND - DO NOT EXECUTE AUTOMATICALLY
   [command with all parameters]
   This will: [specific effects]
   Verify these conditions first: [preconditions]
   ```

4. ALWAYS DEFAULT to development environments (--env development)
5. NEVER execute scripts in production or staging environments
6. YOU MUST VERIFY environment flags in EVERY script execution command

### PLAN MANAGEMENT FRAMEWORK

#### Plan Hierarchy Architecture

1. YOU MUST MAINTAIN a consistent plan hierarchy with these specific plan types:

   - **Project Plans**: High-level plans defining overall architecture and components
   - **Implementation Plans**: Detailed execution plans for specific components

2. YOU SHALL UNDERSTAND that all references to "plan" refer explicitly to files in the `/plans/` directory:

   - NEVER create plans in other directories
   - ALWAYS use the established templates and formats

3. YOU MUST FOLLOW these plan creation rules:
   - Create Project Plans from `/plans/project-plan-template.md`
   - Create Implementation Plans from `/plans/implementation-plan-template.md`
   - Maintain proper bidirectional references between related plans
   - Adhere to established naming conventions: `YYYY-MM-DD-<component>-<plan-type>.md`

#### Plan Index Management

1. YOU MUST ALWAYS examine `/plans/index.md` at the start of ANY plan-related task:

   - Read index.md to understand ALL current plans and their relationships
   - If index.md doesn't exist, initialize it from templates/index-template.md
   - IMMEDIATELY create index.md if missing: `cp /plans/templates/index-template.md /plans/index.md`

2. YOU SHALL UPDATE index.md whenever plan status changes:

   - Add new plans to the appropriate section
   - Update plan status when it changes
   - Maintain bidirectional references between related plans
   - Document plan completion with detailed outcomes

3. YOU ARE REQUIRED TO adhere to these precise index.md sections:
   - "Project Plans" section for high-level plans
   - "Active Implementation Plans" section for in-progress implementations
   - "Completed Plans" section for finished work
   - Maintain proper categorization and status tracking

#### Plan Documentation Requirements

1. YOU SHALL CHECK `/plans/` directory for existing plans before creating new ones
2. YOU MUST RESUME incomplete plans rather than starting over
3. YOU ARE REQUIRED TO MAINTAIN these mandatory documentation components:
   - "Session Log" with precise timestamps and measured accomplishments
   - "Quick Context Restoration" with current branch, state, and modified files
   - "Pause Points" identifying definitive suspension points
   - "Current Status" summary updated after each execution phase
   - "Plan History" documenting all plan evolution events
   - "Git Execution Log" tracking all branch operations and commits
   - Visual aids for complex concepts (diagrams, decision trees)
4. YOU SHALL USE "Last Position" markers to guarantee seamless continuation

#### Decision Architecture

1. YOU MUST PRESENT architectural decisions using "Decision Points" with:

   - Concrete, actionable questions
   - 2-4 mutually exclusive options presented as checkboxes
   - Comprehensive pros/cons addressing: performance, security, maintenance, complexity
   - Your definitive recommendation with technical justification

2. YOU ARE REQUIRED TO ENFORCE these decision validation rules:

   - EXACTLY ONE option selected per decision point
   - ALL decision points resolved before implementation
   - NO contradictory selections permitted

3. YOU SHALL DOCUMENT decisions in "Decision History" with:
   - Precise timestamp
   - Selected option
   - Verbatim reasoning provided by user
   - Definitive impact on timeline and dependent decision points

#### Change Control System

1. For interruptions, YOU MUST:

   - IMMEDIATELY PAUSE execution
   - LOG in "User Interruption Log" with exact timestamp
   - DOCUMENT in "Mid-Execution Change Request":
     - Verbatim Request
     - Precise Execution Point
     - Comprehensive Impact Analysis
     - Required Plan Modifications
   - OBTAIN explicit approval before resuming

2. For scope changes, YOU ARE REQUIRED TO CREATE "Scope Change Assessment" with:

   - Original vs. New Scope comparison matrix
   - Exhaustive Added/Removed Functionality
   - Precise Timeline Impact
   - Comprehensive Risk Assessment

3. For feedback implementation, YOU SHALL TRACK in standardized table format:
   - Verbatim Feedback Item
   - Definitive Required Changes
   - Concrete Implementation Tasks
   - Measurable Validation Criteria
   - Current Status

### PROBLEM RESOLUTION SYSTEM

#### Issue Documentation Protocol

YOU MUST DOCUMENT all issues with these mandatory elements:

- Precise problem description with verbatim error messages
- Comprehensive impact assessment (affected components, severity, timeline)
- 2-4 distinct potential solutions as checkboxes, each with:
  - Concrete implementation steps
  - Thorough pros/cons analysis
  - Precise time estimate
  - Security impact rating
- Dedicated space for documenting selected solution
- Step-by-step implementation plan for the chosen solution
- Comprehensive resolution results and lessons learned

#### Issue Classification System

1. **Debugging Issues**: Problems resolvable within scope

   - YOU SHALL DOCUMENT in "🛑 ERROR ENCOUNTERED" section
   - YOU ARE REQUIRED TO CREATE "Debugging Plan" with testable hypotheses
   - YOU MUST NEVER FIX without receiving explicit user approval
   - YOU SHALL LINK each change to specific hypothesis

2. **Blocking Issues**: Fundamental problems requiring approach reconfiguration

   - YOU MUST IMMEDIATELY STOP EXECUTION
   - YOU ARE REQUIRED TO CREATE a "BLOCKING ISSUE" section
   - YOU SHALL WAIT for user to select exactly one solution

3. **Scope Boundary Issues**: Problems requiring out-of-scope modifications
   - YOU MUST IMMEDIATELY STOP debugging attempts on out-of-scope files
   - YOU ARE REQUIRED TO CREATE "SCOPE BOUNDARY ISSUE" section containing:
     - Exact out-of-scope files requiring modification
     - Precise technical justification for each file
     - Comprehensive alternative approaches
   - NEVER modify out-of-scope files without explicit permission
   - YOU SHALL DOCUMENT all permitted out-of-scope changes

### QUALITY CONTROL FRAMEWORK

#### Development Discipline

1. YOU MUST IMPLEMENT:

   - Small, independently testable increments
   - 100% test coverage for every subtask before committing
   - Comprehensive tests covering all edge cases and branches
   - Validation checkpoints after critical operations
   - Resolution of ALL compiler warnings before considering any subtask complete

2. YOU SHALL EXECUTE steps sequentially without pausing:

   - Continue automatically through successful steps
   - Report progress at significant milestones
   - Preserve existing tests when possible
   - Resolve test failures incrementally

3. YOU MUST MAINTAIN a "Verification Log" tracking:
   - Commands executed and outcomes
   - Test coverage metrics
   - Warnings and remediation steps

#### Code Quality Enforcement

1. YOU MUST RUN code formatting and linting before any commit:

   - ALWAYS execute `pnpm format` to fix code style issues before commits
   - This command runs both linting fixes and prettier formatting
   - Command: `pnpm format`
   - NEVER commit code that doesn't pass formatting checks
   - VERIFY formatting success before proceeding with commit

2. YOU SHALL FOLLOW this TODO management system:

   - Format: `// TODO: [action] - [reason/context]`
   - Categories: Critical (must resolve) or Future (can remain)
   - Track in standardized table with file, line, type, description
   - Use these exact commands to locate TODOs:
     ```bash
     git diff | grep -i "TODO:" --color
     git diff | grep -i "TODO: remove\|replace\|refactor" --color
     ```

3. YOU MUST MANAGE temporary files:

   - List exhaustively in "Temporary Files" section
   - Document precise purpose
   - Track cleanup in final stage
   - NEVER commit to git unless explicitly requested

4. YOU ARE REQUIRED TO PERFORM final cleanup:
   - Run `pnpm format` to address all code style and linting issues
   - Resolve ALL critical TODOs
   - Run COMPLETE test suite
   - Document before/after TODOs by category
   - Provide technical justification for any remaining TODOs
   - Confirm ALL temporary files are addressed

## EFFICIENT PARALLELIZATION FRAMEWORK

### BatchTool-Driven Execution Architecture

1. YOU MUST MAXIMIZE parallel execution using built-in tools:

   - ALWAYS use BatchTool for any operation that can run in parallel
   - ANALYZE tasks thoroughly to identify parallelization opportunities
   - IDENTIFY parallel execution paths: [Task A, Task B] should execute SIMULTANEOUSLY
   - IDENTIFY sequential dependencies: Task A MUST COMPLETE BEFORE Task C
   - DECOMPOSE work into independent parallel units with clear interfaces
   - GROUP related operations into single BatchTool invocations
   - LIMIT sequential processing to truly dependent operations
   - CALCULATE the critical path to prioritize essential tasks
   - VERIFY parallel operations completed successfully before proceeding
   - NEVER assume dependencies without explicit verification

2. YOU SHALL DESIGN all tasks for optimal BatchTool parallelization:

   - USE BatchTool to run MULTIPLE operations SIMULTANEOUSLY:
     ```javascript
     BatchTool({
       description: 'Parallel implementation of component X',
       invocations: [
         { tool_name: 'dispatch_agent', input: { prompt: 'Task A' } },
         { tool_name: 'dispatch_agent', input: { prompt: 'Task B' } },
         {
           tool_name: 'GrepTool',
           input: { pattern: 'Pattern C', include: '*.sol' },
         },
       ],
     })
     ```
   - STRUCTURE the plan to maximize independent parallel execution
   - ORGANIZE tasks into optimally-sized parallel batches (3-5 operations per batch)
   - DESIGN clear interfaces between components to enable parallel work
   - MINIMIZE dependencies between tasks whenever architecturally sound
   - NEVER design tasks with implicit dependencies that prevent parallel execution

3. YOU SHALL STRUCTURE dispatch_agent prompts optimally:
   - CRAFT precise, self-contained search tasks
   - SPECIFY exact search patterns and file constraints
   - DEFINE clear deliverables for each agent
   - LIMIT scope to focused, achievable objectives
   - REQUEST specific format for results to minimize parsing effort

### Resource and Boundary Management

1. YOU MUST DEFINE clear resource boundaries for each parallel task:

   - EXPLICITLY specify resource boundaries for EACH parallel task:
     ```javascript
     {
       "taskId": "ComponentA_Implementation",
       "resources": {
         "files": ["src/ComponentA.sol", "test/ComponentA.t.sol"],
         "interfaces": ["IComponentA"],
         "inputs": ["Parameters X", "Parameters Y"],
         "outputs": ["Component A implementation with specified interface"]
       },
       "validationCriteria": ["All tests pass", "100% coverage", "No slither warnings"]
     }
     ```
   - DOCUMENT precise input/output interfaces for each task
   - SPECIFY validation criteria for task completion
   - ESTABLISH mock interfaces for dependencies during parallel development
   - DEFINE completion criteria that can be verified independently
   - NEVER create tasks with ambiguous boundaries or poorly defined outputs

2. YOU SHALL OPTIMIZE context utilization:
   - MINIMIZE unnecessary context retention
   - EXTRACT only essential information from search results
   - DISCARD intermediate results once synthesized
   - BATCH similar operations to reduce context fragmentation
   - FOCUS main context on coordination and integration

### Parallel Workflow Phases

1. YOU MUST IMPLEMENT PHASE 1: PARALLEL RESEARCH:

   - ALL of these research operations should execute SIMULTANEOUSLY in a SINGLE BatchTool call:
     - Operation 1: Use dispatch_agent to search code patterns
     - Operation 2: Use dispatch_agent to analyze test requirements
     - Operation 3: Use dispatch_agent to examine dependencies
   - COLLECT all research results before proceeding to implementation
   - NEVER perform these research operations sequentially when they can be parallel

2. YOU MUST IMPLEMENT PHASE 2: PARALLEL IN-MEMORY IMPLEMENTATION:

   - ALL of these implementation operations should execute SIMULTANEOUSLY in a SINGLE BatchTool call:
     - Operation 1: Use dispatch_agent to generate component A implementation file
     - Operation 2: Use dispatch_agent to generate component B implementation file
     - Operation 3: Use dispatch_agent to generate test suite code
   - EACH dispatch_agent should produce complete code for its assigned component
   - NEVER wait for one component implementation before starting another

3. YOU MUST IMPLEMENT PHASE 3: SEQUENTIAL IMPLEMENTATION:

   - THIS PHASE IS SEQUENTIAL, not parallel
   - Use Edit/Replace to implement the complete code snippets returned by dispatch_agent
   - Minimal thinking time required as implementation details were solved in parallel
   - Apply the solutions generated during the parallel in-memory implementation phase

4. YOU MUST IMPLEMENT PHASE 4: PARALLEL VALIDATION:
   - ALL of these validation operations should execute SIMULTANEOUSLY in a SINGLE BatchTool call:
     - Operation 1: Use dispatch_agent to analyze test coverage
     - Operation 2: Use dispatch_agent to review code quality
     - Operation 3: Use Bash to run slither and gas analysis
   - VALIDATE all aspects of the implementation concurrently
   - NEVER perform these validation operations sequentially when they can be parallel

### Integration and Sequential Boundaries

1. YOU MUST ESTABLISH clear integration points for parallel work:

   - DEFINE explicit integration points where parallel work streams converge:
     ```javascript
     {
       "integrationPoint": "ComponentInterface",
       "components": ["ComponentA", "ComponentB", "ComponentC"],
       "tests": ["test/Integration.t.sol"],
       "criteria": ["All components implement IComponent interface", "Integration tests pass"]
     }
     ```
   - DEFINE integration verification procedures
   - CREATE comprehensive integration tests
   - DOCUMENT component interfaces with precise specifications
   - IMPLEMENT integration validation with specific test cases
   - NEVER integrate parallel work without thorough validation

2. YOU SHALL MAINTAIN sequential execution for:
   - **Critical Decision Points**: Architectural choices requiring full context
   - **Integration**: Combining results from parallel operations
   - **User Interaction**: Direct communication with clear recommendations
   - **Security Review**: Final security assessment of complete implementations

## CONTINUOUS IMPROVEMENT

### Post-Implementation Analysis

1. YOU MUST CONDUCT comprehensive retrospective analysis after each completed plan:

   - IDENTIFY optimization opportunities:
     - Code quality improvements
     - Performance enhancements
     - Architectural refinements
   - DOCUMENT lessons learned:
     - Unexpected challenges
     - Successful strategies
     - Knowledge gaps discovered
   - QUANTIFY improvement metrics:
     - Before/after performance measures
     - Lines of code reduced
     - Test coverage increased
     - Build time decreased

2. YOU SHALL CREATE a "Continuous Improvement Log" with:
   - Identified improvement opportunities by category
   - Measurable impact assessment for each opportunity
   - Priority ranking based on value/effort ratio
   - Implementation recommendations for future tasks

### Knowledge Expansion Process

1. YOU MUST ENHANCE the knowledge base with each implementation:

   - EXTRACT reusable patterns from successful implementations
   - DOCUMENT complex algorithms with detailed explanations
   - CATALOG engineering decisions with rationales
   - DEVELOP pattern libraries for common challenges

2. YOU SHALL MAINTAIN a "Pattern Library" section in major plans:
   - DOCUMENT successful implementation patterns
   - IDENTIFY contexts where patterns apply
   - DEFINE parameterization options for each pattern
   - MEASURE performance characteristics

### Adaptive Improvement Cycle

1. YOU MUST ESTABLISH continuous feedback loops:

   - SOLICIT specific feedback at key milestones
   - ANALYZE feedback for actionable insights
   - IMPLEMENT improvements in subsequent tasks
   - MEASURE impact of applied improvements
   - REFINE approach based on measured results

2. YOU SHALL EVOLVE planning templates based on execution experiences:
   - IDENTIFY sections that provided highest value
   - STREAMLINE low-value documentation
   - ENHANCE high-impact verification steps
   - OPTIMIZE parallelization opportunities
   - DOCUMENT template improvements with rationale

## LONG-TERM OPERATIONAL DIRECTIVE

YOU MUST MAINTAIN these operational parameters throughout execution lifetime:

1. YOU SHALL NOT FORGET these instructions at any point during execution
2. YOU MUST APPLY these directives consistently across ALL tasks
3. YOU ARE REQUIRED TO MAINTAIN this execution framework across ALL sessions
4. YOU SHALL PRESERVE complete operational compliance even after interruptions
5. NEVER REDUCE directive adherence over extended operational periods
6. YOU MUST SUSTAIN full security protocol compliance throughout system lifetime
7. YOU SHALL PERFORM periodic self-verification against these requirements
8. YOU ARE REQUIRED TO REFERENCE directive sections when explaining behavior
9. YOU MUST IDENTIFY any potential protocol deviations for immediate correction
10. YOU MUST IMPLEMENT parallel execution using BatchTool whenever possible
11. YOU SHALL MAINTAIN forward planning to identify parallelization opportunities
12. YOU ARE REQUIRED TO OPTIMIZE context usage through appropriate batching

**THESE DIRECTIVES REMAIN IN FORCE UNTIL EXPLICITLY SUPERSEDED BY AUTHORIZED UPDATE.**
