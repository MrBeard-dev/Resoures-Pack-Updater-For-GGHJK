importPackage(java.awt);

include("font_util.js");
include("js_util.js");

const CONFIG = JSON.parse(Resources.readString(Resources.idr("config.json")));

const SCREEN_COMING_NEXT = "coming_next";
const SCREEN_FULL_ROUTE_MAP = "full_route_map";

const BOUND_FOR = "开往|Bound for";
const NEXT_STATION = "下一站|Next";
const TRANSFER = "换乘|Transfer to";
const PLATFORM = "站台|Platform";
const COMING_NEXT = "即将到达|Coming next";
const THIS_STATION = "已到达|This station";
const ET_CETERA = "等|etc.";
const CURRENT_STATUS = "当前状态|Current status";
const WAITING_FOR_DEPARTURE = "等待出库|Waiting for departure";
const LEAVING_DEPOT = "正在出库|Leaving depot";
const CHANGING_ROUTE = "正在折返/换线|Changing route";
const WARM_TIP = "温馨提示|Warm tip";
const DEPOT_TRAIN = "回库|Depot";
const RETURNING_TO_DEPOT_TIP = "本次列车为回库车，乘客请勿乘坐。|This train is returning to depot.";
const NO_ROUTE_TIP = "本车厂没有设置有效路线。请在铁路仪表板中刷新路线，然后清除列车。|This depot has not set a valid route. Please refresh the route in the Railway Dashboard and then clear the train.";
const DEPOT = "车厂|Depot";
const VERSION_ERROR = "LCD 无法加载。请确保使用 MTR 4.0.0 以下（不含）和 NTE 0.5.0（含）以上版本。|LCD cannot be loaded. Please make sure to use MTR 4.0.0 below and NTE 0.5.0 OR above.";

const THIS_ROUTE_NAME_HEIGHT = 72;
const RIGHT_PART_INTERCHANGE_ROUTE_NAME_HEIGHT = 32;
const HORIZONTAL_SPACING = 15;
const VERTICAL_SPACING = 5;

const WIDTH = 1617; // 231
const HEIGHT = 280; // 40
const LEFT_WIDTH = WIDTH / 3;
const ROUTE_BAR_WIDTH = 10;
const RIGHT_WIDTH = WIDTH - LEFT_WIDTH - ROUTE_BAR_WIDTH;
const ARROW_WIDTH = 30;
const START_X = LEFT_WIDTH / 20;
const START_Y = HEIGHT / 10;

const AUTHOR = "Code by Jeffreyg1228 & Design by Lyt";
const LCD_VERSION = "V2024.5 (Preview)";

const ROBOTO_REGULAR = Resources.readFont(Resources.idr("fonts/roboto/roboto-regular.ttf"));
const ROBOTO_BOLD = Resources.readFont(Resources.idr("fonts/roboto/roboto-bold.ttf"));
const SOURCE_HAN_SANS_CN_REGULAR = Resources.readFont(Resources.idr("fonts/source-han-sans-cn/source-han-sans-cn-regular.otf"));
const SOURCE_HAN_SANS_CN_BOLD = Resources.readFont(Resources.idr("fonts/source-han-sans-cn/source-han-sans-cn-bold.otf"));

function drawScreen(g, routeInfo, nextStationIndex, trainStatus, leftPartUseCjk, rightPartFullRouteMapUseCjk, rightPartScreenType, rightDoor) {
    // 清屏
    g.setColor(Color.WHITE);
    g.fillRect(0, 0, WIDTH, HEIGHT);

    // 绘制 LCD 作者和版本
    const font = ROBOTO_REGULAR.deriveFont(12.0);
    const fm = g.getFontMetrics(font);
    g.setColor(Color.GRAY);
    g.setFont(font);
    g.drawString(AUTHOR, WIDTH - fm.stringWidth(AUTHOR) - 10, HEIGHT - 2 * fm.getHeight());
    g.drawString(LCD_VERSION, WIDTH - fm.stringWidth(LCD_VERSION) - 10, HEIGHT - fm.getHeight());

    if (trainStatus == STATUS_NO_ROUTE || routeInfo == null) {
        drawBlueScreen(g, NO_ROUTE_TIP);
        return;
    }

    const routeName = routeInfo.routeName;
    const routeNumber = TextUtil.getExtraParts(routeName).replaceAll(".*\\{([^}]*)}.*", "$1"); // 表示 routeName “||” 后的 “{}”中内容；如果不含“{}”，则为 TextUtil.getExtraParts(routeName) 的值
    const routeColor = routeInfo.routeColor;
    const destination = routeInfo.destination;
    const depotName = routeInfo.depotName;
    const showCjk = !TextUtil.getCjkParts(routeName).isEmpty(); // showCjk 用于右屏的不变信息（例如“即将到达”“已到达”）

    // 路线色条
    g.setColor(routeColor);
    g.fillRect(LEFT_WIDTH, 0, ROUTE_BAR_WIDTH, HEIGHT);

    drawLeftPart(g, leftPartUseCjk, routeName, routeNumber, destination, routeColor, trainStatus == STATUS_ARRIVED ? nextStationIndex + 1 : nextStationIndex, trainStatus, routeInfo.stationInfoList); // 绘制左屏
    // 根据列车状态绘制右屏内容
    if (trainStatus == STATUS_ARRIVED) {
        drawRightPartThisStation(g, showCjk, routeColor, routeInfo.stationInfoList[nextStationIndex], rightDoor);
    } else if (trainStatus == STATUS_WAITING_FOR_DEPARTURE) {
        drawRightPartFullRouteMap(g, rightPartFullRouteMapUseCjk, rightDoor, routeColor, nextStationIndex, routeInfo.stationInfoList);
    } else if (trainStatus == STATUS_RETURNING_TO_DEPOT) {
        drawRightPartComingNextScreen(g, routeColor, showCjk, depotName, nextStationIndex, routeInfo.stationInfoList);
    } else {
        if (rightPartScreenType == SCREEN_COMING_NEXT) {
            drawRightPartComingNextScreen(g, routeColor, showCjk, depotName, nextStationIndex, routeInfo.stationInfoList);
        } else if (rightPartScreenType == SCREEN_FULL_ROUTE_MAP) {
            drawRightPartFullRouteMap(g, rightPartFullRouteMapUseCjk, rightDoor, routeColor, nextStationIndex, routeInfo.stationInfoList);
        }
    }
}

function drawLeftPart(g, useCjk, routeName, routeNumber, destination, routeColor, nextStationIndex, trainStatus, stationInfoList) {
    const routeDrawName = (routeNumber == null || routeNumber.isEmpty() || routeNumber == TextUtil.getExtraParts(routeName)) ? getMatching(routeName, useCjk) : routeNumber;

    g.setColor(routeColor);
    g.fillRect(0, 0, LEFT_WIDTH, HEIGHT);
    g.setColor(new Color(getRGBAValue(0, 0, 0, 128), true));
    g.fillRect(0, 0, LEFT_WIDTH, HEIGHT);

    let font;
    let fm;
    let x = START_X;
    let y = START_Y;

    // 绘制当前路线名称
    let width = drawRouteName(g, START_X, START_Y, LEFT_WIDTH / 2, THIS_ROUTE_NAME_HEIGHT, LEFT_WIDTH, routeDrawName, routeColor, false, false, false, Color.WHITE);

    // 绘制“开往”/“当前状态”字符
    font = (useCjk ? SOURCE_HAN_SANS_CN_REGULAR : ROBOTO_REGULAR).deriveFont(useCjk ? 20.0 : 24.0);
    fm = g.getFontMetrics(font);
    x += width + HORIZONTAL_SPACING;
    y += fm.getAscent();
    g.setColor(Color.LIGHT_GRAY);
    g.setFont(font);
    g.drawString(getMatching(BOUND_FOR, useCjk), x, y);

    // 绘制终点站名称
    let destinationNameToDraw = getMatching(destination, useCjk);
    if (useCjk && destinationNameToDraw.length() > 8 || !useCjk && destinationNameToDraw.length() > 14) {
        font = (useCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(useCjk ? 28.0 : 36.0);
    } else {
        font = (useCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(36.0);
    }
    fm = g.getFontMetrics(font);
    if (useCjk || destinationNameToDraw.length() > 14) {
        y += fm.getAscent();
    } else {
        y = START_Y + THIS_ROUTE_NAME_HEIGHT - fm.getDescent();
    }
    g.setColor(Color.WHITE);
    g.setFont(font);
    y += drawLongText(g, destinationNameToDraw, x, y, LEFT_WIDTH - x - HORIZONTAL_SPACING);

    // 绘制“下一站”/“列车状态”/“温馨提示”字样
    font = (useCjk ? SOURCE_HAN_SANS_CN_REGULAR : ROBOTO_REGULAR).deriveFont(28.0);
    fm = g.getFontMetrics(font);
    x = START_X;
    y += VERTICAL_SPACING + fm.getAscent();
    g.setColor(Color.LIGHT_GRAY);
    g.setFont(font);
    let strToDraw;
    if (nextStationIndex >= stationInfoList.length || trainStatus == STATUS_RETURNING_TO_DEPOT) {
        strToDraw = getMatching(WARM_TIP, useCjk);
    } else if (trainStatus == STATUS_ON_ROUTE || trainStatus == STATUS_ARRIVED) {
        strToDraw = getMatching(NEXT_STATION, useCjk);
    } else {
        strToDraw = getMatching(CURRENT_STATUS, useCjk);
    }
    g.drawString(strToDraw, x, y);

    if (nextStationIndex < stationInfoList.length && (trainStatus == STATUS_ON_ROUTE || trainStatus == STATUS_ARRIVED)) {
        let interchangeRoutesToDraw = stationInfoList[nextStationIndex].interchangeInfo;
        if (interchangeRoutesToDraw != null && interchangeRoutesToDraw.length > 0) {
            // 绘制“换乘”字样
            width = fm.stringWidth(strToDraw);
            font = (useCjk ? SOURCE_HAN_SANS_CN_REGULAR : ROBOTO_REGULAR).deriveFont(28.0);
            fm = g.getFontMetrics(font);
            x += width + HORIZONTAL_SPACING;
            g.setColor(Color.WHITE);
            g.setFont(font);
            strToDraw = getMatching(TRANSFER, useCjk);
            g.drawString(strToDraw, x, y);

            // 绘制换乘信息
            width = fm.stringWidth(strToDraw);
            x += width + 10;
            const etCeteraWidth = g.getFontMetrics((useCjk ? SOURCE_HAN_SANS_CN_REGULAR : ROBOTO_REGULAR).deriveFont(28.0)).stringWidth(getMatching(ET_CETERA, useCjk));
            for (let interchangeRoute of interchangeRoutesToDraw) {
                if (interchangeRoute != null) {
                    width = drawRouteName(g, x, useCjk ? y - fm.getAscent() * 4 / 5 : y - fm.getAscent(), 0, useCjk ? (fm.getAscent() + fm.getDescent()) * 4 / 5 : fm.getAscent() + fm.getDescent(), LEFT_WIDTH - etCeteraWidth, getMatching(interchangeRoute.name, useCjk) , interchangeRoute.color, false, false, interchangeRoute.isConnectingStation, Color.WHITE);
                    if (width == 0) {
                        // 绘制“等”字符
                        font = (useCjk ? SOURCE_HAN_SANS_CN_REGULAR : ROBOTO_REGULAR).deriveFont(28.0);
                        g.setFont(font);
                        g.setColor(Color.WHITE);
                        g.drawString(getMatching(ET_CETERA, useCjk), x, y);
                        break;
                    }
                    x += width + 10;
                }
            }
        }
    }

    // 绘制下一站名称/列车状态
    if (nextStationIndex >= stationInfoList.length || trainStatus == STATUS_RETURNING_TO_DEPOT) {
        strToDraw = getMatching(RETURNING_TO_DEPOT_TIP, useCjk);
    } else if (trainStatus == STATUS_ON_ROUTE || trainStatus == STATUS_ARRIVED) {
        strToDraw = getMatching(stationInfoList[nextStationIndex].stationName, useCjk);
    } else if (trainStatus == STATUS_WAITING_FOR_DEPARTURE) {
        strToDraw = getMatching(WAITING_FOR_DEPARTURE, useCjk);
    } else if (trainStatus == STATUS_LEAVING_DEPOT) {
        strToDraw = getMatching(LEAVING_DEPOT, useCjk);
    } else if (trainStatus == STATUS_CHANGING_ROUTE) {
        strToDraw = getMatching(CHANGING_ROUTE, useCjk);
    }
    if (useCjk && strToDraw.length() > 8 || !useCjk && strToDraw.length() > 14) {
        font = (useCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(useCjk ? 42.0 : 48.0);
    } else {
        font = (useCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(useCjk ? 62.0 : 56.0);
    }
    fm = g.getFontMetrics(font);
    x = START_X;
    y += VERTICAL_SPACING + fm.getAscent();
    g.setColor(Color.WHITE);
    g.setFont(font);
    drawLongText(g, strToDraw, x, y, LEFT_WIDTH - x - HORIZONTAL_SPACING);
}

function drawRightPartThisStation(g, showCjk, routeColor, thisStation, rightDoor) {
    let font;
    let fm;
    const startX = LEFT_WIDTH + ROUTE_BAR_WIDTH + HORIZONTAL_SPACING * 2;
    const startY = START_Y / 4;
    let x = startX;
    let y = startY;

    // 绘制“已到达” CJK
    g.setColor(Color.DARK_GRAY);
    if (showCjk) {
        font = SOURCE_HAN_SANS_CN_REGULAR.deriveFont(28.0);
        fm = g.getFontMetrics(font);
        y += fm.getAscent();
        g.setFont(font);
        g.drawString(getMatching(THIS_STATION, true), x, y);

        // 绘制“已到达”非 CJK
        y += fm.getDescent();
    }

    // 绘制“已到达”非 CJK
    font = ROBOTO_REGULAR.deriveFont(24.0);
    fm = g.getFontMetrics(font);
    g.setFont(font);
    y += fm.getAscent();
    g.drawString(getMatching(THIS_STATION, false), x, y);

    // 绘制 CJK 当前站名（站名只含非 CJK 时，则绘制非 CJK 当前站名）
    const hasCjk = !TextUtil.getCjkParts(thisStation.stationName).isEmpty();
    y = startY;
    let strToDraw = getMatching(thisStation.stationName, hasCjk);
    font = (hasCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(48.0);
    fm = g.getFontMetrics(font);
    g.setFont(font);
    g.setColor(Color.BLACK);
    x = startX + (RIGHT_WIDTH - HORIZONTAL_SPACING * 4 - fm.stringWidth(getMatching(thisStation.stationName, true))) / 2;
    y += fm.getAscent();
    g.drawString(strToDraw, x, y);
    y += fm.getDescent();

    // 站名同时含 CJK 和非 CJK 时，绘制非 CJK 当前站名
    strToDraw = TextUtil.getNonCjkParts(thisStation.stationName);
    if (hasCjk && !strToDraw.isEmpty()) {
        font = ROBOTO_BOLD.deriveFont(34.0);
        fm = g.getFontMetrics(font);
        g.setFont(font);
        g.setColor(Color.GRAY);
        x = startX + (RIGHT_WIDTH - HORIZONTAL_SPACING * 4 - fm.stringWidth(getMatching(thisStation.stationName, false))) / 2;
        y += fm.getAscent();
        g.drawString(strToDraw, x, y);
    }

    y += VERTICAL_SPACING * 3;
    const width = (RIGHT_WIDTH - HORIZONTAL_SPACING * 4) / 2; // 梯形的长
    const height = 22; // 梯形的高
    // 绘制梯形左端
    x = startX;
    let xPoints = rightDoor ? [x + 15, x, x + width, x + width] : [x, x, x + width, x + width];
    let yPoints = [y, y + height, y + height, y];
    g.setColor(rightDoor ? routeColor : Color.LIGHT_GRAY);
    g.fillPolygon(xPoints, yPoints, 4);
    // 绘制梯形右端
    x += width;
    xPoints = rightDoor ? [x, x, x + width, x + width] : [x, x, x + 15 + width, x + width];
    g.setColor(rightDoor ? Color.LIGHT_GRAY : routeColor);
    g.fillPolygon(xPoints, yPoints, 4);

    if (thisStation.interchangeInfo != null && thisStation.interchangeInfo.length > 0) {
        x = startX;
        y += height + VERTICAL_SPACING * 3 + RIGHT_PART_INTERCHANGE_ROUTE_NAME_HEIGHT;
        let descent = 0;
        // 绘制“换乘”字样 CJK
        g.setColor(Color.BLACK);
        if (showCjk) {
            font = SOURCE_HAN_SANS_CN_REGULAR.deriveFont(24.0);
            fm = g.getFontMetrics(font);
            g.setFont(font);
            strToDraw = getMatching(TRANSFER, true);
            descent = fm.getDescent();
            g.drawString(strToDraw, x, y - descent);
            x += fm.stringWidth(strToDraw) + 5;
        }

        // 绘制“换乘”字样非 CJK
        font = ROBOTO_REGULAR.deriveFont(22.0);
        fm = g.getFontMetrics(font);
        g.setFont(font);
        strToDraw = getMatching(TRANSFER, false);
        g.drawString(strToDraw, x, y - (descent == 0 ? fm.getDescent() : descent));
        x += fm.stringWidth(strToDraw) + 10;

        // 绘制换乘信息
        const etCeteraWidth = g.getFontMetrics(SOURCE_HAN_SANS_CN_REGULAR.deriveFont(24.0)).stringWidth(getMatching(ET_CETERA, true)) + 5 + g.getFontMetrics(ROBOTO_REGULAR.deriveFont(22.0)).stringWidth(getMatching(ET_CETERA, false));
        for (let interchangeRoute of thisStation.interchangeInfo) {
            if (interchangeRoute != null) {
                let routeNameWidth = drawRouteName(g, x, y - RIGHT_PART_INTERCHANGE_ROUTE_NAME_HEIGHT, 0, RIGHT_PART_INTERCHANGE_ROUTE_NAME_HEIGHT, WIDTH - HORIZONTAL_SPACING * 2 - etCeteraWidth, formatName(interchangeRoute.name), interchangeRoute.color, false, false, interchangeRoute.isConnectingStation, Color.BLACK);
                if (routeNameWidth == 0) {
                    // 绘制“等”字符 CJK
                    g.setColor(Color.BLACK);
                    if (showCjk) {
                        font = SOURCE_HAN_SANS_CN_REGULAR.deriveFont(24.0);
                        fm = g.getFontMetrics(font);
                        g.setFont(font);
                        g.drawString(getMatching(ET_CETERA, true), x, y - descent);
                        x += fm.stringWidth(getMatching(ET_CETERA, true)) + 5;
                    }
                    // 绘制“等”字符非 CJK
                    font = ROBOTO_REGULAR.deriveFont(22.0);
                    fm = g.getFontMetrics(font);
                    g.setFont(font);
                    g.drawString(getMatching(ET_CETERA, false), x, y - (descent == 0 ? fm.getDescent() : descent));
                    break;
                }
                x += routeNameWidth + 10;
            }
        }
    }

    // 获取各字符宽高
    const platformNameFont = ROBOTO_BOLD.deriveFont(42.0);
    const platformNameWidth = g.getFontMetrics(platformNameFont).stringWidth(thisStation.platformName);
    const platformNameHeight = g.getFontMetrics(platformNameFont).getAscent();
    const platformCjkFont = SOURCE_HAN_SANS_CN_BOLD.deriveFont(22.0);
    const platformCjkWidth = showCjk ? g.getFontMetrics(platformCjkFont).stringWidth(getMatching(PLATFORM, true)) : 0;
    const platformCjkHeight = showCjk ? g.getFontMetrics(platformCjkFont).getAscent() : 0;
    const platformNonCjkFont = ROBOTO_BOLD.deriveFont(16.0);
    const platformNonCjkWidth = g.getFontMetrics(platformNonCjkFont).stringWidth(getMatching(PLATFORM, false));
    const platformNonCjkHeight = g.getFontMetrics(platformNonCjkFont).getAscent();

    // 绘制站台矩形框
    const platformRectWidth = Math.max(Math.max(platformNameWidth, platformCjkWidth), platformNonCjkWidth) + HORIZONTAL_SPACING;
    const platformRectHeight = platformNameHeight + platformCjkHeight + platformNonCjkHeight + VERTICAL_SPACING * 2;
    x = WIDTH - HORIZONTAL_SPACING * 2 - platformRectWidth;
    y = startY;
    g.setColor(Color.GRAY);
    g.fillRoundRect(x, y, platformRectWidth, platformRectHeight, 5, 5);

    // 绘制站台编号
    g.setColor(Color.WHITE);
    g.setFont(platformNameFont);
    y += platformNameHeight;
    g.drawString(thisStation.platformName, x + (platformRectWidth - platformNameWidth) / 2, y);

    // 绘制“站台”字样 CJK
    if (showCjk) {
        g.setFont(platformCjkFont);
        y += platformCjkHeight;
        g.drawString(getMatching(PLATFORM, true), x + (platformRectWidth - platformCjkWidth) / 2, y);
    }

    // 绘制“站台”字样非 CJK
    y += VERTICAL_SPACING;
    g.setFont(platformNonCjkFont);
    y += platformNonCjkHeight;
    g.drawString(getMatching(PLATFORM, false), x + (platformRectWidth - platformNonCjkWidth) / 2, y);
}

function drawRightPartComingNextScreen(g, routeColor, showCjk, depotName, nextStationIndex, stationInfoList) {
    let font;
    let fm;
    let x = LEFT_WIDTH + ROUTE_BAR_WIDTH + HORIZONTAL_SPACING * 2;
    let y = START_Y / 2;

    // 绘制“即将到达” CJK
    g.setColor(Color.DARK_GRAY);
    if (showCjk) {
        font = SOURCE_HAN_SANS_CN_REGULAR.deriveFont(28.0);
        fm = g.getFontMetrics(font);
        y += fm.getAscent();
        g.setFont(font);
        g.drawString(getMatching(COMING_NEXT, true), x, y);

        // 绘制“即将到达”非 CJK
        y += fm.getDescent();
    }

    // 绘制“即将到达”非 CJK
    font = ROBOTO_REGULAR.deriveFont(24.0);
    fm = g.getFontMetrics(font);
    g.setFont(font);
    y += fm.getAscent();
    g.drawString(getMatching(COMING_NEXT, false), x, y);

    let edgeHeight = HEIGHT / 10; // 顶部和底部箭头的高度
    let height = (HEIGHT - edgeHeight * 2) / 4; // 分割线之间的高
    let startX = WIDTH / 2;
    x = startX;
    y = HEIGHT;

    // 绘制底端矩形
    g.setColor(Color.GRAY);
    g.fillRect(startX, y - edgeHeight - 2 - 5, ARROW_WIDTH, edgeHeight + 2 + 5);
    y -= edgeHeight + 2;
    let skipTop = false;

    for (let i = nextStationIndex - 1; i < Math.min(nextStationIndex + 3, stationInfoList.length); i++) {
        let currentStation = i == -1 ? null : stationInfoList[i];

        // 绘制箭头（当最后一站时箭头顶端水平）
        if (i == stationInfoList.length - 1) {
            let xPoints = [x, x, x + ARROW_WIDTH / 2, x + ARROW_WIDTH, x + ARROW_WIDTH];
            let yPoints = [y - height, y, y - 5, y, y - height];
            g.setColor(routeColor);
            g.fillPolygon(xPoints, yPoints, 5);
            skipTop = true;
        } else {
            let xPoints = [x, x, x + ARROW_WIDTH / 2, x + ARROW_WIDTH, x + ARROW_WIDTH, x + ARROW_WIDTH / 2];
            let yPoints = [y - height, y, y - 5, y, y - height, y - height - 5];
            g.setColor(i < nextStationIndex ? Color.GRAY : routeColor);
            g.fillPolygon(xPoints, yPoints, 6);
        }

        // 在箭头中心绘制圆
        const radius = 7;
        g.setColor(Color.WHITE);
        g.fillOval(x + ARROW_WIDTH / 2 - radius, y - 5 - height / 2 - radius, radius * 2, radius * 2);

        // 在各站底部绘制分割线（上一站除外）
        x += ARROW_WIDTH + HORIZONTAL_SPACING * 2;
        if (i >= nextStationIndex) {
            g.setColor(Color.GRAY);
            g.drawLine(x, y, WIDTH - HORIZONTAL_SPACING, y);
        }

        if (i == -1 && !CONFIG.showDepotName) { // 是否绘制车厂名
            x = startX;
            y -= height + 2;
            continue;
        }

        // 绘制 CJK 站名（站名只含非 CJK 时，则绘制非 CJK 站名）
        const hasCjk = !TextUtil.getCjkParts(i == -1 ? depotName : currentStation.stationName).isEmpty();
        let strToDraw = hasCjk ? TextUtil.getCjkParts(i == -1 ? depotName : currentStation.stationName) : TextUtil.getNonCjkParts(currentStation.stationName);
        let fontSize = calculateMaxFontSize(g, hasCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD, strToDraw, (WIDTH - x) / 2, height, 0, 0, false);
        font = (hasCjk ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(fontSize);
        fm = g.getFontMetrics(font);
        g.setFont(font);
        g.setColor(i == nextStationIndex ? Color.RED : Color.BLACK);
        g.drawString(strToDraw, x, y - fm.getDescent());

        // 站名同时含 CJK 和非 CJK 时，绘制非 CJK 站名
        x += fm.stringWidth(strToDraw) + HORIZONTAL_SPACING;
        strToDraw = TextUtil.getNonCjkParts(i == -1 ? depotName : currentStation.stationName);
        if (hasCjk && !strToDraw.isEmpty()) {
            font = ROBOTO_BOLD.deriveFont(calculateMaxFontSize(g, ROBOTO_BOLD, strToDraw, (WIDTH - x) / 2, height, 0, fontSize * 2 / 3, false));
            fm = g.getFontMetrics(font);
            g.setFont(font);
            g.setColor(i == nextStationIndex ? Color.RED : Color.BLACK);
            g.drawString(strToDraw, x, y - fm.getDescent());
            x += fm.stringWidth(strToDraw);
        }

        // 绘制换乘信息
        if (currentStation != null && currentStation.interchangeInfo != null) {
            let criticalX = x;
            x = WIDTH - HORIZONTAL_SPACING;
            for (let j = currentStation.interchangeInfo.length - 1; j >= 0; j--) {
                let interchangeRoute = currentStation.interchangeInfo[j];
                if (interchangeRoute != null && i >= 0) {
                    let width = drawRouteName(g, x, y - fm.getDescent(), 0, RIGHT_PART_INTERCHANGE_ROUTE_NAME_HEIGHT, criticalX, formatName(interchangeRoute.name), i < nextStationIndex ? Color.DARK_GRAY : interchangeRoute.color, false, true, interchangeRoute.isConnectingStation, Color.BLACK);
                    if (width == 0) {
                        // 绘制省略号
                        font = ROBOTO_REGULAR.deriveFont(28.0);
                        fm = g.getFontMetrics(font);
                        g.setFont(font);
                        g.setColor(Color.BLACK);
                        g.drawString("...", x - fm.stringWidth("..."), y - fm.getDescent());
                        break;
                    }
                    x -= width + 10;
                }
            }
        }

        x = startX;
        y -= height + 2;
    }

    // 绘制顶端箭头
    if (!skipTop) {
        let xPoints = [startX, startX, startX + ARROW_WIDTH / 2, startX + ARROW_WIDTH, startX + ARROW_WIDTH];
        let yPoints = [y - edgeHeight, y, y - 5, y, y - edgeHeight];
        g.setColor(routeColor);
        g.fillPolygon(xPoints, yPoints, 5);
    }
}

function drawRightPartFullRouteMap(g, useCjk, rightDoor, routeColor, nextStationIndex, stationInfoList) {
    let platformCount = stationInfoList.length;

    let x = LEFT_WIDTH + ROUTE_BAR_WIDTH + HORIZONTAL_SPACING;

    const rightWidth = WIDTH - HORIZONTAL_SPACING - x - platformCount * 2; // 路线图区域的总宽度（考虑2像素空隙）
    const width = rightWidth / platformCount; // 每个平行四边形的宽
    const height = 22; // 每个平行四边形的高

    for (let i = rightDoor ? platformCount - 1 : 0; rightDoor ? i >= 0 : i < platformCount; i = i + (rightDoor ? -1 : 1)) { // 绘制每一个平行四边形
        let y = START_Y;

        let hasPassed = i < nextStationIndex; // 已经过车站灰显
        let nextStation = i == nextStationIndex;

        // 绘制平行四边形
        let xPoints, yPoints;
        if (i == 0) { // 列车前进方向的尾端车站画梯形
            xPoints = rightDoor ? [x + 15, x, x + width, x + width] : [x, x, x + width, x + 15 + width];
        } else {
            xPoints = [x + 15, x, x + width, x + 15 + width];
        }
        yPoints = [START_Y, START_Y + height, START_Y + height, START_Y];
        g.setColor(nextStation ? Color.RED : hasPassed ? Color.LIGHT_GRAY : routeColor);
        g.fillPolygon(xPoints, yPoints, 4);

        // TODO 绘制预计时间

        // 绘制站名
        let strToDraw = getMatching(stationInfoList[i].stationName, useCjk);
        let font = ((useCjk && TextUtil.isCjk(strToDraw)) ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(18.0);
        let fm = g.getFontMetrics(font);
        g.setFont(font);
        g.setColor(nextStation ? Color.RED : hasPassed ? Color.DARK_GRAY : Color.BLACK);

        y += height + VERTICAL_SPACING;
        if (useCjk && TextUtil.isCjk(strToDraw)) {
            for (let k = 0; k < strToDraw.length(); k++) {
                y += fm.getAscent();
                g.drawString(strToDraw.substring(k, k + 1), x + (width - fm.charWidth(strToDraw.charAt(k))) / 2, y); // BUG 似乎不能使用 java.lang.String.valueOf(strToDraw.charAt(k))
            }
        } else {
            let defaultAt = g.getTransform();
            let at = new AffineTransform();
            at.setToRotation(90 * Math.PI / 180, x + (width - fm.getAscent()) / 2, y);
            g.transform(at);

            g.drawString(strToDraw, x + (width - fm.getAscent()) / 2, y);

            y += fm.stringWidth(strToDraw);
            g.setTransform(defaultAt);
        }

        // 绘制换乘信息
        if (stationInfoList[i].interchangeInfo != null) {
            y += VERTICAL_SPACING * 2;
            for (let interchangeRoute of stationInfoList[i].interchangeInfo) {
                if (interchangeRoute != null) {
                    y += drawRouteName(g, x + width / 2, y, CONFIG.allowOverflow ? 0 : width, RIGHT_PART_INTERCHANGE_ROUTE_NAME_HEIGHT * 2 / 3, 0, getMatching(interchangeRoute.name, useCjk), hasPassed ? Color.DARK_GRAY : interchangeRoute.color, true, false, interchangeRoute.isConnectingStation, Color.BLACK) + 5;
    
                    // 对于换乘路线，在平行四边形底部绘制细线
                    g.setColor(hasPassed ? Color.GRAY : darkenColor(routeColor, 0.4));
                    if (i == 0 && rightDoor) { // 右侧屏
                        xPoints[0] = xPoints[1] + 4;
                    } else if (i == 0) { // 左侧屏
                        xPoints[3] = xPoints[2] + 4;
                    } else {
                        xPoints[0] = xPoints[1] + 4;
                        xPoints[3] = xPoints[2] + 4;
                    }
                    yPoints[0] = yPoints[1] - 5;
                    yPoints[3] = yPoints[2] - 5;
                    g.fillPolygon(xPoints, yPoints, 4);
                }
            }
        }

        x += width + 2;
    }
}

function drawBlueScreen(g, strToDraw) {
    let x = HORIZONTAL_SPACING * 2;
    let y = VERTICAL_SPACING * 4;

    g.setColor(rgbToColor(0, 0, 170));
    g.fillRect(0, 0, WIDTH, HEIGHT);

    let font = ROBOTO_BOLD.deriveFont(66.0);
    let fm = g.getFontMetrics(font);
    g.setFont(font);
    g.setColor(Color.WHITE);
    y += fm.getAscent();
    g.drawString(":(", x, y);
    y += fm.getDescent();

    font = SOURCE_HAN_SANS_CN_BOLD.deriveFont(calculateMaxFontSize(g, SOURCE_HAN_SANS_CN_BOLD, getMatching(strToDraw, true), WIDTH - HORIZONTAL_SPACING * 4, 0, 0, 0, false));
    fm = g.getFontMetrics(font);
    g.setFont(font);
    y += fm.getAscent();
    g.drawString(getMatching(strToDraw, true), x, y);
    y += fm.getDescent();

    font = ROBOTO_BOLD.deriveFont(calculateMaxFontSize(g, ROBOTO_BOLD, getMatching(strToDraw, false), WIDTH - HORIZONTAL_SPACING * 4, 0, 0, 0, false));
    fm = g.getFontMetrics(font);
    g.setFont(font);
    y += fm.getAscent();
    g.drawString(getMatching(strToDraw, false), x, y);
    y += fm.getDescent();

    g.setColor(Color.GRAY);
    font = SOURCE_HAN_SANS_CN_BOLD.deriveFont(16.0);
    fm = g.getFontMetrics(font);
    g.setFont(font);
    y += VERTICAL_SPACING * 2 + fm.getAscent();
    g.drawString("LCD " + AUTHOR + ". 检查更新 (For Updates): https://www.mtrbbs.top/thread-5656-1-1.html; 使用文档 (For Document): https://mtr.jeffreyg1228.me/", x, y);
}

/**
 * 绘制路线名称。
 *
 * @param x            当 vertical 为 false 时，表示路线框顶点的 x 坐标；当 vertical 为 true 时，表示路线框上边沿中点的 x 坐标。当 right 为 false 时，表示左上顶点；当 right 为 true 时，表示右上顶点。
 * @param y            路线框顶点的 y 坐标。当 right 为 false 时，表示左上顶点；当 right 为 true 时，表示右下顶点。
 * @param width        路线框的最大宽度。传入 0 则不限制。
 * @param height       路线框的最大高度。传入 0 则不限制。
 * @param criticalX    当 right 为 false 时，如果 x 与本路线框宽度之和大于此值，则不绘制并返回 0；当 right 为 true 时，如果 x 与本路线框宽度之差小于此值，则不绘制并返回 0。仅在 vertical 为 false 时有效。
 * @param vertical     是否处于纵向排版模式。主要影响形参 x 的处理和返回值。
 * @param right        是否处于右对齐排版模式。主要影响形参 x、y 和 criticalX 的处理。
 * @param outline      是否绘制空心矩形。
 * @param outlineColor 空心矩形的路线字体颜色。
 * @return 当 vertical 为 false 时，返回路线框的宽度（可能为 0，表示已绘制不下更多路线信息）；当 vertical 为 true 时，返回路线框的高度。
 */
function drawRouteName(g, x, y, width, height, criticalX, routeName, routeColor, vertical, right, outline, outlineColor) {
    let font = (TextUtil.isCjk(routeName) ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD).deriveFont(calculateMaxFontSize(g, TextUtil.isCjk(routeName) ? SOURCE_HAN_SANS_CN_BOLD : ROBOTO_BOLD, routeName, (!vertical && width > HORIZONTAL_SPACING) ? width - HORIZONTAL_SPACING : width, (!vertical && height > HORIZONTAL_SPACING) ? height - VERTICAL_SPACING : height, 0, 0, false));
    let fm = g.getFontMetrics(font);
    height = height == 0 ? fm.getHeight() : height;
    width = width == 0 ? Math.max(fm.stringWidth(routeName) + 10, height) : Math.min(Math.max(fm.stringWidth(routeName) + 10, height), width);

    if (!vertical && (right ? x - width < criticalX : x + width > criticalX)) {
        return 0;
    }

    x = vertical ? x - width / 2 : x;
    x = right ? x - width : x;
    y = right ? y - height : y;

    // 画矩形
    g.setColor(routeColor);
    if (outline) {
        g.drawRoundRect(x, y, width, height, 5, 5);
    } else {
        g.fillRoundRect(x, y, width, height, 5, 5);
    }

    // 在矩形中央画文字
    g.setColor(outline ? outlineColor : isLightColor(routeColor) ? Color.BLACK : Color.WHITE);
    g.setFont(font);
    x += (width - fm.stringWidth(routeName)) / 2;
    y += (height - fm.getHeight()) / 2 + fm.getAscent();
    g.drawString(routeName, x, y);

    return vertical ? height : width;
}