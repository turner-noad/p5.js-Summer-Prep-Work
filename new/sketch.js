let TIME, SUN_IMAGE, MOON_IMAGE, FLOWER_HEIGHT, CURRENT_SKYBOX;
let CLOUD_ONE, CLOUD_TWO, CLOUD_THREE;

let SKY_COLOURS = ["#7ad2eb", "#63abbf", "#4a808f", "#365e69", "#26424a", "#26374a"];

function setup() {
	createCanvas(600, 400);

	CURRENT_SKYBOX = SKY_COLOURS[0];
	TIME = 0;
	SUN_IMAGE = loadImage("sun.png");
	MOON_IMAGE = loadImage("moon.png");
	FLOWER_HEIGHT = 100;

	CLOUD_ONE = new Cloud(0);
	CLOUD_TWO = new Cloud(1);
	CLOUD_THREE = new Cloud(2);
}

function draw() {
	/* Draw Background */
	background(CURRENT_SKYBOX);

	/* Draw Sun/Moon */
	if (SUN_IMAGE.width > 5 && MOON_IMAGE.width > 5) {
		image(SUN_IMAGE, 10, 10, 90, 90);
		image(MOON_IMAGE, -width, 10, 56, 79);
	} else {
		fill("#F6F173");
		circle(10, 40, 50);
		fill("#DDE2F2");
		circle(-width, 40, 50);
		fill("#1A255C");
		circle(-585, 40, 50);
	}

	/* Draw Clouds */
	CLOUD_ONE.show();
	CLOUD_TWO.show();
	CLOUD_THREE.show();
}

function change_skybox(to_time_of_day) {
	if (to_time_of_day === "day") {
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
							}, 1000);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	} else if (to_time_of_day === "night") {
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
							}, 1000);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
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
