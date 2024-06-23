class UserRequestDTO{
    constructor({ email, name, age, city, zipCode }){
        this.email = email;
        this.name = name;
        this.age = age;
        this.city = city;
        this.zipCode = zipCode;
    }
}

export default UserRequestDTO;