importPackage(java.awt);
importPackage(java.awt.geom);

// выгружаем модель, возвращает java class - Карта (для сишарпнутых - словарь), где к одной строке причисляется одна модель
var rawModels = ModelManager.loadPartedRawModel(Resources.manager(), Resources.idRelative("mtr:varyag/var_1.obj"), null);
var rawModels2 = ModelManager.loadPartedRawModel(Resources.manager(), Resources.idRelative("mtr:varyag/var_2.obj"), null);
var rawModels3 = ModelManager.loadPartedRawModel(Resources.manager(), Resources.idRelative("mtr:varyag/var_3.obj"), null);
// тут же нужно обратиться к нужным элементам карты, чтобы задать им нужный тип рендера, но пока я не отделил интерьер

// конвертим из JAVA класса в ECMA Script объект (ECMA - диалект JS, часто юзается в движках)
var models = uploadPartedModels(rawModels);
var models2 = uploadPartedModels(rawModels2);
var models3 = uploadPartedModels(rawModels3);

function create(ctx, state, train) { // задаем уникальные данные для каждого поезда
	state.wheelAngle = 0.0; // Градус поворота колеса радиусом 1 метр. Градус колеса радиуса x, очевидно, будет в два 1/x раз больше (или меньше)
}


// void render() вызывается каждый кадр. Очевидно, зависим от ФПС
function render(ctx, state, train) {


	
    let matrices = new Matrices();
	const wheelRadius = 0.32;

    for (let i = 0; i < train.trainCars(); i++) {
        matrices.pushPose();

        // Проверяем, если это первая модель (вагон 0)
        if (i === 0) {
            // Рендерим первую модель
			matrices.translate(0, 0, 0);
		

		let firstAngle = train.doorRightOpen[i] ? -90.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;
		let secondAngle = train.doorRightOpen[i] ? 180.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;

		//matrices.pushPose();
		ctx.drawCarModel(models["body"], i, matrices); // отрисовка
		ctx.drawCarModel(models["salon"], i, matrices);
		ctx.drawCarModel(models["steklo"], i, matrices);
		ctx.drawCarModel(models["fara"], i, matrices);
		ctx.drawCarModel(models["light"], i, matrices);
		ctx.drawCarModel(models["bogey"], i, matrices);
		ctx.drawCarModel(models["gabarit"], i, matrices);

		


		//рендер дверей определен нижк=е
		renderDoorWithChild(matrices, ctx,  null,  models["d_rl"], null, models["dl_rl"], firstAngle, secondAngle, -1.240, 2.240, -1.286, 1.883, i);
		renderDoorWithChild(matrices, ctx,  null,  models["d_rr"], null, models["dl_rr"], -firstAngle, -secondAngle, -1.214, 0.8881, -1.234, 1.203, i);


		renderDoorWithChild(matrices, ctx,  null,  models["ds_rl"], null, null, firstAngle, secondAngle, -1.240, 2.240, -1.286, 1.883, i);
		renderDoorWithChild(matrices, ctx,  null,  models["ds_rr"], null, null, -firstAngle, -secondAngle, -1.214, 0.8881, -1.234, 1.203, i);

		
          
        }

        // Проверяем, если это вторая модель (вагон 1)
        if (i === 1) {
			let wheelAngleCoef = state.wheelAngle/wheelRadius;
            // Смещаем вторую модель по оси X или Z, чтобы она была за первой
            matrices.translate(0, 0, 0);  // Смещение на 10 единиц по X (замени на нужное значение)
			let firstAngle = train.doorRightOpen[i] ? -70.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;
		    let secondAngle = train.doorRightOpen[i] ? 160.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;

		//matrices.pushPose();
		ctx.drawCarModel(models2["body"], i, matrices); // отрисовка
		ctx.drawCarModel(models2["salon"], i, matrices);
		ctx.drawCarModel(models2["light"], i, matrices);
		ctx.drawCarModel(models2["steklo"], i, matrices);


	

		renderDoorWithChild(matrices, ctx,  null,  models2["d_rl"], null, models2["dl_rl"], firstAngle, secondAngle, -1.220, 1.962, -1.212, 1.606, i);
		renderDoorWithChild(matrices, ctx,  null,  models2["d_rr"], null, models2["dl_rr"], -firstAngle, -secondAngle, -1.236, 0.5693, -1.220, 0.9179, i);

		renderDoorWithChild(matrices, ctx,  null,  models2["ds_rl"], null, null, firstAngle, secondAngle,  -1.220, 1.962, -1.212, 1.606, i);
		renderDoorWithChild(matrices, ctx,  null,  models2["ds_rr"], null, null, -firstAngle, -secondAngle, -1.236, 0.5693, -1.220, 0.9179, i);


		renderDoorWithChild(matrices, ctx,  null,  models2["d_rl2"], null, models2["dl_rl2"], firstAngle, secondAngle, -1.227, -0.5681, -1.226, -0.9251, i);
		renderDoorWithChild(matrices, ctx,  null,  models2["d_rr2"], null, models2["dl_rr2"], -firstAngle, -secondAngle, -1.235, -1.970, -1.235, -1.613, i);

		renderDoorWithChild(matrices, ctx,  null,  models2["ds_rl2"], null, null, firstAngle, secondAngle, -1.227, -0.5681, -1.226, -0.9251, i);
		renderDoorWithChild(matrices, ctx,  null,  models2["ds_rr2"], null, null, -firstAngle, -secondAngle,  -1.235, -1.970, -1.235, -1.613, i);

        }

		if (i === 2) {

            // Смещаем вторую модель по оси X или Z, чтобы она была за первой
            matrices.translate(0, 0, 0);  // Смещение на 10 единиц по X (замени на нужное значение)
			let firstAngle = train.doorRightOpen[i] ? -70.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;
		    let secondAngle = train.doorRightOpen[i] ? 160.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;

		//matrices.pushPose();
		ctx.drawCarModel(models3["body"], i, matrices); // отрисовка
		ctx.drawCarModel(models3["salon"], i, matrices);
		ctx.drawCarModel(models3["steklo"], i, matrices);
		ctx.drawCarModel(models3["light"], i, matrices);
		ctx.drawCarModel(models3["bogey"], i, matrices);
		ctx.drawCarModel(models3["gabarit"], i, matrices);
	

		renderDoorWithChild(matrices, ctx,  null,  models3["d_rl"], null, models3["dl_rl"], firstAngle, secondAngle, -1.261, -0.8803, -1.255, -1.237, i);
		renderDoorWithChild(matrices, ctx,  null,  models3["d_rr"], null, models3["dl_rr"], -firstAngle, -secondAngle, -1.230, -2.281, -1.242, -1.924, i);

		renderDoorWithChild(matrices, ctx,  null,  models3["ds_rr"], null, null, firstAngle, secondAngle, -1.261, -0.8803, -1.255, -1.237, i);
		renderDoorWithChild(matrices, ctx,  null,  models3["ds_rl"], null, null, -firstAngle, -secondAngle, -1.230, -2.281, -1.242, -1.924, i);

        }


        matrices.popPose();
    }
}

/*s
	Конвертит из объекта класса джава в объект джаваскрипта:
	а именно из карты<строка, RawModel> в объект JS<строка, ModelCluster>
*/
function uploadPartedModels(rawModels) {
	result = {};
	for (it = rawModels.entrySet().iterator(); it.hasNext();) {
		entry = it.next();

		let jsStringKey = "" + entry.getKey(); // строка в жс строку
		if (jsStringKey == "salon") entry.getValue().setAllRenderType("interior"); //включение интерьера
		if (jsStringKey == "dl_rr") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "dl_rl") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "dl_rr2") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "dl_rl2") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "steklo") entry.getValue().setAllRenderType("interiortranslucent");
		if (jsStringKey == "ds_rr") entry.getValue().setAllRenderType("interiortranslucent");
		if (jsStringKey == "ds_rl") entry.getValue().setAllRenderType("interiortranslucent");
		if (jsStringKey == "ds_rr2") entry.getValue().setAllRenderType("interiortranslucent");
		if (jsStringKey == "ds_rl2") entry.getValue().setAllRenderType("interiortranslucent");
		if (jsStringKey == "fara") entry.getValue().setAllRenderType("light");
		if (jsStringKey == "light") entry.getValue().setAllRenderType("light");
		if (jsStringKey == "gabarit") entry.getValue().setAllRenderType("light");

		entry.getValue().applyUVMirror(false, true);
		result[jsStringKey] = ModelManager.uploadVertArrays(entry.getValue());
	}
	return result;
}


/*
	Рендер части вместе с дочерней частью
	Работает по принципу, что преобразования матрицы, которая находится глубже в стеке влияет на все матрицы над ней. 
	То есть, есть матрица поворота механизма/крайней ширмы(если это ширмовая дверь) Она пушится, 
	к ней применяется поворот[снизу распишу прикол про поворот, почему там много сдвигов], потом пушится дочерняя матрица, и 
	к ней тоже применяется поворот, дочерняя матрица рендрится, лопается, потом рендерится родительская и тоже лопается.

	К Дочерней матрице применяются все преобразования родительской матрицы - значит она будет прикреплена к матрице родителя и условно будет 
	действовать как звено цепи, которое может вращаться, но ее тянет другое звено. Это нам и нужно для ширмовых/планетарных/любых дверей
	где дверь соединяется с корпусом через 1 механизм на 2 шарнирах.
*/
function renderDoorWithChild(matrices, ctx, parentDoor, childDoor, parentInt, childInt, firstAngle, secondAngle, x1, z1, x2, z2, i) {
	matrices.pushPose(); // пушим родительскую матрицу в стек
	matrices.translate(x1, 0.0, z1);
	matrices.rotate(0.0, 1.0, 0.0, firstAngle); // поворот двери. Смотри самый нижний комментарий для пояснения 
	matrices.translate(-x1, 0.0, -z1);
	{
		matrices.pushPose();    // пуш матрицы дочерней
		matrices.translate(x2, 0.0, z2);
		matrices.rotate(0.0, 1.0, 0.0, secondAngle); // поворот
		matrices.translate(-x2, 0.0, -z2);
		if (childDoor != null) ctx.drawCarModel(childDoor, i, matrices); // рендер внутренней ширмы либо двери
		if (childInt != null) ctx.drawCarModel(childInt, i, matrices);;
		matrices.popPose(); // дочерняя матрица лопается
	}
	if (parentDoor != null) ctx.drawCarModel(parentDoor, i, matrices); // рендер крайней ширмы либо механизма двери
	if (parentInt != null) ctx.drawCarModel(parentInt, i, matrices);
	matrices.popPose(); // родительская матрица лопается

}


function renderWheel(ctx, matrices, part, angle, i, y, z) {
	matrices.pushPose(); // поворот объекта - смотри в самый низ
	matrices.translate(0.0, y, z);
	matrices.rotate(1.0, 0.0, 0.0, angle);
	matrices.translate(0.0, -y, -z);
	ctx.drawCarModel(part, i, matrices);
	
	matrices.popPose();
}



/* Это код просчитывания  ̶г̶р̶а̶д̶у̶с̶а̶  радиана поворота колеса - он выполняется каждый кадр. И каждый кадр прога смотрит на 
	 дельту игрового времени (кол-во секунд между прошлым и нынешни кадром) и скорость поезда, высчитывает сколько поезд 
	 прошел с прошлого кадра, конвертит в радиан (в данном случае конвертить ничего не надо, см чуть ниже). 

	 Этот код, в теории, запруфан от изменения ФПС. С разным ФПС анимация колес не будет различаться по скорости.

	 Тут, когда поезд движется на x метров за кадр, колесо радиуса 1 тоже сдвинулось на x метров.
   чтобы посчитать изменение в радианах, поделим x на длину круга, а потом умножим на 2pi радиана, 
   по его определению. Но длина окружности 1 это тоже 2pi, значит они сокращаются, а путь пройденный поездом
   и есть изменение дуги в радианах.
*/
function updateWheelAngle(train, state) { 
	if (!train.shouldRenderDetail()) return;
	let speedMps = 20 * train.speed();
	let delta = Timing.delta();
	if (train.isReversed()) {
		state.wheelAngle -= speedMps * delta; 
	} else {
		state.wheelAngle += speedMps * delta; 
	}
	
	if (state.wheelAngle > 2 * Math.PI) state["wheelAngle"] -= 2 * Math.PI
	if (state.wheelAngle < -2 * Math.PI) state["wheelAngle"] += 2 * Math.PI
}

function smoothCubic(x) { //кубическая функция - в отрезке 0-1 возвращает сглаженную функцию 0-1
	return x * x * (-2 * x + 3);
}

/*

Прим. 1) Поворот объекта.

Согласно функциям и методам поворот здесь не может быть вокруг любой точки, только вокруг центра. Очевидно, направление - недостаточное
условие для поворота, нужно знать точку, откуда брать направление. Если точка вращения - это не центр, нужно
провести некоторые манипуляции, чтобы нормально повернуть объект.

Например - есть объект колесной пары, который нужно отрендрить. Обычным рендером было бы просто использовать функцию.

ctx.рендер(колесо, ...)

При повороте нужно запушить новую матрицу, чтобы поворачивать только колесо, а не весь кузов.

Псведо-код:
стек = новый стек матриц

стек.пуш()
стек.повернуть(w радиан, u вектор)
ctx.рендер(колесо, ...)
стек.поп()

конец псведо-кода.

В этом случае корректно будут вращаться те объекты, центр вращения которых - центр. Но колесная пара - нет, она улетит на ору\биту и 
будет летать как планета вокруг солнца.

В таком случае логично сделать так:

Мы знаем координаты точки вращения колеса, тогда мы перенесем весь объект колеса в центр, переместив на координаты, обратные тем, 
которые мы знаем, потом мы будем вращать уже вокруг центра - вращение будет нормальным. Потом мы вернем объект на прежние координаты, 
переместив их на те координаты, которые мы знаем.

псевдо-код (ошибочный):

[x, y, z] = координаты точки вращения объекта.

стек.пуш()
стек.сдвинуть(-x, -y, -z) #сдвигаем относительно текущих координат. 
стек.повернуть(w радиан, u вектор)
стек.свдинуть(x, y, z) #сдвигаем назад на прошлые координаты.

ctx.рендер(колесо, ...) #рендер, колесо повернулось нормально

стек.поп()

конец псевдо-кода

Но в нашем случае (и в случае работы на РТМ) - есть загвоздка - а именно в том, что воздвействия на матрицу в стеке - 
тоже отправляется в свой стек. 

А СТЕК - это такая разновидность контейнеров, работающая по сути "последний вошедший - первый вышедший".

То есть стек объектов можно представить как раздатчик монет, который стоит у водителей маршруток, 
они кладут монеты в подпружиненный паз сверху вниз, и сверху же забирают, то есть последняя зашедшая монета будет взята первой.

То же самое с преобразованием - вы кладете в стек инструкции к матрице, а когда программа их читает, она читает их в обратном порядке.

(и то же самое с самими матрицами - родительские матрицы идут в глубь стека, а вы работаете с матрицей на поверхности, в последствии
лопая ее и переходя к родительским матрицам, лежащим внутри)

Значит правильно будет все воздействия на матрицу писать в обратном порядке.



псевдо-код (правильный):

[x, y, z] = координаты точки вращения объекта.

стек.пуш()

стек.свдинуть(x, y, z) #сдвигаем назад на прошлые координаты.
стек.повернуть(w радиан, u вектор)
стек.сдвинуть(-x, -y, -z) #сдвигаем относительно текущих координат. 

ctx.рендер(колесо, ...) #рендер, колесо повернулось нормально

стек.поп()

конец псевдо-кода

*/