/* globals game, FormApplication, console, Dialog, saveDataToFile, ui, readTextFromFile, renderTemplate */
/* jshint -W089 */

import {get_item_trait} from "./item_card.js";
import {SYSTEM_GLOBAL_ACTION} from "./builtin-actions.js"
import {manage_selectable_gm} from "./gm_modifiers.js";

// DMG override is still not implemented.
/**
 * Registers all the avaliable global actions
 */
export function register_actions() {
    let world_actions = game.settings.get('betterrolls-swade2', 'world_global_actions');
    if (world_actions && world_actions[0] instanceof Array) {
            world_actions = world_actions[0]
    }
    game.brsw.GLOBAL_ACTIONS = SYSTEM_GLOBAL_ACTION.concat(world_actions);
}

/**
 * Let add actions to the current ones programmatically.
 * @param {Array} actions
 */
function add_actions(actions) {
    // Delete duplicate actions
    const actions_ids = actions.map(action => action.id);
    const actions_to_delete = game.brsw.GLOBAL_ACTIONS.filter(action => actions_ids.includes(action.id));
    game.brsw.GLOBAL_ACTIONS = game.brsw.GLOBAL_ACTIONS.filter(action => !actions_to_delete.includes(action));
    game.brsw.GLOBAL_ACTIONS = game.brsw.GLOBAL_ACTIONS.concat(actions)
}

/**
 * Process the not selector
 */
function process_not_selector(action, item, actor) {
    return ! process_action(action.not_selector[0], item, actor)
}

/**
 * Expose some functions to be used in macros.
 */
export function expose_global_actions_functions() {
    game.brsw.add_actions = add_actions;
}

 /**
  * Process and selector.
  * @param action
  * @param item
  * @param actor
  * @return {boolean}
  */
 function process_and_selector(action, item, actor) {
     let selected = true;
     for (let selection_option of action.and_selector) {
         if (! process_action(selection_option, item, actor)) {
            selected = false;
            break;
         }
     }
     return selected;
 }

/**
 * Checks if an or selector should be used
 * @param action
 * @param item
 * @param actor
 * @return {boolean}
 */
 function process_or_selector(action, item, actor) {
     let selected = false;
     for (let selection_option of action.or_selector) {
         if (process_action(selection_option, item, actor)) {
             selected = true;
             break;
         }
     }
     return selected;
 }

/**
 * Check if an action applies to a roll
 * @param action
 * @param item
 * @param actor
 * @return {boolean}
 */
function process_action(action, item, actor) {
    let selected = false;
    if (action.hasOwnProperty('selector_type')) {
        selected = check_selector(action.selector_type, action.selector_value, item, actor);
    } else if (action.hasOwnProperty('and_selector')) {
        selected = process_and_selector(action, item, actor);
    } else if (action.hasOwnProperty('or_selector')) {
        selected = process_or_selector(action, item, actor);
    } else if (action.hasOwnProperty('not_selector')) {
        selected = process_not_selector(action, item, actor)
    }
    return selected;
}

/**
 * Returns the global actions avaliable for an item
 * @param {Item} item
 * @param {SwadeActor} actor
 */
export function get_actions(item, actor) {
    let actions_avaliable = [];
    let disabled_actions = game.settings.get('betterrolls-swade2', 'system_action_disabled');
    if (disabled_actions && disabled_actions[0] instanceof Array) {
        disabled_actions = disabled_actions[0]
    }
    for (let action of game.brsw.GLOBAL_ACTIONS) {
        if (!disabled_actions.includes(action.id)) {
            if (process_action(action, item, actor)) {
                actions_avaliable.push(action);
            }
        }
    }
    actions_avaliable.sort((a, b) => {
        return a.id < b.id ? -1 : 1
    })
    return actions_avaliable;
}

// noinspection OverlyComplexFunctionJS,FunctionTooLongJS
/**
 * Check if a selector matches
 * @param type: Type of the selector
 * @param value: Value of the selector
 * @param item: item been checked
 * @param actor: actor been checked
 */
function check_selector(type, value, item, actor){
    let selected = false;
    if (type === 'skill') {
        if (item.type === 'attribute') {
            selected = false;
        } else {
            const skill = item.type === 'skill' ? item : get_item_trait(item, actor);
            if (skill) {
                if (value.slice(0, 5) === "BRSW.") {
                    selected = skill.name.toLowerCase().includes(
                        game.i18n.localize(value).toLowerCase())
                } else {
                    selected = skill.name.toLowerCase().includes(value.toLowerCase()) ||
                        skill.name.toLowerCase().includes(
                            game.i18n.localize("BRSW.SkillName-" + value).toLowerCase());
                }
            }
        }
    } else if (type === "attribute") {
        selected = item.type === 'attribute' && item.name.toLowerCase().includes(value.toLowerCase());
    } else if (type === "all") {
        selected = true;
    } else if (type === 'item_type') {
        selected = item.type === value;
    } else if (type === 'actor_name') {
        selected = actor.name.toLowerCase().includes(value.toLowerCase());
    } else if (type === 'item_name' && item.type !== 'skill') {
        selected = item.name.toLowerCase().includes(value.toLowerCase());
    } else if (type === 'item_description_includes') {
        const description = `${item?.system?.description} ${item?.system?.trapping}`
        selected = description.toLowerCase().includes(value.toLowerCase());
    } else if (type === 'actor_has_effect') {
        // noinspection AnonymousFunctionJS
        const effect = actor.effects.find(
            effect => effect.label.toLowerCase().includes(value.toLowerCase()));
        selected = effect ? ! effect.disabled : false;
    } else if (type === 'actor_has_edge') {
        const edge_name = value.includes("BRSW.EdgeName-") ? game.i18n.localize(value) : value;
        // noinspection AnonymousFunctionJS
        const edge = actor.items.find(item => {
            return item.type === 'edge' && item.name.toLowerCase().includes(
                edge_name.toLowerCase());
        });
        selected = !!edge;
    } else if (type === 'actor_has_ability') {
        const ability_name = value.includes("BRSW.AbilityName-") ?
            game.i18n.localize(value) : value;
        // noinspection AnonymousFunctionJS
        const ability = actor.items.find(item => {
            return item.type === 'ability' && item.name.toLowerCase().includes(
                ability_name.toLowerCase());
        });
        selected = !!ability;
    } else if (type === 'actor_has_hindrance' ) {
        const hindrance_name = value.includes("BRSW.EdgeName-") ?
            game.i18n.localize(value) : value;
        // noinspection AnonymousFunctionJS
        const hindrance = actor.items.find(item => {
            return item.type === 'hindrance' && item.name.toLowerCase().includes(
                hindrance_name.toLowerCase());
        });
        selected = !!hindrance;
    } else if (type === 'actor_has_major_hindrance') {
        const hindrance_name = value.includes("BRSW.EdgeName-") ?
            game.i18n.localize(value) : value;
        // noinspection AnonymousFunctionJS
        const hindrance = actor.items.find(item => {
            return item.type === 'hindrance' && item.name.toLowerCase().includes(
                hindrance_name.toLowerCase()) && item.system?.major;
        });
        selected = !!hindrance;
    } else if (type.indexOf('actor_additional_stat_') === 0) {
        const additional_stat = type.slice(22)
        if (actor.system.additionalStats.hasOwnProperty(additional_stat)) {
            // noinspection EqualityComparisonWithCoercionJS
            selected = actor.system.additionalStats[additional_stat].value == value
        }
    } else if (type.indexOf('item_additional_stat_') === 0) {
        const additional_stat = type.slice(21)
        if (item?.system?.additionalStats.hasOwnProperty(additional_stat)) {
            // noinspection EqualityComparisonWithCoercionJS
            selected = item.system.additionalStats[additional_stat].value == value
        }
    } else if (type === 'actor_has_joker') {
        selected = actor.hasJoker
    } else if (type === 'target_has_edge') {
        const edge_name = value.includes("BRSW.EdgeName-") ? game.i18n.localize(value) : value;
        for (let targeted_token of game.user.targets) {
            const edge = targeted_token.actor?.items.find(item => {
                return item.type === 'edge' && item.name.toLowerCase().includes(
                    edge_name.toLowerCase());
            });
            selected = selected || (!!edge)
        }
    } else if (type === 'target_has_hindrance') {
        const hindrance_name = value.includes("BRSW.EdgeName-") ?
            game.i18n.localize(value) : value;
        for (let targeted_token of game.user.targets) {
            const hindrance = targeted_token.actor?.items.find(item => {
                return item.type === 'hindrance' && item.name.toLowerCase().includes(
                    hindrance_name.toLowerCase());
            });
            selected = selected || (!!hindrance)
        }
    } else if (type === 'target_has_major_hindrance') {
        const hindrance_name = value.includes("BRSW.EdgeName-") ?
            game.i18n.localize(value) : value;
        // noinspection AnonymousFunctionJS
        for (let targeted_token of game.user.targets) {
            const hindrance = targeted_token.actor?.items.find(item => {
                return item.type === 'hindrance' && item.name.toLowerCase().includes(
                    hindrance_name.toLowerCase()) && item.system?.major;
            });
            selected = selected || (!!hindrance)
        }
    } else if (type === 'target_has_ability') {
        const ability_name = value.includes("BRSW.EdgeName-") ?
            game.i18n.localize(value) : value;
        for (let targeted_token of game.user.targets) {
            const ability = targeted_token.actor?.items.find(item => {
                return item.type === 'ability' && item.name.toLowerCase().includes(
                    ability_name.toLowerCase());
            });
            selected = selected || (!!ability)
        }
    } else if (type === 'target_has_effect') {
        selected = false
        for (const targeted_token of game.user.targets) {
            const effect = targeted_token.actor?.effects.find(
                ef => ef.label.toLowerCase().includes(value.toLowerCase())); // jshint ignore:line
            if (effect) {
                selected = selected || effect ? (! effect.disabled) : false;
            }
        }
    } else if (type === 'faction') {
        const tokens = actor.getActiveTokens()
        if (game.user.targets.size > 0 && tokens.length > 0 && tokens[0] !== game.user.targets.first()) {
            const actor_disposition = tokens[0].document.disposition
            const target_disposition = game.user.targets.first().document.disposition;
            if (value === 'same') {
                selected = actor_disposition === target_disposition;
            } else {
                selected = actor_disposition !== target_disposition;
            }
        } else {
            selected = false;
        }
    } else if (type === 'is_wildcard') {
        selected = actor.system.wildcard
        if (value === 'false') {
            selected = !selected
        }
    } else if (type === 'item_source_contains') {
        const item_source = item?.system?.source
        if (item_source) {
            selected = item_source.toLowerCase().includes(value.toLowerCase())
        }
    }
    return selected;
}

/**
 * Returns a global action from a name
 * @param {string} name
 */
export function get_global_action_from_name(name) {
    for (let action of game.brsw.GLOBAL_ACTIONS) {
        if (action.name === name) {
            return action;
        }
    }
}


// noinspection JSPrimitiveTypeWrapperUsage
/**
 * The global action selection window
 */
export class SystemGlobalConfiguration extends FormApplication {
    static get defaultOptions() {
        let options = super.defaultOptions;
        options.id = 'brsw-global-actions';
        options.template = "/modules/betterrolls-swade2/templates/system_globals.html";
        return options;
    }

    getData(_) {
        let groups = {}
        let disable_actions = game.settings.get('betterrolls-swade2', 'system_action_disabled');
        if (disable_actions && disable_actions[0] instanceof Array) {
            disable_actions = disable_actions[0]
        }
        for (let action of SYSTEM_GLOBAL_ACTION) {
            if (! groups.hasOwnProperty(action.group)) {
                groups[action.group] = {name: action.group, actions: []};
            }
            groups[action.group].actions.push(
                {id: action.id, name: game.i18n.localize(action.button_name),
                    enabled: !disable_actions.includes(action.id)});
        }
        // noinspection JSValidateTypes
        return {groups: groups};
    }

    activateListeners(html) {
        html.find(".brsw-section-title").click((ev) => {
            // noinspection JSCheckFunctionSignatures
            const checks = $(ev.currentTarget).parents('table').find('input[type=checkbox]')
            if (checks.length) {
                const new_status = ! $(checks[0]).prop('checked')
                checks.prop('checked', new_status)
            }
        })
        return super.activateListeners(html);
    }

    async _updateObject(_, formData) {
        let disabled_actions = [];
        for (let id in formData) {
            if (!formData[id]) {
                disabled_actions.push(id);
            }
        }
        await game.settings.set('betterrolls-swade2', 'system_action_disabled', disabled_actions);
    }
}


// noinspection JSPrimitiveTypeWrapperUsage
export class WorldGlobalActions extends FormApplication {
    static get defaultOptions() {
        let options = super.defaultOptions;
        options.id = 'brsw-world-actions';
        options.template = '/modules/betterrolls-swade2/templates/world_globals.html';
        options.width = 400;
        options.height = 600;
        return options;
    }

    getData(_) {
        let actions = game.settings.get('betterrolls-swade2',
            'world_global_actions');
        if (actions && actions[0] instanceof Array) {
            actions = actions[0]
        }
        let formatted_actions = []
        for (let action of actions) {
            formatted_actions.push({name: action.name,
                id: action.id,
                json: JSON.stringify(action)});
        }
        formatted_actions.sort((a, b) => {
            return a.id <= b.id ? -1 : 1
        })
        // noinspection JSValidateTypes
        return {actions: formatted_actions};
    }

    async _updateObject(_, formData){
        let new_world_actions = [];
        for (let action in formData) {
            new_world_actions.push(JSON.parse(formData[action]));
        }
        await game.settings.set('betterrolls-swade2', 'world_global_actions',
            new_world_actions);
        register_actions();
    }

    activateListeners(html) {
        // noinspection JSUnresolvedFunction
        html.find('.brsw-new-action').on('click', ev => {
            ev.preventDefault();
            // noinspection JSUnresolvedFunction
            const action_list = html.find(".brsw-action-list");
            let new_action = $("<div class='brsw-edit-action'><h3 class='brsw-action-title'>New</h3></div>");
            let new_textarea = $("<textarea class='brsw-action-json'></textarea>")
            new_textarea.on('blur', this.check_json);
            action_list.prepend(new_action.append(new_textarea));
        });
        // noinspection JSUnresolvedFunction
        html.find('.fas.fa-trash').on('click', ev => {
            const row = ev.currentTarget.parentElement.parentElement;
            row.remove();
        })
        // Activate json check on old actions
        $('.brsw-action-json').on('blur', this.check_json)
        // Export and import
        $('.brsw-export-json').on('click', export_global_actions)
        $('.brsw-import-json').on('click', import_global_actions)
        super.activateListeners(html);
    }
    
    check_json(ev) {
        // Checks the json in a textarea
        const text_area = ev.currentTarget;
        let error = '';
        let action;
        // Json loads.
        try {
            action = JSON.parse(text_area.value);
        } catch (_) {
            error = game.i18n.localize("BRSW.InvalidJSONError");
        }
        if (!error) {
            // Need to have an id, name
            for (let requisite of ['id', 'name']) {
                if (!action.hasOwnProperty(requisite)) {
                    error = game.i18n.localize("BRSW.MissingJSON") + requisite;
                }
            }
        }
        if (!error) {
            // Check that the keys are supported
            const SUPPORTED_KEYS = ['id', 'name', 'button_name', 'skillMod', 'dmgMod',
                'dmgOverride', 'defaultChecked', 'runSkillMacro', 'runDamageMacro',
                'raiseDamageFormula', 'wildDieFormula', 'rerollSkillMod', 'rerollDamageMod',
                'selector_type', 'selector_value', 'and_selector', 'group', 'shotsUsed',
                'or_selector', 'rof', 'self_add_status', 'not_selector', 'tnOverride',
                'extra_text', 'overrideAp', 'multiplyDmgMod', 'add_wild_die',
                'avoid_exploding_damage']
            for (let key in action) {
                if (SUPPORTED_KEYS.indexOf(key) < 0) {
                    error = game.i18n.localize("BRSW.UnknownActionKey") + key
                }
            }
        }
        const action_title = $(text_area.parentElement).find('h3');
        if (error) {
            // Inputs without name are not passed to updateObject
            action_title[0].innerHTML = error;
            text_area.removeAttribute('name')
        } else {
            action_title[0].innerHTML = action.name;
            text_area.name = action.name;
        }
    }
}

/**
 * Exports custom global actions to a json file.
 */
function export_global_actions() {
    let actions = game.settings.get('betterrolls-swade2',
            'world_global_actions');
    saveDataToFile(JSON.stringify(actions), 'json', "world_actions.json")
}

/**
 * Import global actions from disk
 * @return {Promise<void>}
 */
async function import_global_actions() {
    new Dialog({
      title: `Import Data: ${this.name}`,
      content: await renderTemplate("templates/apps/import-data.html",
          {
            hint1: 'hint1',
            hint2: 'hint2'}),
      buttons: {
        import: {
          icon: '<i class="fas fa-file-import"></i>',
          label: "Import",
          callback: html => {
            const form = html.find("form")[0];
            if ( !form.files.length ) {return ui.notifications.error("You did not upload a data file!");}
            readTextFromFile(form.files[0]).then((json) => {
                game.settings.set('betterrolls-swade2', "world_global_actions", JSON.parse(json))
            });
          }
        },
        no: {
          icon: '<i class="fas fa-times"></i>',
          label: "Cancel"
        }
      },
      default: "import"
    }, {
      width: 400
    }).render(true);
}

/**
 * Get the global actions with the gm selector.
 */
function get_gm_actions() {
    let gm_actions = []
    const disabled_actions = game.settings.get('betterrolls-swade2',
        'system_action_disabled')
    for (let action of game.brsw.GLOBAL_ACTIONS) {
        if (action.selector_type === "gm_action" && ! disabled_actions.includes(action.id)) {
            action.enable = false
            gm_actions.push(action)
        }
    }
    return gm_actions
}

export function register_gm_actions_settings() {
    game.settings.register('betterrolls-swade2', 'gm_actions', {
        name: "GM Actions",
        default: get_gm_actions(),
        type: Array,
        scope: "world",
        config: false
    });
}

/**
 * Get the date needed to render the gm_actions
 */
export function render_gm_actions() {
    let actions_ordered = {}
    let content = ''
    const old_actions = game.settings.get('betterrolls-swade2', 'gm_actions')
    let new_actions = []
    for (let new_action of get_gm_actions()) {
        const new_action_id = new_action.id
        const old_action = old_actions.find(action => action.id === new_action_id)
        if (old_action && old_action.enable) {
            new_action.enable = true
        }
        new_actions.push(new_action)
    }
    // noinspection JSIgnoredPromiseFromCall
    game.settings.set('betterrolls-swade2', 'gm_actions', new_actions)
    for (let action of new_actions) {
        if (!actions_ordered.hasOwnProperty(action.group)) {
            actions_ordered[action.group] = []
        }
        actions_ordered[action.group].push(action)
    }
    for (let group in actions_ordered) {
        const name = group.slice(0, 4) === 'BRSW' ?
            game.i18n.localize(group) : group
        content += `<div>${name}</div>`
        for (let action of actions_ordered[group]) {
            const name = action.button_name.slice(0, 4) === 'BRSW' ?
                game.i18n.localize(action.button_name) : action.button_name
            const marked_selected = action.enable ? "brws-selected brws-permanent-selected" : ""
            content += `<div data-action-name="${action.name}" class="brws-selectable brsw-clickable brsw-action brsw-added ${marked_selected}">${name}</div>`
        }
        content += '</div>'
    }
    $('#brsw-gm-actions').append(content)
    const new_tags = $('#brsw-gm-actions .brsw-added')
    new_tags.click(manage_selectable_gm)
    new_tags.removeClass('brsw-added')
}
