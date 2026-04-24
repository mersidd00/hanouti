// script.js
    (() => {
      const baseAmount = 12900.0;
      const officeDeliveryCost = 500.0;
      const homeDeliveryCosts = {
        
  "adrar": 1400,
  "chlef": 800,
  "laghouat": 950,
  "oum_el_bouaghi": 750,
  "batna": 800,
  "bejaia": 750,
  "biskra": 950,
  "bechar": 1100,
  "blida": 750,
  "bouira": 750,
  "tamanrasset": 1600,
  "tebessa": 850,
  "tlemcen": 900,
  "tiaret": 800,
  "tizi_ouzou": 750,
  "alger": 600,
  "djelfa": 950,
  "jijel": 750,
  "setif": 600,
  "saida": 800,
  "skikda": 750,
  "sidi_bel_abbes": 800,
  "annaba": 800,
  "guelma": 750,
  "constantine": 750,
  "medea": 800,
  "mostaganem": 800,
  "msila": 850,
  "mascara": 800,
  "ouargla": 950,
  "oran": 750,
  "el_bayadh": 1100,
  "bordj_bou_arreridj": 600,
  "boumerdes": 750,
  "el_tarf": 800,
  "tissemsilt": 800,
  "el_oued": 950,
  "khenchela": 800,
  "souk_ahras": 750,
  "tipaza": 750,
  "mila": 700,
  "ain_defla": 750,
  "naama": 1100,
  "ain_temouchent": 800,
  "ghardaia": 950,
  "relizane": 800,
  "timimoun": 1100,
  "ouled_djellal": 900,
  "beni_abbes": 1400,
  "in_salah": 1600,
  "in_guezzam": 1400,
  "touggourt": 950,
  "el_meghaier": 950,
  "el_menia": 1000


      };

      const form = document.getElementById('orderForm');
      const fullnameInput = document.getElementById('fullname');
      const phoneInput = document.getElementById('phone');
      const wilayaSelect = document.getElementById('wilaya');
      const deliveryRadios = document.querySelectorAll('input[name="delivery_cost"]');
      const quantityInput = document.getElementById('quantityInput');
      const plusBtn = document.getElementById('plusBtn');
      const minusBtn = document.getElementById('minusBtn');
      const homeDeliveryPriceSpan = document.getElementById('homeDeliveryPrice');
      const subTotalEl = document.getElementById('subTotal');
      const totalAmountEl = document.getElementById('totalAmount');

      const fullnameError = document.getElementById('fullnameError');
      const phoneError = document.getElementById('phoneError');
      const wilayaError = document.getElementById('wilayaError');
      const deliveryCostError = document.getElementById('deliveryCostError');
      const deliveryCos = document.getElementById('deliveryCostt');
      const quantit = document.getElementById('quantityy');

       form.addEventListener('submit', (e) => {
        e.preventDefault();


        if (validateForm()) {
          // Form is valid, you can submit or do further processing here


                  // إرسال الحدث إلى Facebook
        fbq('track', 'Purchase', {
         value: 12500.00,     // ← غيّرها لسعر المنتج
         currency: 'DZD'    // ← غيّرها لعملتك مثل 'DZD' أو 'EUR'
        });


        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch("https://eidlkbir.app.n8n.cloud/webhook/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
         })
       .then(res => {
        if (res.ok) {
          window.location.href = "thank-you.html"; // ✅ صفحة الشكر
        } else {
          window.location.href = "error.html"; // ❌ صفحة الخطأ
        }
        })
       .catch(err => {
         window.location.href = "error.html"; // ❌ عند وجود خطأ في الاتصال
       });
         }
    });
  


      function updateHomeDeliveryPrice() {
        const wilaya = wilayaSelect.value;
        if (wilaya) {
          const cost = homeDeliveryCosts[wilaya] ?? 0;
          homeDeliveryPriceSpan.textContent = cost > 0 ? `${cost}     دج` : '-';
        } else {
          homeDeliveryPriceSpan.textContent = '-';
        }
      }




      function updateTotal() {
        let deliveryCost = 0;
        if (deliveryRadios[0].checked) {
          deliveryCost = officeDeliveryCost;
        } else if (deliveryRadios[1].checked) {
          const wilaya = wilayaSelect.value;
          deliveryCost = homeDeliveryCosts[wilaya] ?? 0;
        }

        const quantity = parseInt(quantityInput.value, 10) || 1;

  // ✅ السعر الفرعي = المنتج + التوصيل (ثابت)
  const subTotal = baseAmount * quantity;
  

  // ✅ السعر الإجمالي = السعر الفرعي × الكمية
  const total = baseAmount * quantity + deliveryCost;

  // ✅ تحديث العرض
quantityy.innerHTML = `${quantity}`;
 deliveryCos.innerHTML = `${deliveryCost} دج`;
  subTotalEl.textContent = `${subTotal} دج`;
  totalAmountEl.innerHTML = `${total} <span class="text-base font-normal"></span>`;
         // ✅ تحديث الحقل المخفي
        // ✅ تحديث الحقول المخفية
  document.getElementById('totalPriceInput').value = total;
  document.getElementById('deliveryPriceInput').value = deliveryCost;

      }





      function validateField(field, errorEl, validator) {
        if (!validator(field.value)) {
          field.classList.add('border-red-600');
          errorEl.classList.remove('hidden');
          field.setAttribute('aria-invalid', 'true');
          return false;
        } else {
          field.classList.remove('border-red-600');
          errorEl.classList.add('hidden');
          field.setAttribute('aria-invalid', 'false');
          return true;
        }
      }

      function validateRadioGroup(name, errorEl) {
        const radios = document.querySelectorAll(`input[name="${name}"]`);
        const checked = Array.from(radios).some(r => r.checked);
        if (!checked) {
          errorEl.classList.remove('hidden');
          return false;
        } else {
          errorEl.classList.add('hidden');
          return true;
        }
      }

      function validateForm() {
        const isFullnameValid = validateField(fullnameInput, fullnameError, val => val.trim().length > 0);
        const isPhoneValid = validateField(phoneInput, phoneError, val => /^\d{10,15}$/.test(val));
        const isWilayaValid = validateField(wilayaSelect, wilayaError, val => val.trim() !== '');
        const isDeliveryValid = validateRadioGroup('delivery_cost', deliveryCostError);

        return isFullnameValid && isPhoneValid && isWilayaValid && isDeliveryValid;
      }

      fullnameInput.addEventListener('input', () => {
        validateField(fullnameInput, fullnameError, val => val.trim().length > 0);
      });

      phoneInput.addEventListener('input', () => {
        validateField(phoneInput, phoneError, val => /^\d{10,15}$/.test(val));
      });

      wilayaSelect.addEventListener('change', () => {
        validateField(wilayaSelect, wilayaError, val => val.trim() !== '');
        updateHomeDeliveryPrice();
        updateTotal();
      });

      deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          validateRadioGroup('delivery_cost', deliveryCostError);
          updateTotal();
        });
      });

      plusBtn.addEventListener('click', () => {
        let currentQty = parseInt(quantityInput.value, 10) || 1;
        currentQty++;
        quantityInput.value = currentQty;
        updateTotal();
      });

      minusBtn.addEventListener('click', () => {
        let currentQty = parseInt(quantityInput.value, 10) || 1;
        if (currentQty > 1) {
          currentQty--;
          quantityInput.value = currentQty;
          updateTotal();
        }
      });

     

      // Initialize on page load
      updateHomeDeliveryPrice();
      updateTotal();
    })();
 

    (function () {
      const slides = Array.from(document.querySelectorAll(".slide"));
      const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
      const prevBtn = document.querySelector(".nav-arrow.prev");
      const nextBtn = document.querySelector(".nav-arrow.next");
      let currentIndex = 0;

      // Update slider to show slide at index
      function updateSlider(index) {
        if (index === currentIndex) return;
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        // Fade out current slide
        slides[currentIndex].classList.remove("active");
        slides[currentIndex].setAttribute("aria-hidden", "true");

        // Fade in new slide
        slides[index].classList.add("active");
        slides[index].setAttribute("aria-hidden", "false");

        // Update thumbnails
        thumbnails[currentIndex].classList.remove("active");
        thumbnails[currentIndex].removeAttribute("aria-current");
        thumbnails[currentIndex].tabIndex = -1;

        thumbnails[index].classList.add("active");
        thumbnails[index].setAttribute("aria-current", "true");
        thumbnails[index].tabIndex = 0;
        thumbnails[index].focus({ preventScroll: true });

        currentIndex = index;
      }

      // Thumbnail click
      thumbnails.forEach((thumb) => {
        thumb.addEventListener("click", () => {
          const index = parseInt(thumb.dataset.index, 10);
          updateSlider(index);
        });

      });



      // Swipe support
      let startX = 0;
      let currentX = 0;
      let isDragging = false;

      function onTouchStart(e) {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX;
        isDragging = true;
      }
      function onTouchMove(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
      }
      function onTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        const deltaX = currentX - startX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX < 0) {
            updateSlider(currentIndex + 1);
          } else {
            updateSlider(currentIndex - 1);
          }
        }
      }

      const slider = document.querySelector(".slider");
      slider.addEventListener("touchstart", onTouchStart, { passive: true });
      slider.addEventListener("touchmove", onTouchMove, { passive: true });
      slider.addEventListener("touchend", onTouchEnd);


    })();
   

    
    
    
    


    













