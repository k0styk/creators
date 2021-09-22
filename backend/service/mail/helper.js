module.exports = {
    getSubject: (subject) => `Активация аккаунта на ${subject}`,
    getHtml: (link) => `<div>
        <h1>Для активации перейдите по ссылке</h1>
        <a href="${link}">${link}</a>
    </div>`,
};
