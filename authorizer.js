<<<<<<< HEAD
const { CognitoJwtVerifier } = require("aws-jwt-verify");
const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID;
const COGNITO_WEB_CLIENT_ID = process.env.COGNITO_WEB_CLIENT_ID;

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: COGNITO_USERPOOL_ID,
  tokenUse: "id",
  clientId: COGNITO_WEB_CLIENT_ID
})

=======
>>>>>>> 8cda0279fdedfe04d20701b4690d42b1a9d4f56e
const generatePolicy = (principalId, effect, resource) => {
  var authReponse = {};
  authReponse.principalId = principalId;
  if (effect && resource) {
    let policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: "execute-api:Invoke",
        },
      ],
    };
    authReponse.policyDocument = policyDocument;
  }
  authReponse.context = {
    foo: "bar",
  };
  console.log(JSON.stringify(authReponse));
  return authReponse;
};

<<<<<<< HEAD
exports.handler = async (event, context, callback) => {
  // lambda authorizer code
  var token = event.authorizationToken;
  console.log(token);
  // Validate the token
  try {
    const payload = await jwtVerifier.verify(token);
    console.log(JSON.stringify(payload));
    callback(null, generatePolicy("user", "Allow", event.methodArn));
  } catch(err) {
    callback("Error: Invalid token");
=======
exports.handler = (event, context, callback) => {
  // lambda authorizer code
  var token = event.authorizationToken; // "allow" or "deny"
  switch (token) {
    case "allow":
      callback(null, generatePolicy("user", "Allow", event.methodArn));
      break;
    case "deny":
        callback(null, generatePolicy("user", "Deny", event.methodArn));
        break;
    default: 
        callback("Error: Invalid token");
>>>>>>> 8cda0279fdedfe04d20701b4690d42b1a9d4f56e
  }
};
