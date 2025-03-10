# Changelog

## Version 3.21 aka bugfixing, now to write more bugs
* Bugfix: Dropping items in the Macro Hotbar works again
* API: Pass the kind of injury that created and injury in the Hook.
* Items: Support damage actions in items with no damage.
* Actions: Make "shots_used" in power points addictive
* Bugfix: Bennie rerolls use the same target than the original roll not the one currently targeted
* Bugfix: Damage explosions are marked (changed to blue) correctly
* Api: add_action now replaces world actions with the same id
* Bugfix: When a modifier is a die show the results of each dice instead of the total

## Version 3.20 aka Praying so nothing explodes too much
* Cards: Collapse status of the action groups is now stored in the object and shared between users.
* Cards: Selected actions are shared between clientes.
* Cards: Removed "white" option inside cards.
* Scripting: The ApplyInjuryAE Hook is now passed a reason for the injury
* Bugfix: Don't fire faction actions when the targeted and acting token are the same

## Version 3,19 aka more fun in the NPC sheet
* Bugfix: Get the delete button in NPC items working.

## Version 3.18 aka actions on NPCS.
* Bugfix: Actions on NPCs didn't show the BR Card
* Translations: Updates to French translations from the Weblate team.

## Version 3.17 aka Destroying objects
* World actions: 'item_description_includes' now also search trappings in spells.
* Refactor: Complete removal of the item_id flag, item data stored in the card object.
* World actions: New rule 'avoid_exploding_damage'
* Built-in world actions: Attack objects action added (grendel11111)
* Bugfix: Stream template has now with 1 instead of beign a simple line.

## Version 3.16 aka Bugs galore
* Refactor: Foundation work to move action data to the card object.
* Bugfix: Now direct rolling for attributes and skills is working again

## Version 3.15 aka I knew.
* Bugfix: Tokenless actors where broken.

## Version 3.14 aka Introducing new bugs (likely)
* Global actions: System now support relative PP change.
* Bugfix: Shots used is working again
* Actions: Now action cards can create templates like powers.
* Refactoring: More internal refactoring that is going probably to cause bugs, but let's hope this is all for better in the long run
* API (breaking): All hooks now pass an instance of the BrCard class instead of the raw message.

## Version 3.13 aka Really!!
* Bugfix: Get soak working again

## Version 3.12 aka more Bugfixes
* Rebugfix: More problems when there are no tokens solved.

## Version 3.11 aka I can do ever bigger bugs
* Bugfix: Damage works again when no token is targeted

## Versiob 3.10 aka Big Bug
* Bugfix: Damage rolling was broken
* Gangup: Don't count actors when elevation difference is 1 or more.
* Feature: Support for Heavy Armor

## Version 3.9 aka Extras Rights!!
* Actions: New group roll action for extras
* Bugfix: faction selector is working again
* Refactoring: Changing storage for tokens
* States: Use the SUCC bleeding out state
* Bugfix: Range is calculated again using elevation
* Refactoring: Add environment data (currently not used) to cards
* Actios: Added `add_wild_die` action (used for group rolls)

## Version 3.8 aka I know I promised lightning, but...
* Bugfix: General Power Point management fixed.(EntreriCansinos)
* Translations: The usual couple of updates from the Weblate team
* Refactoring: First steps of the big and likely to bring bugs data storage refactoring
* Actions: 'is_wildcar' selector added
* Active Effects: Added a new active effect for soak rolls

## Version 3.7 aka too many bugs for a Friday
* Items: Use the new template checkboxes in item cards when available
* Settings: Show the scope of the settings in their description
* Bug: Don't break when a power was rolled with a targetted token
* Bug: Don't duplicate encumbrance modifiers on rerolls.
* Translations: BR updates from the Weblate Team

## Version 3.6 aka new attributes
* BugFix: Attribute cards work with last SWADE version (2.1.1)
* Bugfix: Solve a bug that make some dice expressions explode multiple times
* Documentation: Add a way to edit the wiki from the repo, allowing easier (and I hope more) documentation contributions.
* Documentation: Update docs for global actions and macro API (Bruno Calado)
* ActiveEffects: Add an active effect to change range (Brute Edge)
* Translations: The usual couple of updates from the weblate team
* Messages: Message cards are now popable (right click over a message)

## Version 3.5, aka a small API and more bugfixes.
* Bugfix, translations: Move the pt_BR.json file to pt_br.json
* Bugfix: Ambidextrous was not being detected because of a localization error.
* Bugifx: Some data access that were causing warnings corrected.
* Feature: Reworked gangup calculation. Hope that it works better with big tokens. Now melee distance can be configured on settings as it could be useful in gridless maps.
* Translations: The usual bunch of updates from the great weblate team.
* Api: Added an API to allow scripts and modules to add global actions.
* Bugfix: Linked actors automatically show the remove shaken card again at the start of the round.

## Version 3.4, aka Surprise!! there were more bugs related to v10 migration.
* Bugfix: Await for SUCC when undoing effects.
* Bugfix: Items can now roll again an attribute instead of only skills
* Refactor: Use the new system exposed way to show un-shake and un-stun cards (this should also disable system dialog again)
* Modifiers: Secondary hand is now supported
* Refactor: Another couple of refactor hoping to make the code simpler.

## Version 3.3, aka bugfixes for v10, I mean the firsts bugfixes for v10.
* Feature: Added support for Trademark weapon
* Feature: Show a compatibility warning when Swade Tools is active (SalieriC)
* Bugfix: Dodge now works when a non-english translation is active
* Bugfix: Drag and drop is working again
* Translations: The great weblate team added another couple of translations
* Bugfix: Reload is working again
* WARNING: There is still a bug that makes Vulnerable not renew when wild attacking two consecutive turns.

## Version 3.2 aka Here is the apocalypse version 10.
* Module should now be compatible with Foundry v10.
* Translations: Lots of translations added by the Weblate team.
* That's all.

## Version 2.76: Welcome SUCC, most work by SalieriC
* Added SUCC (SWADE Ultimate Condition Changer) as a dependency.
* Completely removed the `apply_status` function from BR2.
* Replaced the `apply_status` function calls with `succ.apply_status` to handle status management in SUCC.
* Combatant updates (marking combatant as defeated) also commented out as SUCC does this on its own.
* Changed Incapacitation status to be an overlay (aka "big icon").
* Actions: Added the `multiplyDmgMod` action to multiply the final damage.
* [BREAKING] The injuryAEApplied hook now passes the AE created, not just the data used to apply the AE. (SalieriC)
* Added a check for the FVTT v10 property path structure in the Unshake algorithm that checks for v9 and v10 Active Effects. It is reasonable to keep both as v10 will have a backwards compatibility on active effects. This change will make sure it is working as intended, no matter how the AE is set up. (SalieriC)
* Added a warning message if an items skill is set to "none". (SalieriC)
* Added a new custom ae to *add* a value to gang up. The bonus caps at +4 as usual. (SalieriC)
* Added a failsafe for gang up calculation: If an effect is present on the actor that reduces the gang up bonus (using "brsw-ac.gangup-reduction") and which is labeled "Block" or "Improved Block" (in the respective language), BRSW will not add any other gang up reduction from these edges. (SalieriC)
* Added an action to multiply damage
* Lots (really lots) of translations updates from the weblate team.
* Remove an extra $ in souldrain chat card.
* Bugfix: Manual management of power points should work with multiple arcana backgrounds
* GMActions: New framework to add actions that will be shown on the GM tab below the chat. Those actions will affect every roll.
* Bugfix: Wild die formulas don't need a "+" before them.
* Changed the order in which actions circle, red is now the first option instead of white

## Version 2.75: Strange UI changes
* Documentation: Brunocalado improved lots of documentation
* Actions: A new selector, `faction` has been added.
* BR Modifiers: Master and character modifiers are now in different tabs.
* Item cards: Added a collapsed description field to the item cards.

## Version 2.74: Stun cards are a thing?
* Refactors: Better importing, making unshake card code more generic
* Bug: Assure than a combatant has an actor before checking for shaken
* BR Modifiers: Support HTML in modifiers name and make then configurale
* Documentation: Better docs from SalieriC (SalieriC)
* Translations: New translations from the weblate team.
* Stun card: New remove stunned card that works as unshake card
* Bug: Don't break in new worlds when DM modifiers had not been set
* Bug: Ammo name now is trimmed before checking
* Bug: Clicking and right-clicking on NPCs sheets now work like PC sheets.

## Version 2.73: You should not import other code directly
* Translations: More great work from the weblate team
* Refactor: Lot's of old code was removed and some functions were simplified
* Range: Use grid units to measure distance, this should be enabled on settings (TheLaslo)
* Chat modifiers: Names of the modifiers can now be configured in settings
* Automation: After Clint's clarification, the system now doesn't use parry as difficulty when casting a power on an adjacent token
* Drag and drop: Damage can now be rolled (and auto-targeted) by dragging the damage (or raise damage) button to a token
* Bug: The program now doesn't break trying to calculate distance where it can't identify a source token
* Automation: Add the attacker own bonus to formation figther (after another Clint clarification) (Mike Bloy)
* Bug: Now only one unshake card is created on the chat (Mike Bloy)
* Bug: DSN should be working again after using proper exports instead of importing code directly

## Version 2.72 aka we are on 1.4 and I still resolving bugs from 1.1
* Hooks: Added a new hook that is thrown if there is no roll to be expected. For now, this hook is rather niche. (SalieriC)
* Combat flow: When a shaken combatant starts its turn, the unshake card is automatically shown. This can be disabled by setting
* Translations: Another bunch of updates from the weblate team.
* Bug: Make clicks on effects in the quick access work like in core (show origin if they had, show the effect card if they don't')
* Character Sheet: Rigth clicking on an affect show the effect card.
* Bug: Attribute rolls no longer break when 'item_has_additional_stat_xxxx' was involved.

## Version 2.71 aka swade 1.1 compatibility fixes, because of yes.
* Refactoring: More changes to simplify and make code more readable.
* Translations: A bunch of updates (mainly French) from the weblate team.
* Bugfix: Templates were not working after update de 1.1 (thanks to FloRad).
* Bugfix: Some effects were break when they were applied outside of combat.

## Version 2.70 aka Master modifiers will they be used?
* New feature: Added a row of modifiers that are shown just to the GM and affect every roll (made by players or GMs)
* Bug: When a condition should be reapplied update its start round so that duration management work.
* Refactor: Lots of function extractions and refactoring aiming at reduce code complexity
* Combat: Use the system provided way to know if an actor has a joker instead of rolling our own. I hope it has less (or none) cases when it fails. This
* World actions: Added actor_has_additional_stat_xxxx and item_has_additional_stat_xxxx selectors.
* Built-in actios: Add modifier to action names (ABrandau)

## Version 2.69 aka a boring one, mostly bugfixes and code cleanup
* Refactoring: Lots of changes to make code more readable and easy to modify. Hopefully they will not break nothing (yeah, I know...)
* Cards: Added hooks for injury cards
* Bug: Don't break when there are combatants without tokens.
* Bug: Power point management now works when re-rolling.
* Macros: Incapacitation cards can now be created by macros.
* World actions: Loading world actions from json works again.
* Bug: Damage icons are now correctly shown for item actions that change damage dice.
* Translations: The usual couple of updates from the weblate team.

## Version 2.68 aka remote controlling Sal to release a hotfix
* Bug: Powers no longer use the targets Parry as Target Number on range.

## Version 2.67 aka lots of thins
* Actions: Use the bonus damage die size from the actions tab in items
* Goblal actions: can now override AP.
* Cards: Now users can roll incapacitation, unshake and injuries for an owned actor different from his character
* Cards: Stream templates (pathfinder) are now supported in cards
* Refactor: Extract distance calculations to its own method
* Cards: Distance are now measured from token centers, making big tokens measurements consistent
* Bug: Synthetic actors (i.e. unlinked tokens) now apply the correct modifiers to unshake rolls
* Bug: Now actors in combat opened from the sidebar apply joker bonus correctly
* Hooks: Added some hooks to the damage cards to let other modules easier interact
* Bugs: When soaking shaken is not longer removed and applied when it should remain.
* Translations: The usual batch of translations updates from the weblate team
* Translations: Updata to the italian translation (Idlebrant)

## Version 2.66 aka that feature no one ask for
* Cards: New card to roll to remove shaken, accesible from the saken message on nay card (most work done by SalieriC)
* Translations: More updates from the incredible weblate team
* Bug: Trait modifiers where applied but not shown on the messsage in recent Foundry versions
* Macros: Macros now support quotes on item names

## Version 2.65 aka when its heavy it hurts
* Bug: Optional rules and actions are now correctly scoped to world, not client
* Translations: Updates from the weblate team
* Bug: Investigator edge is now translatable
* Feature: Support emcumbrance if it is enabled in system settings.
* Bug: Dice Tray modifier is now reset after rolling
* Feature: Add warnings for stunned characters and items with quantity 0 (SalieriC)
* Global actions: Added "item_description_include" selector

## Version 2.64 aka more fixes
* Bug: Use a somewhat better import system to avoid conflicts with DsN on the Forge
* Cards: Soak rolls now support Iron Jaw.

## Version 2.63 aka Small fix
* States: Use system incapacitated status.

## Version 2.62 aka SWADE 1.0
* Translations: Updates from the weblate team and brasilian updates from Bruno Calado
* Compatibility: Update status code to use the new AEs.

## Version 2.61 aka Small Fixes.
* Translations: More updates from the weblate team
* Cards: Wait a little more after start before trying to find tokens in the canvas
* Global actions: Don't break with actor-less tokens when evaluating global actions
* Cards: Ignore actor-less tokens when rolling damage
* Bug: Conviction was broken by async rolls

## Version 2.60 aka 
* Bug: Ignore tokens with no action when dealing damage, this should fix compatibility problems with modules that duplicate tokens
* Global actions: Added bulti-in actions for Dodge
* Bug: A couple of bugfixes that should resolve a lot of problems with built-in actions and translations
* Global actions: Global actions are now ordered, both in settings and chat by id.
* Global actions: Added the extra_text global action option
* Bug: Duplicating messages now pass the html data, and this fixes some strange behaviours
* Translations: Another couple of weblate translations from the great weblate team.
* Built-in actions: Added actions for Assasin and Investigator edges from grendel1111 doc.

## Version 2.59 aka v9 was sneakier than expected
* Refactoring: Remove some hacks used for 0.7 compatibility
* Bug: Direct rolls now respects defaultChecked on, that solves lots of issues.
* Cards: Add a warning when a shaken character shows a card
* Global actions: Added extra_text to global actions
* Card: Dice results are now editable (tommycore)
* Global actions: Added a selector for major hindrances
* Bug: SKills in global actions were case-sensitive
* Cards: Drag and drop now rolls damage when default action is "show card, roll trair and roll damage"
* Macro support: Macros now pass html to roll_item, that means than token action HUD should now support default checked on global actions
* Bug: Added an await to avoid a race condition that could make damage rolls not happen wome times. 

## Version 2.58 aka More bugs, can I blame v9?
* Bug: Lots of Bugfixes by Wiggins, specially related to ammo management (Wiggins)
* Combat: Incapacitation is now treated as an AE to keep it in sincro with the token HUD.

Special thanks to SalieriC for doing all the test that make possible to get this release out this morning. 

## Version 2.57 aka Bugs..
* Bug: A typo was making damage applying not working (SalieriC, Wiggins)
* Bug: Incapacitation was also not applying correctly.

## Version 2.56 aka Mainly bugfixes
* Global actions: Added tnOverride to options.
* Cards: Attribute cards now support started with actions collapsed
* Global: Now, any item that has a trait defined in the action tab will roll for it instead of just showing info
* Bug: Applying damage when in combat was broken
* Bug: Tokens with size more than 20 were unable to roll
* Cards: Added a setting to control if the ammunition and power points expended card is shown to everybody, just the master or if it is not show at all.

## Version 2.55 Aka welcome to version 9 light apocalypse (and incidentally card support)
* Global actions: Added 'target_has_effect' selector
* Refactoring: Ammo management code refactoring, damage card simplification, lots of minor improvements
* Cards: Skills now use rof modifiers from actions
* Optional rules: Support for Wound Cap
* Options: Make gangup calculations optional.
* Cards: Setting to start cards collapsed is now respected by macros
* Active Effects: A new active effect to support gang-up reduction
* Range calculation: New heuristics for range calculation
* Glocal actions: Added more edges from Grendel Document (grendel1111)
* Compatibility: Added suport for Foundry v9.


## Version 2.54 That things didn't happen...
* BUG: An error introduced in last updated totally broke applying damage.

## Version 2.53 Attributes as frist class citizens
* Global actions: Attributes can now use actions (Mike Bloy)
* Cards: Hardy is now recognised both as an ability and an edge.
* Refactoring: Lots of code simplifications, better types docs and management
* Global actions: Added a selector for "target_has_ability"
* Global actions: Names of the actions in the result details are now translated
* Translations: Support for translations in the modifier windows
* Translations: The usual lot of translations from the Weblate team
* General: Removed the included settings-extender. Now setting-extender is a hard dependency
* Refactoring: Simple Form now supports ids and is more capable
* Refactoring: Critical failure detection moved into calculate_results
* Global actions: Added more of the grendel edges (grendel1111)

## Version 2.52 Did somebody say something about arcane devices.
* Refactoring: Lots of small refactorings and code improvements
* Actions: Now, the used_shots fields, both in global actions and item actions can be used to specify the number of power points that an actions takes (when it is on an power without shots)
* Global actions: Added "actor_has_joker" selector
* Global actions: New target based selectors, for now: "target_has_edge" and "target_has_hindrance"
* Cards: There is now a new setting that forces a card to show all actions collapsed by default
* Global actions: Added more of the grendel hindrances (grendel1111)

## Version 2.51 No, still no support for arcane devices
* Refactoring: The quest for easier and more readable code continues
* Ammunition: Support for autoreload weapons
* Gang-up: Support for Formation Figther (Mike Bloy)
* Encumbrance: Use encumbrance steps to calculate minimum strength, so that Brawny and Soldier AE work
* Macros: Now macros defined in global actions search compendiums in addition to macro dir.
* Global actions: Added another couple of hindrances from grendel doc (grendel1111)
* Translations: The incredible weblate team delivers even more translations updates
* Global actions: Added "actor_has_ability" selector (Mike Bloy)
* Documentation: Improvements to global action documentation (SalieriC)

## Version 2.50 aka I passed an orthographic corrector, but I'm sure there are still typos
* Refactoring: Removing deprecated uses of the API in preparation for 0.9 compatibility
* Refactoring: Reducing the use of anonymous functions
* Refactoring: Lots of code simplifications
* Rolls: Added the ability to add a fixed modifier to damage after rolling
* Translations: Spanish, Catalan, French, German and Italian translation updates from the Weblate Team
* Bug: Refactoring (more like a rewrite) of the drag and drop code so items dragging into the sidebar works.
* Bug: Minimum strength is now correctly calculated
* Bug: Shooting when under minimum strength no longer disables actions mods
* Bug: Non-owner players can't now see the reload button on cards.
* Refactoring: Built-in actions are now in its own file, making contributing to them easier
* Character sheet: Now bubble icons show the better roll card, not system one,
* Deprecation: Custom bennie functionality has benn removed, please use system
* GlobalActions: Added multi-action modifiers and a couple of hindrances from the grendel1111 doc (gendel1111)

## Version 2.49 aka Selectors Evolved
* Refactoring: Lots of cleanups, naming of functions, making functions shorter and paying of debts, hoping to arrive someday to a more readable code.
* GlobalActions: Added a not selector to allow for selectors like not having an edge.
* GlobalActions: Support for nested or, and and not selectors.
* Translations: Another batch of updates for Portuguses, German and Italian translations from the incredible Weblate team.

## Version 2.48 aka More refactorings because life is boring when everything works 
* Rolls: Gang-up calculation now knows block and improved block
* Bug: Br doesn't break when there is a combat and no token for a combatant
* Rolls: Shooting rolls check minimum strength
* Rolls: Damage roll take minimum strength into account
* Rolls: Armor minimum strength is used in agility skill checks
* Bug: When subtracting ammo from an item and the quantity is 0 output a message (SalieriC)
* General: A couple of refactorings to make code easier to work with (aka paying debt) (aka there are going to be bugs)
* Translations: The usual batch of updates from the great Weblate Team

## Version 2.47 aka Does somebody use vehicles?

* Translations: Another batch of updates from the Weblate team and Joe Lozano
* Rolls: Support for rolling damage and attacks against vehicles (MarkPearce)
* Bug: Hide dice animation in blind rolls with DiceSoNice
* GlobalActions: Unarmed defender, touch attacks and non-lethal damage actions incorporated to module (Bruno Calado)
* Rolls: Scale now works with vehicles.
* Rolls: Melee and throwing weapon damage not respect minimum strength.

## Version 2.46 aka yes, it did happen again
* Bug: Incredible enough, even more fixes to gangup calculation.

## Version 2.45 aka More, and more, and more bugs... 
* Bug: More fixes to gangup calculation for tokens without actor
* Bug: sel_add_status accepted in custom actions.

## Version 2.44 aka Bugs...
* Bug: Item cards with null description don't break better rolls now (TheLaslo)
* Bug: Gangup calculation is more resilient, it specifically doesn't crash when there is no actor.
* Bug: Disable template functions for old version of swade system, so br can still work with 0.7.10

## Version 2.43 aka the importing and exporting.
* Refactoring: Use new syntax for systems in module.json
* Translations: Another batch of updated translations from the weblate team
* Translations: Brazilian portuguese added as a supported language (Diogo Gomes)
* Global actions: Added an option to export and import world actions.
* Global actions: Targets are now passed to macros run from global actions
* Refactoring: Better detection of the not trained skill
* Refactoring: Remove lots of IDE warnings
* Translation: Added missing translations string in manual pp management (SalieriC)
* Cards: Cards now show a button to place templates when it detects an item that uses them
* Health Bars: They now show whe not "used" wounds as transparent to make it useful to colorblinf people
* Global actions: Added actions for unstable platform, marksman, alertness and Mr. Fix It (Bruno Calado)

## Version 2.42 aka they say that finding bug is good...
* Bug: Rolls don't break anymore when bt can't find a origin token
* Bug: Solved a overflowing in manual pp management (SalieriC)
* Bug: Don't break if for some reason we try to calculata gang up with no tokens
* Bug: Actions can now again set conditions (Wild Attack is working again)

## Version 2.41 aka killing lots of lovely animals.
* Bug: Macros now run on skill actions.
* Bug: Removed old uses os skill_from_string that makes arcane skills fail to roll
* Bug: Initial support for arcane devices (SalieriC)
* Bug: Pitch dark modifier was -2 instead of the correct -6
* Bug: Attacks from tokens with the same disposition now don't calculate gangup
* Bug: Defeated enemies are not counted for gangup
* Bug: Gangup was not fired when action changed the skill to fighting, nor suppressed when it was change away from figthing
* Bug: Soaking was miscalculating bonuses for characters that ignore wound penalties
* Bug: Items in inventory where not draggable to macro bar
* Bug: Armor localizations in the footer of the item card are not space separated and translated

## Version 2.40 aka skills are no less than items
* Refactoring: Template has been moved to render_data from a flag.
* Refactoring: Now chat messages updates are forced in a less destructive way and this should prevent some issues.
* UI: Right click now always opens an item to edit.
* Skills: Skill cards now support actions.
* Bug: Direct rolling now shows against all actions collapsed

## Version 2.39 aka rushed bugfixing, let's sacrifice a goat to Shane and hope for the best
* Bug: Ilumination translation strings where mixed between Spanish and English.
* Bug: Don't try to scroll the chatbar on the initial rendering.
* Bug: Try to avoid racing with system to set bennie image.
* Foundry citizenship: Use a local CSS rule instead of foundry one to set button with image
* Translations: Another bunch of updates from the weblate team.
* Global actions: Added frenzy to module actios.
* Documentation: Lots of updates and reorganization (Bruno Calado)


## Version 2.38 aka let's try to organize changelogs, maybe someone will read them.

* Cards: Description added to skill cards
* Cards: Added a setting to expand roll results by default (holgaph)
* Internal refactoring: skill_id and attribute_id moved to render_data
* Global actions: Support of or_selector, support for ROF action, added actor_has_hindrande selector, added all selector
* Global actions: Illumination actions added to system actions.
* Bugs: Items card without rolls where not show (reicargaywood)
* Bugs: Joker detection was not working
* Rolls: Added support for gangup (brunocalado)
* Translations: Added a custom string for AP (Armor Penetration abbreviated)
* Translations: Usual bunch of updates from the weblate team


## Version 2.37 aka groups done at last.

* Use heigh in distance calculations
* Remove some warnings.
* Macros are now run after the message is updated so they get the latest data.
* Item actions are now grouped in the chat card.
* There is now a setting to hide the weapon actions, so only global actions are shown.
* The usual couple of translations updates (Weblate team).
* Scale modifiers support (Bruno Calado)
* Better internal way of storing skills in cards.

## Version 2.36 aka enjoying the other side.

* Documentation has been revamped, not really a great improvement, but hopefully it will create the infrastructure for it.
* System global actions are shown by group in settings and can be enabled and disabled by group
* Fix non-wilcard hig-rof reroll (zk-sn)
* Accept die trems modifiers for damage rolls
* Improved docs (Bruno Calado)
* Damage rolls details show the dice rolled instead of the full formula
* Cover modifiers added to system global actions
* Clicking the die in the official sheet now shows the br card
* Clicking buttons on power cards now show the br card
* Torg style token bars added (torg team)
* Lots of updates translations (David Montilla, Cyril Ronseaux and others in the weblate team)
* usedShots field added to global actions.
* Fix mark/unmark defeated in 0.8.x (zk-sn)

# Version 2.35 aka Stabilization between sides.

* Added groups to global actions.
* Add settings extender as a dependency.
* Attributes can now be used for an item trait roll
* Added languages strings, and again generally better translations.
* Parry now works in italian (zk-sn)
* Trait modifiers now allow for die formulas in addition to single numbers (i.e. "+1d4x")
* Macros now use mod keys to set the default behaviour (zk-sn)
* Option to select how multi-rof weapons work, single shot or maximum ROF (zk-sn)
* Weblate team updates for Spanish, Italian and German translations
* Custom modifiers names are now correctly shown.

# Version 2.34 aka At the other side

Thanks to all people who helped test the 0.8 and 0.7 compatibility

* Updates to enable 0.8.6 compatibility
* Better shot calculation
* Documentation updates (Bruno Calado)
* Solved a bug when drag and dropping attacks that causes the shot deduction logic to happen for melee weapons
* The usual couple of translation from the weblate team.

# Version 2.31 aka Before the 0.8 apocalipsys
* Lots of typos everywhere (zk-sn, Cyrul ROnseaux, Bruno Calado)
* Lots of translation updates (Weblate teams)
* Fix for Str 1. (zk-sn)
* Change the skill name in the card when an action makes it roll one different from the default one
* Remove duplication of skill name in the card.
* used_shots are now passed to macros
* Direct roll respect now the default_checked global action

## Version 2.30 aka At least something useful from all that global actions
* Updated German and Spanish translations
* Add an option to show the results details expanded by default
* If you have multiple tokens targeted Better Rolls will now roll damage once for each.
* Global actions get a formula to: change or remove the wild die, add a modifier to a skill reroll, add a modifier to a damage reroll
* Global actions get a selector for when an actor has an edge
* Elan and No Mercy are now supported via global actions.
* Macros are now executed inside an async function as Foundry version 0.7.10 does.

## Version 2.29 Global actions going crazy
* There is now an option to hide reroll buttons on critical failures (SalieriC if you ever read this, note that I didn't say fumbles)
* Modifications to chat card metadata, hoping to make it work better with CUB
* Remove PP from the arcane backgound when possible instead of from the general pool.
* New global action selectors: actor_name_selector, item_name_selector, actor_has_effect
* Lots of typos (Razortide, SalieriC)
* The raise dice can now be changed by a global action (e.g. using a d12 instead of d6)

## Version 2.28 Global macros... or whatever
* Spanish language renamed to español
* Global actions can now be star pinned (red)
* Global actions can now execute a macro after a skill or damage roll.

## Version 2.27, Now I feel like Linus...
* Added a hook to allow other modules to run code when a button is clicked (radyrosales)
* Change the type of the chat cards to roll
* Added italian translation (zgsuppo)
* Various fixes to documentation (Cyril "Gronyon" Ronseaux)
* Updated documentation (Razortide)
* First part of portuguese support (amaurijr1976)
* Much better css styling in the cards (DanieleSuppo)
* Show an icon to make an attack deal half damage
* Accept skill in lower case for World Global Actinos (tm).

## Version 2.26, The late one
* Lots of translation and spelling fixes
* Remove "more options" from cards
* Use parry as Target Number to hit adjacent targets with ranged attacks
* Autoapply distance penalties for ranged attacks
* Respect DSN configuration about showing the result after or before rolling
* Joker now modifies damage
* Various sheet fixes
* Better handling of soak rolls.

## Versio 2.25, World global actions aka What?
* Added a settings window to create and manage global actions tied to a world.
* Yet another attempt at having a sane chat scroll
* Shorter cards.

## Version 2.24, Did I broke Official Sheet?
* BUGFIX: Skill couldn't be rolled from the Official Sheet.
* Actions are now  collapsed on direct rolls.
* There is a window that do nothing in settings from World Global Actions.

## Version 2.23 aka Click Hijacking
* Add a setting window for optional rules
* Support Gritty Damage as an optional rule.
* Actions in the chat card are now collapsable
* Translations updates.
* Auto-scroll to see the end of a modified chat card is now more aggresive
* Apply damage icon changed
* On the character sheet, on quick access, clicking the item name now shows a better rolls card, please use modifiers to see the default behaviour


## Version 2.22 aka les enfants de la Foundry
* Added the "Voidomancy" arcane Skill from the Sundered Skies Companion (english only). (SalieriC)
* BUGFIX: Skills and other items of the same name should no longer cause BR to pick the wrong item to roll a Trait from.(SalieriC)
* Infrastructure work to allow personal global actions
* BUGFIX: The module didn't roll when multiple actions where selected.
* Initial support for Manifest+
* Updated translations for all the supported languages
* Added French to supported languages.
* BUGFIX: Chat is forced to scroll when the last card is modified.
* Better handling of the incapacitation test.
* Added active effects for the remaining injuries
* BUGFIX: Use parry modifier when available to calculate TN.

## Version 2.21 aka Injuries!!!!
* BUGFIX: Betterrolls shouldn't break when in combat an with no card deal
* Updated Spanish translations
* Injury card and rolls.
* Injury that decreases an atribute applied as active effects.
* Edit Edges, Hindrances and abilities in the NPC sheet with right click (consistent with skills)
* Show Edges, Hindrances and abilities in the NPC with left clicks
* Power rolls when failed, and expend PP is activated, deduct just 1 point.

## Version 2.2 aka Scared of 0.8
* BUGFIS: Some debug info was shown in char card.
* Incapacitation card.
* Global actions can be enabled/disabled on settings
* Global actions for "The Drop" and "Called Shot:Head"
* Global actions can now be selected by item type.
* Actor and token names are used with more consistence.

## Version 2.1 aka Google Übersetzer sagen, dies sollte deutsch sein
* German translations (Razortide)
* Updated documentation (Razortide)
* Show a message when pp overflows (SalieriC)
* Better management of pinned (marked in red) actions.
* New button to repeat a card
* Old rolls are a 30% bigger.
* Soak text and translations updated (Javier Rivera/Razortide)
* BUGFIX: A soak roll of 4 now removes a wound
* Actions now show an icon before than an have bigger margins.

## Version 2.0 aka Release...
* BUGFIX: Damage was not beign rolled when in full automation.
* BUGFIX: Actions marked in red now are keeped after rolling.
* Hardy is now supported.
* BUGFIX: Message update is forced to avoid some corner problems. 
* Global actions can now set status on user.
* As a result Wild Attack now makes the user vulnerable
* Better documentation, big thanks to Razortide.

## Version 1.119 Did I already used bugfixing?
* Multiple bugs in soak rolls. Logic got rewritten so lots of bugs solved, some new ones likely introduced.
* Don't spend bennies for FREE soak rerolls
* Show the apply damage option for exact shaken results.

## Version 1.118 aka Something global is born.
* Show an (*) after Roll: when modifiers are active
* Start of the "Global action" implementation.
* "Wild Attack" global action should appear on figthing items, it should give +2 to attack and damage
* Follow setting options about ammo and pp management in direct rolls

# Version 1.117 aka Bugfixing
* BUGFIX: Extras can now soak
* BUGFIX: The module doesn't break when Dice So Nice is not installed
* When in combat, mark defeated tokens after damaga
* Added an option to disable auto power-point managemet.

# Version 1.116 aka Moving settins
* Support for Dice So Nice and SWADE 0.16.2
* Hitting return in the ammo or power points management menu should reload foundry.

# Version 1.115 aka Not at all playing catch up with Swade Tools
* Soak rolls
* Characters in combat that have been giving a Joker gets a +2 bonus

# Version 1.114 aka New cards join the show.
* Damage card with ability to undo damage
* Better message data hiding logic.

# Version 1.113 aka Stealth BugSolving
* Double shaken was not working right.

## Version 1.112 aka you didn't need to reload don't you.
* Big bug: Ammo management was completely broken by yesterday update
* Various fixes to ammo management
* Option to make ammo management optional by default (you can still activate it in the card)
* Solved a bug that lose description links on card update.

## Version 1.111 aka So close to release is time to bring comments back
* Bug: Result as misscalculated in some situations
* Support for damage actions on items.
* Drag and drop support from powers outside quick acess
* Support amunition field in weapon.

## Version 1.110
* Adaptations to make it work better with SWADE 0.16
* Use of system settings for the wild die
* Remove module settings for selecting wild die theme
* Various minor refactoring.
* Remove status linking code, please use SWADE Toolkit
* Support "skill" item actions
* Solved a bug in the logic that detected when bennies where available
* Avoid duplication of the bennie animation on 0.16
* Remove deprecated SSO. translations string.

## Version 1.109
* Change the target of a damage roll
* Add a d6 to a damage roll
* Removal of lots of code
* Make macros dragged to the hotbar roll by default
* Give names and images to items dragged to the macro hotbar.

## Version 1.108
* Added translation strings for complex ammo tracking
* Hide icons so chat card is clearer.
* Let only gamemasters and card owners click on buttons
* See damage results as icons.
* Reroll damage spending a bennie
* Apply damage from the item card.

## Version 1.107
* Damage rolls incorporated into item card.
* Support for a different Dice So Nice theme for damage rolls
* Conviction dice added to damage rolls
* Bug: Solved a bug where the master was not shown the bennie reroll button while having master's bennies

## Version 1.106
* Solved a bug with macros with no token data
* Updated SalieriC ammo macro
* Initial work for damage card incorporation into item cards.

## Version 1.105
* Quite important refactoring of rolling, tns and modifiers based on targeted tokens.
* Ability to edit the modifiers after a roll
* Updated catalan translations
* Don't allow the master's bennies to go below 0.
* Ability to edit all TNs at the same time
* Better vulnerable management
* Get TNs from targeted or selected tokens.
* Spanish translations bugfixes.
* Added an option to collapse the modifier box over the chat at start.

## Version 1.104
* Bugfix: Weapon skill modifier wasn't beign added correctly.
* Modifiers can now de added and deleted.
* Integrate SalieriC power points management macro

## Version 1.103
* Bug: Use weapon rof as default.
* Bug: Use untrained skill if present and a skill that is not owned by the actor is mentioned in a weapon.
* Bug: When shots are 0 now it doesn't disscounts ammo.
* Delete damage card, move functionality to item card
* Autoroll damage as many times as attacks hit.
* Basic power point management, when rolling for powers, power pps will be deducted from actor.
* Ability to edit a roll by adding a modifier.

## Version 1.102
* Various bugdixes, including items not rolling and not rerolling.
* Added ability to see and interact with old rolls after rerolling
* Added status integration for swade-tools.

## Version 1.101
* Item cards now use the new consolidated card for trait rolls (damage is still using old one)

## Version 1.100
* Hide result roll to players when setting selected
* Catalan translation
* Skills use the new consolidated card.

## Version 1.99
* Don't activate listeners until last flag is set
* New assests for bennies: classical coins
* Attribute cards are now consolidated.

## Version 1.98
* Hopefully resolves the settings erros.

## Version 1.97
* Enable ROF 6 in chat modifiers
* Add custom bennie support (JuanV)
* Make url in module.json point the proper web page
* Bug: Armor was incorrectly defaulting to 4
* Char modifiers are now collapsable.
* More documentation work.

## Version 1.96
* Bug: Incorrect passed actor instead of token
* Bug: Don't break when there is no html and a weapon with ammo
* Move modifiers to the chat tab.
* More translations
* Incorporate ammo macro.

## Version 1.95
* Discount shots from items.
* Somewhat more current documentation
* Hide form from non-dms players, to keep cards tidy.
* Hide damage card from other players.
* Bug: Result card was not calculating results correctly in windows different as the rolling player.

## Version 1.94
* Add function to roll a skill from a macro
* Item cards and rolls
* Support for official sheet
* Add descriptions of associated skill in items
* Remove old version 1 css and compatibility.
* Reroll options moved to result card.
* Dice Tray support
* Support for skill mods in items
* Drag and drop support into hotbar
* Drag and drop support into tokens
* Use parry as difficulty for an attack roll
* Use bennie animations
* Damage cards and damage rolls
* Only show description (item or skill) section when there is one
* Rof 1 added to the card options
* Support for stars in skill names (official content)
* Use tougness of the targeted token for damage difficulty
* Reroll damage
* Armor an Armor penetration support in damage results
* Autoroll damage
* Apply damage to selected or targeted tokens.

## Version 1.93
* Solves a nasty bug that prevented editing skills.

## Version 1.92
* A couple of Spanish translations
* Saner defaults
* Some card redesign
* Button to roll spending a bennie
* First documentation
* Shadow clickable elements on hover
* Attributes draggable to macro hot bar
* Documentation attribute exposed functions
* Merge version 1.2.5 changes
* Skill cards
* Multiple trait dice rolls (high rof)
* Drag skills to macro toolbar.

## Version 1.91
* Critical failure detection
* Multilingual support.
* Spanish translation added
* Collapsable options in the card allowing discrete modifiers and target number
* Support for a different Wild Die when using Dice So Nice
* Try to fallback to actors for rolls when token is not available.

## Version 1.90
* Complete rewrite for a new, simpler version
* Attribute card, result cad, and rolling using system cards
* New basic UI
* Support for token or actor data.
