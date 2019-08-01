
window.addEventListener("touchmove", function(a) {
    a.preventDefault()
}, {
    passive: false
});
window.RAF = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 1E3 / 60)
    }
}();
/iPad|iPhone|iPod|ios/i.test(navigator.userAgent) || Detector.webgl || alert("当前浏览器不支持3d，请退出后重试，或者尝试使用其他浏览器观看");
var isAndroid = /Android 1|Android 2|Android 3|Android 4|Android 5/.test(navigator.userAgent),
    isIfeng = !1,
    camera, scene, renderer, composer, dot, mouseX = 0,
    mouseY = 0,
    skyMesh, camera2, lookPos, object, particleSystem, randomPos, dotSystem, positions3, randomLength = isAndroid ? 4E3 : 1E4,
    touchY = 0,
    disY = 0,
    loaded = [
      {
        light: 0, a: 0, type: 1,
        pos: {
          x: 173,
          y: 10,
          z: 100
        }
      },
      {
        light: 0,
        a: 0,
        type: 1,
        pos: {
          x: 173,
          y: 20,
          z: -100
        }
      },
      {
        light: 0,
        a: 0,
        type: 0,
        pos: {
          x: 0,
          y: 10,
          z: -200
        }
      },
      {
        light: 0,
        a: 0,
        type: 1,
        pos: {
          x: -173,
          y: 20,
          z: -100
        }
      },
      {
        light: 0,
        a: 0,
        type: 1,
        pos: {
          x: -173,
          y: 10,
          z: 100
        }
      },
      {
        light: 0,
        a: 0,
        type: 1,
        pos: {
          x: 0,
          y: 20,
          z: 200
        }
      },
      {
        light: 0,
        a: 0,
        type: 1,
        pos: {
          x: 50,
          y: 50,
          z: -100
        }
      }
    ],
    app = new Vue({
        el: "#app",
        data: {
          active: -1,
          nowLen: isAndroid ? 18E3 : 3E4,
          key: 1
        },
        methods: {
            resize: function() {
                this.ua = navigator.userAgent.toLowerCase();
                this.isMobile = /ipad|iphone|ipod|ios|android|symbianos|windows phone|miuibrowser|meego|blackberry/i.test(this.ua) || !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
                this.width = document.body.offsetWidth;
                this.height = window.innerHeight;
                this.isMobile ? (this.fontSize = Math.round(this.width / 750 * 40), this.funBottom = "0", this.funTop = "5%") : (this.funShow = !0, this.fontSize = 20, this.funBottom = "6%", this.funTop = "auto");
                this.gameStart && (camera.aspect = window.innerWidth / window.innerHeight, camera.updateProjectionMatrix(), renderer.setSize(window.innerWidth, window.innerHeight), composer.setSize(window.innerWidth, window.innerHeight))
            },
            funHide: function(a) {
              0 > a.target.className.toString().indexOf("fun") && this.funShow && this.isMobile && (this.funShow = !1)
            },
            init: function() {
                renderer = new THREE.WebGLRenderer({
                    antialias: false
                });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.autoClear = !1;
                document.getElementById("mainBox").appendChild(renderer.domElement);
                object = new THREE.Object3D;
                camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2E3);
                camera.position.set(0, 350, 500);
                camera2 = 0;
                lookPos = new THREE.Vector3(0, 200, 0);
                scene = new THREE.Scene;
                scene.fog = new THREE.FogExp2(1927518, 0);
                scene.add(new THREE.AmbientLight(1320786));
                var a = new THREE.PointLight(66582, 3, 1200, 1);
                a.position.set(0, 200, 180);
                object.add(a);
                object.add(camera);
                scene.add(object);
                a = new THREE.TextureLoader;
                dot = a.load("http://p0.ifengimg.com/l/2017/42/8820103bf1b0c33/dot.png");
                var b = this;
                a.load("http://p1.ifengimg.com/l/2017/42/8820103bf1b0c33/starsmap.jpg", function(a) {
                    a = {
                      color: {
                        value: new THREE.Color(1320786)
                      },
                      texture: {
                        value: a
                      }
                    };
                    a = new THREE.ShaderMaterial({
                      uniforms: a,
                      vertexShader: document.getElementById("skyvertex").textContent,
                      fragmentShader: document.getElementById("skyfragment").textContent,
                      side: THREE.BackSide
                    });
                    var c = new THREE.SphereBufferGeometry(800, 10, 10);
                    skyMesh = new THREE.Mesh(c, a);
                    scene.add(skyMesh);
                    b.loadAssetsEnd()
                });
                for (a = 0; a < loaded.length; a++) loaded[a].type ? this.loadModel(a) : this.drawImgs(a);
                var a = new THREE.BufferGeometry,
                    c = new THREE.ShaderMaterial({
                        uniforms: {
                            texture: {
                                value: dot
                            }
                        },
                        vertexShader: document.getElementById("randomdotshader").textContent,
                        fragmentShader: document.getElementById("randomdotfragment").textContent,
                        blending: THREE.AdditiveBlending,
                        transparent: !0
                    });
                positions3 = new Float32Array(3 * randomLength);
                for (var d = new Float32Array(randomLength), f = 0, e = 0; f < randomLength; f += 3, e++) positions3[f] = 500 * (2 * Math.random() - 1), positions3[f + 1] = 500 * Math.random(), positions3[f + 2] = 500 * (2 * Math.random() - 1), d[e] = 2 * Math.random() + 2;
                a.addAttribute("position", new THREE.BufferAttribute(positions3, 3));
                a.addAttribute("size", new THREE.BufferAttribute(d, 1));
                dotSystem = new THREE.Points(a, c);
                scene.add(dotSystem);
                composer = new THREE.EffectComposer(renderer);
                a = new THREE.RenderPass(scene, camera);
                c = new THREE.BloomPass(.8);
                d = new THREE.ShaderPass(THREE.FocusShader);
                d.uniforms.screenWidth.value = window.innerWidth;
                d.uniforms.screenHeight.value = window.innerHeight;
                d.uniforms.waveFactor.value = .00125;
                d.renderToScreen = !0;
                composer.addPass(a);
                composer.addPass(c);
                composer.addPass(d);
                this.isMobile || document.addEventListener("mousemove", this.onDocumentMouseMove, !1);
                window.addEventListener("touchstart", this.cStart, !1);
                window.addEventListener("touchmove", this.cMove, !1);
                window.addEventListener("touchend", this.cEnd, !1);
                this.gameStart = !0
            },
            drawImgs: function(a) {
                loaded[a].e = new Float32Array(this.nowLen);
                loaded[a].d = modelData[a].vertices.length;
                for (var b = 0; b < loaded[a].d; b += 3) this.isMobile ? (loaded[a].e[b] = modelData[a].vertices[b] + loaded[a].pos.x, loaded[a].e[b + 1] = modelData[a].vertices[b + 1] + loaded[a].pos.y) : (loaded[a].e[b] = 1.25 * modelData[a].vertices[b] + loaded[a].pos.x, loaded[a].e[b + 1] = 1.25 * modelData[a].vertices[b + 1] + loaded[a].pos.y), loaded[a].e[b + 2] = 40 * Math.random() - 20 + loaded[a].pos.z;
                for (var b = loaded[a].d, c; b < this.nowLen; b += 3) {
                    do c = Math.ceil((loaded[a].d - 2) * Math.random()); while (0 !== c % 3);
                    loaded[a].e[b] = loaded[a].e[c];
                    loaded[a].e[b + 1] = loaded[a].e[c + 1];
                    loaded[a].e[b + 2] = 40 * Math.random() - 20 + loaded[a].pos.z
                }
                loaded[a].a = 1;
                this.loadAssetsEnd()
            },
            loadModel: function(a) {
                var b = new THREE.BufferGeometry,
                    c = new Float32Array(modelData[a].vertices.length);
                c.set(modelData[a].vertices);
                b.addAttribute("position", new THREE.BufferAttribute(c, 3));
                c = (new THREE.Matrix4).makeScale(2, 2, 2);
                this.isMobile || (c = (new THREE.Matrix4).makeScale(2.5, 2.5, 2.5));
                b.applyMatrix(c);
                0 === a ? b.applyMatrix((new THREE.Matrix4).makeRotationY(Math.PI / 4)) : 1 === a ? b.applyMatrix((new THREE.Matrix4).makeRotationY(Math.PI / 2)) : 3 === a ? b.applyMatrix((new THREE.Matrix4).makeRotationY(-Math.PI / 2)) : 4 === a ? b.applyMatrix((new THREE.Matrix4).makeRotationY(-Math.PI / 4)) : 6 === a && b.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 4));
                b.applyMatrix((new THREE.Matrix4).makeTranslation(loaded[a].pos.x, loaded[a].pos.y, loaded[a].pos.z));
                loaded[a].c = b.attributes.position.array;
                loaded[a].d = modelData[a].vertices.length;
                loaded[a].a = 1;
                this.loadAssetsEnd()
            },
            loadAssetsEnd: function() {
                for (var a = 0, b = 0; b < loaded.length; b++) loaded[b].a && a++;
                a === loaded.length && !this.played && skyMesh && (this.played = !0, this.createParticle())
            },
            createParticle: function() {
                for (var a = this, b = new THREE.BufferGeometry, c = this.nowLen, d = 0; d < loaded.length; d++)
                    if (loaded[d].type) {
                        var f = loaded[d].c;
                        loaded[d].e = new Float32Array(c);
                        for (var e = 0, g = 0; e < loaded[d].d; e += 3, g++) loaded[d].e[e] = f[e], loaded[d].e[e + 1] = f[e + 1], loaded[d].e[e + 2] = f[e + 2];
                        e = loaded[d].d;
                        for (g = 0; e < c; e += 3) {
                            do g = Math.ceil((loaded[d].d - 2) * Math.random()); while (0 !== g % 3);
                            loaded[d].e[e] = f[g];
                            loaded[d].e[e + 1] = f[g + 1];
                            loaded[d].e[e + 2] = f[g + 2]
                        }
                    }
                d = {
                    color: {
                        value: new THREE.Color(16777215)
                    },
                    texture: {
                        value: dot
                    }
                };
                d = new THREE.ShaderMaterial({
                    uniforms: d,
                    vertexShader: document.getElementById("vertexshader").textContent,
                    fragmentShader: document.getElementById("fragmentshader").textContent,
                    blending: THREE.AdditiveBlending,
                    transparent: !0
                });
                f = new Float32Array(c / 3);
                e = new Float32Array(c / 3);
                for (g = 0; g < c; g++) f[g] = 2, e[g] = 1;
                this.position2 = new Float32Array(c);
                b.addAttribute("size", new THREE.BufferAttribute(f, 1));
                b.addAttribute("val", new THREE.BufferAttribute(e, 1));
                particleSystem = new THREE.Points(b, d);
                particleSystem.position.y = 200;
                scene.add(particleSystem);
                setTimeout(function() {
                    randomPos = new Float32Array(c);
                    for (var b = 0, d = 0; b < c; b += 3, d++) randomPos[b] = 600 * Math.random() - 300, randomPos[b + 1] = 600 * Math.random() - 300, randomPos[b + 2] = 600 * Math.random() - 300;
                    particleSystem.geometry.addAttribute("position", new THREE.BufferAttribute(randomPos, 3));
                    particleSystem.geometry.attributes.position.needsUpdate = !0;
                    a.loadEnd = !0;
                    window.addEventListener("wheel", a.wheelStart);
                    window.addEventListener("mousewheel", a.wheelStart);
                    window.addEventListener("DOMMouseScroll", a.wheelStart)
                }, 100)
            },
            wheelStart: function(a) {
                this.animating || (0 < a.deltaY ? this.changeActive(this.nowWork + 1) : this.changeActive(this.nowWork - 1))
            },
            changeActive: function(a) {
                if (!this.animating2 && this.loadEnd && this.nowLen)
                    if (!this.footer && (!this.isMobile && 6 === this.light || this.isMobile && 6 === a)) this.footer = !0, this.animating2 = 1, camera2 = 2 * Math.PI, this.changeParticle(6);
                    else {
                        if (this.footer) {
                            this.footer = !1;
                            for (var b = this.light = 0; 6 > b; b++) loaded[b].light = 0
                        }
                        this.nowWork = 5 < a ? -1 : -1 > a ? 5 : a;
                        this.animating2 = 1;
                        camera2 = Math.PI / 3 * (this.nowWork + 1);
                        this.changeParticle(this.nowWork)
                    }
            },
            changeParticle: function(a) {
                if (this.active === a) return !1;
                this.active = a;
                var b = this.nowLen,
                    c = new Float32Array(b),
                    d = particleSystem.geometry.attributes.val.array;
                this.delay = [];
                for (var f = 0, e = 0; f < b; f += 3, e++) c[f] = particleSystem.geometry.attributes.position.array[f] * d[e] + this.position2[f] * (1 - d[e]), c[f + 1] = particleSystem.geometry.attributes.position.array[f + 1] * d[e] + this.position2[f + 1] * (1 - d[e]), c[f + 2] = particleSystem.geometry.attributes.position.array[f + 2] * d[e] + this.position2[f + 2] * (1 - d[e]), d[e] = 1, this.delay.push({
                    time: Math.random()
                });
                particleSystem.geometry.addAttribute("position", new THREE.BufferAttribute(c, 3));
                particleSystem.geometry.attributes.val.needsUpdate = !0;
                if (-1 === a)
                    for (c = 0; c < b; c += 3) this.position2[c] = randomPos[c], this.position2[c + 1] = randomPos[c + 1], this.position2[c + 2] = randomPos[c + 2];
                else if (a < loaded.length) {
                    loaded[a].light = 1;
                    for (c = this.light = 0; 6 > c; c++) loaded[c].light && this.light++;
                    for (c = 0; c < b; c += 3) this.position2[c] = loaded[a].e[c], this.position2[c + 1] = loaded[a].e[c + 1], this.position2[c + 2] = loaded[a].e[c + 2]
                } else
                    for (c = 0; c < b; c += 3) this.position2[c] = randomPos[c], this.position2[c + 1] = randomPos[c + 1], this.position2[c + 2] = randomPos[c + 2];
                particleSystem.geometry.addAttribute("position2", new THREE.BufferAttribute(this.position2, 3));
                this.animating = !0
            },
            onDocumentMouseMove: function(a) {
                mouseX = (a.clientX - this.width / 2) / this.width * 2;
                mouseY = (a.clientY - this.height / 2) / this.height * -2
            },
            cStart: function(a) {
                this.funHide(a);
                disY = 0;
                touchY = a.touches[0].pageY
            },
            cMove: function(a) {
                disY = a.touches[0].pageY - touchY
            },
            cEnd: function() {
                40 < disY ? -1 < this.active && this.loadEnd && this.nowLen && this.changeActive(this.active - 1) : (-40 > disY || 0 === disY) && this.active < loaded.length - 1 && this.loadEnd && this.nowLen && this.changeActive(this.active + 1)
            },
            animate: function() {
                RAF(this.animate);
                this.loadEnd && (object.rotation.y += .03 * (camera2 - object.rotation.y), 200.5 <= camera.position.y && 400.5 <= camera.position.z && (camera.position.y += .01 * (200 - camera.position.y), camera.position.z += .01 * (400 - camera.position.z)), lookPos.x += .01 * (50 * mouseX - lookPos.x), lookPos.y += .04 * (200 + 50 * mouseY - lookPos.y), camera.lookAt(lookPos));
                for (var a = .005 * Date.now(), b = 0; b < randomLength; b += 3) positions3[b + 1] += b % 5 * (.5 - b % 2) * .1 * Math.sin(b % 100 + a / 10);
                dotSystem.geometry.addAttribute("position", new THREE.BufferAttribute(positions3, 3));
                dotSystem.rotation.y += .001;
                if (this.loadEnd && particleSystem) {
                    if (this.animating) {
                        for (var b = particleSystem.geometry.attributes.val.array, c = !1, d = 0; d < this.delay.length; d++) 0 > this.delay[d].time ? 0 < b[d] ? (b[d] -= .02, c = !0) : b[d] = 0 : (this.delay[d].time -= .02, c = !0);
                        c || (this.animating2 = this.animating = !1);
                        particleSystem.geometry.attributes.val.needsUpdate = !0
                    } else this.animating2 = !1, -1 !== this.active && 6 !== this.active && (particleSystem.rotation.y += .01 * (mouseX / 3 - particleSystem.rotation.y));
                    b = particleSystem.geometry.attributes.size.array;
                    for (c = 0; c < b.length; c++) b[c] = (2 + 1.5 * Math.sin(.02 * c + a)) * this.key;
                    this.key = this.footer ? this.isMobile ? this.key + .008 * (2 - this.key) : this.key + .004 * (3 - this.key) : this.key + .05 * (1 - this.key);
                    particleSystem.geometry.attributes.size.needsUpdate = !0
                }
                renderer.clear();
                composer.render()
            }
        },
        mounted: function() {
          this.resize();
          var a = this;
          setTimeout(function() {
            a.init();
            a.animate()
          }, 500)
        }
    });
window.onresize = app.resize;