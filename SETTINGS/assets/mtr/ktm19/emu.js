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
                    [-0.41613, 2.12023, 7.07732],	
                    [-0.41613, 1.92605, 7.07732],
                    [0.691179, 1.92605, 7.07732],
                    [0.691179, 2.12023, 7.07732],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.23094, 1.90774, -0.395829],
                  [-1.23094, 1.72832, -0.395829],  
                  [-1.23094, 1.72832, 0.646246],
                  [-1.23094, 1.90774, 0.646246],	// Правый Верхний Угол XYZ
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
                    [-0.691338,  2.12023, 7.07732],		// Левый Верхний Угол XYZ
                    [-0.691338, 1.92605, 7.07732],		// Левый Нижний Угол XYZ
                    [-0.41613, 1.92605, 7.07732],    // Правый Нижний Угол XYZ
                    [-0.41613, 2.12023, 7.07732],		    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-1.23094, 1.90774, -0.646216],		// Левый Верхний Угол XYZ
                    [-1.23094, 1.72832, -0.646216],		// Левый Нижний Угол XYZ
                    [-1.23094, 1.72832, -0.395829],  // Правый Нижний Угол XYZ
                    [-1.23094, 1.90774, -0.395829],  // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
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
                    [0.416045, 2.12082, -7.18405],
                    [0.416045, 1.92658, -7.18405],
                  [-0.690958, 1.92658, -7.18405],
                  [-0.690958, 2.12082, -7.18405],     // Правый Верхний Угол XYZ
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
                  [0, 0, 0],	// Правый Верхний Угол XYZ
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
                  [0.691158, 2.12082, -7.18405],		// Левый Верхний Угол XYZ
                  [0.691158, 1.92658, -7.18405],		// Левый Нижний Угол XYZ
                  [0.416045, 1.92658, -7.18405],
                  [0.416045, 2.12082, -7.18405],
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
    state.dhTailRoute = dhTailBaseRoute.create();

    // Получаем номер маршрута через getRouteNum
    state.routeIDmath = getRouteNum(train);
    return (state.routeID = state.routeIDmath);
}



function dispose(ctx, state, train) {                                       // В душе не ебу что это но это важно
    state.dhHeadDest.close();
    state.dhHeadRoute.close();
    state.dhTailDest.close();
    state.dhTailRoute.close();
}
var EMUFont = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/7x7.otf')
);
var EMUNum = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/7x11num.otf')
);
function render(ctx, state, train) {  
    if (state.pisRateLimit.shouldUpdate()) {
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
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.BLACK);
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 256, 128); // Площадь заливки заднего фона
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.ORANGE);

            let fontSize = 70;  // Начальный размер шрифта для маршрута
            let fontMetrics;
            let textWidth;
            let textHeight;
            
            // Проверка текста на длину и уменьшение шрифта
            do {
                g.setFont(EMUNum.deriveFont(Font.PLAIN, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(EMURouteText);
                textHeight = fontMetrics.getHeight();
                
                // Если текст выходит за пределы области, уменьшаем шрифт
                if (textWidth > 256 || textHeight > 128) {
                    fontSize -= 10;  // Уменьшаем размер шрифта
                } else {
                    break;
                }
            } while (fontSize > 50); // Ограничиваем минимальный размер шрифта

            // Если текст выходит за пределы, делаем бегущую строку
            if (textWidth > 256) {
                state.routeScrollPos = (state.routeScrollPos || 0) + 5; // Смещение текста
                if (state.routeScrollPos > textWidth + 256) {
                    state.routeScrollPos = 0;  // Сброс, если текст полностью прокручен
                }
                g.drawString(EMURouteText, 256 - state.routeScrollPos);  // Рисуем текст с прокруткой
            } else {
                // Отображаем номер маршрута на месте
                g.drawString(EMURouteText, (256 - textWidth) / 2, 115);  // Фиксированное положение
            }

            dh.upload();
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
    g.setColor(Color.ORANGE);

    let fontSize = 70; // Initial font size
    g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
    let fontMetrics = g.getFontMetrics();
    let textWidth = fontMetrics.stringWidth(text);

    // Adjust scroll position
    if (textWidth > texWidth) {
        scrollPos = scrollPos % (textWidth + texWidth);
        g.drawString(text, texWidth - scrollPos, 120);
    } else {
        // Center the text if it fits within the bounds
        let xPosition = (texWidth - textWidth) / 2;
        g.drawString(text, (256 - textWidth) / 2, 130);
    }

    dh.upload();
}

// Adjust getRouteNum for default behavior
function getRouteNum(train) {
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) {
        return "00";
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


