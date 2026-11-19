/* Boulderland Courses & Registration — front-end form logic.
   Opens a per-course modal, validates (required + phone + national id),
   submits via admin-ajax with the receipt file, shows success/failure,
   and bumps the live registration counter on the card. */
(function () {
	'use strict';

	var BLC = window.BLC || {};
	var overlay = document.getElementById('blc-modal');
	if (!overlay) return;

	var form = overlay.querySelector('.blc-form');
	var titleEl = overlay.querySelector('.blc-m-title');
	var courseInput = form.querySelector('input[name="course_id"]');
	var msgEl = form.querySelector('.blc-msg');
	var submitBtn = form.querySelector('.blc-submit');
	var fileInput = form.querySelector('input[type="file"]');
	var fileName = form.querySelector('.blc-file-name');

	var faDigits = '۰۱۲۳۴۵۶۷۸۹';

	function faNum(n) {
		return String(n).replace(/\d/g, function (d) { return faDigits[d]; });
	}
	// Persian/Arabic digits -> Latin, strip the rest
	function toEn(s) {
		return String(s || '')
			.replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); })
			.replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); })
			.replace(/\D/g, '');
	}

	function resetFileName() { if (fileName) fileName.textContent = 'فایلی انتخاب نشده'; }

	function clearErrors() {
		form.querySelectorAll('.blc-field.error').forEach(function (f) { f.classList.remove('error'); });
	}

	function clearMsg() { msgEl.className = 'blc-msg'; msgEl.textContent = ''; }

	function open(id, name) {
		courseInput.value = id;
		titleEl.textContent = name || '';
		form.reset();
		clearErrors();
		clearMsg();
		resetFileName();
		overlay.classList.add('open');
		overlay.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		var first = form.querySelector('input[name="full_name"]');
		if (first) setTimeout(function () { first.focus(); }, 60);
	}

	function close() {
		overlay.classList.remove('open');
		overlay.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
	}

	// ---- wire up buy buttons + modal controls ----
	document.querySelectorAll('[data-blc-buy]').forEach(function (btn) {
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			open(btn.getAttribute('data-course-id'), btn.getAttribute('data-course-name'));
		});
	});

	var closeBtn = overlay.querySelector('.blc-m-close');
	if (closeBtn) closeBtn.addEventListener('click', close);
	overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && overlay.classList.contains('open')) close();
	});

	// ---- file label + clear its error on pick ----
	if (fileInput) {
		fileInput.addEventListener('change', function () {
			if (fileInput.files && fileInput.files[0]) {
				fileName.textContent = fileInput.files[0].name;
				fileInput.closest('.blc-field').classList.remove('error');
			} else {
				resetFileName();
			}
		});
	}

	// clear a field's error as the user fixes it
	form.querySelectorAll('[data-required]').forEach(function (inp) {
		inp.addEventListener('input', function () {
			inp.closest('.blc-field').classList.remove('error');
		});
	});

	// ---- validation ----
	function validate() {
		var ok = true;
		var firstBad = null;
		form.querySelectorAll('[data-required]').forEach(function (inp) {
			var field = inp.closest('.blc-field');
			var bad = false;

			if (inp.type === 'file') {
				bad = !(inp.files && inp.files.length);
			} else {
				var val = inp.value.trim();
				bad = !val;
				if (!bad && inp.name === 'phone') {
					bad = !/^09\d{9}$/.test(toEn(val));
				}
				if (!bad && inp.name === 'national_id') {
					bad = !/^\d{10}$/.test(toEn(val));
				}
			}

			field.classList.toggle('error', bad);
			if (bad) {
				ok = false;
				if (!firstBad) firstBad = inp;
			}
		});
		if (firstBad && firstBad.focus) firstBad.focus();
		return ok;
	}

	// ---- submit ----
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		clearMsg();
		if (!validate()) return;

		var fd = new FormData(form);
		fd.append('action', 'blc_register');
		fd.append('nonce', BLC.nonce || '');

		submitBtn.disabled = true;
		submitBtn.classList.add('loading');

		fetch(BLC.ajax, { method: 'POST', body: fd, credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (res) {
				submitBtn.disabled = false;
				submitBtn.classList.remove('loading');

				if (res && res.ok) {
					msgEl.className = 'blc-msg ok';
					msgEl.textContent = res.message || 'ثبت نام با موفقیت انجام شد';

					// bump the live counter on the matching card
					var counter = document.querySelector('.blc-count[data-course-id="' + courseInput.value + '"] .blc-count-n');
					if (counter && typeof res.registered !== 'undefined') {
						counter.textContent = faNum(res.registered);
					}

					form.reset();
					resetFileName();
					clearErrors();
					setTimeout(close, 2200);
				} else {
					msgEl.className = 'blc-msg err';
					msgEl.textContent = (res && res.message) || 'ثبت نام انجام نشد';
				}
			})
			.catch(function () {
				submitBtn.disabled = false;
				submitBtn.classList.remove('loading');
				msgEl.className = 'blc-msg err';
				msgEl.textContent = 'ثبت نام انجام نشد';
			});
	});
})();
