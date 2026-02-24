/**
 * Form Doğrulama (Validation) Script
 * İletişim formundaki alanları kontrol eder ve hata mesajlarını gösterir.
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Doğrulama kuralları
  const rules = {
    name: {
      required: 'Ad Soyad alanı zorunludur.',
      minlength: { value: 2, message: 'Ad Soyad en az 2 karakter olmalıdır.' }
    },
    email: {
      required: 'E-posta alanı zorunludur.',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Geçerli bir e-posta adresi giriniz.'
      }
    },
    subject: {
      required: 'Konu alanı zorunludur.',
      minlength: { value: 3, message: 'Konu en az 3 karakter olmalıdır.' }
    },
    message: {
      required: 'Mesaj alanı zorunludur.',
      minlength: { value: 10, message: 'Mesaj en az 10 karakter olmalıdır.' }
    }
  };

  /**
   * Tek bir alanı doğrular.
   * @param {HTMLElement} field - Doğrulanacak input/textarea
   * @returns {string} Hata mesajı veya boş string
   */
  function validateField(field) {
    const name = field.name;
    const value = field.value.trim();
    const fieldRules = rules[name];

    if (!fieldRules) return '';

    // Required kontrolü
    if (fieldRules.required && value === '') {
      return fieldRules.required;
    }

    // Minlength kontrolü
    if (fieldRules.minlength && value.length < fieldRules.minlength.value) {
      return fieldRules.minlength.message;
    }

    // Pattern kontrolü (e-posta)
    if (fieldRules.pattern && !fieldRules.pattern.value.test(value)) {
      return fieldRules.pattern.message;
    }

    return '';
  }

  /**
   * Hata mesajını gösterir veya temizler.
   * @param {HTMLElement} field
   * @param {string} errorMsg
   */
  function showError(field, errorMsg) {
    const errorEl = document.getElementById(`${field.name}-error`);
    if (!errorEl) return;

    if (errorMsg) {
      errorEl.textContent = errorMsg;
      field.classList.add('invalid');
      field.classList.remove('valid');
      field.setAttribute('aria-invalid', 'true');
    } else {
      errorEl.textContent = '';
      field.classList.remove('invalid');
      field.classList.add('valid');
      field.removeAttribute('aria-invalid');
    }
  }

  // Her alana blur event'i ekle — kullanıcı alandan ayrılınca doğrulama yap
  const fields = form.querySelectorAll('input, textarea');
  fields.forEach(field => {
    field.addEventListener('blur', () => {
      const error = validateField(field);
      showError(field, error);
    });

    // Kullanıcı yazarken hata mesajını temizle
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) {
        const error = validateField(field);
        showError(field, error);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    let firstInvalidField = null;

    fields.forEach(field => {
      const error = validateField(field);
      showError(field, error);

      if (error && isValid) {
        isValid = false;
        firstInvalidField = field;
      }
    });

    if (!isValid) {
      // İlk hatalı alana odaklan
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Form geçerliyse başarı mesajı göster
    const existingSuccess = form.querySelector('.form-success');
    if (existingSuccess) existingSuccess.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.setAttribute('role', 'alert');
    successDiv.textContent = '✓ Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.';
    form.appendChild(successDiv);

    // Formu temizle
    form.reset();
    fields.forEach(field => {
      field.classList.remove('valid', 'invalid');
      field.removeAttribute('aria-invalid');
    });

    // Hata mesajlarını temizle
    form.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });

    // 5 saniye sonra başarı mesajını kaldır
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 5000);
  });
});
