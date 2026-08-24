(function () {
  "use strict";

  var API_URL = "https://ju26-api-883258931528.southamerica-east1.run.app/api";
  var API_KEY = "f4b47201-78e2-4d4c-8679-f48b1137e9a7";
  var ENVIRONMENT = "prod";
  var TERM_URL =
    "https://ju26publicfiles.blob.core.windows.net/main/termo_consentimento.pdf";
  var ENABLE_ART_UPLOAD = true;

  var MAX_IMAGE_BYTES = 10 * 1024 * 1024;
  var MAX_AUDIO_BYTES = 15 * 1024 * 1024;
  var MAX_VIDEO_BYTES = 25 * 1024 * 1024;

  var bytesToMb = function (bytes) {
    return Math.round(bytes / (1024 * 1024));
  };

  var MIME_LIMITS = {
    "image/png": MAX_IMAGE_BYTES,
    "image/jpeg": MAX_IMAGE_BYTES,
    "image/webp": MAX_IMAGE_BYTES,
    "video/mp4": MAX_VIDEO_BYTES,
    "video/webm": MAX_VIDEO_BYTES,
    "audio/mpeg": MAX_AUDIO_BYTES,
    "audio/mp3": MAX_AUDIO_BYTES,
    "audio/wav": MAX_AUDIO_BYTES,
    "audio/wave": MAX_AUDIO_BYTES,
    "audio/x-wav": MAX_AUDIO_BYTES,
  };

  var ALLOWED_EXTENSIONS = ["png", "jpeg", "webp", "mp4", "webm", "mp3", "wav"];

  var FILE_ACCEPT = ALLOWED_EXTENSIONS.reduce(function (acc, ext) {
    return acc.concat(ext === "jpeg" ? [".jpg", ".jpeg"] : ["." + ext]);
  }, []).join(",");

  var TEXT_FIELDS = ["name", "email", "whatsapp", "city"];
  var CHECK_FIELDS = [
    "check_supportSocialMedia",
    "check_supportStreets",
    "check_supportArt",
    "check_receiveMaterial",
  ];

  /* ---------------------------------------------------------------- toasts */

  var toaster = document.getElementById("toaster");

  var TOAST_ICONS = {
    success:
      '<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>',
    error:
      '<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>',
  };

  function showToast(type, message) {
    var el = document.createElement("div");

    el.className = "toast";
    el.dataset.type = type;
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    el.innerHTML = TOAST_ICONS[type] + "<span></span>";
    el.querySelector("span").textContent = message;

    toaster.appendChild(el);

    setTimeout(function () {
      el.dataset.removing = "true";
      el.addEventListener("animationend", function () {
        el.remove();
      });
    }, 4000);
  }

  var toast = {
    success: function (message) {
      showToast("success", message);
    },
    error: function (message) {
      showToast("error", message);
    },
  };

  /* ----------------------------------------------------------------- state */

  var formData = {
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    check_supportSocialMedia: false,
    check_supportStreets: false,
    check_supportArt: false,
    check_receiveMaterial: false,
  };

  var errors = {};
  var artFile = null;
  var isLoading = false;

  /* --------------------------------------------------------------- element */

  var form = document.getElementById("form");
  var successView = document.getElementById("success");
  var submitButton = document.getElementById("submit");
  var artUpload = document.getElementById("art-upload");
  var artFileInput = document.getElementById("artFile");
  var whatsappInput = document.getElementById("whatsapp");

  var inputs = {};

  TEXT_FIELDS.concat(CHECK_FIELDS).forEach(function (id) {
    inputs[id] = document.getElementById(id);
  });

  /* ------------------------------------------------------------ validation */

  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateWhatsApp(phone) {
    var cleaned = phone.replace(/\D/g, "");
    var phoneRegex =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
    return phoneRegex.test(cleaned);
  }

  function validateForm() {
    var newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    var hasEmail = formData.email.trim() !== "";
    var hasWhatsapp = formData.whatsapp.trim() !== "";

    if (!hasEmail && !hasWhatsapp) {
      newErrors.email = "Informe um e-mail ou WhatsApp";
      newErrors.whatsapp = "Informe um e-mail ou WhatsApp";
    }

    if (hasEmail && !validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (hasWhatsapp && !validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = "WhatsApp inválido";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Cidade é obrigatória";
    }

    errors = newErrors;
    renderErrors();

    return Object.keys(newErrors).length === 0;
  }

  /* --------------------------------------------------------------- render */

  function renderErrors() {
    TEXT_FIELDS.forEach(function (field) {
      var message = errors[field];
      var messageEl = document.getElementById(field + "-error");
      var input = inputs[field];

      messageEl.textContent = message || "";
      messageEl.hidden = !message;

      if (message) {
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", field + "-error");
      } else {
        input.setAttribute("aria-invalid", "false");
        input.removeAttribute("aria-describedby");
      }
    });
  }

  function renderSubmitButton() {
    submitButton.disabled =
      !formData.name.trim() ||
      (!formData.email.trim() && !formData.whatsapp.trim()) ||
      !formData.city.trim() ||
      isLoading;

    submitButton.textContent = isLoading ? "ENVIANDO..." : "ENVIAR";
  }

  function renderArtUpload() {
    artUpload.hidden = !(ENABLE_ART_UPLOAD && formData.check_supportArt);
  }

  /* ----------------------------------------------------------- phone mask */

  var PHONE_MASK = "(__) _____-____";

  function formatPhone(digits) {
    var out = "";
    var index = 0;

    for (var i = 0; i < PHONE_MASK.length; i++) {
      if (index >= digits.length) {
        break;
      }

      if (PHONE_MASK[i] === "_") {
        out += digits[index];
        index++;
      } else {
        out += PHONE_MASK[i];
      }
    }

    return out;
  }

  function countDigits(value) {
    return (value.match(/\d/g) || []).length;
  }

  function applyPhoneMask() {
    var caret = whatsappInput.selectionStart;
    var digitsBeforeCaret = countDigits(whatsappInput.value.slice(0, caret));
    var digits = whatsappInput.value.replace(/\D/g, "").slice(0, 11);
    var masked = formatPhone(digits);

    whatsappInput.value = masked;

    var position = masked.length;

    if (digitsBeforeCaret < digits.length) {
      var seen = 0;

      for (var i = 0; i < masked.length; i++) {
        if (/\d/.test(masked[i])) {
          seen++;

          if (seen === digitsBeforeCaret) {
            position = i + 1;
            break;
          }
        }
      }

      if (digitsBeforeCaret === 0) {
        position = 0;
      }
    }

    whatsappInput.setSelectionRange(position, position);
  }

  /* ---------------------------------------------------------- interaction */

  function handleTextChange(event) {
    var input = event.target;

    if (input === whatsappInput) {
      applyPhoneMask();
    }

    var name = input.name;

    formData[name] = input.value;

    if (errors[name]) {
      errors[name] = "";
      renderErrors();
    }

    renderSubmitButton();
  }

  function handleCheckChange(event) {
    var input = event.target;

    formData[input.name] = input.checked;

    if (input.name === "check_supportArt") {
      if (!input.checked) {
        artFile = null;
        artFileInput.value = "";
      }

      renderArtUpload();
    }

    renderSubmitButton();
  }

  function handleFileChange(event) {
    var input = event.target;
    var file = input.files && input.files[0] ? input.files[0] : null;

    if (file && !(file.type in MIME_LIMITS)) {
      toast.error("Formato de arquivo não suportado.");
      input.value = "";
      return;
    }

    if (file) {
      var maxSize = MIME_LIMITS[file.type];

      if (file.size > maxSize) {
        var maxMb = bytesToMb(maxSize);
        var kind = "A imagem";

        if (file.type.indexOf("video/") === 0) {
          kind = "O vídeo";
        } else if (file.type.indexOf("audio/") === 0) {
          kind = "O áudio";
        }

        toast.error(kind + " deve ter no máximo " + maxMb + " MB.");
        input.value = "";
        return;
      }
    }

    artFile = file;
  }

  function resetForm() {
    formData = {
      name: "",
      email: "",
      whatsapp: "",
      city: "",
      check_supportSocialMedia: false,
      check_supportStreets: false,
      check_supportArt: false,
      check_receiveMaterial: false,
    };

    TEXT_FIELDS.forEach(function (field) {
      inputs[field].value = "";
    });

    CHECK_FIELDS.forEach(function (field) {
      inputs[field].checked = false;
    });

    artFile = null;
    artFileInput.value = "";

    renderArtUpload();
    renderSubmitButton();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor, preencha todos os campos corretamente");
      return;
    }

    isLoading = true;
    renderSubmitButton();

    try {
      var body = new FormData();

      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("whatsapp", formData.whatsapp);
      body.append("city", formData.city);

      body.append(
        "check_supportSocialMedia",
        String(formData.check_supportSocialMedia)
      );
      body.append(
        "check_supportStreets",
        String(formData.check_supportStreets)
      );
      body.append("check_supportArt", String(formData.check_supportArt));
      body.append(
        "check_receiveMaterial",
        String(formData.check_receiveMaterial)
      );

      body.append("source", ENVIRONMENT);

      if (artFile) {
        body.append("artFile", artFile);
      }

      var response = await fetch(API_URL + "/supporters", {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: body,
      });

      if (response.ok) {
        form.hidden = true;
        successView.hidden = false;
        toast.success("Obrigada pelo apoio! Entraremos em contato em breve.");
        resetForm();
      } else {
        toast.error("Erro ao enviar formulário. Tente novamente.");
      }
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente mais tarde.");
    } finally {
      isLoading = false;
      renderSubmitButton();
    }
  }

  /* ------------------------------------------------------------------ init */

  TEXT_FIELDS.forEach(function (field) {
    inputs[field].addEventListener("input", handleTextChange);
  });

  CHECK_FIELDS.forEach(function (field) {
    inputs[field].addEventListener("change", handleCheckChange);
  });

  artFileInput.setAttribute("accept", FILE_ACCEPT);
  artFileInput.addEventListener("change", handleFileChange);

  document.getElementById("terms-link").href = TERM_URL;

  document.getElementById("art-upload-hint").textContent =
    "Formatos aceitos: " +
    ALLOWED_EXTENSIONS.join(", ") +
    ". Limite: " +
    bytesToMb(MAX_IMAGE_BYTES) +
    " MB para imagens, " +
    bytesToMb(MAX_AUDIO_BYTES) +
    " MB para áudios e " +
    bytesToMb(MAX_VIDEO_BYTES) +
    " MB para vídeos.";

  form.addEventListener("submit", handleSubmit);

  renderErrors();
  renderArtUpload();
  renderSubmitButton();
})();
