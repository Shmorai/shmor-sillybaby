/* SillyBaby weekly email sign-up → network Google Form → "Shmor Network Sign-ups (MASTER)" sheet.
   Same form and field codes as shmor.ai (shmor-ai/assets/js/config.js → SITE.signup). */
(function () {
  'use strict';
  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLScWHB4EPv6PvuxRHpCWzoP9wYAHuEPoHyqERgS5oU8Qkh2phA/formResponse';
  var F = { name: 'entry.944173896', email: 'entry.1494422821', phone: 'entry.1469592634', country: 'entry.57901292',
    emailConsent: 'entry.604876', smsConsent: 'entry.366807439', ip: 'entry.596290519', source: 'entry.1939103685',
    region: 'entry.1587159683', browser: 'entry.707341773' };
  var COUNTRIES = [['United Kingdom', '+44'], ['United States', '+1'], ['Ireland', '+353'], ['Austria', '+43'], ['Belgium', '+32'],
    ['Bulgaria', '+359'], ['Croatia', '+385'], ['Cyprus', '+357'], ['Czechia', '+420'], ['Denmark', '+45'], ['Estonia', '+372'],
    ['Finland', '+358'], ['France', '+33'], ['Germany', '+49'], ['Greece', '+30'], ['Hungary', '+36'], ['Italy', '+39'],
    ['Latvia', '+371'], ['Lithuania', '+370'], ['Luxembourg', '+352'], ['Malta', '+356'], ['Netherlands', '+31'], ['Norway', '+47'],
    ['Poland', '+48'], ['Portugal', '+351'], ['Romania', '+40'], ['Slovakia', '+421'], ['Slovenia', '+386'], ['Spain', '+34'],
    ['Sweden', '+46'], ['Switzerland', '+41'], ['Canada', '+1'], ['Australia', '+61'], ['Other', '']];
  var tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* old browser */ }
  var region = /^Europe\/London/.test(tz) ? 'United Kingdom' : /^America\//.test(tz) ? 'United States' : /^Europe\//.test(tz) ? 'Europe' : 'Other';

  document.querySelectorAll('form[data-signup]').forEach(function (form) {
    if (form.dataset.ready) return;
    form.dataset.ready = '1';
    var card = form.closest('.signup-card'), done = card.querySelector('.signup-done'), err = form.querySelector('.sf-err');
    var sel = form.elements.country, phone = form.elements.phone, btn = form.querySelector('.sf-btn');
    sel.insertAdjacentHTML('beforeend', COUNTRIES.map(function (c) { return '<option>' + c[0] + '</option>'; }).join(''));
    if (region === 'United Kingdom' || region === 'United States') sel.value = region;
    function hint() {
      var c = COUNTRIES.filter(function (x) { return x[0] === sel.value; })[0];
      phone.placeholder = c && c[1] ? c[1] + ' …' : 'Phone with country code';
    }
    sel.addEventListener('change', hint);
    hint();
    function fail(m) { err.textContent = m; err.hidden = false; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      err.hidden = true;
      var v = function (k) { return (form.elements[k].value || '').trim(); };
      if (v('company')) { form.hidden = true; done.hidden = false; return; } // spam trap
      if (v('name').length < 2) return fail('Please add your full name.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))) return fail('That email doesn’t look quite right. Mind checking it?');
      if (!v('country')) return fail('Please choose your country.');
      var digits = v('phone').replace(/[^\d]/g, '');
      if (digits.length < 7 || digits.length > 15) return fail('Please add your phone number, with the country code if you can.');
      if (!form.elements.emailConsent.checked) return fail('Tick the box to say you’d like the weekly email.');

      btn.disabled = true;
      btn.textContent = 'Signing you up…';
      var ctl = window.AbortController ? new AbortController() : null;
      var t = setTimeout(function () { if (ctl) ctl.abort(); }, 2500);
      // Best-effort public IP (static site, no server): the browser asks a public IP service
      fetch('https://api.ipify.org?format=json', ctl ? { signal: ctl.signal } : {})
        .then(function (r) { return r.json(); })
        .then(function (j) { return j.ip || 'unavailable'; }, function () { return 'unavailable'; })
        .then(function (ip) {
          clearTimeout(t);
          var body = new URLSearchParams();
          body.append(F.name, v('name'));
          body.append(F.email, v('email').toLowerCase());
          body.append(F.phone, v('phone'));
          body.append(F.country, v('country'));
          body.append(F.emailConsent, 'Yes');
          body.append(F.smsConsent, form.elements.smsConsent.checked ? 'Yes' : 'No');
          body.append(F.ip, ip);
          body.append(F.source, location.href.split('#')[0]);
          body.append(F.region, region);
          body.append(F.browser, navigator.userAgent.slice(0, 300));
          // Google Forms doesn't let other sites read the reply, so success = the request was sent
          return fetch(FORM, { method: 'POST', mode: 'no-cors', body: body });
        })
        .then(function () {
          card.querySelector('[data-signup-name]').textContent = v('name').split(/\s+/)[0];
          form.hidden = true;
          done.hidden = false;
          try { if (window.gtag) window.gtag('event', 'sign_up', { method: 'sillybaby_weekly' }); } catch (x) { /* analytics off */ }
        }, function () {
          btn.disabled = false;
          btn.textContent = 'Sign me up';
          fail('Sorry, we couldn’t sign you up just now. Please check your connection and try again.');
        });
    });
  });
})();
