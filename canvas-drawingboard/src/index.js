function Print() {
    console.log(this.loginId);
}

const obj = {
    loginId: "abc"
};
Print.call(obj);
