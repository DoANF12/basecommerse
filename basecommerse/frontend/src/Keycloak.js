import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:3000",
 realm: "certification",
 clientId: "bookstore-client",
 ClientSecret: "dE5wY5HnKKYTm7rUOljxMwBfgwxH3LGo"
});

export default keycloak;
