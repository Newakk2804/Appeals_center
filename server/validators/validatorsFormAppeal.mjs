export const validatorsFormCanceledAppeal = (req, res, next) => {
    if (!req.body.answer) {
        return res.render("error-message", { error: { message: "Поле ответа не может быть пустым." } });
    }
    next();
}

export const validatorsFormCompletedAppeal = (req, res, next) => {
    if (!req.body.answer) {
        return res.render("error-message", { error: { message: "Поле ответа не может быть пустым." } });
    }
    next();
}

export const validatorsFormCreateAppeal = (req, res, next) => {
    if (!req.body.title && !req.body.content) {
        return res.render("error-message", { error: { message: "Поля 'заголовок' и 'содержимое' не может быть пустым." } });
    }

    if (!req.body.title) {
        return res.render("error-message", { error: { message: "Поля 'заголовок' не может быть пустым." } });
    }

    if (!req.body.content) {
        return res.render("error-message", { error: { message: "Поля 'содержимое' не может быть пустым." } });
    }
    next();
}