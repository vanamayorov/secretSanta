class Validate {
    validateObj(obj) {
        if (!Object.keys(obj).length) {
            throw new Error("No data provided")
        }

        if (Object.keys(obj).length < 3) {
            throw new Error("Not enough data to add user into the game")
        }

        if (!Object.keys(obj).includes("name") || !Object.keys(obj).includes("surname") || !Object.keys(obj).includes("wishlist")) {
            throw new Error("Incorrect data provided")
        }

        if (typeof obj.name !== 'string' || !isNaN(+obj.name)) {
            throw new Error("Invalid data type of name")
        }

        if (obj.name.length < 3) {
            throw new Error("Name must contain at least 3 characters")
        }

        if (obj.name.length > 20) {
            throw new Error("Name must contain less than 20 characters")
        }

        if (obj.surname.length < 3) {
            throw new Error("Surname must contain at least 3 characters")
        }

        if (obj.surname.length > 20) {
            throw new Error("Surname must contain less than 20 characters")
        }

        if (typeof obj.surname !== 'string' || !isNaN(+obj.surname)) {
            throw new Error("Invalid data type of surname")
        }

        if (!Array.isArray(obj.wishlist)) {
            throw new Error("Wishlist type must be array")
        }

        if (!obj.wishlist.length) {
            throw new Error("Wishlist must contain at least 1 item")
        }

        if (obj.wishlist.length > 10) {
            throw new Error("Wishlist must contain less than 10 items")
        }

        if (obj.wishlist.some(item => item.length < 2)) {
            throw new Error("Items in wish list must contain at leas 2 symbols")
        }

        if (obj.wishlist.some(item => (typeof item !== 'string' || !isNaN(+item)))) {
            throw new Error("Invalid data type of items in wishlist")
        }

        return true;
    }
}

export default new Validate()