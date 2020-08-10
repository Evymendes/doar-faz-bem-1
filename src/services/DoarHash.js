import crypto from "crypto";

export default (input) => crypto.createHash("sha1").update(input).digest("hex");
