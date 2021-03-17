---
name: Ticket Schema
about: A blueprint for creating consistent Issue tickets on the yumble repo.
title: "[FEAT] Add"
labels: ''
assignees: ''

---

# What is a Issue/Ticket & PR Schema and why do we do it?
This is just a simple and efficient way to improve readability and review time in a large team. A clear and concise ticket & PR schema works towards helping the team make sense of the bigger picture faster as well as nub any misunderstandings about what anyone is doing at the root.

## What schema will our group be using?
There are many different schemas and the process is always changing and improving. This is the schema that yumble will be using.
The PR's will follow the same schema as the tickets to allow for easy linking between tickets and pull requests.

## Ticket starting keywords:
* WIKI
* BUG
* FEAT  
* TEST 

## Followed by:
* Add
* Delete
* Modify

## Followed by:
* Description of what you are Add/Delete/Modify/ ing
## Followed by:
* Location of where you are changing the repo.

## Followed by:
Description inside ticket
### Acceptance guideline for description:
* Any linked sub-issues
* Adequately describes the details of the modification to the repo.
* Further categorization if it helps with overall organization of the repo
* [Optional]: Why you made this pull request

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

### Appendix:
Ticket: A ticket is the same thing that github calls an Issue. Although Issue is a better abstraction than ticket.
WIKI: Any issues under this name indicate documentation work relating to the Yumble project & team. 
BUG: Any issues involving the fixing of bugs. These issues **must** be linked to a bug report.
FEAT: Any issues involving development of any approved feature relating to the Yumble project.
TEST: Any issues involving the testing of code related to the Yumble project.
