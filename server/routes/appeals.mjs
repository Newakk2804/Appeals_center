import { Router } from "express";
import Appeal from "../models/appeal.mjs";
import {
    validatorsFormCanceledAppeal,
    validatorsFormCreateAppeal,
    validatorsFormCompletedAppeal
} from "../validators/validatorsFormAppeal.mjs"

const router = Router();


router.get("/create", (req, res) => {
    const locals = {
        title: "Создание обращения"
    };

    res.render("create-appeal", { locals });
});

router.post("/create", validatorsFormCreateAppeal, async (req, res) => {
    try {
        await Appeal.create({
            title: req.body.title,
            content: req.body.content,
            status: "новое",
            answer: "",
        });

        res.redirect("view");
    } catch (err) {
        res.sendStatus(400);
    }
});

router.get("/view", async (req, res) => {
    try {
        const locals = {
            title: "Home"
        }

        const data = await Appeal.find().sort({ createdAt: -1 });
        res.render("appeals-all", { locals, data });
    }
    catch (err) {
        res.sendStatus(400);
    }
});

router.get("/completed/:id", async (req, res) => {
    try {
        const findAppeal = await Appeal.findById(req.params.id);
        res.render("completed-appeal", { findAppeal });
    } catch (err) {
        res.sendStatus(400);
    }
});

router.post("/completed/:id", validatorsFormCompletedAppeal, async (req, res) => {
    try {
        const findAppeal = await Appeal.findById(req.params.id);

        findAppeal.status = "завершено";
        findAppeal.answer = req.body.answer;
        await findAppeal.save();

        res.redirect("/appeal/view");
    } catch (err) {
        res.sendStatus(400);
    }
});

router.get("/canceled/:id", async (req, res) => {
    try {
        const findAppeal = await Appeal.findById(req.params.id);
        res.render("canceled-appeal", { findAppeal });
    } catch (err) {
        res.sendStatus(400);
    }
});

router.post("/canceled/:id", validatorsFormCanceledAppeal, async (req, res) => {
    try {
        const findAppeal = await Appeal.findById(req.params.id);

        findAppeal.status = "отменено";
        findAppeal.answer = req.body.answer;
        await findAppeal.save();

        res.redirect("/appeal/view");
    } catch (err) {
        res.sendStatus(400);
    }
});

router.patch("/patch/:id", async (req, res) => {
    try {
        const findAppeal = await Appeal.findById(req.params.id);

        findAppeal.status = "в работе";
        await findAppeal.save();

        res.redirect("/appeal/view");
    } catch (err) {
        res.sendStatus(400);
    }
});

router.get("/canceled-all-appeals", async (req, res) => {
    try {
        const findAppeals = await Appeal.find({ status: "в работе" });

        for (const appeal of findAppeals) {
            try {
                await appeal.updateOne({ status: "отменено", answer: "отмена" });
            } catch (err) {
                throw err;
            }
        }

        res.redirect("/appeal/view");
    } catch (err) {
        res.sendStatus(400);
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const findAppeal = await Appeal.deleteOne({ _id: req.params.id });

        res.redirect("/appeal/view");
    } catch (err) {
        res.sendStatus(400);
    }
});

router.post("/search", async (req, res) => {
    try {
        let specific_date;
        let from_date;
        let to_date;

        if (req.body.specific_date) {
            specific_date = new Date(req.body.specific_date);
        }

        if (req.body.from_date) {
            from_date = new Date(req.body.from_date);
        }

        if (req.body.to_date) {
            to_date = new Date(req.body.to_date);
        }

        let startOfDay;
        let endOfDay;

        let data;

        if (specific_date) {
            startOfDay = new Date(specific_date.setHours(3, 0, 0, 0));
            endOfDay = new Date(specific_date.setHours(26, 59, 59, 999));
            data = await Appeal.find({ createdAt: { $gte: startOfDay, $lt: endOfDay } }).sort({ createdAt: -1 });
        }

        if (from_date && to_date) {
            if (from_date > to_date) {
                return res.render("error-message", { error: { message: "Дата должна быть от меньшего к большему." } });
            }
            startOfDay = new Date(from_date.setHours(3, 0, 0, 0));
            endOfDay = new Date(to_date.setHours(26, 59, 59, 999));
            data = await Appeal.find({ createdAt: { $gte: startOfDay, $lt: endOfDay } }).sort({ createdAt: -1 });
        }

        if (!specific_date && !from_date && !to_date) {
            return res.redirect("/appeal/view");
        }

        res.render("appeals-all", { data });
    } catch (err) {
        res.sendStatus(400);
    }
})

export default router;