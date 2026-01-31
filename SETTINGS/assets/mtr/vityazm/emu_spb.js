importPackage(java.awt);
importPackage(java.awt.geom);
include(Resources.id('mtrsteamloco:scripts/display_helper.js'));

let slotHeadDestCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
          name: 'head-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                [-1.24543, 1.36241, 3.96121],
                [-1.24543, 1.14926, 3.96121],
                [-1.24543, 1.14926, 5.06131],
                [-1.24543, 1.36241, 5.06131],
              ],
          ],
          offsets: [[0, 0, 0]],
      },
    ],
};

let slotGolovDestCfg = {								// ЭМУ ОСНОВНОЙ ГОЛОВНОЙ (БЕЛЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
            name: 'head-dest',
            texArea: [0, 0, 1024, 128],
            pos: [
                [
                    [-0.320664, 1.7123, 7.29241],
                    [-0.320664, 1.4251, 7.29241],
                    [0.6184, 1.4251, 7.29241],
                    [0.6184, 1.7123, 7.29241],
                ],
            ],
            offsets: [[0, 0, 0]],
        }
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
                    [-0.6183, 1.7123, 7.29241],
                    [-0.6183, 1.4251, 7.29241],
                    [-0.320664, 1.4251, 7.29241],
                    [-0.320664, 1.7123, 7.29241],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'head-side-route',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-1.24543, 1.36241, 3.66998],  
                    [-1.24543, 1.14926, 3.66998],
                    [-1.24543, 1.14926, 3.96121],
                    [-1.24543, 1.36241, 3.96121],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let slotMidDestCfg = {							    // ЭМУ ОСНОВНОЙ ХВОСТОВОЙ (КРАСНЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
          name: 'mid-side-dest',
          texArea: [0, 0, 1024, 128],
          pos: [
              [
                [-1.24061, 1.3638, 0.432576],
                [-1.24061, 1.15065, 0.432576],
                [-1.24061, 1.15065, 1.51795],
                [-1.24061, 1.3638, 1.51795],
              ],
          ],
          offsets: [[0, 0, 0]],
      },
    ],
};

let slotMidRouteCfg = {						    // ЭМУ МАРШРУТ ХВОСТОВОЙ (КРАСНЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [256, 128],
    slots: [
        {
          name: 'mid-side-route',
          texArea: [0, 0, 256, 128],
          pos: [
              [
                    [-1.24061, 1.3638, 0.126624],
                    [-1.24061, 1.15065, 0.126624],
                    [-1.24061, 1.15065, 0.432576],
                    [-1.24061, 1.3638, 0.432576],
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
                [-1.24219, 1.36396, -5.05851],
                [-1.24219, 1.15081, -5.05851],
                [-1.24219, 1.15081, -3.93284],
                [-1.24219, 1.36396, -3.93284],
              ],
          ],
          offsets: [[0, 0, 0]],
      },
    ],
};

let slotHvostDestCfg = {							    // ЭМУ ОСНОВНОЙ ХВОСТОВОЙ (КРАСНЫЕ ОГНИ) ВАГОН
    version: 1,
    texSize: [1024, 128],
    slots: [
        {
            name: 'tail-dest',
            texArea: [0, 0, 1024, 128],
            pos: [
                [
                    [0.27069, 1.77842, -7.58548],
                    [0.27069, 1.55114, -7.58548],
                    [-0.528224, 1.55114, -7.58548],
                    [-0.528224, 1.77842, -7.58548],
                ],
            ],
            offsets: [[0, 0, 0]],
        }
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
                    [0.55569, 1.77842, -7.58548],
                    [0.55569, 1.55114, -7.58548],
                    [0.27069, 1.55114, -7.58548],
                    [0.27069, 1.77842, -7.58548],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
          name: 'tail-side-route',
          texArea: [0, 0, 256, 128],
          pos: [
              [
                    [-1.24219, 1.36396, -5.37753],
                    [-1.24219, 1.15081, -5.37753],
                    [-1.24219, 1.15081, -5.05851],
                    [-1.24219, 1.36396, -5.05851],
              ],
          ],
          offsets: [[0, 0, 0]],
      },
    ],
};

let slotHeadSofitCfg = {							// Софиты головного вагона
    version: 1,
    texSize: [512, 128],
    slots: [
        {
            name: 'left-sofit',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [-0.6183, 1.70714, 6.49436],
                    [-0.6183, 1.41994, 6.49436],
                    [-0.486343, 1.41994, 6.49436],
                    [-0.486343, 1.70714, 6.49436],	 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                    [0.486421, 1.70714, 6.49436],
                    [0.486421, 1.41994, 6.49436],
                    [0.6184, 1.41994, 6.49436],
                    [0.6184, 1.70714, 6.49436],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let slotTailSofitCfg = {							// Софиты хвостового вагона
    version: 1,
    texSize: [512, 128],
    slots: [
        {
            name: 'left-sofit',
            texArea: [0, 0, 256, 128],
            pos: [
                [
                    [0.600758, 1.7727, -2.99184],
                    [0.600758, 1.54542, -2.99184],
                    [0.471642, 1.54542, -2.99184],
                    [0.471642, 1.7727, -2.99184], 
                ],
            ],
            offsets: [[0, 0, 0]],
        },
        {
            name: 'right-sofit',
            texArea: [256, 0, 256, 128],
            pos: [  
                [   
                    [-0.450079, 1.7727, -2.99184],
                    [-0.450079, 1.54542, -2.99184],
                    [-0.573292, 1.54542, -2.99184],
                    [-0.573292, 1.7727, -2.99184],
                ],
            ],
            offsets: [[0, 0, 0]],
        },
    ],
};

let dhHeadBaseDest = new DisplayHelper(slotHeadDestCfg);
let dhGolovBaseDest = new DisplayHelper(slotGolovDestCfg);
let dhHeadBaseRoute = new DisplayHelper(slotHeadRouteCfg);
let dhMidBaseRoute = new DisplayHelper(slotMidRouteCfg);
let dhMidBaseDest = new DisplayHelper(slotMidDestCfg);

let dhTailBaseDest = new DisplayHelper(slotTailDestCfg);
let dhTailBaseRoute = new DisplayHelper(slotTailRouteCfg);

let dhHvostBaseDest = new DisplayHelper(slotHvostDestCfg);
let dhHeadSofit = new DisplayHelper(slotHeadSofitCfg);
let dhTailSofit = new DisplayHelper(slotTailSofitCfg);

function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dhHeadDest = dhHeadBaseDest.create();
    state.dhGolovDest = dhGolovBaseDest.create();
    state.dhHeadRoute = dhHeadBaseRoute.create();
    state.dhMidRoute = dhMidBaseRoute.create();
    state.dhMidDest = dhMidBaseDest.create();
    state.dhTailDest = dhTailBaseDest.create();
    state.dhHvostDest = dhHvostBaseDest.create();
    state.dhTailRoute = dhTailBaseRoute.create();
    state.dhHeadSofit = dhHeadSofit.create();
    state.dhTailSofit = dhTailSofit.create();

    state.routeIDmath = getRouteNum(train);
    return (state.routeID = state.routeIDmath);
}

function dispose(ctx, state, train) {
    if (state.dhHeadDest) state.dhHeadDest.close();
    if (state.dhGolovDest) state.dhGolovDest.close();
    if (state.dhHeadRoute) state.dhHeadRoute.close();
    if (state.dhHeadNum) state.dhHeadNum.close();
    if (state.dhMidRoute) state.dhHeadRoute.close();
    if (state.dhMidDest) state.dhTailDest.close();
    if (state.dhHvostDest) state.dhHvostDest.close();
    if (state.dhTailRoute) state.dhTailRoute.close();
    if (state.dhTailNum) state.dhTailNum.close();
    if (state.dhHeadSofit) state.dhHeadSofit.close();
    if (state.dhTailSofit) state.dhTailSofit.close();
}

var EMUFont = Resources.readFont(
    Resources.idRelative('mtr:fonts/buse.otf')
);

var EMUNum = Resources.readFont(
    Resources.idRelative('mtr:fonts/buse.otf')
);

function abbreviateToponyms(text) {
    var replacements = [
        { from: "улица", to: "ул." },
        { from: "Улица", to: "Ул." },
        { from: "УЛИЦА", to: "УЛ." },
        { from: "проспект", to: "пр-т" },
        { from: "Проспект", to: "Пр-т" },
        { from: "ПРОСПЕКТ", to: "ПР-Т" },
        { from: "переулок", to: "пер." },
        { from: "Переулок", to: "Пер." },
        { from: "ПЕРЕУЛОК", to: "ПЕР." },
        { from: "площадь", to: "пл." },
        { from: "Площадь", to: "Пл." },
        { from: "ПЛОЩАДЬ", to: "ПЛ." },
        { from: "бульвар", to: "б-р" },
        { from: "Бульвар", to: "Б-р" },
        { from: "БУЛЬВАР", to: "Б-Р" },
        { from: "проезд", to: "пр-д" },
        { from: "Проезд", to: "Пр-д" },
        { from: "Проезд", to: "ПД-Д" },
        { from: "набережная", to: "наб." },
        { from: "Набережная", to: "Наб." },
        { from: "НАБЕРЕЖНАя", to: "НАБ." },
        { from: "шоссе", to: "ш." },
        { from: "Шоссе", to: "Ш." },
        { from: "ШОССЕ", to: "Ш." },
        { from: "поселок", to: "пос." },
        { from: "Поселок", to: "Пос." },
        { from: "ПОСЕЛОК", to: "Пос." },
        { from: "посёлок", to: "пос." },
        { from: "Посёлок", to: "Пос." },
        { from: "ПОСЁЛОК", to: "Пос." },
        { from: "дом", to: "д." },
        { from: "Дом", to: "Д." },
        { from: "ДОМ", to: "Д." },
        { from: "район", to: "р-он" },
        { from: "Район", to: "Р-он" },
        { from: "РAЙОН", to: "Р-ОН" },
        { from: "дорога", to: "дор." },
        { from: "Дорога", to: "Дор." },
        { from: "ДОРОГА", to: "ДОР." },
        { from: "железнодорожная станция", to: "ж/д ст." },
        { from: "Железнодорожная станция", to: "Ж/д ст." },
        { from: "Железнодорожная Станция", to: "Ж/д ст." },
        { from: "ЖЕЛЕЗНОДОРОЖНАЯ СТАНЦИЯ", to: "Ж/Д ст." },

        //ИНГЛИШ

        { from: "street", to: "st." },
        { from: "Street", to: "St." },
        { from: "STREET", to: "ST." },
        { from: "avenue", to: "ave." },
        { from: "Avenue", to: "Ave." },
        { from: "AVENUE", to: "AVE." },
        { from: "drive", to: "dr." },
        { from: "Drive", to: "Dr." },
        { from: "DRIVE", to: "DR." },
        { from: "DRIVE", to: "DR." },
        { from: "road", to: "rd." },
        { from: "Road", to: "Rd." },
        { from: "ROAD", to: "RD." },
        { from: "square", to: "sq." },
        { from: "Square", to: "Sq." },
        { from: "SQUARE", to: "SQ." },
        { from: "hill", to: "hl." },
        { from: "Hill", to: "Hl." },
        { from: "HILL", to: "HL." },
        { from: "highway", to: "hwy." },
        { from: "Highway", to: "Hwy." },
        { from: "HIGHWAY", to: "HWY." },
        { from: "railway", to: "rwy." },
        { from: "Railway", to: "Rwy." },
        { from: "RAILWAY", to: "RWY." },

        //ДОЙЧ

        { from: "strasse", to: "str." },
        { from: "Strasse", to: "Str." },
        { from: "STRASSE", to: "STR." },
        { from: "straße", to: "str." },
        { from: "Straße", to: "Str." },
        { from: "STRAẞE", to: "STR." },
        { from: "platz", to: "pl." },
        { from: "Platz", to: "Pl." },
        { from: "PLATZ", to: "PL." },
        { from: "allee", to: "al." },
        { from: "Allee", to: "Al." },
        { from: "ALLEE", to: "AL." },
    ];

    for (var i = 0; i < replacements.length; i++) {
        var repl = replacements[i];
        while (text.indexOf(repl.from) !== -1) {
            text = text.replace(repl.from, repl.to);
        }
    }

    return text;
}

function renderSofitTextFill(ctx, state, train) {
    if (state.version !== 1) return;

    let sofitSlots = [
        { dh: state.dhHeadSofit, graphicsName: 'left-sofit' },
        { dh: state.dhHeadSofit, graphicsName: 'right-sofit' },
        { dh: state.dhTailSofit, graphicsName: 'left-sofit' },
        { dh: state.dhTailSofit, graphicsName: 'right-sofit' }
    ];

    sofitSlots.forEach((slot) => {
        let g = slot.dh.graphicsFor(slot.graphicsName);
        if (!g) return;

        g.setColor(Color.BLACK);
        g.setComposite(AlphaComposite.Clear);
        g.fillRect(0, 0, 256, 128);
        g.setComposite(AlphaComposite.SrcOver);

        let color = Color.RED;

        if (slot.graphicsName == 'left-sofit') {
             color = getFirstStopColor(train);
        } else {
            color = getRightColor(train);
        }

        g.setColor(new Color(color.r / 255, color.g / 255, color.b / 255));
        let text = "..............................................................................";

        let fontSize = 12;
        g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));

        let fontMetrics = g.getFontMetrics();
        let textHeight = fontMetrics.getAscent();
        let charWidth = fontMetrics.charWidth('.');

        let startX = (256 - fontMetrics.stringWidth(text)) / 2;

        let yPos = 0;
        while (yPos <= 128) {
            g.drawString(text, startX, yPos);
            yPos += charWidth;
        }

        slot.dh.upload();
    });
}

function render(ctx, state, train) {  
    if (state.pisRateLimit.shouldUpdate()) {
        let firstStation = abbreviateToponyms(getFirstStation(train));
        let endStation = abbreviateToponyms(getEndStation(train));
        let headEndStation = getEndStation(train);
        let EMURouteText = state.routeID;
        state.routeID = getRouteNum(train); 
        renderSofitTextFill(ctx, state, train);
        

        let stationList = train.getThisRoutePlatforms();
        let allStations = [];
        for (let i = 0; i < stationList.size(); i++) {
            let stationName = abbreviateToponyms(stationList[i].station ? stationList[i].station.name : "");
            if (stationName && stationName.trim() !== "") {
                allStations.push(stationName);
            }
        }
        let fullRouteText = allStations.join("  -  ");

        if (state.scrollPos === undefined) state.scrollPos = 0;
        state.scrollPos += 10;

        [
            { dh: state.dhHeadDest, graphicsName: 'head-side-dest' },
            { dh: state.dhMidDest, graphicsName: 'mid-side-dest' },
            { dh: state.dhTailDest, graphicsName: 'tail-side-dest' },
        ].forEach((element) => {
             let dh = element.dh;
            let g = dh.graphicsFor(element.graphicsName);
            
            g.setColor(Color.WHITE);
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 1024, 128);
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.WHITE);

            // Определяем что показывать в верхней строке
            let topLineText;
            if (stationList.size() === 2) {
                // Если всего 2 станции в маршруте, показываем первую
                topLineText = firstStation;
            } else {
                // Иначе показываем конечную
                topLineText = endStation;
            }

            renderStaticText(g, topLineText, 55, 50);
            
            g.setFont(EMUFont.deriveFont(Font.PLAIN, 50));
            let textWidth = g.getFontMetrics().stringWidth(fullRouteText);
            
            if (textWidth > 1024) {
                renderScrollingText(g, fullRouteText, state.scrollPos, 120, 50);
            } else {
                renderStaticText(g, endStation, 120, 50);
            }

            dh.upload();
        });

        [
            { dh: state.dhGolovDest, graphicsName: 'head-dest', text: headEndStation },
            { dh: state.dhHvostDest, graphicsName: 'tail-dest', text: headEndStation },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.WHITE);
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 1024, 128);
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.WHITE);

            // Упрощенный вызов без указания размера шрифта
            renderSmartSplitText(g, headEndStation, 1024);
            
            dh.upload();
        });

        [ 
            { dh: state.dhHeadRoute, graphicsName: 'head-route', text: EMURouteText },
            { dh: state.dhHeadRoute, graphicsName: 'head-side-route', text: EMURouteText },
            { dh: state.dhMidRoute, graphicsName: 'mid-side-route', text: EMURouteText },
            { dh: state.dhTailRoute, graphicsName: 'tail-route', text: EMURouteText },
            { dh: state.dhTailRoute, graphicsName: 'tail-side-route', text: EMURouteText },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.WHITE);
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 256, 128);
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.WHITE);

            let fontSize = 130;
            let fontMetrics;
            let textWidth;
            let textHeight;
            
            do {
                g.setFont(EMUNum.deriveFont(Font.PLAIN, fontSize));
                fontMetrics = g.getFontMetrics();
                textWidth = fontMetrics.stringWidth(EMURouteText);
                textHeight = fontMetrics.getHeight();
                
                if (textWidth > 256 || textHeight > 150) {
                    fontSize -= 10;
                } else {
                    break;
                }
            } while (fontSize > 50);

            if (textWidth > 256) {
                state.routeScrollPos = (state.routeScrollPos || 0) + 5;
                if (state.routeScrollPos > textWidth + 256) {
                    state.routeScrollPos = 0;
                }
                g.drawString(EMURouteText, 256 - state.routeScrollPos);
            } else {
                g.drawString(EMURouteText, (256 - textWidth) / 2, 118);
            }

            dh.upload();
        });

    }

    // Отрисовка основных моделей
    ctx.drawCarModel(state.dhHeadDest.model, 0, null);
    ctx.drawCarModel(state.dhGolovDest.model, 0, null);
    ctx.drawCarModel(state.dhHeadRoute.model, 0, null);
    ctx.drawCarModel(state.dhMidRoute.model, 1, null);
    ctx.drawCarModel(state.dhMidDest.model, 1, null);
    ctx.drawCarModel(state.dhTailDest.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhHvostDest.model, train.trainCars() - 1, null);
    ctx.drawCarModel(state.dhTailRoute.model, train.trainCars() - 1, null);
    
        ctx.drawCarModel(state.dhHeadSofit.model, 0, null);
        ctx.drawCarModel(state.dhTailSofit.model, train.trainCars() - 1, null);
}

function renderStaticText(g, text, yPos, fontSize) {
    g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
    let textWidth = g.getFontMetrics().stringWidth(text);
    g.drawString(text, (1024 - textWidth) / 2, yPos);
}

function renderScrollingText(g, text, scrollPos, yPos, fontSize) {
    g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
    let textWidth = g.getFontMetrics().stringWidth(text);
    const displayWidth = 1024;

    if (textWidth > displayWidth) {
        scrollPos = scrollPos % (textWidth + displayWidth);
        g.drawString(text, displayWidth - scrollPos, yPos);
        g.drawString(text, displayWidth - scrollPos + textWidth + displayWidth, yPos);
    } else {
        g.drawString(text, (displayWidth - textWidth) / 2, yPos);
    }
}

function renderSmartSplitText(g, text, maxWidth) {
    // Проверка на пустой текст
    if (!text || text.trim() === "") {
        text = "П О С А Д К И  Н Е Т";
    }

    const words = text.split(' ');
    const wordCount = words.length;
    
    // Настройки для разных случаев
    const styleSettings = {
        singleWord: {
            fontSize: 80,
            yPos: 100
        },
        twoWordsSingleLine: {
            fontSize: 55,
            yPos: 95
        },
        twoWordsMultiLine: {
            fontSize: 55,
            yPos: 90
        },
        multiWord: {
            fontSize: 45,
            yPos: 86
        },
        noBoarding: {
            fontSize: 80,
            yPos: 105,
            xPos: 50,
            text: "П О С А Д К И  Н Е Т"
        } 
    };

    // Обработка "ПОСАДКИ НЕТ"
    if (text === "П О С А Д К И  Н Е Т") {
        g.setFont(EMUFont.deriveFont(Font.PLAIN, styleSettings.noBoarding.fontSize));
        const boardingTextWidth = g.getFontMetrics().stringWidth(styleSettings.noBoarding.text);
        g.drawString(styleSettings.noBoarding.text, 
            (maxWidth - boardingTextWidth) / 2, 
            styleSettings.noBoarding.yPos);
        return;
    }

    const minFontSize = 30;
    const lineSpacingMultiplier = 0.4;
    const processedText = wordCount >= 4 ? abbreviateToponyms(text) : text;
    const processedWords = processedText.split(' ');
    const processedWordCount = processedWords.length;
    
    // Проверка для двух слов одной строкой
    if (processedWordCount === 2) {
        const combinedText = processedWords.join(' ');
        
        if (combinedText.length <= 20) {
            g.setFont(EMUFont.deriveFont(Font.PLAIN, styleSettings.twoWordsSingleLine.fontSize));
            const combinedTextWidth = g.getFontMetrics().stringWidth(combinedText);
            
            if (combinedTextWidth <= maxWidth) {
                g.drawString(combinedText, 
                    (maxWidth - combinedTextWidth) / 2, 
                    styleSettings.twoWordsSingleLine.yPos);
                return;
            }
            
            g.setFont(EMUFont.deriveFont(Font.PLAIN, styleSettings.twoWordsMultiLine.fontSize));
            const fallbackCombinedWidth = g.getFontMetrics().stringWidth(combinedText);
            if (fallbackCombinedWidth <= maxWidth) {
                g.drawString(combinedText, 
                    (maxWidth - fallbackCombinedWidth) / 2, 
                    styleSettings.twoWordsMultiLine.yPos);
                return;
            }
        }
    }
    
    // Основная обработка
    let currentStyle;
    if (processedWordCount === 1) {
        currentStyle = styleSettings.singleWord;
    } else if (processedWordCount === 2) {
        currentStyle = styleSettings.twoWordsMultiLine;
    } else {
        currentStyle = styleSettings.multiWord;
    }

    let fontSize = currentStyle.fontSize;
    while (fontSize >= minFontSize) {
        g.setFont(EMUFont.deriveFont(Font.PLAIN, fontSize));
        const fontMetrics = g.getFontMetrics();
        const lineHeight = fontMetrics.getHeight();
        const lineSpacing = lineHeight * lineSpacingMultiplier;
        
        let line1, line2;
        
        if (processedWordCount === 1) {
            line1 = processedText;
            const singleLineWidth = fontMetrics.stringWidth(line1);
            if (singleLineWidth <= maxWidth) {
                g.drawString(line1, 
                    (maxWidth - singleLineWidth) / 2, 
                    currentStyle.yPos);
                return;
            }
        } 
        else {
            const splitPos = Math.ceil(processedWords.length / 2);
            line1 = processedWords.slice(0, splitPos).join(' ');
            line2 = processedWords.slice(splitPos).join(' ');
        }
        
        if (line1 && line2) {
            const firstLineWidth = fontMetrics.stringWidth(line1);
            const secondLineWidth = fontMetrics.stringWidth(line2);
            
            if (firstLineWidth <= maxWidth && secondLineWidth <= maxWidth) {
                g.drawString(line1, 
                    (maxWidth - firstLineWidth) / 2, 
                    currentStyle.yPos - lineSpacing);
                g.drawString(line2, 
                    (maxWidth - secondLineWidth) / 2, 
                    currentStyle.yPos + lineSpacing);
                return;
            }
        }
        
        fontSize -= 2;
    }
    
    // Фолбэк
    g.setFont(EMUFont.deriveFont(Font.PLAIN, minFontSize));
    const finalDisplayText = text.length > 20 ? text.substring(0, 18) + '...' : text;
    const finalTextWidth = g.getFontMetrics().stringWidth(finalDisplayText);
    g.drawString(finalDisplayText, 
        (maxWidth - finalTextWidth) / 2, 
        currentStyle.yPos);
}

function findBestSplit(words, maxWidth, fontMetrics) {
    for (let splitPos = 1; splitPos < words.length; splitPos++) {
        let line1 = words.slice(0, splitPos).join(" ");
        let line2 = words.slice(splitPos).join(" ");
        
        if (fontMetrics.stringWidth(line1) <= maxWidth && fontMetrics.stringWidth(line2) <= maxWidth) {
            return { line1, line2 };
        }
    }
    return null;
}

function getRouteNum(train) {
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) {
        return "--";
    }
    return stationList[0].route.lightRailRouteNumber.toString();
}

function getEndStation(train) {
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) {
        return "П О С А Д К И  Н Е Т";
    }
    
    let lastStation = stationList[stationList.size() - 1];
    if (!lastStation || !lastStation.destinationName) {
        return "П О С А Д К И  Н Е Т";
    }
    
    return lastStation.destinationName || "П О С А Д К И  Н Е Т";
}

function getFirstStation(train) {
    let stationList = train.getThisRoutePlatforms();
    if (stationList[0] == undefined) return "";
    let station = stationList[0].station;
    let customFirstSt = stationList[0].route.platformIds[0].customDestination + "";
  
    let regularFirstSt = station == null ? "" : station.name;
    return customFirstSt == "" ? regularFirstSt : customFirstSt;
}

function getFirstStopColor(train) {
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) return decodeColor(0);

    let station = stationList[0].station;
    if (!station || station.color === undefined) return decodeColor(0);

    return decodeColor(station.color);
}

function getRightColor(train) {
    let stationList = train.getThisRoutePlatforms();

    if (stationList == null || stationList == undefined) return decodeColor(0); 
    let ret = stationList[0].destinationStation.color;
    return decodeColor(ret);
}

function decodeColor(color) {
    let r = (color >> 16) & 0xFF;
    let g = (color >> 8) & 0xFF;
    let b = color & 0xFF;
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
    const y1 = 60;
    const y2 = 140;
    const yNum = 115;
    const xN = 970;

    if (state.isOnRoute) {
        let upStr = (state.emuStringUp + "").substring(0, 20);
        let downStr = (state.emuStringDown + "").substring(0, 20);
        let numStr = (state.emuStringNum + "").substring(0, 5);
        
        let isBig = upStr.length < 16;
        let isBig2 = downStr.length < 16;
        let isBigNum = numStr.length < 4;

        g.drawImage(img, 0, 0, null);
    
        g.setColor(Color.BLACK);

        g.setFont(textFont.deriveFont(0, isBig ? fontSize : fontSizeSmall));
        drawStringCenter(g, upStr, x, y1);

        g.setFont(textFont.deriveFont(0, isBig2 ? fontSize : fontSizeSmall));
        drawStringCenter(g, downStr, x, y2);

        g.setFont(textFont.deriveFont(0, isBigNum ? fontSize2 : fontSize2Small));
        drawStringCenter(g, numStr, xN, yNum);
    
    } else {
        g.drawImage(img, 0, 0, null);
        g.setFont(textFont.deriveFont(0, 115));
        g.setColor(Color.BLACK);
        drawStringCenter(g, toDepot, x, y2);
    }
}