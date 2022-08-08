class Validator {
    isLengthLessOrEqual(value, length) {
      if (value === "") return null;
      else if (value.length < length) return false;
      else return true;
    }
    isNotEmpty(value) {
      if (value === "" || value === null || value === undefined || value === 0)
        return null;
      else return true;
    }
    isEmail(value) {
        if (value === "") return null;
        else return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      }
}

module.exports = new Validator()