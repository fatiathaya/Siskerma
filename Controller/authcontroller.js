const bcrypt = require("bcrypt");
const db = require("../models"); // pastikan models sudah ada
const User = db.User; // model user

exports.loginPage = (req, res) => {
res.render("login", { error: null });
};

exports.signupPage = (req, res) => {
res.render("signup", { error: null });
};

exports.login = async (req, res) => {
const { email, username, password } = req.body;

try {
    const identifier = email || username;
    const user = await User.findOne({ where: { email: identifier } });
    if (!user) {
    if (req.xhr || (req.headers && typeof req.headers["accept"] === "string" && req.headers["accept"].includes("application/json"))) {
        return res.status(400).json({ error: "User tidak ditemukan" });
    }
    return res.render("login", { error: "User tidak ditemukan" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
    if (req.xhr || (req.headers && typeof req.headers["accept"] === "string" && req.headers["accept"].includes("application/json"))) {
        return res.status(400).json({ error: "Password salah" });
    }
    return res.render("login", { error: "Password salah" });
    }

    // Simpan data ke session
    req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    };

    // Redirect sesuai role
    if (req.xhr || (req.headers && typeof req.headers["accept"] === "string" && req.headers["accept"].includes("application/json"))) {
        const redirect = user.role === "superadmin"
            ? "/dashboard/superadmin"
            : (user.role === "admin" ? "/dashboard/admin" : "/dashboarduser");
        return res.json({ success: true, redirect });
    }
    if (user.role === "superadmin") {
        return res.redirect("/dashboard/superadmin");
    } else if (user.role === "admin") {
        return res.redirect("/dashboard/admin");
    } else {
        return res.redirect("/dashboarduser");
    }
} catch (err) {
    console.error(err);
    if (req.xhr || (req.headers && typeof req.headers["accept"] === "string" && req.headers["accept"].includes("application/json"))) {
        return res.status(500).json({ error: "Terjadi kesalahan" });
    }
    res.render("login", { error: "Terjadi kesalahan" });
}
};

exports.logout = (req, res) => {
req.session.destroy(() => {
    res.redirect("/auth/login");
});
};

exports.signup = async (req, res) => {
const { name, email, phone, password } = req.body;
try {
    console.log("[AUTH] Signup payload:", { name, email, phonePresent: Boolean(phone), passwordLen: password ? password.length : 0 });
    const existing = await User.findOne({ where: { email } });
    if (existing) {
    return res.render("signup", { error: "Email sudah terdaftar" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, phone, role: 'pengaju', password: hashed });
    if (!newUser) {
    return res.render("signup", { error: "Gagal membuat user" });
    }
    return res.redirect('/auth/login');
} catch (err) {
    console.error("[AUTH] Signup error:", err);
    const message = err && err.message ? err.message : "Terjadi kesalahan";
    return res.render("signup", { error: message });
}
};
