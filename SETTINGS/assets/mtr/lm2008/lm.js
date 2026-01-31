importPackage(java.awt);
importPackage(java.awt.geom);

// выгружаем модель, возвращает java class - Карта (для сишарпнутых - словарь), где к одной строке причисляется одна модель
var rawModels = ModelManager.loadPartedRawModel(Resources.manager(), Resources.idRelative("mtr:lm2008/lm2008.obj"), null);
// тут же нужно обратиться к нужным элементам карты, чтобы задать им нужный тип рендера, но пока я не отделил интерьер

// конвертим из JAVA класса в ECMA Script объект (ECMA - диалект JS, часто юзается в движках)
var models = uploadPartedModels(rawModels);

// void render() вызывается каждый кадр. Очевидно, зависим от ФПС
function render(ctx, state, train) {

	var matrices = new Matrices(); // стек матриц - супер важная вещь

	for (i = 0; i < train.trainCars(); i++) {

		/*
			smoothCubic - при x = [0, 1] - он выводит то же значение от 0 до 1, но сглаженное функцией кубического многочлена. 
			Забейте в гугле "y = -2x^3 + 3x^2", построите на х от 0 до 1, все станет ясно.

			train.doorValue - величина от 0 до 1. Коэффициент завершенности анимации, если можно так сказать. 
			Когда doorValue = 0, умножая на 90 градусов выходит 0 градусов поворота, когда 0.5 - 45, когда 1 - 90.
			С плавным изменением выходит и плавный поворот или движение. 

			Домножение на Пи и деление на 180 - это перевод из градусов в радианы
		*/
		let firstAngle = train.doorRightOpen[i] ? 80.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;
		let secondAngle = train.doorRightOpen[i] ? -175.0 * Math.PI / 180 * smoothCubic(train.doorValue()) : 0;

		//matrices.pushPose();
		ctx.drawCarModel(models["kuzov"], i, matrices); // отрисовка
		ctx.drawCarModel(models["salon"], i, matrices);
		ctx.drawCarModel(models["far"], i, matrices);
		ctx.drawCarModel(models["disp"], i, matrices);

		//рендер дверей определен нижк=е
		renderDoorWithChild(matrices, ctx,  null,  models["d1"], null, null, -firstAngle, -secondAngle, -1.052, 6.171, -1.131, 5.890, i);
		
		renderDoorWithChild(matrices, ctx, null, models["d2"], null, null, -firstAngle, -secondAngle, -1.221, 2.028, -1.221, 1.727, i);
		renderDoorWithChild(matrices, ctx, null, models["d3"], null, null, firstAngle, secondAngle, -1.221, 0.7746, -1.221, 1.053, i)

		renderDoorWithChild(matrices, ctx, null, models["d4"], null, null, -firstAngle, -secondAngle, -1.221, -0.4060, -1.221, -0.6991, i);
		renderDoorWithChild(matrices, ctx, null, models["d5"], null, null, firstAngle, secondAngle, -1.221, -1.693, -1.221, -1.372, i);
		
		renderDoorWithChild(matrices, ctx, null, models["d6"], null, null, firstAngle, secondAngle, -1.050, -6.169, -1.095, -5.918, i);

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
		if (jsStringKey == "d1_1") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d2_2") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d3_3") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d4_4") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d5_5") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d6_6") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d7_7") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d8_8") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d9_9") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "d10_10") entry.getValue().setAllRenderType("interior");
		if (jsStringKey == "salon") entry.getValue().setAllRenderType("light");
		if (jsStringKey == "light") entry.getValue().setAllRenderType("light");
		if (jsStringKey == "bufer") entry.getValue().setAllRenderType("light");

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

/* Это код просчитывания  ̶г̶р̶а̶д̶у̶с̶а̶  радиана поворота колеса - он выполняется каждый кадр. И каждый кадр прога смотрит на 
	 дельту игрового времени (кол-во секунд между прошлым и нынешни кадром) и скорость поезда, высчитывает сколько поезд 
	 прошел с прошлого кадра, конвертит в радиан (в данном случае конвертить ничего не надо, см чуть ниже). 

	 Этот код, в теории, запруфан от изменения ФПС. С разным ФПС анимация колес не будет различаться по скорости.

	 Тут, когда поезд движется на x метров за кадр, колесо радиуса 1 тоже сдвинулось на x метров.
   чтобы посчитать изменение в радианах, поделим x на длину круга, а потом умножим на 2pi радиана, 
   по его определению. Но длина окружности 1 это тоже 2pi, значит они сокращаются, а путь пройденный поездом
   и есть изменение дуги в радианах.
*/

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