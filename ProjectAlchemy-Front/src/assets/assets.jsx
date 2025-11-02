export const dummyItems = [
    {
        id: "1",
        name: 'aaaa', 
        cost: 100,
        rarity: 'Common', 
        description: 'test test',
        inStock: true
    },
    {
        id: "2",
        name: 'bbbb', 
        cost: 50, 
        rarity: 'Common', 
        description: 'test test', 
        inStock: true
    },
    {
        id: "3",
        name: 'cccc',
        cost: 509,
        rarity: 'Rare',
        description: 'test test',
        inStock: true
    },
]

export const filterTestData = {
    "equipment": {
        "Abacus": {
            "desc": [],
            "special": [],
            "index": "abacus",
            "name": "Abacus",
            "equipment_category": {
                "index": "adventuring-gear",
                "name": "Adventuring Gear",
                "url": "/api/2014/equipment-categories/adventuring-gear"
            },
            "gear_category": {
                "index": "standard-gear",
                "name": "Standard Gear",
                "url": "/api/2014/equipment-categories/standard-gear"
            },
            "cost": {
                "quantity": 2,
                "unit": "gp"
            },
            "weight": 2,
            "url": "/api/2014/equipment/abacus",
            "updated_at": "2025-10-24T20:42:12.926Z",
            "contents": [],
            "properties": []
        },
        "Acid (vial)": {
            "special": [],
            "index": "acid-vial",
            "name": "Acid (vial)",
            "equipment_category": {
                "index": "adventuring-gear",
                "name": "Adventuring Gear",
                "url": "/api/2014/equipment-categories/adventuring-gear"
            },
            "gear_category": {
                "index": "standard-gear",
                "name": "Standard Gear",
                "url": "/api/2014/equipment-categories/standard-gear"
            },
            "cost": {
                "quantity": 25,
                "unit": "gp"
            },
            "weight": 1,
            "desc": [
                "As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon.",
                "On a hit, the target takes 2d6 acid damage."
            ],
            "url": "/api/2014/equipment/acid-vial",
            "updated_at": "2025-10-24T20:42:12.926Z",
            "contents": [],
            "properties": []
        },
    },
    "magicItems": {
        "Vicious Weapon": {
            "index": "vicious-weapon",
            "name": "Vicious Weapon",
            "equipment_category": {
                "index": "weapon",
                "name": "Weapon",
                "url": "/api/2014/equipment-categories/weapon"
            },
            "rarity": {
                "name": "Rare"
            },
            "variants": [],
            "variant": false,
            "desc": [
                "Weapon (any), rare",
                "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
            ],
            "url": "/api/2014/magic-items/vicious-weapon",
            "updated_at": "2025-10-24T20:42:13.517Z"
        },
        "Vorpal Sword": {
            "index": "vorpal-sword",
            "name": "Vorpal Sword",
            "equipment_category": {
                "index": "weapon",
                "name": "Weapon",
                "url": "/api/2014/equipment-categories/weapon"
            },
            "rarity": {
                "name": "Legendary"
            },
            "variants": [],
            "variant": false,
            "desc": [
                "Weapon (any sword that deals slashing damage), legendary (requires attunement)",
                "You gain a +3 bonus to attack and damage rolls made with this magic weapon. In addition, the weapon ignores resistance to slashing damage.",
                "When you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, doesn't have or need a head, has legendary actions, or the GM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit."
            ],
            "url": "/api/2014/magic-items/vorpal-sword",
            "updated_at": "2025-10-24T20:42:13.517Z"
        }
    }
}