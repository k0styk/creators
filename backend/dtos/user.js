class UserDto {
    id;
    email;
    firstName;
    lastName;
    about;
    phone;
    type;
    city;
    isActivated;
    isFullRegister;
    // activationLink;
    // activationLinkExpiration;
    secondName;
    photoPath;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.about = model.about;
        this.city = model.city;
        this.type = model.type;
        this.phone = model.phone;
        this.isFullRegister = model.isFullRegister;
        // this.activationLink = model.activationLink;
        // this.activationLinkExpiration = model.activationLinkExpiration;
        this.secondName = model.secondName;
        this.photoPath = model.photoPath;
    }
}

class ShortUserDto {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}

module.exports = {
    ShortUser: ShortUserDto,
    User: UserDto,
};
