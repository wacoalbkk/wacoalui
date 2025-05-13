async function validateToken(token) {
  const response = await fetch("https://wacoalui.wacoal.co.th/api/wacoalUi/js/token/"+token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    //   "Authorization": `Bearer ${token}`
    }
  });

  if (!response.status == 'error') {
    throw new Error("Token validation failed");
  }

  const data = await response.json();
  return data.valid; // สมมุติว่า API ตอบ { valid: true }
}

function ensureAuthenticated() {
  if (!_isAuthenticated) {
    throw new Error("Unauthorized: Please call `await Wacoalui.init({ token })` before using components.");
  }
}

const Wacoalui = {
  async init({ token }) {
    if (!token) throw new Error("Token is required");
    const valid = await validateToken(token);
    if (!valid) {
      throw new Error("Invalid token");
    }

    _token = token;
    _isAuthenticated = true;
  },

  AlertBox(options) {
    ensureAuthenticated();
    return new AlertBox(options);
  },

  Modalbox(options) {
    ensureAuthenticated();
    return new Modalbox(options);
  },

  // ...component อื่น ๆ ก็ใช้ ensureAuthenticated() เช่นกัน
};

export default Wacoalui;