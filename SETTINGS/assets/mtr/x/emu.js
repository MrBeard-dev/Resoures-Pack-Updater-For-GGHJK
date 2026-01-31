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
                    [-0.436846, 2.75033, 4.44571],
                    [-0.436846, 2.51382, 4.44571],
                    [0.431706, 2.51382, 4.44571],
                    [0.431706, 2.75033, 4.44571],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                [0, 0, 0],		// Левый Верхний Угол XYZ
                [0, 0, 0],		// Левый Нижний Угол XYZ
                [0, 0, 0],  // Правый Нижний Угол XYZ
                [0, 0, 0],  // Правый Верхний Угол XYZ
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
            texArea:  [0, 0, 256, 128],  
            pos: [
                [
                    [-0.153181,  2.96374, 4.44571],		// Левый Верхний Угол XYZ
                    [-0.153181, 2.72722, 4.44571],		// Левый Нижний Угол XYZ
                    [0.12117, 2.72722, 4.44571],    // Правый Нижний Угол XYZ
                    [0.12117, 2.96374, 4.44571],	    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [0, 0, 0],		// Левый Верхний Угол XYZ
                    [0, 0, 0],		// Левый Нижний Угол XYZ
                    [0, 0, 0],  // Правый Нижний Угол XYZ
                    [0, 0, 0],  // Правый Верхний Угол XYZ
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
                  [0.431704, 2.74863, -4.44387],
                  [0.431704, 2.51211, -4.44387],
                  [-0.433861, 2.51211, -4.44387],
                  [-0.433861, 2.74863, -4.44387],     // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },  
        {
          name: 'tail-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                [0, 0, 0],		// Левый Верхний Угол XYZ
                [0, 0, 0],		// Левый Нижний Угол XYZ
                [0, 0, 0],  // Правый Нижний Угол XYZ
                [0, 0, 0],  // Правый Верхний Угол XYZ
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
                  [0.146778, 2.96374, -4.44387],		// Левый Верхний Угол XYZ
                  [0.146778, 2.72722, -4.44387],		// Левый Нижний Угол XYZ
                  [-0.127572, 2.72722, -4.44387],
                  [-0.127572, 2.96374, -4.44387],
                ],  
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'tail-side-route',
          texArea: [0, 0, 256, 128],
          pos: [
              [
                [0, 0, 0],		// Левый Верхний Угол XYZ
                [0, 0, 0],		// Левый Нижний Угол XYZ
                [0, 0, 0],  // Правый Нижний Угол XYZ
                [0, 0, 0],  // Правый Верхний Угол XYZ
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
    Resources.idRelative('mtr:fonts/msk_trafaret.otf')
);
var RouteFont = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/vintage.ttf')
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
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 1024, 128); // Площадь заливки заднего фона
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.BLACK);

            let fontSize = 120;  // Начальный размер шрифта
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
                if (textWidth > 1024 || textHeight > 115) {
                    fontSize -= 10;  // Уменьшаем размер шрифта
                } else {
                    break;
                }
            } while (fontSize > 50); // Ограничиваем минимальный размер шрифта

            // Отображаем текст конечной станции
            g.drawString(EMUText, (1024 - textWidth) / 2, 98);

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
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 256, 128); // Площадь заливки заднего фона
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.BLACK);

            let fontSize = 150;  // Начальный размер шрифта для маршрута
            let fontMetrics;
            let textWidth;
            let textHeight;
            
            // Проверка текста на длину и уменьшение шрифта
            do {
                g.setFont(RouteFont.deriveFont(Font.PLAIN, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(EMURouteText);
                textHeight = fontMetrics.getHeight();
                
                // Если текст выходит за пределы области, уменьшаем шрифт
                if (textWidth > 256 || textHeight > 300) {
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