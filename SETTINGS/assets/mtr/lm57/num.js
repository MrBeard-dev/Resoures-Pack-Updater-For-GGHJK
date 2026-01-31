importPackage(java.awt);
importPackage(java.awt.geom);
include(Resources.id('mtrsteamloco:scripts/display_helper.js'));

let slotCfg = {
    version: 1,
    texSize: [183, 145],
    slots: [
        {
            name: 'head',
            texArea: [0, 0, 183, 164],
            pos: [
                [
                    [-0.137973, 2.21625, 7.68509],
                    [-0.137973, 1.9403, 7.68509],
                    [0.137973, 1.9403, 7.68509],
                    [0.137973, 2.21625, 7.68509],
                ],
            ],
            offsets: [[0, 0.01, 0]],
        },
    ],
};

let slotReversedCfg = {
    version: 1,
    texSize: [183, 145],
    slots: [
        {
            name: 'head-reversed',
            texArea: [0, 0, 183, 128],
            pos: [
                [
                    [0.140755, 2.22128, -7.41389],
                    [0.140755, 1.96103, -7.41389],
                    [-0.136339, 1.96103, -7.41389],
                    [-0.136339, 2.22128, -7.41389],
                ],
            ],
            offsets: [[0, 0.02, 0]],
        },
    ],
};

let dhBase = new DisplayHelper(slotCfg);
let dhReversedBase = new DisplayHelper(slotReversedCfg);

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

function create(ctx, state, train) {
    state.pisRateLimit = new RateLimit(0.05);
    state.dh = dhBase.create();
    state.dhReversed = dhReversedBase.create();
    state.routeID = getRouteNum(train);
}

function dispose(ctx, state, train) {
    state.dh.close();
    state.dhReversed.close();
}

var EMUFont = Resources.readFont(
    Resources.idRelative('mtr:fonts/msk_trafaret.otf')
);

function render(ctx, state, train) {

    

    if (state.pisRateLimit.shouldUpdate()) {
        let g;

        [
            { dh: state.dh, graphicsName: 'head' },
            { dh: state.dhReversed, graphicsName: 'head-reversed' },
        ].forEach((element) => {
            let dh = element.dh;
            g = dh.graphicsFor(element.graphicsName);
            g.setColor(Color.LIGHT_GRAY); 
            g.setComposite(AlphaComposite.Clear);
            g.fillRect(0, 0, 183, 145);
            g.setComposite(AlphaComposite.SrcOver);
            g.setColor(Color.WHITE);
            g.setFont(EMUFont.deriveFont(Font.PLAIN, 130));
            drawCenteredText(g, state.routeID, 91, 91);
            dh.upload();
        });
    }

    ctx.drawCarModel(state.dh.model, 0, null);
    ctx.drawCarModel(state.dhReversed.model, train.trainCars() - 1, null);
}

function getRouteNum(train) {
   
    let stationList = train.getThisRoutePlatforms();
    if (!stationList || stationList.size() === 0) {
        return "--";
    }
    return stationList[0].route.lightRailRouteNumber.toString();
  }