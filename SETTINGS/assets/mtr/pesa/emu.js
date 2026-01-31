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
                    [-0.4104, 2.24912, 3.82525],
                    [-0.4104, 1.95686, 3.89647],
                    [0.725182, 1.95686, 3.89647],
                    [0.725182, 2.24912, 3.82525],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.18476, 1.65685, -0.982702],
                  [-1.18476, 1.38414, -0.982702],
                  [-1.18476, 1.38414, -0.070706],
                  [-1.18476, 1.65685, -0.070706],	// Правый Верхний Угол XYZ
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
                    [-0.726367,  2.24912, 3.82525],		// Левый Верхний Угол XYZ
                    [-0.726367, 1.95686, 3.89647],		// Левый Нижний Угол XYZ
                    [-0.4104, 1.95686, 3.89647],   // Правый Нижний Угол XYZ
                    [-0.4104, 2.24912, 3.82525],	    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-1.18476, 1.65685, -1.30959],		// Левый Верхний Угол XYZ
                    [-1.18476, 1.38414, -1.30959],		// Левый Нижний Угол XYZ
                    [-1.18476, 1.38414, -0.982702],  // Правый Нижний Угол XYZ
                    [-1.18476, 1.65685, -0.982702],  // Правый Верхний Угол XYZ
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
          name: 'tail-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.18385, 1.67122, 0.384479],
                  [-1.18385, 1.39603, 0.384479],
                  [-1.18385, 1.39603, 1.32258],
                  [-1.18385, 1.67122, 1.32258],	// Правый Верхний Угол XYZ
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
                  [0.302102, 2.31036, -3.917],		// Левый Верхний Угол XYZ
                  [0.302102, 1.90472, -3.917],		// Левый Нижний Угол XYZ
                  [-0.302102, 1.90472, -3.917],
                  [-0.302102, 2.31036 , -3.917],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'tail-side-route',
          texArea: [0, 0, 256, 128],
          pos: [
              [
                  [-1.18385, 1.67122, 0.082581],
                  [-1.18385, 1.39603, 0.082581],
                  [-1.18385, 1.39603, 0.384479],
                  [-1.18385, 1.67122, 0.384479],
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
    Resources.idRelative('mtr:fonts/cat-arena.ttf')
);

function render(ctx, state, train) {  // Рендер ЭМУ
    if (state.pisRateLimit.shouldUpdate()) {
        let g;

        state.routeID = getRouteNum(train); 

        let EMUText = getDestinationStation(train);  // Конечная станция
        let EMURouteText = state.routeID;  // Номер маршрута

        // Вывод конечной станции на ЭМУ
        [
            { dh: state.dhHeadDest, graphicsName: 'head-dest', text: EMUText },
            { dh: state.dhHeadDest, graphicsName: 'head-side-dest', text: EMUText },
            { dh: state.dhTailDest, graphicsName: 'tail-side-dest', text: EMUText },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.BLACK);
            g.fillRect(0, 0, 1024, 128); // Площадь заливки заднего фона
            g.setColor(Color.ORANGE);

            let fontSize = 140;  // Начальный размер шрифта
            g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
            let fontMetrics = g.getFontMetrics();

            // Проверка текста на длину и уменьшение шрифта
            let textWidth = fontMetrics.stringWidth(EMUText);
            let textHeight = fontMetrics.getHeight();
            while (textWidth > 1024 && fontSize > 50) {
                fontSize -= 10;
                g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(EMUText);
                textHeight = fontMetrics.getHeight();
            }

            // Центрирование текста по вертикали
            let areaHeight = 128; // Высота области
            let y = (areaHeight + textHeight) / 2 - fontMetrics.getDescent();

            // Отображаем текст конечной станции
            g.drawString(EMUText, (1024 - textWidth) / 2, y);

            dh.upload();
        });

        // Вывод номера маршрута на ЭМУ (фиксированное положение)
        [
            { dh: state.dhHeadRoute, graphicsName: 'head-route', text: EMURouteText },
            { dh: state.dhHeadRoute, graphicsName: 'head-side-route', text: EMURouteText },
            { dh: state.dhTailRoute, graphicsName: 'tail-route', text: EMURouteText },
            { dh: state.dhTailRoute, graphicsName: 'tail-side-route', text: EMURouteText },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.BLACK);
            g.fillRect(0, 0, 256, 128); // Площадь заливки заднего фона
            g.setColor(Color.ORANGE);

            let fontSize = 130;  // Размер шрифта для номера маршрута
            g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
            let fontMetrics = g.getFontMetrics();

            let textWidth = fontMetrics.stringWidth(EMURouteText);
            let textHeight = fontMetrics.getHeight();

            // Центрирование текста по вертикали
            let areaHeight = 128; // Высота области
            let y = (areaHeight + textHeight) / 2 - fontMetrics.getDescent();

            if (textWidth > 256) {
                state.routeScrollPos = (state.routeScrollPos || 0) + 5;  // Прокрутка текста
                if (state.routeScrollPos > textWidth + 256) {
                    state.routeScrollPos = 0;  // Сброс прокрутки
                }
                g.drawString(EMURouteText, 256 - state.routeScrollPos, y);
            } else {
                g.drawString(EMURouteText, (256 - textWidth) / 2, y);  // Фиксированное положение
            }

            dh.upload();
        });
    }

    ctx.drawCarModel(state.dhHeadDest.model, 0, null);
    ctx.drawCarModel(state.dhHeadRoute.model, 0, null);
    ctx.drawCarModel(state.dhTailDest.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhTailRoute.model, train.trainCars() - 1, null);
}


function getRouteNum(train) {
    let stationList = train.getThisRoutePlatforms();
    if (stationList.size() === 0) {
        return "--"; // Если маршрута нет, возвращаем placeholder
    }
    return stationList[0].route.lightRailRouteNumber.toString();
}

function getDestinationStation(train) {                                     // Получение данных о конечной станции
    let stationList = train.getThisRoutePlatforms();
    let lastPlatform = stationList[stationList.size() - 1];
    if (lastPlatform === undefined) return 'Not in service';					    // Выводимая на ЭМУ надпись в отсутствии конечной станции (При возврате/в Депо)
    return lastPlatform.destinationName.split('\\|')[0];
}