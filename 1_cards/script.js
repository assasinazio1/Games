const game = {
    height: 198 * .6,
    width: 320 * .6,
    matrix: 4,
    firstCard: null,
    cards: [],
    getCardById: (cards, cardId) => {
        let card = null;
        cards.map(c => {
           if (c.id === cardId) {
                card = c;
            }
        });
        return card;
    }
}

game.cards = generateCards(game.matrix);

function generateCards(matrix) {
    const cards = [];
    const countCards = (matrix * matrix) / 2;

    for (let i = 0; i < countCards; i++) {
        const e = {
            color: randomColorRGB(),
            isShow: false,
        };
        
        cards.push(e)
    }

    const oldArray = [...cards, ...cards];
    const newArray = [];
    


    for (let i = 0; i < oldArray.length; i++) {
        const oldE = oldArray[i];
        const newE = {
            id: i,
            color: oldE.color,
            isShow: false,
        };
        newArray.push(newE);
    }

    for (let i = 0; i < 64; i++) {
        newArray.sort(()=>Math.random()-0.5);
    }

    return newArray;
}

function randomColorRGB() {
    let colorString = 
    'rgb(' + randomNumber(0,255) +
    ',' + randomNumber(0,255) +
    ',' + randomNumber(0,255) +
    ')';

    return colorString;
}

function randomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

$(document).ready(function () {

    $("#root").html("<div class='matrix'></div>");
    $(".matrix").width((game.width + 24) * game.matrix).height((game.height + 24) * game.matrix);

    for (let i = 0; i < game.cards.length; i++) {
        $(".matrix").append("<div id='cube_" + i + "'class ='cube'> </div>");
        $("#cube_" + i).css ({
            "width": game.width,
             "height": game.height
        });
    }

    for (let i = 0; i < game.cards.length; i++) {
        const e = game.cards[i];
        $("#cube_" + i).click(function () {
            const id = $("#cube_" + i).attr('id');

            $("#cube_" + i).css({
                "background-color": e.color
            });
            console.log(Number(id.replace('cube_', '')));

            const card = 
                game.getCardById(
                    game.cards, 
                    Number(id.replace('cube_', ''))
                );

            if (!game.firstCard) {
                game.firstCard = card;
                console.log(game.firstCard);
            } else if (!!game.firstCard) {
                if (game.firstCard.color === card.color) {
                    //Есть совпадение.
                } else {
                    //Нет совпадения.
                    setTimeout(() => {
                        hideCard(game.firstCard.id);
                        hideCard(card.id);
                        game.firstCard = null;
                    }, 500);
                }
            }
        });
    }


    function hideCard(cardId) {
        $("#cube_" + cardId).css ({
           "background-color": '1A1A1A'
        });
    }
});