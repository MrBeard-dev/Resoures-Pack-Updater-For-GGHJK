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
                    [-0.380895, 1.71896, 3.6885],	
                    [-0.380895, 1.48539, 3.78443],
                    [0.751095, 1.48397, 3.78443],
                    [0.751095, 1.71896, 3.6885],	// Правый Верхний Угол XYZ
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
                    [0, 0, 0],	// Правый Верхний Угол XYZ
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
                    [-0.745881, 1.71896, 3.6885],
                    [-0.745881, 1.48539, 3.78443],
                    [-0.380895, 1.48539, 3.78443],
                    [-0.380895, 1.71896, 3.6885],	    // Правый Верхний Угол XYZ
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
                    [0, 0, 0],  // Правый Верхний Угол XYZ
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
                [0.364772, 1.71914, -3.77049],
                [0.364772, 1.48539, -3.86647],
                [-0.779887, 1.48539, -3.86647],
                [-0.779887, 1.71914, -3.77049],
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
                    [0.709546, 1.71914, -3.77049],
                    [0.709546, 1.48539, -3.86647],
                    [0.364772, 1.48539, -3.86647],
                    [0.364772, 1.71914, -3.77049],	   // Правый Верхний Угол XYZ
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

let dhHeadBaseDest = new DisplayHelper(slotHeadDestCfg);
let dhHeadBaseRoute = new DisplayHelper(slotHeadRouteCfg);
let dhTailBaseDest = new DisplayHelper(slotTailDestCfg);
let dhTailBaseRoute = new DisplayHelper(slotTailRouteCfg);


function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dhHeadDest = dhHeadBaseDest.create();
    state.dhHeadRoute = dhHeadBaseRoute.create();
    state.dhTailDest = dhTailBaseDest.create();
    state.dhTailRoute = dhTailBaseRoute.create(); // ← Добавь эту строку

    state.routeIDmath = getRouteNum(train);
    return (state.routeID = state.routeIDmath);
}



function dispose(ctx, state, train) {
    if (state.dhHeadDest) state.dhHeadDest.close();
    if (state.dhHeadRoute) state.dhHeadRoute.close();
    if (state.dhTailDest) state.dhTailDest.close();
    if (state.dhTailRoute) state.dhTailRoute.close(); // ← Уже есть, но убедись
}
var EMUFont = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/buse.otf')
);



function render(ctx, state, train) {  


    if (state.pisRateLimit.shouldUpdate()) {

        
        let g;

        // Default Messages for No Service
        const defaultDestMessage = "Tram is going to the depot. Not in service. Трамвай следует в депо. Посадки нет.";
        const defaultRouteMessage = "--";

        let EMUText = getDestinationStation(train) || defaultDestMessage;  // Get destination or default message
        let EMURouteText = getRouteNum(train) || defaultRouteMessage;      // Get route or default

        state.routeScrollPos = (state.routeScrollPos || 0) + 15; // Increment scroll position
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
    ctx.drawCarModel(state.dhTailDest.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhTailRoute.model, train.trainCars() - 1, null);
}

// Helper function to render scrolling text
function renderScrollingText(dh, graphicsName, text, scrollPos, maxScrollWidth, texWidth, texHeight) {
    let g = dh.graphicsFor(graphicsName);
    g.setColor(Color.BLACK);
    g.setComposite(AlphaComposite.Clear);
    g.fillRect(0, 0, texWidth, texHeight);
    g.setComposite(AlphaComposite.SrcOver);
    g.setColor(Color.GREEN);
            
    // Разные размеры шрифта для маршрута и бегущей строки
    let fontSize = (graphicsName.includes('route')) ? 100 : 80;
    g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
    let fontMetrics = g.getFontMetrics();
    let textWidth = fontMetrics.stringWidth(text);

    // Обработка маршрута (статичный текст)
    if (graphicsName.includes('route')) {
        // Всегда центрируем, даже если текст не помещается (обрезаем)
        let xPosition = Math.max(0, (texWidth - textWidth) / 2); // Не уходим в отрицательные значения
        g.drawString(text, xPosition, 115); // Y = 100 для маршрута
    } 
    // Обработка бегущей строки (скроллинг)
    else {
        if (textWidth > texWidth) {
            scrollPos = scrollPos % (textWidth + texWidth);
            g.drawString(text, texWidth - scrollPos, 110); // Y = 110 для destination
        } else {
            let xPosition = (texWidth - textWidth) / 2;
            g.drawString(text, xPosition, 110);
        }
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
