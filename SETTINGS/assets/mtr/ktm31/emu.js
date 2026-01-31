importPackage(java.awt);
importPackage(java.awt.geom);
importPackage(java.lang.reflect);
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
                    [-0.294682, 1.92874, 9.21999],
                    [-0.294682, 1.72198, 9.21999],
                    [0.50704, 1.72198, 9.21999],
                    [0.50704, 1.92874, 9.21999],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
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
                    [-0.518658, 1.92874, 9.21999],	
                    [-0.518658, 1.72198, 9.21999],
                    [-0.294682, 1.72198, 9.21999],
                    [-0.294682, 1.92874, 9.21999],	    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0.001]],
        },
        {
            name: 'head-side-route',
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

// MID DEST AND ROUTE 

let slotMidDestCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
            name: 'mid-dest',
            texArea: [0, 0, 1024, 128],
            pos: [
                [
                    [-1.22899, 1.01583, 0.381292],
                    [-1.22899, 0.759508, 0.381292],
                    [-1.22899, 0.759507, 1.43901],
                    [-1.22899, 1.01583, 1.43901],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let slotMidRouteCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [512, 128],
    slots: [
        {
            name: 'mid-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-1.22899, 1.01583, 0.061473],
                    [-1.22899, 0.759508, 0.061473],
                    [-1.22899, 0.759508, 0.381292],
                    [-1.22899, 1.01583, 0.381292],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

// TAIL DEST AND ROUTE 


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
        offsets: [[0, 0, 0]],
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
        offsets: [[0, 0, 0]],
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
                    [-0.332368, 1.93918, -9.23074],
                    [-0.332368, 1.72128, -9.23074],
                    [-0.608485, 1.72128, -9.23074],
                    [-0.608485, 1.93918, -9.23074],    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
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
                    [-0.687988, 1.92874, 9.21999],
                    [-0.687988, 1.72198, 9.21999],
                    [-0.518658, 1.72198, 9.21999],
                    [-0.518658, 1.92874, 9.21999],	 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                    [0.50704, 1.92874, 9.21999],
                    [0.50704, 1.72198, 9.21999],
                    [0.675749, 1.72198, 9.21999],
                    [0.675749, 1.92874, 9.21999], 
                   
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};


let dhHeadBaseDest = new DisplayHelper(slotHeadDestCfg);
let dhHeadBaseRoute = new DisplayHelper(slotHeadRouteCfg);
let dhMidDest = new DisplayHelper(slotMidDestCfg);
let dhMidRoute = new DisplayHelper(slotMidRouteCfg);
let dhTailBaseDest = new DisplayHelper(slotTailDestCfg);
let dhTailBaseRoute = new DisplayHelper(slotTailRouteCfg);
let dhHeadSofitBase = new DisplayHelper(slotHeadSofitCfg);

function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dhHeadDest = dhHeadBaseDest.create();
    state.dhHeadRoute = dhHeadBaseRoute.create();
    state.dhMidDest = dhMidDest.create();
    state.dhMidRoute = dhMidRoute.create();
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
    if (state.dhMidDest) state.dhMidDest.close();
    if (state.dhMidRoute) state.dhMidRoute.close();
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
            { dh: state.dhMidDest, graphicsName: 'mid-dest', text: EMUText },
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
            { dh: state.dhMidRoute, graphicsName: 'mid-route', text: EMURouteText },
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
    ctx.drawCarModel(state.dhMidRoute.model, train.trainCars() - 2, null);
    ctx.drawCarModel(state.dhMidDest.model, train.trainCars() - 2, null);
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
