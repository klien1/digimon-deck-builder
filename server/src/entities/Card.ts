/**
 * {
 *    "name":"Yokomon",
 *    "type":"Digi-Egg",
 *    "color":"Red",
 *    "stage":"In-Training",
 *    "digi_type":"Bulb",
 *    "attribute":null,
 *    "level":2,
 *    "play_cost":null,
 *    "evolution_cost":null,
 *    "cardrarity":"Rare",
 *    "artist":"TANIMESO",
 *    "dp":null,
 *    "cardnumber":"BT1-001",
 *    "maineffect":null,
 *    "soureeffect":"[When Attacking] When you attack an opponent's Digimon, this Digimon gets +1000 DP for the turn.",
 *    "set_name":"BT-01: Booster New Evolution",
 *    "card_sets": [
 *      "BT-01: Booster New Evolution",
 *      "BT01-03: Release Special Booster Ver.1.0",
 *      "BTC-01: Booster Ultimate Evolution"
 *    ],
 *    "image_url":"https:\/\/images.digimoncard.io\/images\/cards\/BT1-001.jpg"
 * }
 *
 * https://documenter.getpostman.com/view/14059948/TzecB4fH
 */

export class Card {
  id: number;
  name: string;
  color: string;
  stage: string;
  digit_type: string;
  attribute: string;
  level: number;
  play_cost: number;
  cardrarity: string;
  artist: string;
  dp: number;
  cardnumber: string;
  maineffect: string;
  soureeffect: string;
  set_name: string;
  card_sets: [string];
  image_url: string;
}
