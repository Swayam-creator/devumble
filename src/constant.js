const ALLOWED_UPDATES=["userId","age","gender","profileImage","about","skills","projects"];
const ALLOWED_CONNECTION_REQUEST_STATUS=['collab','nocollab'];
const ALLOWED_CONNECTION_REVIEW_STATUS=['accepted','ignored'];
const STRONG_PASSWORD_OPTIONS={
minLength:8,
maxLength:20,
minLowercase:0,
minUppercase:0,
minNumbers:0,
minSymbols:0
};
const JWT_OPTIONS={
    expiresIn:'1h'
}
const COOKIE_OPTIONS={
    maxAge:24*60*60*1000
}
export {ALLOWED_UPDATES,STRONG_PASSWORD_OPTIONS,JWT_OPTIONS,COOKIE_OPTIONS,ALLOWED_CONNECTION_REQUEST_STATUS,ALLOWED_CONNECTION_REVIEW_STATUS};