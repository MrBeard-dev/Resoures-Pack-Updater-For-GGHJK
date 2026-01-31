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
                    [-0.492258, 0.875849, 7.45209],	
                    [-0.491997, 0.701515, 7.46734],
                    [0.040762, 0.707821, 7.52773],
                    [0.040501, 0.882155, 7.51248],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.226, 1.01209, -0.187285],
                  [-1.226, 0.83814, -0.187285],
                  [-1.226, 0.83814, 0.347908],
                  [-1.226, 1.01209, 0.347908],	// Правый Верхний Угол XYZ
              ],    
          ],
          offsets: [[-0.0001, 0, 0]],
      },
      {
        name: 'head-another-side-dest',
        texArea: [0, 0, 1024, 128],
        pos: [
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],	// Правый Верхний Угол XYZ
            ],    
        ],
        offsets: [[0, 0, -1.785]],
    },
    ],
};

let slotHeadNumCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [300, 128],
    slots: [
        {
            name: 'head-num',
            texArea: [0, 0, 128, 100],
            pos: [
                [
                    [-0.345083, 1.9881, 7.23885],	
                    [-0.345083, 1.68385, 7.23885],
                    [-0.030083, 1.68385, 7.23885],
                    [-0.030083, 1.9881, 7.23885],	// Правый Верхний Угол XYZ
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
                    [-0.654965, 0.874192, 7.43334],
                    [-0.654705, 0.699858, 7.44859],		// Левый Нижний Угол XYZ
                    [-0.491997, 0.701515, 7.46734],    // Правый Нижний Угол XYZ
                    [-0.492258, 0.875849, 7.45209],	    // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [-1.226, 1.01209, -0.347908],
                    [-1.226, 0.83814, -0.347908],
                    [-1.226, 0.83814, -0.187285],
                    [-1.226, 1.01209, -0.187285], // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[-0.0001, 0, 0]],
        },
        {
            name: 'head-another-side-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],  // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, -1.785]],
        },
        {
            name: 'head-alone-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
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
                   
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0], 	// Правый Верхний Угол XYZ
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
          offsets: [[0, 0, 1.785]],
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
        offsets: [[0, 0, -0.01]],
    },
    ],
};


let slotTailNumCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [300, 128],
    slots: [
        {
            name: 'tail-num',
            texArea:  [0, 0, 128, 100],
            pos: [
                [
                    [-0.296154, 2.08059, -7.34817],	
                    [-0.296154, 1.77634, -7.34817],
                    [-0.611154, 1.77634, -7.34817],
                    [-0.611154, 2.08059, -7.34817],	// Правый Верхний Угол XYZ
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
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0],
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
            offsets: [[0, 0, 1.785]],
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
            offsets: [[0, 0, -0.01]],
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
                    [-0.659074, 2.00104, 7.21309],
                    [-0.659074, 1.83384, 7.21309],
                    [-0.373953, 1.83384, 7.21309],
                    [-0.373953, 2.00104, 7.21309],	 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                    [0.37225, 2.00104, 7.21309],
                    [0.37225, 1.83384, 7.21309],
                    [0.65737, 1.83384, 7.21309],
                    [0.65737, 2.00104, 7.21309],
                   
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};




let dhHeadBaseDest = new DisplayHelper(slotHeadDestCfg);
let dhHeadBaseRoute = new DisplayHelper(slotHeadRouteCfg);
let dhHeadBaseNum = new DisplayHelper(slotHeadNumCfg);
let dhTailBaseDest = new DisplayHelper(slotTailDestCfg);
let dhTailBaseRoute = new DisplayHelper(slotTailRouteCfg);
let dhTailBaseNum = new DisplayHelper(slotTailNumCfg);
let dhHeadSofitBase = new DisplayHelper(slotHeadSofitCfg);

function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dhHeadDest = dhHeadBaseDest.create();
    state.dhHeadRoute = dhHeadBaseRoute.create();
    state.dhHeadNum = dhHeadBaseNum.create();
    state.dhTailDest = dhTailBaseDest.create();
    state.dhTailRoute = dhTailBaseRoute.create();
    state.dhTailNum = dhTailBaseNum.create();
    state.dhHeadSofit = dhHeadSofitBase.create();

    // Получаем номер маршрута через getRouteNum
    state.routeIDmath = getRouteNum(train);
    return (state.routeID = state.routeIDmath);
}



function dispose(ctx, state, train) {                                       // В душе не ебу что это но это важно | p.s от марата: в душе не ебу почему эти в некоторые моменты бывают undefined, но я сделал проверку 
    if (state.dhHeadRoute) state.dhHeadDest.close();
    if (state.dhHeadRoute) state.dhHeadRoute.close();
    if (state.dhHeadNum) state.dhHeadNum.close();
    if (state.dhTailDest) state.dhTailDest.close();
    if (state.dhTailRoute) state.dhTailRoute.close();
    if (state.dhTailNum) state.dhTailNum.close();
    if (state.dhHeadSofit) state.dhHeadSofit.close();
}
var EMUFont = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/msk_trafaret.otf')
);

var EMUNum = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/num-a.otf')
);

var ELNum = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/el-num.ttf')
);


function renderSofitTextFill(ctx, state, train) {
    let sofitSlots = [
        { dh: state.dhHeadSofit, graphicsName: 'left-sofit' },
        { dh: state.dhHeadSofit, graphicsName: 'right-sofit' },
    ];

    sofitSlots.forEach((slot) => {
        let g = slot.dh.graphicsFor(slot.graphicsName);
        if (!g) return;

        g.setColor(Color.BLACK);  // Задаем черный фон
        g.setComposite(AlphaComposite.Clear);
        g.fillRect(0, 0, 256, 128);
        g.setComposite(AlphaComposite.SrcOver);

        let color = Color.RED;

        if (slot.graphicsName == 'left-sofit') {
            color = getRouteColor(train);
        } else {
            color = getRightColor(train);
        }

        g.setColor(new Color(color.r / 255, color.g / 255, color.b / 255));   // Устанавливаем индивидуальный цвет для софита
        let text = ".........................................."; // Текст для отображения

        // Фиксированный размер шрифта
        let fontSize = 48;  // Установите желаемый размер шрифта
        g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));

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


        let firstStation = getFirstStation(train);
        let endStation = getEndStation(train);
        let EMURouteText = state.routeID;  // Номер маршрута

        state.routeID = getRouteNum(train); 

        
    
        // Вывод первой и конечной станции на ЭМУ
        [
            { dh: state.dhHeadDest, graphicsName: 'head-dest', line1: firstStation, line2: endStation },
            { dh: state.dhHeadDest, graphicsName: 'head-side-dest', line1: firstStation, line2: endStation },
            { dh: state.dhTailDest, graphicsName: 'tail-dest', line1: firstStation, line2: endStation },
            { dh: state.dhTailDest, graphicsName: 'tail-side-dest', line1: firstStation, line2: endStation },
        ].forEach((element) => {
            let dh = element.dh;
            let g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.BLACK);
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 1024, 128);
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.BLACK);
        
            let fontSize = 70; // Уменьшаем шрифт для двух строк
            let fontMetrics;
            let textWidth1, textWidth2;
            let textHeight;
        
            do {
                g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth1 = fontMetrics.stringWidth(element.line1);
                textWidth2 = fontMetrics.stringWidth(element.line2);
                textHeight = fontMetrics.getHeight() * 2; // Двойная высота для двух строк
        
                if (textWidth1 > 1024 || textWidth2 > 1024 || textHeight > 128) {
                    fontSize -= 5;
                } else {
                    break;
                }
            } while (fontSize > 40);
        
            // Рисуем первую станцию на первой строке
            g.drawString(element.line1, (1024 - textWidth1) / 2, 55);
            // Рисуем конечную станцию на второй строке
            g.drawString(element.line2, (1024 - textWidth2) / 2, 110);
        
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

            let fontSize = 130;  // Начальный размер шрифта для маршрута
            let fontMetrics;
            let textWidth;
            let textHeight;
            
            // Проверка текста на длину и уменьшение шрифта
            do {
                g.setFont(EMUNum.deriveFont(Font.BOLD, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(EMURouteText);
                textHeight = fontMetrics.getHeight();
                
                // Если текст выходит за пределы области, уменьшаем шрифт
                if (textWidth > 256 || textHeight > 150) {
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
                g.drawString(EMURouteText, (256 - textWidth) / 2, 105);  // Фиксированное положение
            }

            dh.upload();
        });

        [ 
            { dh: state.dhHeadNum, graphicsName: 'head-num', text: EMURouteText },
            { dh: state.dhTailNum, graphicsName: 'tail-num', text: EMURouteText },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.BLACK);
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 256, 128); // Площадь заливки заднего фона
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.WHITE);

            let fontSizeX = 120;  // Начальный размер шрифта для маршрута
            let fontSizeY = 120;  // Начальный размер шрифта для маршрута
            element.text = element.text.substring(0, 2); // Ограничение до двух символов  // Начальный размер шрифта по X
            let fontMetrics;
            let textWidth;
            let textHeight;
            
            // Проверка текста на длину и уменьшение шрифта
            do {
                g.setFont(ELNum.deriveFont(AffineTransform.getScaleInstance(1.08, 1.12)).deriveFont(Font.PLAIN, fontSizeX));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(element.text);
                textHeight = fontMetrics.getHeight();
                
                if (textWidth > 256 || textHeight > 300) {
                    fontSizeX -= 10;
                    fontSizeY -= 10;
                } else {
                    break;
                }
            } while (fontSizeX > 50);
            
            // Выравнивание по правому краю
            g.drawString(element.text, 256 - textWidth + -130, 90);
            
            dh.upload();
        });
    }

    // Draw models
    ctx.drawCarModel(state.dhHeadDest.model, 0, null);
    ctx.drawCarModel(state.dhHeadRoute.model, 0, null);
    ctx.drawCarModel(state.dhHeadNum.model, 0, null);
    ctx.drawCarModel(state.dhHeadSofit.model, 0, null);
    ctx.drawCarModel(state.dhTailDest.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhTailRoute.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhTailNum.model, train.trainCars() - 1, null);
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

function getFirstStation(train) {
    let stationList = train.getThisRoutePlatforms();
    if (stationList[0] == undefined) return "";
    let station = stationList[0].station;
    let customFirstSt = stationList[0].route.platformIds[0].customDestination + "";
  
    let regularFirstSt = station == null ? "" : station.name
    return customFirstSt == "" ? regularFirstSt : customFirstSt;
    
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


function updateEmuStrings(state, train) {
    if (train.getThisRoutePlatforms().size() != 0) {
        state.isOnRoute = true;
        state.emuStringUp = getFirstStation(train);
        state.emuStringDown = getEndStation(train);
        state.emuStringNum = getRouteNum(train);
    } else {
        state.isOnRoute = false;
    }
}


function drawEmu(state, train, g) {
    const fontSize = 100;
    const fontSizeSmall = 80;
    const fontSize2 = 130;
    const fontSize2Small = 100;
    const x = 435;
    const y1 = 60;   // Первая станция (верх)
    const y2 = 140;  // Конечная станция (низ)
    const yNum = 115;

    const xN = 970; // Номер маршрута

    if (state.isOnRoute) {
        let upStr = (state.emuStringUp + "").substring(0, 20);
        let downStr = (state.emuStringDown + "").substring(0, 20);
        let numStr = (state.emuStringNum + "").substring(0, 5);
        
        let isBig = upStr.length < 16;
        let isBig2 = downStr.length < 16;
        let isBigNum = numStr.length < 4;

        g.drawImage(img, 0, 0, null);
    
        g.setColor(Color.BLACK);

        // Отдельно рисуем первую станцию
        g.setFont(textFont.deriveFont(0, isBig ? fontSize : fontSizeSmall));
        drawStringCenter(g, upStr, x, y1);

        // Отдельно рисуем конечную станцию
        g.setFont(textFont.deriveFont(0, isBig2 ? fontSize : fontSizeSmall));
        drawStringCenter(g, downStr, x, y2);

        // Отдельно рисуем номер маршрута
        g.setFont(textFont.deriveFont(0, isBigNum ? fontSize2 : fontSize2Small));
        drawStringCenter(g, numStr, xN, yNum);
    
    } else {
        g.drawImage(img, 0, 0, null);
        g.setFont(textFont.deriveFont(0, 115));
        g.setColor(Color.BLACK);
        drawStringCenter(g, toDepot, x, y2);
    }
}


