export const TUTORIAL_START_GAME = {
    START_GAME: 0,
    BEFORE_SELECT_CARDS: 1,
    SELECT_CARDS_INFO: 2,
    SELECT_CARDS: 3,
    BEFORE_SELECT_OPPONENT: 4,
    SELECT_OPPONENT: 5,
    BEFORE_SELECT_MODE: 6,
    SELECT_GAME_MODE: 7,
    GAME_MODE_1: 8,
    END_GAME_1: 9,
    BEFORE_GAME_MODE_2: 10,
    GAME_MODE_2: 11,
    END_GAME_2: 12,
    TUTORIAL_END: 13,
};
export const GAME_MODE_1_STATE = {
    START: 1,
    GAME_VISIBLE:2,
    CARD_CLICKING:3,
    PLAY_ROUND_CLICKING: 4,
};

export const GAME_MODE_TUTORIAL_PART_1 = [
    {
        id: TUTORIAL_START_GAME.GAME_MODE_1,
        name: "BATTLE",
        url: 'https://cdnb.artstation.com/p/assets/images/images/008/805/423/large/lu-tao-asset.jpg?1515427626',
    },

];
export const GAME_MODE_TUTORIAL_PART_2 = [
    {
        id: TUTORIAL_START_GAME.GAME_MODE_2,
        name: "HEROIC BATTLE",
        url: 'https://i.pinimg.com/564x/4e/ca/2d/4eca2d3fa3b140d35732b1e17dd9642a.jpg',
    },

];

export const CARDS_EXAMPLE = [
    {
        "id": "1",
        "name": "Luke Skywalker",
        "fraction": "Rebels",
        "attack": 25,
        "defence": 20,
        "health": 40,
        "avatar": "https://vignette.wikia.nocookie.net/parody/images/9/9b/Luke_Skywalker.png/revision/latest?cb=20170422170845",
        "value": 10,
        "mana": 1
    },
    {
        "id": "11",
        "name": "Yoda",
        "fraction": "Jedi",
        "attack": 46,
        "defence": 15,
        "health": 35,
        "avatar": "https://vignette.wikia.nocookie.net/gwiezdnewojnyjedi/images/c/c3/Yoda_TPM_RotS.png/revision/latest?cb=20150614102122&path-prefix=pl",
        "value": 10,
        "mana": 1
    },
    {
        "id": "17",
        "name": "Darth Vader",
        "fraction": "Sith",
        "attack": 37,
        "defence": 35,
        "health": 46,
        "avatar": "https://vignette.wikia.nocookie.net/zeropedia/images/4/49/Darth_Vader4.png/revision/latest?cb=20160216080323&path-prefix=pl",
        "value": 10,
        "mana": 1
    },
    {
        "id": "23",
        "name": "Cad Bane",
        "fraction": "bounty_hunter",
        "attack": 31,
        "defence": 19,
        "health": 33,
        "avatar": "https://vignette.wikia.nocookie.net/neoencyclopedia/images/4/4d/Cad_Bane_TCW.png/revision/latest?cb=20140112112456",
        "value": 10,
        "mana": 1
    },
];
