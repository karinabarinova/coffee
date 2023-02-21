import {registerAs} from "@nestjs/config";

export default registerAs('coffees', () => ({
    featureToggle: false
}))
