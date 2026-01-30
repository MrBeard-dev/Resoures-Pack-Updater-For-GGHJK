importPackage(java.awt);
importPackage(java.awt.geom);

include(Resources.id("mtrsteamloco:scripts/display_helper.js"));
include("draw.js");
include("mtr_util.js");

const leftPos = getCubeVertices([0.846,2.072,0.688], [0.658,2.072,-0.688],[0.752,2.072,0],0,-180,-50);
const rightPos = getCubeVertices([-0.846,2.072,-0.688],[-0.658,2.072,0.688], [-0.752,2.072,0],0,180,50);

let slotCfg = {
    "version": 1,
    "texSize": [1617, 1024],
    "slots": [
        {
            "name": "lcd_door_left",
            "texArea": [0, 0, 1617, 280],
            "pos": [
                leftPos
            ],
            "offsets": [[0, 0, -10], [0, 0, -5],[0, 0, 0], [0, 0, 5],[0, 0, 10]]
        },
        {
            "name": "lcd_door_right",
            "texArea": [0, 512, 1617, 280],
            "pos": [
                rightPos
            ],
            "offsets": [[0, 0, -10], [0, 0, -5],[0, 0, 0], [0, 0, 5],[0, 0, 10]]
        }
    ]
};

var dhBase = new DisplayHelper(slotCfg);

var meetNTEVersionRequirement = Resources.getNTEVersionInt() >= 500;
var isMTR4 = Resources.getMTRVersion().includes("4.0");

function create(ctx, state, train) {
    // state.pisRateLimit = new RateLimit(0.1);
    state.leftPartUseCjkTracker = new CycleTracker([true, 5, false, 5]);
    state.dh = dhBase.create();
}

function dispose(ctx, state, train) {
    state.dh.close();
}

function render(ctx, state, train) {
    for (let i = 0; i < train.trainCars(); i++) {
        ctx.drawCarModel(state.dh.model, i, null);
    }

    if (!meetNTEVersionRequirement || isMTR4) {
        let g = state.dh.graphicsFor("lcd_door_left");
        drawBlueScreen(g, VERSION_ERROR);

        g = state.dh.graphicsFor("lcd_door_right");
        drawBlueScreen(g, VERSION_ERROR);

        state.dh.upload();

        return;
    }

    state.leftPartUseCjkTracker.tick();
    if (state.rightPartScreenTypeTracker != null) {
        state.rightPartScreenTypeTracker.tick();
    }
    if (state.rightPartFullRouteMapUseCjkTracker != null) {
        state.rightPartFullRouteMapUseCjkTracker.tick();
    }

    if (train.shouldRender() && train.shouldRenderDetail() && shouldRepaintLCD(state, train)) {
        if (state.trainStatus == STATUS_ARRIVED || state.trainStatus == STATUS_WAITING_FOR_DEPARTURE || state.trainStatus == STATUS_RETURNING_TO_DEPOT || state.trainStatus == STATUS_NO_ROUTE) { // 部分情况下右屏不切换。STATUS_ARRIVED: 只显示“已到达”屏幕；STATUS_WAITING_FOR_DEPARTURE: 只显示全线信息屏幕；STATUS_RETURNING_TO_DEPOT: 只显示“即将到达”屏幕；STATUS_NO_ROUTE: 只显示蓝屏。
            state.rightPartScreenTypeTracker = undefined;
        } else if (state.rightPartScreenTypeTracker == null) { // 否则，如果 state 中不存在 rightPartScreenTypeTracker，则初始化
            state.rightPartScreenTypeTracker = new CycleTracker([SCREEN_COMING_NEXT, 5, SCREEN_FULL_ROUTE_MAP, 10]);
            state.rightPartScreenTypeTracker.tick();
        }

        if ((state.rightPartScreenTypeTracker == null && state.trainStatus != STATUS_WAITING_FOR_DEPARTURE) || (state.rightPartScreenTypeTracker != null && state.rightPartScreenTypeTracker.stateNow() != SCREEN_FULL_ROUTE_MAP)) { // 如果右屏不切换（排除 STATUS_WAITING_FOR_DEPARTURE）或当前右屏不为全线线路图，不切换右屏 CJK。
            state.rightPartFullRouteMapUseCjkTracker = undefined;
        } else if (state.rightPartFullRouteMapUseCjkTracker == null) {
            state.rightPartFullRouteMapUseCjkTracker = new CycleTracker([true, 5, false, 5]);
            state.rightPartFullRouteMapUseCjkTracker.tick();
        }

        let platformInfo;
        switch (state.trainStatus) {
            case STATUS_NO_ROUTE:
                platformInfo = null;
                break;
            case STATUS_RETURNING_TO_DEPOT:
                platformInfo = train.getAllPlatforms().get(train.getAllPlatforms().size() - 1);
                break;
            case STATUS_WAITING_FOR_DEPARTURE:
                platformInfo = train.getAllPlatforms().get(0);
                break;
            case STATUS_CHANGING_ROUTE:
                platformInfo = train.getAllPlatforms().get(train.getAllPlatformsNextIndex());
                break;
            default:
                platformInfo = train.getThisRoutePlatforms().get(train.getThisRoutePlatformsNextIndex());
                break;
        }
        const routeInfo = getRouteInfo(train, state.trainStatus, platformInfo);
        if (!checkJsonProperty(state, "routeInfo", routeInfo)) { // 如果 state 中不存在 routeInfo 或 routeInfo 改变
            print("列车 " + train.id() + " 的当前路线信息：" + JSON.stringify(routeInfo));
            state.routeInfo = routeInfo;
        }

        let leftPartUseCjk = java.lang.Boolean.parseBoolean(state.leftPartUseCjkTracker.stateNow());
        let rightPartFullRouteMapUseCjk = state.rightPartFullRouteMapUseCjkTracker == null ? null : java.lang.Boolean.parseBoolean(state.rightPartFullRouteMapUseCjkTracker.stateNow());
        let rightPartScreenType = state.rightPartScreenTypeTracker == null ? null : state.rightPartScreenTypeTracker.stateNow();

        let g = state.dh.graphicsFor("lcd_door_left");
        drawScreen(g, state.routeInfo, state.trainStatus == STATUS_RETURNING_TO_DEPOT ? 1 : train.getThisRoutePlatformsNextIndex(), state.trainStatus, leftPartUseCjk, rightPartFullRouteMapUseCjk, rightPartScreenType, train.isReversed());
    
        g = state.dh.graphicsFor("lcd_door_right");
        drawScreen(g, state.routeInfo, state.trainStatus == STATUS_RETURNING_TO_DEPOT ? 1 : train.getThisRoutePlatformsNextIndex(), state.trainStatus, leftPartUseCjk, rightPartFullRouteMapUseCjk, rightPartScreenType, !train.isReversed());
    
        state.dh.upload();
    }
}

function shouldRepaintLCD(state, train) {
    let trainStatus = getTrainStatus(train);
    if (checkProperty(state, "trainStatus", trainStatus)) { // 如果 state 中存在 trainStatus 且符合当前状态
        if (!state.leftPartUseCjkTracker.stateNowFirst() && (state.rightPartScreenTypeTracker == null || !state.rightPartScreenTypeTracker.stateNowFirst()) && (state.rightPartFullRouteMapUseCjkTracker == null || !state.rightPartFullRouteMapUseCjkTracker.stateNowFirst())) { // 并且各个屏幕不需要更新
            return false; // 无需重绘 LCD
        }
        return true;
    } else {
        print("列车状态更新为：" + trainStatus);
        state.trainStatus = trainStatus;
        return true;
    }
}

function getCubeVertices(p1, p2, center, rx, ry, rz) {
    const rxRad = rx * Math.PI / 180;
    const ryRad = ry * Math.PI / 180;
    const rzRad = rz * Math.PI / 180;
  
    let c = new Vector3f(center[0], center[1], center[2]);
  
    if (p1[1] == p2[1]) {
        let v1 = new Vector3f(p1[0], p1[1], p1[2]);
        let v2 = new Vector3f(p2[0], p1[1], p1[2]);
        let v3 = new Vector3f(p2[0], p2[1], p2[2]);
        let v4 = new Vector3f(p1[0], p2[1], p2[2]);
    
        v1.sub(c);
        v1.rotX(rxRad);
        v1.rotY(ryRad);
        v1.rotZ(rzRad);
        v1.add(c);
    
        v2.sub(c);
        v2.rotX(rxRad);
        v2.rotY(ryRad);
        v2.rotZ(rzRad);
        v2.add(c);
    
        v3.sub(c);
        v3.rotX(rxRad);
        v3.rotY(ryRad);
        v3.rotZ(rzRad);
        v3.add(c);
    
        v4.sub(c);
        v4.rotX(rxRad);
        v4.rotY(ryRad);
        v4.rotZ(rzRad);
        v4.add(c);
    
        return [
            [v1.x(), v1.y(), v1.z()],
            [v2.x(), v2.y(), v2.z()],
            [v3.x(), v3.y(), v3.z()],
            [v4.x(), v4.y(), v4.z()]
        ];
    }
    else if (p1[0] == p2[0]) {
        let v1 = new Vector3f(p1[0], p1[1], p1[2]);
        let v2 = new Vector3f(p1[0], p2[1], p1[2]);
        let v3 = new Vector3f(p2[0], p2[1], p2[2]);
        let v4 = new Vector3f(p2[0], p1[1], p2[2]);
    
        v1.sub(c);
        v1.rotX(rxRad);
        v1.rotY(ryRad);
        v1.rotZ(rzRad);
        v1.add(c);
    
        v2.sub(c);
        v2.rotX(rxRad);
        v2.rotY(ryRad);
        v2.rotZ(rzRad);
        v2.add(c);
    
        v3.sub(c);
        v3.rotX(rxRad);
        v3.rotY(ryRad);
        v3.rotZ(rzRad);
        v3.add(c);
    
        v4.sub(c);
        v4.rotX(rxRad);
        v4.rotY(ryRad);
        v4.rotZ(rzRad);
        v4.add(c);
    
        return [
            [v1.x(), v1.y(), v1.z()],
            [v2.x(), v2.y(), v2.z()],
            [v3.x(), v3.y(), v3.z()],
            [v4.x(), v4.y(), v4.z()]
        ];
    }
    else {
        throw "指定对角顶点不与地面垂直或平行：顶点一 [" + p1 + "]，顶点二 [" + p2 + "]。";
    }
}