/* page.js — full-page «دوره‌های بلدرلند» template behaviour:
   reveal-on-scroll, stat count-up, testimonials carousel, and the status filter
   (which shows/hides the plugin's .blc-course cards by data-status). */
(function () {
	'use strict';

	var faDigits = '۰۱۲۳۴۵۶۷۸۹';
	function faNum(n) { return String(n).replace(/\d/g, function (d) { return faDigits[d]; }); }

	// ---- reveal + stat count-up ----
	var io = new IntersectionObserver(function (es) {
		es.forEach(function (e) {
			if (!e.isIntersecting) return;
			e.target.classList.add('in');
			e.target.querySelectorAll && e.target.querySelectorAll('.count').forEach(countUp);
			io.unobserve(e.target);
		});
	}, { threshold: 0.14, rootMargin: '0px 0px -50px 0px' });
	document.querySelectorAll('.blc-page .reveal').forEach(function (el, i) {
		el.style.transitionDelay = (i % 3 * 0.06) + 's';
		io.observe(el);
	});

	function countUp(el) {
		if (el.dataset.done) return;
		el.dataset.done = '1';
		var target = +el.dataset.target, dur = 1400, t0 = performance.now();
		(function frame(now) {
			var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
			el.textContent = faNum(Math.round(target * e));
			if (p < 1) requestAnimationFrame(frame);
		})(t0);
	}

	// ---- status filter (operates on the plugin's .blc-course cards) ----
	var filter = document.getElementById('statusFilter');
	if (filter) {
		filter.addEventListener('change', function (e) {
			var v = e.target.value;
			document.querySelectorAll('.blc-course').forEach(function (card) {
				card.classList.toggle('is-hidden', v !== 'all' && card.getAttribute('data-status') !== v);
			});
		});
	}

	// ---- testimonials carousel (robust across RTL/LTR scroll models) ----
	(function () {
		var g = document.getElementById('tstGrid');
		var prev = document.getElementById('tstPrev'), next = document.getElementById('tstNext');
		if (!g || !prev || !next) return;
		var gap = 24;
		var step = function () { var c = g.querySelector('.tst'); return (c ? c.offsetWidth : 320) + gap; };
		function bounds() {
			var snap = g.style.scrollSnapType; g.style.scrollSnapType = 'none';
			var o = g.scrollLeft; g.scrollLeft = -1e6; var min = g.scrollLeft;
			g.scrollLeft = 1e6; var max = g.scrollLeft; g.scrollLeft = o; g.style.scrollSnapType = snap;
			return { min: min, max: max };
		}
		var B = bounds(), animating = false;
		var dir = B.min < 0 ? -1 : 1;
		var clamp = function (v) { return Math.max(B.min, Math.min(B.max, v)); };
		function animateTo(tgt) {
			tgt = clamp(tgt); var s = g.scrollLeft, d = tgt - s;
			if (Math.abs(d) < 1) { update(); return; }
			var dur = 420, t0 = performance.now(); animating = true; g.style.scrollSnapType = 'none';
			(function f(now) {
				var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
				g.scrollLeft = s + d * e;
				if (p < 1) requestAnimationFrame(f);
				else { g.style.scrollSnapType = ''; setTimeout(function () { animating = false; update(); }, 60); }
			})(t0);
		}
		next.onclick = function () { animateTo(g.scrollLeft + dir * step()); };
		prev.onclick = function () { animateTo(g.scrollLeft - dir * step()); };
		function update() {
			if (animating) return;
			var start = dir < 0 ? B.max : B.min, end = dir < 0 ? B.min : B.max;
			prev.disabled = Math.abs(g.scrollLeft - start) <= 2;
			next.disabled = Math.abs(g.scrollLeft - end) <= 2;
		}
		g.addEventListener('scroll', update, { passive: true });
		addEventListener('resize', function () { B = bounds(); update(); });
		update();
	})();
})();
