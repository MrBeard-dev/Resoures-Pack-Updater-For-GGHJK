importPackage(java.awt);
importPackage(java.awt.geom);
include(Resources.id('mtrsteamloco:scripts/display_helper.js'));

let slotHeadDestCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
            name: 'head-dest',
            texArea: [0, 0, 1024, 128],
            pos: [
                [
                    [-0.179964, 1.76603, 7.11626],	
                    [-0.179964, 1.55833, 7.11626],
                    [0.474155, 1.55833, 7.11626],
                    [0.474155, 1.76603, 7.11626],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                [-1.17487, 0.865165, 3.68397],
                [-1.17487, 0.651355, 3.68397],
                [-1.17487, 0.651355, 4.73812],
                [-1.17487, 0.865165, 4.73812],	// Правый Верхний Угол XYZ
              ],    
          ],
          offsets: [[-0.026, 0, 0]],
      },
    ],
};

let slotHeadRouteCfg = {							// ЭМУ МАРШРУТ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [256, 128],
    slots: [
        {
            name: 'head-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-0.456116, 1.76603, 7.11626],
                    [-0.456116, 1.55833, 7.11626],
                    [-0.179964, 1.55833, 7.11626],
                    [-0.179964, 1.76603, 7.11626],	    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0.001]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [-1.17487, 0.865165, 3.44877],
                    [-1.17487, 0.651355, 3.44877],
                    [-1.17487, 0.651355, 3.68397],
                    [-1.17487, 0.865165, 3.68397],  // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[-0.0264, 0, 0]],
        },
    ],
};

let slotTailDestCfg = {							    // ЭМУ ОСНОВНОЙ ХВОСТОВОЙ (КРАСНЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
            name: 'tail-dest',
            texArea: [0, 0, 1024, 128],
            pos: [
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'tail-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
              ],    
          ],
          offsets: [[-0.026, 0, 1.73]],
      },
      {
        name: 'tail-another-side-dest',
        texArea: [0, 0, 1024, 128],
        pos: [
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ],    
        ],
        offsets: [[0.026, 0, 0]],
    },
    ],
};

let slotTailRouteCfg = {						    // ЭМУ МАРШРУТ ХВОСТОВОЙ (КРАСНЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [256, 128],
    slots: [
        {
            name: 'tail-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-0.315775, 1.75345, -7.48966],
                    [-0.315775, 1.54785, -7.48966],
                    [-0.579018, 1.54785, -7.48966],
                    [-0.579018, 1.75345, -7.48966],    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, -0.001]],
        },
        {
            name: 'tail-side-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
            ],
            offsets: [[-0.0264, 0, 1.73]],
        },
        {
            name: 'tail-another-side-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [    
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                ],
            ],
            offsets: [[0.0264, 0, 0]],
        },
        {
            name: 'tail-alone-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],  
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let slotHeadSofitCfg = {							// ЭМУ МАРШРУТ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [512, 128],
    slots: [
        {
            name: 'left-sofit',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-0.664163, 1.76603, 7.11626],
                    [-0.664163, 1.55833, 7.11626],
                    [-0.456465, 1.55833, 7.11626],
                    [-0.456465, 1.76603, 7.11626],	 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                    [0.47377, 1.76603, 7.11626],
                    [0.47377, 1.55833, 7.11626],
                    [0.681468, 1.55833, 7.11626],
                    [0.681468, 1.76603, 7.11626], 
                   
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let dhHeadBaseDest = new DisplayHelper(slotHeadDestCfg);
let dhHeadBaseRoute = new DisplayHelper(slotHeadRouteCfg);
let dhTailBaseDest = new DisplayHelper(slotTailDestCfg);
let dhTailBaseRoute = new DisplayHelper(slotTailRouteCfg);
let dhHeadSofitBase = new DisplayHelper(slotHeadSofitCfg);

function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dhHeadDest = dhHeadBaseDest.create();
    state.dhHeadRoute = dhHeadBaseRoute.create();
    state.dhTailDest = dhTailBaseDest.create();
    state.dhTailRoute = dhTailBaseRoute.create();
    state.dhHeadSofit = dhHeadSofitBase.create();

    // Получаем номер маршрута через getRouteNum
    state.routeIDmath = getRouteNum(train);
    return (state.routeID = state.routeIDmath);
}



function dispose(ctx, state, train) {                                       // В душе не ебу что это но это важно | p.s от марата: в душе не ебу почему эти в некоторые моменты бывают undefined, но я сделал проверку 
    if (state.dhHeadRoute) state.dhHeadDest.close();
    if (state.dhHeadRoute) state.dhHeadRoute.close();
    if (state.dhTailDest) state.dhTailDest.close();
    if (state.dhTailRoute) state.dhTailRoute.close();
    if (state.dhHeadSofit) state.dhHeadSofit.close();
}
var EMUFont = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/cat-arena.ttf')
);


function renderSofitTextFill(ctx, state, train) {
    let sofitSlots = [
        { dh: state.dhHeadSofit, graphicsName: 'left-sofit' },
        { dh: state.dhHeadSofit, graphicsName: 'right-sofit' }
    ];

    sofitSlots.forEach((slot) => {
        let g = slot.dh.graphicsFor(slot.graphicsName);
        if (!g) return;

        g.setColor(Color.BLACK);  // Задаем черный фон
        g.fillRect(0, 0, 256, 128);

        let color = Color.RED;

        if (slot.graphicsName == 'left-sofit') {
            color = getRouteColor(train);
        } else {
            color = getRightColor(train);
        }


        g.setColor(new Color(color.r / 255, color.g / 255, color.b / 255));   // Устанавливаем индивидуальный цвет для софита
        let text = "....................."; // Текст для отображения

        // Фиксированный размер шрифта
        let fontSize = 48;  // Установите желаемый размер шрифта
        g.setFont(EMUFont.deriveFont(Font.BOLD, fontSize));

        let fontMetrics = g.getFontMetrics();
        let textHeight = fontMetrics.getAscent(); // Высота текста
        let charWidth = fontMetrics.charWidth('.'); // Ширина одного символа (в данном случае точки)

        
       

        // Центрируем текст по горизонтали
        let startX = (256 - fontMetrics.stringWidth(text)) / 2;

        // Отрисовываем текст несколько раз по вертикали
        let yPos = 0;  // Начальная позиция Y
        while (yPos <= 128) {  // Пока не выйдем за пределы высоты области
            g.drawString(text, startX, yPos);
            yPos += charWidth; // Используем ширину символа как вертикальный интервал
        }

        slot.dh.upload();
    });
}



function render(ctx, state, train) {  


    if (state.pisRateLimit.shouldUpdate()) {

        renderSofitTextFill(ctx, state, train);
        let g;

        // Default Messages for No Service
        const defaultDestMessage = "Tram is going to the depot. Not in service. Трамвай следует в депо. Посадки нет.";
        const defaultRouteMessage = "--";

        let EMUText = getDestinationStation(train) || defaultDestMessage;  // Get destination or default message
        let EMURouteText = getRouteNum(train) || defaultRouteMessage;      // Get route or default

        state.routeScrollPos = (state.routeScrollPos || 0) + 30; // Increment scroll position
        const maxScrollWidth = 1024; // Adjust based on display width

        // Destination Display Rendering
        [
            { dh: state.dhHeadDest, graphicsName: 'head-dest', text: EMUText },
            { dh: state.dhHeadDest, graphicsName: 'head-side-dest', text: EMUText },
            { dh: state.dhTailDest, graphicsName: 'tail-dest', text: EMUText },
            { dh: state.dhTailDest, graphicsName: 'tail-side-dest', text: EMUText },
        ].forEach((element) => {
            renderScrollingText(
                element.dh,
                element.graphicsName,
                element.text,
                state.routeScrollPos,
                maxScrollWidth,
                1024,
                128
            );
        });

        // Route Display Rendering
        [
            { dh: state.dhHeadRoute, graphicsName: 'head-route', text: EMURouteText },
            { dh: state.dhHeadRoute, graphicsName: 'head-side-route', text: EMURouteText },
            { dh: state.dhTailRoute, graphicsName: 'tail-route', text: EMURouteText },
            { dh: state.dhTailRoute, graphicsName: 'tail-side-route', text: EMURouteText },
        ].forEach((element) => {
            renderScrollingText(
                element.dh,
                element.graphicsName,
                element.text,
                state.routeScrollPos,
                maxScrollWidth,
                256,
                128
            );
        });
    }

    // Draw models
    ctx.drawCarModel(state.dhHeadDest.model, 0, null);
    ctx.drawCarModel(state.dhHeadRoute.model, 0, null);
    ctx.drawCarModel(state.dhHeadSofit.model, 0, null);
    ctx.drawCarModel(state.dhTailDest.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhTailRoute.model, train.trainCars() - 1, null);
}

// Helper function to render scrolling text
function renderScrollingText(dh, graphicsName, text, scrollPos, maxScrollWidth, texWidth, texHeight) {
    let g = dh.graphicsFor(graphicsName);
    g.setColor(Color.BLACK);
    g.fillRect(0, 0, texWidth, texHeight);
    g.setColor(Color.ORANGE);

    let fontSize = 140; // Initial font size
    g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
    let fontMetrics = g.getFontMetrics();
    let textWidth = fontMetrics.stringWidth(text);

    // Adjust scroll position
    if (textWidth > texWidth) {
        scrollPos = scrollPos % (textWidth + texWidth);
        g.drawString(text, texWidth - scrollPos, 110);
    } else {
        // Center the text if it fits within the bounds
        let xPosition = (texWidth - textWidth) / 2;
        g.drawString(text, xPosition, 110);
    }

    dh.upload();
}

// Adjust getRouteNum for default behavior
function getRouteNum(train) {
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) {
        return "--";
    }
    return stationList[0].route.lightRailRouteNumber.toString();
}

// Функция для получения конечной станции
function getEndStation(train) {
    let stationList = train.getThisRoutePlatforms();
    let ret = "";
    ret = stationList[stationList.size() - 1].destinationName; // Исправлено на последнюю станцию
    return ret;
}

// Функция для получения первой станции
function getFirstStation(train) {
    let stationList = train.getThisRoutePlatforms();
    let station = stationList[0].station;

    let ret = station == null ? "ошибка эму" : station.name;
    return ret;
}

function getDestinationStation(train) {
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) {
        // Если станций нет, выводим сообщение по умолчанию
        return "Tram is going to the depot. Not in service. Трамвай следует в депо. Посадки нет.";
    }

    // Получаем первую и конечную станции
    let firstStation = getFirstStation(train);
    let endStation = getEndStation(train);

    // Возвращаем строку вида "Первая станция - Конечная станция"
    return `${firstStation}  -  ${endStation}`;
}

function getRouteColor(train) {
    let stationList = train.getThisRoutePlatforms();

    if (stationList == null || stationList == undefined) return decodeColor(0); 
    let ret = stationList[0].route.color;

    let retObj = decodeColor(ret)
    
    return retObj;
}

function getRightColor(train) {
    let stationList = train.getThisRoutePlatforms();

    if (stationList == null || stationList == undefined) return decodeColor(0); 
    let ret = stationList[0].destinationStation.color;
    return decodeColor(ret)
}

function decodeColor(color) {
    let r = (color >> 16) & 0xFF;  // Извлекаем старший байт для красного
    let g = (color >> 8) & 0xFF;   // Извлекаем средний байт для зеленого
    let b = color & 0xFF;          // Извлекаем младший байт для синего
    return { r, g, b };
}
