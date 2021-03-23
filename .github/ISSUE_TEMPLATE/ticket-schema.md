---
name: Ticket Schema
about: A blueprint for creating consistent Issue tickets on the yumble repo.
title: "[FEAT] Add"
labels: ''
assignees: ''

---

## Issue starting keywords:
* WIKI
* BUG
* FEAT  
* TEST 
* REQUEST

## Followed by:
* Add
* Delete
* Modify
* Report(Only for bugs)

## Followed by:
* Description of what you are Add/Delete/Modify/ ing
## Followed by:
* Location of where you are changing the repo.

## Followed by:
Description inside ticket
### Global Acceptance guideline for description:
* Any linked sub-issues
* Adequately describes the details of the modification to the repo.
* Further categorization if it helps with overall organization of the repo

### Additional guideline for [REQUEST]:
* Is your feature request related to a problem? Please describe.
* A clear and concise description of what the problem is. Ex. I'm always frustrated when [...].
* Describe the solution you'd like.
* A clear and concise description of what you want to happen.
* Describe alternatives you've considered.
* A clear and concise description of any alternative solutions or features you've considered.
* Additional context.
* Add any other context or screenshots about the feature request here.

### Additional guideline for [BUG] report:
* Refer to _____ (to insert bug report template from wiki)

### Examples:
#### Example 1
[WIKI] Add Unit test tutorial to wiki
* Dsc: Adding a unit test tutorial to the yumble wiki so that members of the yumble repo have a guideline to create unit tests for their own work. Improves readability, modifiability and scalability of the code.

#### Example 2
[FEAT] Add a default button shape to frontend
* Dsc: Adding a default button shape to be used throughout the yumble app, specific conditions apply where the default button will be modified into another shape.

## Criteria for approval:
* Follows Issue template as defined above
* Assign yourself to the ticket.
* Link the ticket to:
    * Project board
    * Related Labels
    * Related team
    * Related Pull requests

## labeling Issues:
All issues must be labeled:
    * By environment effected (frontend, backend, documentation)
    * By (setup environment, initial list of tasks, implementation)
    * Any further details. 
### NOTE: LABELS CANNOT BE CREATED WITHOUT AN APPROVED [REQUEST] ISSUE

### Appendix:
Ticket: A ticket is the same thing that github calls an Issue. Although Issue is a better abstraction than ticket.
WIKI: Any issues under this name indicate documentation work relating to the Yumble project & team. 
BUG: Any issues involving the fixing of bugs. These issues **must** be linked to a bug report.
FEAT: Any issues involving development of any approved feature relating to the Yumble project.
REQUEST: Any Issues involving requesting a change to the repo.
TEST: Any issues involving the testing of code related to the Yumble project.
Add: Adding functionality to the repo   
Delete: Deleting functionality from the repo
Modify: Changing functionality to the repo.
