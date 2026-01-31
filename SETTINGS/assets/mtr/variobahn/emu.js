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
                    [-0.35629, 1.97522, 3.56514],
                    [-0.35629, 1.72648, 3.56514],
                    [0.660132, 1.72648, 3.56514],
                    [0.660132, 1.97522, 3.56514],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.11191, 1.64851, -0.571643],
                  [-1.11191, 1.40796, -0.571643],
                  [-1.11191, 1.40796, 0.475178],
                  [-1.11191, 1.64851, 0.475178],	// Правый Верхний Угол XYZ
              ],
          ],
          offsets: [[0, 0.03, 0]],
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
                    [-0.660132,  1.97522, 3.56514],		// Левый Верхний Угол XYZ
                    [-0.660132, 1.72648, 3.56514],		// Левый Нижний Угол XYZ
                    [-0.35629, 1.72648, 3.56514],    // Правый Нижний Угол XYZ
                    [-0.35629, 1.97522, 3.56514],	    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-1.11191, 1.64851, -0.869223],		// Левый Верхний Угол XYZ
                    [-1.11191, 1.40796, -0.869223],		// Левый Нижний Угол XYZ
                    [-1.11191, 1.40796, -0.571643],  // Правый Нижний Угол XYZ
                    [-1.11191, 1.64851, -0.571643],  // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0.03, 0]],
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
                  [0.357173, 1.99299, -3.5345],
                  [0.357173, 1.74587, -3.5345],
                  [-0.660487, 1.74587, -3.5345],
                  [-0.660487, 1.99298, -3.5345],     // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, -0.01]],
        },
        {
          name: 'tail-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.11247, 1.6645, -0.119688],
                  [-1.11247, 1.42397, -0.119688],
                  [-1.11247, 1.42397, 0.90337],
                  [-1.11247, 1.6645, 0.90337],	// Правый Верхний Угол XYZ
              ],
          ],
          offsets: [[0, 0.03, 0]],
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
                  [0.666183, 1.99298, -3.5345],		// Левый Верхний Угол XYZ
                  [0.666183, 1.74587, -3.5345],		// Левый Нижний Угол XYZ
                  [0.357173, 1.74587, -3.5345],
                  [0.357173, 1.99299, -3.5345],
                ],
            ],
            offsets: [[0, 0, -0.05]],
        },
        {
          name: 'tail-side-route',
          texArea: [0, 0, 256, 128],
          pos: [
              [
                  [-1.11247, 1.6645, -0.446855],
                  [-1.11247, 1.42397, -0.446855 ],
                  [-1.11247, 1.42397, -0.119688],
                  [-1.11247, 1.6645, -0.119688],
              ],
          ],
          offsets: [[0, 0.03, 0]],
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

        let EMUText = getDestinationStation(train);  // Конечная станция
        let EMURouteText = state.routeID;  // Номер маршрута

        state.routeID = getRouteNum(train); 

        // Вывод конечной станции на ЭМУ
        [ 
            { dh: state.dhHeadDest, graphicsName: 'head-dest', text: EMUText },
            { dh: state.dhHeadDest, graphicsName: 'head-side-dest', text: EMUText },
            { dh: state.dhTailDest, graphicsName: 'tail-dest', text: EMUText },
            { dh: state.dhTailDest, graphicsName: 'tail-side-dest', text: EMUText },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.BLACK);
            g.fillRect(0, 0, 1024, 128); // Площадь заливки заднего фона
            g.setColor(Color.ORANGE);

            let fontSize = 140;  // Начальный размер шрифта
            let fontMetrics;
            let textWidth;
            let textHeight;

            // Проверка текста на длину и уменьшение шрифта
            do {
                g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(EMUText);
                textHeight = fontMetrics.getHeight();
                
                // Если текст выходит за пределы области, уменьшаем шрифт
                if (textWidth > 1024 || textHeight > 128) {
                    fontSize -= 10;  // Уменьшаем размер шрифта
                } else {
                    break;
                }
            } while (fontSize > 50); // Ограничиваем минимальный размер шрифта

            // Отображаем текст конечной станции
            g.drawString(EMUText, (1024 - textWidth) / 2, 115);

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

            let fontSize = 130;  // Начальный размер шрифта для маршрута
            let fontMetrics;
            let textWidth;
            let textHeight;
            
            // Проверка текста на длину и уменьшение шрифта
            do {
                g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
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