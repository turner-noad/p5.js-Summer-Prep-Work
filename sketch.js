let cloudOffset, sunImage, moonImage, timeOffset, flowerColour;

function setup() {
	createCanvas(600, 400);
	cloudOffset = 0;
	timeOffset = 0;
	sunImage = loadImage("sun.png");
	moonImage = loadImage("moon.png");
	flowerColour = createColorPicker("#F97373");
	flowerColour.position(150, height + 10);
}

function draw() {
	noStroke();

	// --- TIME HANDLER ---
	timeOffset += 0.4;
	if (timeOffset > 1200) timeOffset = -90;

	// --- SKYBOX ---
	if (timeOffset > 0 && timeOffset < 500) background("#ABE3F4");
	else if (timeOffset > 550 && timeOffset < 565) background("#579CB1");
	else if (timeOffset > 564 && timeOffset < 580) background("#5770B1");
	else if (timeOffset > 579) background("#1A255C");
	else if (timeOffset > -90 && timeOffset < -65) background("#5770B1");
	else if (timeOffset > -66) background("#ABE3F4");

	// --- SUN & MOON ---
	if (sunImage.width > 5 && moonImage.width > 5) {
		image(sunImage, 10 + timeOffset, 10, 90, 90);
		image(moonImage, -600 + timeOffset, 10, 56, 79);
	} else {
		fill("#F6F173");
		circle(10 + timeOffset, 40, 50);
		fill("#DDE2F2");
		circle(-600 + timeOffset, 40, 50);
		fill("#1A255C");
		circle(-585 + timeOffset, 40, 50);
	}

	// --- CLOUDS ---
	for (let cloudNumber = 0; cloudNumber < 2; cloudNumber++) {
		fill("#F7F9F3");
		ellipse(156 + 250 * cloudNumber + cloudOffset, 92 + 40 * cloudNumber, 83, 46);
		ellipse(189 + 250 * cloudNumber + cloudOffset, 66 + 40 * cloudNumber, 83, 56);
		ellipse(218 + 250 * cloudNumber + cloudOffset, 86 + 40 * cloudNumber, 83, 56);
		ellipse(264 + 250 * cloudNumber + cloudOffset, 70 + 40 * cloudNumber, 83, 66);
	}
	cloudOffset += 0.7;
	if (cloudOffset > 480) cloudOffset = -600;

	// --- FENCE ---
	fill("#B8956D");
	for (let fenceNumber = 0; fenceNumber < 7; fenceNumber++) rect(10 + fenceNumber * 57, 220 - fenceNumber * 6, 20, 100);
	strokeWeight(10);
	stroke("#B8956D");
	line(20, 250, 355, 220);
	line(20, 280, 355, 250);

	// --- GRASS ---
	noStroke();
	fill("#88DA86");
	ellipse(500, 396, 1364, 238);

	// --- PATH ---
	fill("#F0F1B5");
	ellipse(480, 349, 130, 189);

	// --- BARN ---
	fill("#F97373");
	rect(390, 150, 175, 130);
	rect(440, 100, 75, 60);
	triangle(390, 150, 440, 100, 440, 150);
	triangle(565, 150, 515, 100, 515, 150);
	triangle(480, 90, 515, 100, 515, 150);
	triangle(481, 90, 440, 100, 516, 150);

	fill("#CE5E5E");
	for (let barnLine = 0; barnLine < 5; barnLine++) rect(390, 255 - 25 * barnLine, 175, 5);

	strokeWeight(5);
	stroke("#000000");
	line(390, 150, 440, 100);
	line(440, 100, 480, 90);
	line(515, 100, 480, 90);
	line(515, 100, 565, 150);

	fill("#F97373");
	strokeWeight(3);
	stroke("#FFFFFF");
	rect(464, 110, 30, 30);
	rect(435, 200, 45, 80);
	rect(480, 200, 45, 80);
	line(480, 200, 525, 280);
	line(525, 200, 480, 280);
	line(435, 200, 480, 280);
	line(480, 200, 435, 280);

	// --- FLOWERS ---
	noStroke();
	for (let flowerCount = 0; flowerCount < 3; flowerCount++) {
		fill("#56AD54");
		rect(125 + flowerCount * 80, 250, 20, 100);
		fill("#F6F173");
		circle(135 + flowerCount * 80, 250, 40);
		fill(flowerColour.color());
		circle(120 + flowerCount * 80, 230, 37);
		circle(150 + flowerCount * 80, 230, 37);
		circle(120 + flowerCount * 80, 265, 37);
		circle(150 + flowerCount * 80, 265, 37);
	}
}
