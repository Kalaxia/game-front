export default {
    "laser-gun": {
        "picture": "",
        "picture_flip_x": true,
        "picture_flip_y": false,
        "type": "weapon",
        "shape": "square",
        "size": "small",
        "scores": {
            "fighter": 50,
            "bomber": 20
        },
        "stats": {
            "nb_shots": 8,
            "damage": 10,
            "precision": 25
        },
        "ship_stats": {},
        "price": [
            {
                "type": "points",
                "amount": 2
            },
            {
                "type": "credits",
                "amount": 125
            },
            {
                "type": "resource",
                "resource": "resources.e",
                "amount": 50
            }
        ]
    },
    "ion-reactor": {
        "picture": "",
        "picture_flip_x": false,
        "picture_flip_y": false,
        "type": "engine",
        "shape": "square",
        "size": "medium",
        "scores": {
            "fighter": 25,
            "bomber": 20,
            "freighter": 25
        },
        "ship_stats": {
            "speed": 225
        },
        "stats": {},
        "price": [
            {
                "type": "points",
                "amount": 5
            },
            {
                "type": "credits",
                "amount": 150
            },
            {
                "type": "resource",
                "resource": "resources.b",
                "amount": 75
            },
            {
                "type": "resource",
                "resource": "resources.c",
                "amount": 60
            }
        ]
    },
    "mark-i-reactor": {
        "picture": "mark_1.png",
        "picture_flip_x": false,
        "picture_flip_y": false,
        "type": "engine",
        "shape": "square",
        "size": "small",
        "scores": {
            "fighter": 40,
            "bomber": 35,
            "freighter": 20
        },
        "ship_stats": {
            "speed": 115
        },
        "stats": {},
        "price": [
            {
                "type": "points",
                "amount": 3
            },
            {
                "type": "credits",
                "amount": 80
            },
            {
                "type": "resource",
                "resource": "resources.b",
                "amount": 60
            },
            {
                "type": "resource",
                "resource": "resources.a",
                "amount": 40
            }
        ]
    },
    "laser-turret-meirrion": {
        "picture": "laser_01.png",
        "picture_flip_x": true,
        "picture_flip_y": false,
        "type": "weapon",
        "shape": "circle",
        "size": "small",
        "scores": {
            "fighter": 40,
            "bomber": 35,
            "freighter": 20
        },
        "stats": {
            "nb_shots": 4,
            "damage": 25,
            "precision": 60
        },
        "ship_stats": {},
        "price": [
            {
                "type": "points",
                "amount": 2
            },
            {
                "type": "credits",
                "amount": 40
            },
            {
                "type": "resource",
                "resource": "resources.e",
                "amount": 50
            }
        ]
    },
    "light-shield-generator": {
        "picture": "",
        "picture_flip_x": false,
        "picture_flip_y": false,
        "type": "shield",
        "shape": "rectangle",
        "size": "medium",
        "scores": {
            "fighter": 10,
            "bomber": 15,
            "freighter": 25,
            "corvette": 35,
            "frigate": 25
        },
        "ship_stats": {
            "power": 75
        },
        "stats": {},
        "price": [
            {
                "type": "points",
                "amount": 4
            },
            {
                "type": "credits",
                "amount": 100
            },
            {
                "type": "resource",
                "resource": "resources.a",
                "amount": 60
            },
            {
                "type": "resource",
                "resource": "resources.e",
                "amount": 50
            },
            {
                "type": "resource",
                "resource": "resources.f",
                "amount": 50
            }
        ]
    },
    "light-container": {
        "picture": "",
        "picture_flip_x": false,
        "picture_flip_y": false,
        "type": "cargo",
        "shape": "rectangle",
        "size": "medium",
        "scores": {
            "freighter": 60
        },
        "ship_stats": {
            "size": 500
        },
        "stats": {},
        "price": [
            {
                "type": "points",
                "amount": 1
            },
            {
                "type": "credits",
                "amount": 60
            }
        ]
    }
}
