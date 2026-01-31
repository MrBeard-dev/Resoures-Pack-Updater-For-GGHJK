importPackage(java.awt);
importPackage(java.awt.geom);

var isBold = false;
var isBoldIskra = false;

include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

function create(ctx, state, train) {
	displCreate(ctx, state, train)
}

function dispose(ctx, state, train) {
	displDispose(ctx, state, train)
}

function render(ctx, state, train) {
	displRender(ctx, state, train)
}

// фул эмушник для первого вагона
let slotCfg = {
  "version": 1,
  "texSize": [1500, 200],
  "slots": [
    {
      "name": "front",    
      "texArea": [0, 0, 1500, 200],
      "pos": [
        [[-0.598405 , 1.91589, 7.1993],  [-0.598405, 1.69355, 7.1808], [0.598405, 1.69355, 7.1808], [0.598405, 1.91589, 7.1993]]
      ],
      "offsets": [[0, 0, 0]]
    },
    {
      "name": "side",    
      "texArea": [0, 0, 1500, 200],
      "pos": [
        [[-1.23903, 1.68201, 2.22109], [-1.21721, 1.41964, 2.22109], [-1.21721, 1.41964, 3.63333], [-1.23903, 1.68201, 3.63333]]
      ],
      "offsets": [[0, 0, 0]]
    }
  ]
};
// эмушник для второго вагона (сиферки)

let slotCfg2 = {
  "version": 1,
  "texSize": [430, 200],
  "slots": [
    {
      "name": "back",    
      "texArea": [0, 0, 430, 200],
      "pos": [
        [[0.172823, 1.10689, -7.4221],  [0.172823, 0.863327 , -7.4221], [-0.156436, 0.863327, -7.4221], [-0.156436, 1.10689, -7.4221]]
      ],
      "offsets": [[0, 0, 0]]
    }
  ]
};

// 

var serifFont = Resources.readFont(Resources.idRelative("mtr:fonts/8x12.otf"));
var emuFont = Resources.readFont(Resources.idRelative("mtr:fonts/5by7.ttf"));

const toDepot = "в парк"
const toDepot2 = "посадки нет"

var dhBase = new DisplayHelper(slotCfg);
var dhBase2 = new DisplayHelper(slotCfg2);

const literX = 315 
const literY = 169 

const x = 417
const yUp = 77
const yDown = 167

const xDelta = 61.7;
const digitDelta = 11;

const numX = 115;
const numY = 130; 
const numDelta = 99; 

const usualFontSize = 60;
const bigFontSize = 60;

function displCreate(ctx, state, train) {

	state.pisRateLimit = new RateLimit(3);
  state.dh = dhBase.create();
  state.dh2 = dhBase2.create();

  updateEmuStrings(state, train) 
  
}

function displDispose(ctx, state, train) {
	if (state.dh != null) state.dh.close();
  if (state.dh2 != null) state.dh2.close();
}


function displRender(ctx, state, train) {
	if (state.pisRateLimit.shouldUpdate()) {
    updateEmuStrings(state, train);
    drawHeadEmu(state, train)
    drawTailEmu(state, train)
    state.dh.upload();
    state.dh2.upload();
  }

  ctx.drawCarModel(state.dh.model, 0, null);
  ctx.drawCarModel(state.dh2.model, 0, null);
}

function updateEmuStrings(state, train) {
  if (train.getThisRoutePlatforms().size() != 0) {
    state.emuStringFirst = getFirstStation(train);
    state.emuStringEnd = getEndStation(train);
    state.emuStringNum = splitNum(getRouteNum(train))
  } else {
    state.emuStringFirst = toDepot;
    state.emuStringEnd = toDepot2;
    state.emuStringNum = ["---", ""]
  }
}

function drawHeadEmu(state, train) {


  let g = state.dh.graphics();

  // PREPARE
  g.setComposite(AlphaComposite.Clear);
  g.fillRect(0, 0, 1500, 200);
  g.setComposite(AlphaComposite.SrcOver);

  g.setColor(new Color(1, 0.5, 0));
  //g.setFont(serifFont.deriveFont(isBold * 1, 78));
  g.setFont(emuFont.deriveFont(isBold * 1, usualFontSize));

  // UPPER TEXT
  let upperText = formatStationName(shortenString(state.emuStringFirst));

  for (var i = 0; i < upperText.length; i++) {
    if (upperText[i] == ' ') continue;

    let delta = upperText[i] == '1' ? digitDelta : 0;
    g.drawString(upperText[i], x + xDelta * i + delta, yUp);
  }

  // DOWN TEXT
  let downText = formatStationName(shortenString(state.emuStringEnd));

  for (var i = 0; i < downText.length; i++) {
    if (downText[i] == ' ') continue;

    let delta = downText[i] == '1' ? digitDelta : 0;
    g.drawString(downText[i], x + xDelta * i + delta, yDown);
  }

  // NUMBER CHAR
  g.drawString(state.emuStringNum[1], literX, literY);

  // NUMBER OF ROUTE
  g.setFont(serifFont.deriveFont(isBoldIskra * 1, bigFontSize));

  let numOfNums = state.emuStringNum[0].length;
  for (let i = 0; i < numOfNums; i++) {
    g.drawString(state.emuStringNum[0][i], numX + numDelta * (3 - numOfNums) + numDelta * i, numY);
  }

  /*g.drawString(state.emuStringNum[0][0], numX, numY);
  g.drawString(state.emuStringNum[0][1], numX + 93 , numY);
  g.drawString(state.emuStringNum[0][2], numX + 93 * 2, numY);*/
}

function drawTailEmu(state, train) {
  let g = state.dh2.graphics();

  // ОЧИСТКА
  g.setComposite(AlphaComposite.Clear);
  g.fillRect(0, 0, 430, 200); // Убедитесь, что размер правильный
  g.setComposite(AlphaComposite.SrcOver);

  g.setColor(new Color(1, 0.5, 0));

  // ОТРИСОВКА ТОЛЬКО ЦИФР
  g.setFont(serifFont.deriveFont(isBoldIskra * 1, bigFontSize));

  let numOfNums = state.emuStringNum[0].length;
  for (let i = 0; i < numOfNums; i++) {
    g.drawString(state.emuStringNum[0][i], numX + numDelta * (3 - numOfNums) + numDelta * i, numY);
  }
}


function getEndStation(train) {
  let stationList = train.getThisRoutePlatforms();
  let ret = "";
  ret = stationList[0].destinationName;
  return ret;
}

function getFirstStation(train) {
  let stationList = train.getThisRoutePlatforms();
  let station = stationList[0].station;
  
  let ret = station == null ? "ошибка эму" : station.name;
  return ret;
}


function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
} 

function getRouteNum(train) {
  let stationList = train.getThisRoutePlatforms();
  let ret = stationList[0].route.lightRailRouteNumber + "";
  
  return ret;
}

function shortenString(str) {
    const replacements = {
        "площадь": "пл.",
        "улица": "ул.",
        "проспект": "пр.",
        "бульвар": "б-р.",
        "шоссе": "ш.",
        "переулок": "пер.",
        "набережная": "наб.",
        "проезд": "пр-д",
        "тупик": "туп.",
        "вокзал": "вкз.",
        "аллея": "ал.",
        "тракт": "тр.",
        "микрорайон": "мкр.",
        "квартал": "кв.",
        "район": "р-н.",
        "город": "г.",
        "село": "с.",
        "посёлок": "пос.",
        "поселок": "пос.",
        "жилой комплекс": "жк.",
        "школа": "шк.",
        "станция метро": "м.",
        "метро": "м.",
        "станция": "ст.",
        "имени": "им.",
        "институт": "инст."
    };

    let shortenedStr = str.toLowerCase();

    for (let key in replacements) {
        shortenedStr = (shortenedStr + "").replace(new RegExp(`${key}\\s`, 'g'), replacements[key]);
    }

    shortenedStr = shortenedStr.replace(/"/g, '');
    shortenedStr = shortenedStr.replace(/'/g, '"');

    return shortenedStr.toUpperCase();
}

function splitNum(str) {
  if (str == "") return ["   ", " "];
    let numbers = '';
    let letters = '';

    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            numbers += str[i];
        } else {
            letters += str[i];
        }
    }

    if (numbers.length <= 3 && letters.length <= 1) {
        return [numbers, letters];
    } else {
        return ["   ", " "];
    }
}

function formatStationName(name) {
  if (name.length === 15) {
    return name;
  } else if (name.length > 15) {
    return name.substring(0, 14) + ".";
  } else {
    const dashesCount = 15 - name.length;
    const leftDashes = Math.floor(dashesCount / 2);
    const rightDashes = dashesCount - leftDashes;
    return ' '.repeat(leftDashes) + name;// + ' '.repeat(rightDashes);
  }
}