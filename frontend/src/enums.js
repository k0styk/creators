const status = {
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3
}
const serviceType = {
    MAIN: 1,
    ADDITIONAL: 2
};

const authStatusEnum = {
    IS_CHECKING: 1,
    IS_AUTHENTICARED: 2,
    AUTH_IS_FAILED: 3
}

module.exports = {
    status,
    serviceType,
    authStatusEnum
}
