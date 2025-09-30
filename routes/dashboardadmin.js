const express = require("express");
const router = express.Router();
const { checkRole } = require("../middleware/role");

router.get("/superadmin", checkRole("superadmin"), (req, res) => {
res.send("Halo Superadmin!");
});

router.get("/admin", checkRole("admin"), (req, res) => {
res.send("Halo Admin!");
});

router.get("/pengaju", checkRole("pengaju"), (req, res) => {
res.send("Halo Pengaju!");
});

module.exports = router;
