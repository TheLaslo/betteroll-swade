# Pre-defined Global Actions

![Global Actions](https://github.com/javierriveracastro/betteroll-swade/blob/version_2/docs/img/global-actions.jpg?raw=true)

Global actions are pre-defined global actions that are ready to use. You can choose to disable them, if they should not be available in your setting.

# Custom Global Actions

![World Global Actions](https://github.com/javierriveracastro/betteroll-swade/blob/version_2/docs/img/world-global-actions.jpg?raw=true)

With the World global actions functionality, you can define your own global actions for this world. You need to provide a JSON file to add them:

![Add a new World Global Action](https://github.com/javierriveracastro/betteroll-swade/blob/version_2/docs/img/new-world-global-action.jpg?raw=true)

Global actions are a json encoded set of instructions that allow the user to customize how Better Rolls work.

**Example Action**
```json
{
   "id":"LEG",
   "name":"Called Shot: Leg",
   "button_name":"Leg Remover",
   "skillMod":-4,
   "dmgMod":4,
   "dmgOverride":"",
   "selector_type":"item_type",
   "selector_value":"weapon"
}
```

This piece of json will add an action called "Leg Remover" to every weapon card.
If this action is checked it will add a penalty of 4 to the skill roll and a bonus of 4 to the damage roll.

**Needed fields:**

* id: Any string, needs to be different for each action.
* name: The name of the action.
* button_name: The name that will be displayed on the icon. Will be made optional in some update.

**Optional fields:**

* skillMod: A number to be used as a modifier to the related skill roll.
* dmgMod: A number that will be used as a modifier for damage roll
* dmgOverride: A foundry die expression that will be rolled for damage instead of the weapon default.
* defaultChecked: If this key exists the action button will start pinned (marked in red)
* runSkillMacro: This key will run a macro named like its value after skill roll.
* runDamageMacro: This key will run a macro named like its value after damage roll.
* raiseDamageFormula: A string, specify here the formula used to add damage in the event of a raise. The default formula is "+1d6x", so any substitution should be done in a similar way, i.e. "+1d10x" to add a normal exploding d10.
* wildDieFormula: Another string dice formula, this time used for the Wild Die. Remember to specify the exploding. You can use an empty string for no wild die.
* rerollSkillMod: A number used as a modifier for skill reroll
* rerollDamageMod: A number used as a modifier for damage reroll
* shotsUsed: A number that makes the action use that number of shots. If the item is a power, it will make it use that number of PPs instead.
* rof: Numer of trait dice rolled.
* tnOverride: A number that is set as the tn of the roll. Note that this takes precedence from other ways of setting the target number like targeting.
* extra_text: Extra text to be shown in the card, it accepts HTML.
* overrideAp: Override the Armor Penetration value of the item.
* multiplyDmgMod: Multiply the final damage by this number.
* self_add_status: Add that status to the token making the roll.

**Selector fields:**

This group of fields are used to select when the action is available, you will need to specify a selector_type and a selector_value for a simple selection. You can also use and_selector and give it a list of simple selectors.

**selector_type:**
* skill: selector_value must be a string. The action will be available when the item uses a skill with that name
* attribute: selector_value must be a string. The action will be available when the attribute named is rolled. (eg, strength, agility, spirit, smarts, vigor)
* item_type: selector_value must be another string, a valid SWADE item type: weapon, power, edge, ...
* actor_name: selector_value must be a string. The action will be avaliable to actor that include that string in their name.
* item_name: selector value must be again a string that this time is compared with the item name.
* actor_has_effect: Another string selector, will select actors that have an enabled effect whose label contains the string.
* actor_has_edge: The same, this time it will look for an edge that contains that string.
* actor_has_hindrance: Like the last two, but for hindrances.
* actor_has_major_hindrance: This one only matches is the hindrance is major.
* actor_has_ability: Like the last three, but for special abilities.
* all: It will always show this action.
* actor_has_joker: The action will only be avaliable when the actor is in combat and has drawn a joker.
* target_has_edge: This action will be avaliable if PRIOR TO CLICKING the icon, the user has selected a target that has some edge.
* target_has_hindrance: This action is like actor_has_edge but fires for target hindrances
* target_has_major_hindrance: This other action only fires when the target has a major hindrance that includes the text in the value.
* target_has_effect: String selector; works similar to `actor_has_effect` but checks for active effects on the target instead.
* item_description_includes: This action will be shown if the item description includes the value.
* actor_additional_stat_xxx: This action will be present if an actor has an additional stat named xxx and its value is equal to what is in selector_value. You need to substitute xxx with the additional stat name.
* item_additional_stat_xxx: This works like actor_additional_stat_xxx but applies to items.
* faction: If `selector_value` is 'same' this will make the action appear when token from the same disposition is targeted. When the value is another it will make the action appear when the targeted token disposition is different from acting.
* gm_action: A selector with this value will make the action appear in the dm modifiers above the char window.

**Complex Selectors:**
* and_selector: Takes a list of the above selectors and executes the action if all are true i.e: 'and_selector'. As an example the following json will select and item that uses fighting skill and is owned by an actor whose name includes Jhon.
* or_selector: Takes a list of selectors and executes the action if at least one is true
* not_selector: Takes a list of only on selector and executes the action if that selector conditions are NOT met.

**Example: Basic Selector**
```json  
  "and_selector": [
    {"selector_type": "skill", "selector_value": "figthing"}, 
    {"selector_type": "actor", "selector_value": "Jhon"}
  ]
```

**Example: Nested Selectors**
```json
  "and_selector": [{
    "selector_type": "target_has_edge", "selector_value":"Dodge", 
    "or_selector": [
      {"selector_type": "power", "selector_value":"Bolt"}, 
      {"selector_type": "skill", "selector_value": "Shooting"}
    ]}
  ],
```

# Macros
The following variables are pre-populated in a macro run from global actions for macro writer convenience.
Note that all info is already stored in the message, all the other are just conveniences.

```
const actor = actor_param; // The card actor
const item = item_param; // The card item
const speaker = ChatMessage.getSpeaker();
const token = canvas.tokens.get(speaker.token);
const character = game.user.character;
const message = message_param; // The full message objetc
```

# Grouping

This tag lets you group the actions, it is not mandatory, but it will be used in the card in some next update.

* group: A string containing a group name, actions with the same name will be shown grouped in the card (in some future version)

# API
You can define global actions within a module. This let the user activate your module and have all **Global Actions** you defined turned on.

You need to load an script in your module. It's recommened to use "Hooks once ready".

The format of the global action must be like an array of objects. Look at the example.

```js
Hooks.once('ready', () => {
  const groupName = "Savage Pathfinder";
  
  const BETTER_ROLLS_GLOBAL_ACTIONS = [{
        id: "DESPERATE_ATTACK-2",
        name: "Desperate Attack +2",
        button_name: "Desperate Attack +2",
        skillMod: 2,
        dmgMod: -2,
        dmgOverride: "",
        and_selector: [{
            selector_type: "skill",
            selector_value: "Fighting"
          },
          {
            selector_type: "item_type",
            selector_value: "weapon"
          }
        ],
        group: groupName
      },
      {
        id: "SNEAKATTACK",
        name: "Sneak Attack",
        button_name: "Sneak Attack",
        dmgMod: "+1d6x",
        and_selector: [
          {
            selector_type: "actor_has_edge",
            selector_value: "Rogue"
          },
          {
            selector_type: "skill",
            selector_value: "Fighting"
          }
        ],
        group: "Savage Pathfinder"
      }
  ];

  game.brsw.add_actions(BETTER_ROLLS_GLOBAL_ACTIONS);  
}
```

It's recommended to add a conditional check to `game.brsw.add_actions` to prevent an error if Better Rolls is not activated. 
```js
if (game.modules.get("betterrolls-swade2")?.active) { 
  game.brsw.add_actions(BETTER_ROLLS_GLOBAL_ACTIONS);  
  ui.notifications.error("Please, activate better rolls module!");
}
```

It's also recommended to add to your module settings an option to let the user turn on this feature. Maybe the user wants to use his own global actions.
```js
if (game.settings.get("yourModuleID", "TurnOnOrOffMyModuleGlobalActions")) { 
  game.brsw.add_actions(BETTER_ROLLS_GLOBAL_ACTIONS);  
}
```

Module for Example: https://github.com/brunocalado/savage-pathfinder-enhanced


# Examples
**USE CTRL+F TO SEARCH**

**Table of contents**
1. SWADE  
  1. Basic modifiers and actions  
  2. Edges  
  3. Special Abilities  
2. Pathfinder for Savage Worlds  
  1. Edges  
3. Sprawlrunners  
  1. Edges  

## SWADE
Below are examples for the core rules of SWADE and may be applicable to most settings.

### Basic modifiers and actions
These cover the most basic modifiers and combat actions in SWADE.

**Called Shot**
```json
{
  "id": "CALLEDSHOTHAND",
  "name": "Called shot: Hand",
  "button_name": "Called shot: Hand",
  "skillMod": "-4",
  "dmgMod": "+4",
  "selector_type": "skill",
  "selector_value": "Shooting",  
  "group": "BRSW.AttackOption"  
}
```

**Unarmed Defender**

```json
{
  "id": "UNARMEDDEFENDER",
  "name": "Unarmed Defender",
  "button_name": "Unarmed Defender",
  "skillMod": "+2",
  "selector_type": "skill",
  "selector_value": "Fighting",
  "group": "BRSW.SituationalModifiers"
}
```

**Unstable Platform**

```json
{
  "id": "UNSTABLEPLATFORM",
  "name": "Unstable Platform",
  "button_name": "Unstable Platform",
  "skillMod": "-2",
  "or_selector":[
    {
       "selector_type":"skill",
       "selector_value":"Shooting"
    },
    {
       "selector_type":"skill",
       "selector_value":"Athletics"
    }
  ],  
  "group": "BRSW.SituationalModifiers"
}

```

**Touch Attack**
```json
{
  "id": "TOUCHATTACK",
  "name": "Touch Attack",
  "button_name": "Touch Attack",
  "skillMod": "+2",
  "dmgOverride": "0",
  "selector_type": "skill",
  "selector_value": "Fighting",
  "group": "BRSW.SituationalModifiers"
}
```

**Off-Hand Attacks**

```json
{
  "id": "OFFHANDATTACKS",
  "name": "Off-Hand Attacks",
  "button_name": "Off-Hand Attacks",
  "skillMod": "-2",
  "selector_type": "item_type", 
  "selector_value": "weapon",
  "group": "BRSW.SituationalModifiers"
}
```

**Nonlethal Damage**

```json
{
  "id": "NONLETHALDAMAGE",
  "name": "Nonlethal Damage",
  "button_name": "Nonlethal Damage",
  "skillMod": "-1",
  "selector_type": "skill",
  "selector_value": "Fighting",
  "group": "BRSW.SituationalModifiers"
}
```

**Two Weapons**

```json
{
  "id": "Two Weapons",
  "name": "Two Weapons",
  "button_name": "Two Weapons",
  "skillMod": "+1",
  "selector_type": "skill",
  "selector_value": "Fighting",
  "group": "BRSW.SituationalModifiers"
}
```


### Edges
This is a non-exhaustive list of modifiers enabled by Edges a character has learned in SWADE.

**Dodge**
```json
{
  "id":"DODGE",
  "name":"Dodge",
  "button_name":"Dodge",
  "skillMod": "-2",
  "and_selector": [
    {"selector_type": "target_has_edge", "selector_value":"Dodge", 
    "or_selector": [
      {"selector_type": "power", "selector_value":"Bolt"}, 
      {"selector_type": "skill", "selector_value": "Shooting"}
    ]}
  ],
  "group": "Edges",
  "defaultChecked": "on"  
}
```

**Marksman**
```json
{
  "id":"MARKSMAN",
  "name":"Marksman",
  "button_name":"Marksman",
   "skillMod": "+1",
  "and_selector":[
    {
       "selector_type":"actor_has_edge",
       "selector_value":"Marksman"
    },
    {
       "selector_type":"skill",
       "selector_value":"Shooting"
    }
  ],
  "group": "Edges"     
}
```

**Alertness**
```json
{
  "id":"ALERTNESS",
  "name":"Alertness",
  "button_name":"Alertness",
  "skillMod": "+2",   
  "and_selector":[
    {
      "selector_type":"actor_has_edge",
      "selector_value":"Alertness"
    },
    {
       "selector_type":"skill",
       "selector_value":"Notice"
    }
  ],
  "defaultChecked":"on",
  "group": "Edges"     
}
```

**Mr Fix It**
```json
{
  "id":"MRFIXIT",
  "name":"Mr Fix It",
  "button_name":"Mr Fix It",
  "skillMod": "+2",   
  "and_selector":[
    {
      "selector_type":"actor_has_edge",
      "selector_value":"Mr Fix It"
    },
    {
       "selector_type":"skill",
       "selector_value":"Repair"
    }
  ],
  "defaultChecked":"on",
  "group": "Edges"     
}
```

### Special Abilities  
Here are examples for Special Abilities (N)PCs might have in SWADE.

**Rollover (Alligator/Crocodile ability)**
```json
{
  "id":"ROLLOVER-BONUS_DAMAGE",
  "name":"Raise!",
  "button_name":"Raise Damage (Rollover)",
  "dmgMod": "+d10",
  "and_selector": [
    {"selector_type": "actor_has_ability", "selector_value":"Rollover"}, 
    {"selector_type": "skill", "selector_value": "Fighting"}
  ],
  "group": "Special Abilities"  
}
```

**Pounce (Lion ability)**
```json
{
  "id":"POUNCE-WILD_ATTACK",
  "name":"Wild Attack",
  "button_name":"Wild Attack (Pounce)",
  "dmgMod": "+4",
  "and_selector": [
    {"selector_type": "actor_has_ability", "selector_value":"Pounce"}, 
    {"selector_type": "skill", "selector_value": "Fighting"}
  ],
  "group": "Special Abilities"  
}
```
  
## Fantasy Companion  
Below is a list of actions for the Fantasy Companion for SWADE.

### Edges  
**Savagery**
```json
{
  "id":"Savagery",
  "name":"Wild Attack (Savagery)",
  "button_name":"Wild Attack (Savagery)",
  "dmgMod": "+4",
  "and_selector": [
    {"selector_type": "actor_has_edge", "selector_value":"Savagery"}, 
    {"selector_type": "skill", "selector_value": "Fighting"}
  ],
  "group": "Fantasy Companion"  
}  
```

## Pathfinder for Savage Worlds  
Below is a list of actions for the Savage Pathfinder setting. Some basic actions from SWADE (see above) are applicable as well.  

### Attack Options
SWPF adds new combat options like Desperate Attack which is listed as an example below.

**Desperate Attack**  
Due to the nature of desperate attack, two global actions are needed:
```json
{
    "id": "DESPERATE_ATTACK-2",
    "name": "Desperate Attack +2",
    "button_name": "Desperate Attack +2",
    "skillMod": "2",
    "dmgMod": "-2",
    "and_selector": [
        {
            "selector_type": "skill",
            "selector_value": "fighting"
        },
        {
            "selector_type": "item_type",
            "selector_value": "weapon"
        }
    ],
    "group": "BRSW.AttackOption"
}
```

```json
{
    "id": "DESPERATE_ATTACK-4",
    "name": "Desperate Attack +4",
    "button_name": "Desperate Attack +4",
    "skillMod": "4",
    "dmgMod": "-4",
    "and_selector": [
        {
            "selector_type": "skill",
            "selector_value": "fighting"
        },
        {
            "selector_type": "item_type",
            "selector_value": "weapon"
        }
    ],
    "group": "BRSW.AttackOption"
}
```

### Edges  
These are examples enabled by learned Edges from Savage Pathfinder.  
  
**Monk Attack**
```json
{
  "id":"MONKRAISE",
  "name":"Monk Attack",
  "button_name":"Monk",
  "defaultChecked":"on",
  "raiseDamageFormula": "+1d10x",
  "and_selector": [
    {"selector_type": "actor_has_edge", "selector_value":"Monk"}, 
    {"selector_type": "skill", "selector_value": "Fighting"}
  ],
  "group": "Savage Pathfinder"  
}
```

**Sneak Attack**
```json
{
  "id":"SNEAKATTACK",
  "name":"Sneak Attack",
  "button_name":"Sneak Attack",
  "dmgMod":"+1d6x",
  "and_selector":[
    {
       "selector_type":"actor_has_edge",
       "selector_value":"Rogue"
    },
    {
       "selector_type":"skill",
       "selector_value":"Fighting"
    }
  ],
  "group": "Savage Pathfinder"     
}
```

**Powerful Blow**
```json
{
  "id":"POWERFUL_BLOW-WILD_ATTACK",
  "name":"Wild Attack",
  "button_name":"Wild Attack (Powerful Blow)",
  "dmgMod": "+4",
  "and_selector": [
    {"selector_type": "actor_has_edge", "selector_value":"Powerful Blow"}, 
    {"selector_type": "skill", "selector_value": "Fighting"}
  ],
  "group": "Savage Pathfinder"  
}
```

**Environmental Resistance/Weakness**
```json
{
  "id": "ENVIRONMENTALRESISTANCE",
  "name": "Environmental Resistance",
  "button_name": "Environmental Resistance",
  "dmgMod": "-4",
  "or_selector":[
    {
      "selector_type": "item_type", 
      "selector_value": "weapon"
    },
    {
      "selector_type": "item_type", 
      "selector_value": "power"
    }
  ],  
  "group": "Savage Pathfinder"
}
```

```json
{
  "id": "ENVIRONMENTALWEAKNESS",
  "name": "Environmental Weakness",
  "button_name": "Environmental Weakness",
  "dmgMod": "+4",
  "or_selector":[
    {
      "selector_type": "item_type", 
      "selector_value": "weapon"
    },
    {
      "selector_type": "item_type", 
      "selector_value": "power"
    }
  ],  
  "group": "Savage Pathfinder"
}
```

**Wild Attack (Pounce)**
```json
{
  "id":"POUNCE-WILD_ATTACK",
  "name":"Wild Attack (Pounce)",
  "button_name":"Wild Attack (Pounce)",
  "dmgMod": "+4",
  "and_selector": [
    {"selector_type": "actor_has_ability", "selector_value":"Pounce"}, 
    {"selector_type": "skill", "selector_value": "Fighting"}
  ],
  "group": "Savage Pathfinder"  
}
```

## Sprawlrunners  
These are examples common to the Sprawlrunners rules for Savage Worlds.  
  
### Edges  
These are enabled by Edges a character has learned in Sprawlrunners.  
  
**Passive Alarm**
```json
{
   "id":"PASSIVEALARM",
   "name":"Passive Alarm",
   "button_name":"Passive Alarm",
   "skillMod":1,
   "dmgMod":1,
   "selector_type":"actor_has_edge",
   "selector_value":"Alarm",
   "group": "Sprawlrunners"
}
```

**Active Alarm**
```json
{
   "id":"ACTIVEALARM",
   "name":"Active Alarm",
   "button_name":"Active Alarm",
   "skillMod":2,
   "dmgMod":2,
   "selector_type":"actor_has_edge",
   "selector_value":"Alarm",
   "group": "Sprawlrunners"
}
```
