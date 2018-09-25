export default {
    "fighter": {
        "picture": "chasseur.png",
        "picto": "chasseur_64px.png",
        "slots": [
            {
                "position": 1,
                "top": 25,
                "left": 10,
                "shape": "square",
                "size": "small"
            },
            {
                "position": 2,
                "bottom": 25,
                "right": 10,
                "shape": "square",
                "size": "medium"
            },
            {
                "position": 3,
                "bottom": 25,
                "right": 15,
                "shape": "square",
                "size": "small"
            }
        ],
        "stats": {
            "armor": 45
        },
        "price": [
            {
                "type": "points",
                "amount": 3
            },
            {
                "type": "credits",
                "amount": 125
            }
        ]
    },
    "bomber": {
        "picture": "bombardier.png",
        "picto": "bombardier_64px.png",
        "slots": [
            {
                "position": 1,
                "top": 20,
                "left": 1,
                "shape": "square",
                "size": "small"
            },
            {
                "position": 2,
                "top": 65,
                "right": 16,
                "shape": "circle",
                "size": "small"
            },
            {
                "position": 3,
                "top": 60,
                "left": 1,
                "shape": "square",
                "size": "medium"
            }
        ],
        "stats": {
            "armor": 60
        },
        "price": [
            {
                "type": "points",
                "amount": 5
            },
            {
                "type": "credits",
                "amount": 200
            }
        ]
    },
}
