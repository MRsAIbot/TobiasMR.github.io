(function() {
  var Bean, coffee_draw;

  coffee_draw = function(p5) {
    p5.setup = function() {
      p5.size($(window).width(), $(window).height() - 400);
      p5.background(1000);
      return this.beans = [];
    };
    return p5.draw = function() {
      var bean, i, len, ref, results, vel, x, x_off, y, y_off;
      x_off = p5.frameCount * 0.0003;
      y_off = x_off + 20;
      x = p5.noise(x_off) * p5.width;
      y = p5.noise(y_off) * p5.height;
      vel = 15;
      if (p5.frameCount % 8 === 0) {
        bean = new Bean(p5, {
          x: x,
          y: y,
          x_off: x_off,
          y_off: y_off,
          vel: vel
        });
        this.beans.push(bean);
      }
      ref = this.beans;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        bean = ref[i];
        results.push(bean.draw());
      }
      return results;
    };
  };

  Bean = (function() {
    function Bean(p51, opts) {
      this.p5 = p51;
      this.x = opts.x;
      this.y = opts.y;
      this.x_off = opts.x_off;
      this.y_off = opts.y_off;
      this.vel = opts.vel || 3;
      this.accel = opts.accel || -0.003;
    }

    Bean.prototype.draw = function() {
      if (!(this.vel > 0)) {
        return;
      }
      this.x_off += 0.0007;
      this.y_off += 0.0007;
      this.vel += this.accel;
      this.x += this.p5.noise(this.x_off) * this.vel - this.vel / 2;
      this.y += this.p5.noise(this.y_off) * this.vel - this.vel / 2;
      this.set_color();
      return this.p5.point(this.x, this.y);
    };

    Bean.prototype.set_color = function() {
      var a, b, h, s;
      this.p5.colorMode(this.p5.HSB, 360, 100, 100);
      h = this.p5.noise((this.x_off + this.y_off) / 2) * 360;
      s = 100;
      b = 100;
      a = 4;
      return this.p5.stroke(h, s, b, a);
    };

    return Bean;

  })();

  $(document).ready(function() {
    var canvas, processing;
    canvas = document.getElementById("processing");
    return processing = new Processing(canvas, coffee_draw);
  });

}).call(this);
