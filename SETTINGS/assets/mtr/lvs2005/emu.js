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
                    [-0.23043, 2.10867, 5.22532],
                    [-0.22832, 1.76093, 5.23281], 
                    [0.585463, 1.75393, 5.23008],
                    [0.583353, 2.10167, 5.2226],	// Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                  [-1.22551, 1.2263, 3.05888],
                  [-1.22551, 0.912226, 3.05888],
                  [-1.22551, 0.912226, 3.93158],
                  [-1.22551, 1.2263, 3.93158],	// Правый Верхний Угол XYZ
              ],    
          ],
          offsets: [[0, 0, 0]],
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

let slotHeadRouteCfg = {							// ЭМУ МАРШРУТ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [256, 128],
    slots: [
        {
            name: 'head-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-0.570525, 2.10867, 5.22532],
                    [-0.568415, 1.76093, 5.23281],		// Левый Нижний Угол XYZ
                    [-0.22832, 1.76093, 5.23281],    // Правый Нижний Угол XYZ
                    [-0.23043, 2.10867, 5.22532],   // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [  
                [
                    [-1.22551, 1.2263, 2.73158],
                    [-1.22551, 0.912225, 2.73158],
                    [-1.22551, 0.912226, 3.05888],
                    [-1.22551, 1.2263, 3.05888], // Правый Верхний Угол XYZ
                ],
            ],
            offsets: [[0, 0, 0]],
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

let slotTailRouteCfg = {						    // ЭМУ МАРШРУТ ХВОСТОВОЙ (КРАСНЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [256, 128],
    slots: [
        {
            name: 'tail-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-0.083013, 2.10196, -3.25087],
                    [-0.098478, 1.75417, -3.28978],		// Левый Нижний Угол XYZ
                    [-0.472691, 1.75731, -3.2757],    // Правый Нижний Угол XYZ
                    [-0.457226, 2.1051, -3.23679],	    // Правый Верхний Угол XYZ
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
                    [-0.774081, 2.10653, 5.13723],
                    [-0.806753, 1.77728, 5.2525],
                    [-0.622566, 1.77694, 5.30373],
                    [-0.589893, 2.10619, 5.18846], 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                    [0.61244, 2.10653, 5.17336],
                    [0.635367, 1.77728, 5.29096],
                    [0.822831, 1.77694, 5.25345],
                    [0.799904, 2.10619, 5.13586],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let slotTailSofitCfg = {							// ЭМУ МАРШРУТ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [512, 128],
    slots: [
        {
            name: 'left-sofit',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [0.79167, 2.10732, -3.15129],
                    [0.824342, 1.77807, -3.26656],
                    [0.640155, 1.77773, -3.31779],
                    [0.607483, 2.10698, -3.20252], 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                   
                    [-0.59485, 2.10732, -3.19419],
                    [-0.617777, 1.77807, -3.31179],
                    [-0.805241, 1.77773, -3.27428],
                    [-0.782314, 2.10698, -3.15668],
                   
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
let dhTailSofitBase = new DisplayHelper(slotTailSofitCfg);

function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dhHeadDest = dhHeadBaseDest.create();
    state.dhHeadRoute = dhHeadBaseRoute.create();
    state.dhTailDest = dhTailBaseDest.create();
    state.dhTailRoute = dhTailBaseRoute.create();
    state.dhHeadSofit = dhHeadSofitBase.create();
    state.dhTailSofit = dhTailSofitBase.create();

    // Получаем номер маршрута через getRouteNum
    state.routeIDmath = getRouteNum(train);
    return (state.routeID = state.routeIDmath);
}

function drawCenteredText(g, text, x, y) {
    let fm = g.getFontMetrics();  // Получаем метрики шрифта
    let textWidth = fm.stringWidth(text);  // Ширина текста
    let textHeight = fm.getHeight();  // Высота текста

    // Корректируем координаты для центрирования текста
    let drawX = x - textWidth / 2;
    let drawY = y + textHeight / 2 - fm.getDescent();

    // Рисуем текст
    g.drawString(text, drawX, drawY);
}

function dispose(ctx, state, train) {                                       // В душе не ебу что это но это важно | p.s от марата: в душе не ебу почему эти в некоторые моменты бывают undefined, но я сделал проверку 
    if (state.dhHeadRoute) state.dhHeadDest.close();
    if (state.dhHeadRoute) state.dhHeadRoute.close();
    if (state.dhTailDest) state.dhTailDest.close();
    if (state.dhTailRoute) state.dhTailRoute.close();
    if (state.dhHeadSofit) state.dhHeadSofit.close();
    if (state.dhTailSofit) state.dhTailSofit.close();
}
var EMUFont = Resources.readFont(                                           // Шрифт ЭМУ
    Resources.idRelative('mtr:fonts/cat-arena.ttf')
);


function renderSofitTextFill(ctx, state, train) {
    let sofitSlots = [
        { dh: state.dhHeadSofit, graphicsName: 'left-sofit' },
        { dh: state.dhHeadSofit, graphicsName: 'right-sofit' },
        { dh: state.dhTailSofit, graphicsName: 'left-sofit' },
        { dh: state.dhTailSofit, graphicsName: 'right-sofit' }
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
    ctx.drawCarModel(state.dhTailSofit.model, train.trainCars() - 1, null);
}

// Helper function to render scrolling text
function renderScrollingText(dh, graphicsName, text, scrollPos, maxScrollWidth, texWidth, texHeight) {
    let g = dh.graphicsFor(graphicsName);
 
    g.setColor(Color.BLACK);
    g.fillRect(0, 0, texWidth, texHeight);
    g.setColor(Color.WHITE);

    let fontSize = 115; // Initial font size
    g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
    let fontMetrics = g.getFontMetrics();
    let textWidth = fontMetrics.stringWidth(text);

    // Adjust scroll position
    if (textWidth > texWidth) {
        scrollPos = scrollPos % (textWidth + texWidth);
        g.drawString(text, texWidth - scrollPos, 95);
    } else {
        // Center the text if it fits within the bounds
        let xPosition = (texWidth - textWidth) / 2;
        g.drawString(text, xPosition, 100);

        
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



