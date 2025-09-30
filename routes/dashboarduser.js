const express = require("express");
const router = express.Router();
const { checkRole } = require("../middleware/role");

// Dashboard Pengaju (User)
router.get("/", checkRole("pengaju"), (req, res) => {
res.render("dashboarduser", { user: req.session.user, title: "Dashboard User" });
});

module.exports = router;
