// Functions for cards representing attributes

import {create_basic_chat_data} from "./cards_common.js";

/**
* Creates a card for an attribute
* @param {token, actor} origin  The actor or token owning the attribute
* @param {string} name The name of the attribute
* @return A promise for the ChatMessage object
*/
async function create_attribute_card(origin, name){
    let actor = origin.hasOwnProperty('actor')?origin.actor:origin;
    let chatData = create_basic_chat_data(actor, CONST.CHAT_MESSAGE_TYPES.IC);
    chatData.content = await renderTemplate(
        "modules/betterrolls-swade/templates/attribute_card.html",
        {actor: actor, header: {type: 'Attribute', title: name}});
    return ChatMessage.create(chatData);
}

/**
 * Hooks the public functions to a global object
 */
export function attribute_card_hooks() {
    game.brsw.create_atribute_card = create_attribute_card;
}
