export const APP_STATES = {
    INIT: 0,
    LOADING: 1,
    RESULTS: 2,
    ERROR: 3,
};

export const GAME_STATES = {
    START_GAME: 0,
    SELECT_CARDS: 1,
    SELECT_OPPONENT: 2,
    SELECT_GAME_MODE: 3,
    GAME_MODE_1: 4,
    GAME_MODE_2: 5,
    GAME_MODE_3: 6,
    END_GAME: 7,
    SHOP: 8,
    TUTORIAL: 9,
    LOADING: 10,
    RESULTS: 11,
    ERROR: 12,
};

export const OPPONENT_FRACTION_ARRAY_TUTORIAL = [
    {
        id: '1',
        name: 'JEDI',
        dbName:'Jedi',
        url: 'https://p1.storage.canalblog.com/27/39/1046352/91699620.png',
    },
];
export const OPPONENT_FRACTION_ARRAY = [
    {
        id: '0',
        name: 'SITH',
        dbName:'Sith',
        url: 'https://i.pinimg.com/564x/32/59/0d/32590d429fef734f879dba2cd65d588f.jpg',
    },
    {
        id: '1',
        name: 'JEDI',
        dbName:'Jedi',
        url: 'https://p1.storage.canalblog.com/27/39/1046352/91699620.png',
    },
    {
        id: '2',
        name: 'BOUNTY HUNTERS',
        dbName:'Bounty_Hunters',
        url: 'https://vignette.wikia.nocookie.net/starwars/images/7/79/Boba_Fett_HS_Fathead.png/revision/latest?cb=20161114160631'
    },
    {
        id: '3',
        name: 'REBELS',
        dbName:'Rebels',
        url: 'https://pbs.twimg.com/media/CxBOF6QUUAER9_o.jpg'
    }
];

export const GAME_MODE_ARRAY = [
    {
        id: GAME_STATES.GAME_MODE_1,
        name: "BATTLE",
        url: 'https://cdnb.artstation.com/p/assets/images/images/008/805/423/large/lu-tao-asset.jpg?1515427626',
    },
    {
        id: GAME_STATES.GAME_MODE_2,
        name: "HEROIC BATTLE",
        url: 'https://i.pinimg.com/564x/4e/ca/2d/4eca2d3fa3b140d35732b1e17dd9642a.jpg',
    },
];

