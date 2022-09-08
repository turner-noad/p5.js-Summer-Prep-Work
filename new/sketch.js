/*
Global Variables are declared in CAPITAL_LETTERS
Local Variables are declared in lower_case
Functions are declared in camelCase
*/

let TIME, SUN_IMAGE, MOON_IMAGE, CURRENT_SKYBOX;
let CLOUD_ONE, CLOUD_TWO, CLOUD_THREE;
let FLOWER_ONE, FLOWER_TWO;
let FLOWER_HEIGHT;
let COLOUR_PICKER;
let SKY_COLOURS = ["#7ad2eb", "#63abbf", "#4a808f", "#365e69", "#26424a", "#26374a"];

function setup() {
	/* Create Canvas */
	createCanvas(600, 400);

	/* Initialise Variables */
	CURRENT_SKYBOX = SKY_COLOURS[0];
	TIME = -50;
	SUN_IMAGE = loadImage("sun.png");
	MOON_IMAGE = loadImage("moon.png");
	FLOWER_HEIGHT = 100;

	/* Create Objects */
	CLOUD_ONE = new Cloud(0);
	CLOUD_TWO = new Cloud(1);
	CLOUD_THREE = new Cloud(2);
	FLOWER_ONE = new Flower(125, 350);
	FLOWER_TWO = new Flower(250, 350);

	/* Create Colour Picker */
	COLOUR_PICKER = createColorPicker("#F97373");
}

function draw() {
	/* Draw Background */
	background(CURRENT_SKYBOX);

	/* Draw Sun/Moon */
	drawSunMoon();

	/* Time Handler */
	TIME++;

	if (TIME === 575) changeSkybox("night");
	if (TIME === 1175) changeSkybox("day");
	if (TIME > width * 2 + 50) TIME = -50;

	/* Draw Clouds */
	CLOUD_ONE.show();
	CLOUD_TWO.show();
	CLOUD_THREE.show();

	/* Draw Fence */
	drawFence();

	/* Draw Grass Hill */
	drawGrassHill();

	/* Draw Path */
	drawPath();

	/* Draw Barn */
	drawBarn();

	/* Draw Flowers */
	FLOWER_ONE.draw();
	FLOWER_TWO.draw();

	/* Change Flower Height */
	if (FLOWER_HEIGHT >= 10 && FLOWER_HEIGHT <= 300) {
		if (keyIsPressed) {
			if (keyCode === 87) FLOWER_HEIGHT++;
			else if (keyCode === 83) FLOWER_HEIGHT--;
		} else keyCode = 0;
	} else {
		if (FLOWER_HEIGHT < 11) FLOWER_HEIGHT = 12;
		if (FLOWER_HEIGHT > 299) FLOWER_HEIGHT = 298;
	}
}

function drawSunMoon() {
	if (SUN_IMAGE.width > 5 && MOON_IMAGE.width > 5) {
		image(SUN_IMAGE, 10 + TIME, 10, 90, 90);
		image(MOON_IMAGE, -width + TIME, 10, 56, 79);
	} else {
		fill("#F6F173");
		circle(10 + TIME, 40, 50);
		fill("#DDE2F2");
		circle(-width + TIME, 40, 50);
		fill(CURRENT_SKYBOX);
		circle(-585 + TIME, 40, 50);
	}
}

function drawFence() {
	fill("#B8956D");
	for (let fenceNumber = 0; fenceNumber < 7; fenceNumber++) rect(10 + fenceNumber * 57, 220 - fenceNumber * 6, 20, 100);
	strokeWeight(10);
	stroke("#B8956D");
	line(20, 250, 355, 220);
	line(20, 280, 355, 250);
	noStroke();
}

function drawGrassHill() {
	fill("#88DA86");
	ellipse(500, 396, 1364, 238);
}

function drawPath() {
	fill("#F0F1B5");
	ellipse(480, 349, 130, 189);
}

function drawBarn() {
	fill("#F97373");
	rect(390, 150, 175, 130);
	rect(440, 100, 75, 60);
	triangle(390, 150, 440, 100, 440, 150);
	triangle(565, 150, 515, 100, 515, 150);
	triangle(480, 90, 515, 100, 515, 150);
	triangle(481, 90, 440, 100, 516, 150);

	fill("#CE5E5E");
	for (let line_on_barn = 0; line_on_barn < 5; line_on_barn++) rect(390, 255 - 25 * line_on_barn, 175, 5);

	strokeWeight(5);
	stroke("#000000");
	line(390, 150, 440, 100);
	line(440, 100, 480, 90);
	line(515, 100, 480, 90);
	line(515, 100, 565, 150);
	fill("#F97373");
	strokeWeight(3);
	stroke("#FFFFFF");
	if (TIME > 600) fill("#F6F173");
	else fill("#546685");
	rect(464, 110, 30, 30);
	fill("#F97373");
	rect(435, 200, 45, 80);
	rect(480, 200, 45, 80);
	line(480, 200, 525, 280);
	line(525, 200, 480, 280);
	line(435, 200, 480, 280);
	line(480, 200, 435, 280);
	noStroke();
}

function changeSkybox(desired_time_of_day) {
	let interval = 100;
	if (desired_time_of_day === "day") {
		setTimeout(() => {
			CURRENT_SKYBOX = SKY_COLOURS[5];
			setTimeout(() => {
				CURRENT_SKYBOX = SKY_COLOURS[4];
				setTimeout(() => {
					CURRENT_SKYBOX = SKY_COLOURS[3];
					setTimeout(() => {
						CURRENT_SKYBOX = SKY_COLOURS[2];
						setTimeout(() => {
							CURRENT_SKYBOX = SKY_COLOURS[1];
							setTimeout(() => {
								CURRENT_SKYBOX = SKY_COLOURS[0];
							}, interval);
						}, interval);
					}, interval);
				}, interval);
			}, interval);
		}, interval);
	} else if (desired_time_of_day === "night") {
		setTimeout(() => {
			CURRENT_SKYBOX = SKY_COLOURS[0];
			setTimeout(() => {
				CURRENT_SKYBOX = SKY_COLOURS[1];
				setTimeout(() => {
					CURRENT_SKYBOX = SKY_COLOURS[2];
					setTimeout(() => {
						CURRENT_SKYBOX = SKY_COLOURS[3];
						setTimeout(() => {
							CURRENT_SKYBOX = SKY_COLOURS[4];
							setTimeout(() => {
								CURRENT_SKYBOX = SKY_COLOURS[5];
							}, interval);
						}, interval);
					}, interval);
				}, interval);
			}, interval);
		}, interval);
	}
}

class Cloud {
	constructor(cloud_offset) {
		this.x = -125;
		this.y = 0;
		this.randomPos(cloud_offset);
	}

	show() {
		fill("#F7F9F3");
		noStroke();
		ellipse(this.x, this.y, 83, 46);
		ellipse(this.x + 30, this.y - 10, 83, 46);
		ellipse(this.x + 30, this.y + 20, 83, 46);
		ellipse(this.x + 70, this.y + 10, 83, 46);
		this.move();
	}

	randomPos(cloud_offset) {
		if (cloud_offset) this.x += cloud_offset * 250;
		this.y = random(40, 100);
	}

	move() {
		this.x += 0.5;
		if (this.x > width + 50) {
			this.x = -125;
			this.randomPos();
		}
	}
}

class Flower {
	constructor(flower_x, flower_y) {
		this.origin = createVector(flower_x, flower_y);
		this.position = createVector();
		this.length = FLOWER_HEIGHT;
		this.angle = 3.4;
		this.direction = "right";
	}

	draw() {
		stroke("#56AD54");
		strokeWeight(8);
		line(this.origin.x, this.origin.y, this.position.x, this.position.y);
		noStroke();
		fill(COLOUR_PICKER.color());
		circle(this.position.x - 15, this.position.y + 15, 40);
		circle(this.position.x + 15, this.position.y + 15, 40);
		circle(this.position.x - 15, this.position.y - 15, 40);
		circle(this.position.x + 15, this.position.y - 15, 40);
		fill("#F6F173");
		circle(this.position.x, this.position.y, 25);

		this.length = FLOWER_HEIGHT;
		this.position.x = this.length * sin(this.angle) + this.origin.x;
		this.position.y = this.length * cos(this.angle) + this.origin.y;

		if (this.direction === "left") {
			this.angle += 0.0025;
			if (this.angle >= 3.4) {
				this.direction = "right";
			}
		} else if (this.direction === "right") {
			this.angle -= 0.0025;
			if (this.angle <= 2.85) {
				this.direction = "left";
			}
		}
	}
}
